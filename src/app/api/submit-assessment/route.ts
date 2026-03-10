import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check user is student
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  if (profile?.role !== 'student') {
    return NextResponse.json({ error: 'Only students can submit' }, { status: 403 })
  }

  const { assessment_id, answers } = await request.json()
  if (!assessment_id || !answers || !Array.isArray(answers)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Check if already submitted
  const { data: existing } = await supabase
    .from('submissions')
    .select('id')
    .eq('assessment_id', assessment_id)
    .eq('student_id', user.id)
    .maybeSingle()
  if (existing) {
    return NextResponse.json({ error: 'Already submitted' }, { status: 400 })
  }

  // Fetch questions for this assessment
  const { data: questions, error: qError } = await supabase
    .from('questions')
    .select('id, points, correct_answer')
    .eq('assessment_id', assessment_id)

  if (qError || !questions) {
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
  }

  // Map answers by question_id
  const answerMap = new Map(answers.map((a: any) => [a.question_id, a.answer_text]))
  let totalScore = 0
  const answerRecords = []

  for (const q of questions) {
    const studentAnswer = answerMap.get(q.id) || ''
    const isCorrect = studentAnswer.trim().toLowerCase() === q.correct_answer.trim().toLowerCase()
    if (isCorrect) {
      totalScore += q.points || 1
    }
    answerRecords.push({
      question_id: q.id,
      answer_text: studentAnswer,
      is_correct: isCorrect,
    })
  }

  // Insert submission
  const { data: submission, error: subError } = await supabase
    .from('submissions')
    .insert({
      assessment_id,
      student_id: user.id,
      score: totalScore,
    })
    .select()
    .single()

  if (subError) {
    return NextResponse.json({ error: subError.message }, { status: 500 })
  }

  // Insert answers
  const answersToInsert = answerRecords.map(rec => ({
    submission_id: submission.id,
    ...rec,
  }))
  const { error: ansError } = await supabase
    .from('answers')
    .insert(answersToInsert)

  if (ansError) {
    // Rollback submission
    await supabase.from('submissions').delete().eq('id', submission.id)
    return NextResponse.json({ error: ansError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, score: totalScore })
}