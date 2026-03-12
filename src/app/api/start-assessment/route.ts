import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { assessment_id } = await request.json()
  if (!assessment_id) return NextResponse.json({ error: 'Missing assessment_id' }, { status: 400 })

  // Check if already started
  const { data: existing } = await supabase
    .from('submissions')
    .select('id, started_at, completed_at')
    .eq('assessment_id', assessment_id)
    .eq('student_id', user.id)
    .maybeSingle()

  if (existing) {
    if (existing.completed_at) {
      return NextResponse.json({ error: 'Already completed' }, { status: 400 })
    }
    // Return existing submission
    return NextResponse.json({ submission: existing })
  }

  // Create new submission
  const { data: newSub, error } = await supabase
    .from('submissions')
    .insert({
      assessment_id,
      student_id: user.id,
      started_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ submission: newSub })
}