import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { submission_id, answers } = await request.json()
  if (!submission_id || !answers) return NextResponse.json({ error: 'Missing data' }, { status: 400 })

  // Verify submission belongs to user and is not completed
  const { data: sub, error: subError } = await supabase
    .from('submissions')
    .select('completed_at, started_at')
    .eq('id', submission_id)
    .eq('student_id', user.id)
    .single()
  if (subError || !sub) return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
  if (sub.completed_at) return NextResponse.json({ error: 'Assessment already completed' }, { status: 400 })

  // Check 3-hour limit
  const startedAt = new Date(sub.started_at).getTime()
  const now = Date.now()
  if (now - startedAt > 3 * 60 * 60 * 1000) {
    // Time's up – maybe auto-submit?
    return NextResponse.json({ error: 'Time expired' }, { status: 400 })
  }

  // Upsert answers
  for (const ans of answers) {
    await supabase.from('answers').upsert({
      submission_id,
      question_id: ans.question_id,
      answer_text: ans.answer_text,
    }, { onConflict: 'submission_id, question_id' })
  }

  return NextResponse.json({ success: true })
}