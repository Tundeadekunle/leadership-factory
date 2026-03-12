
// import { createClient } from '@/lib/supabase/server'
// import { NextResponse } from 'next/server'

// export async function POST(request: Request) {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }

//   // Check user is student
//   const { data: profile, error: profileError } = await supabase
//     .from('profiles')
//     .select('role')
//     .eq('id', user.id)
//     .maybeSingle()

//   if (profileError || !profile) {
//     return NextResponse.json({ error: 'Profile not found' }, { status: 403 })
//   }
//   if (profile.role !== 'student') {
//     return NextResponse.json({ error: 'Only students can submit' }, { status: 403 })
//   }

//   const { assessment_id, answers } = await request.json()
//   if (!assessment_id || !answers || !Array.isArray(answers)) {
//     return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
//   }

//   // Find existing in-progress submission
//   const { data: submission, error: subFetchError } = await supabase
//     .from('submissions')
//     .select('id, started_at, status')
//     .eq('assessment_id', assessment_id)
//     .eq('student_id', user.id)
//     .eq('status', 'in_progress')
//     .maybeSingle()

//   if (subFetchError) {
//     return NextResponse.json({ error: subFetchError.message }, { status: 500 })
//   }

//   if (!submission) {
//     // Check if already submitted
//     const { data: completed, error: completedError } = await supabase
//       .from('submissions')
//       .select('id')
//       .eq('assessment_id', assessment_id)
//       .eq('student_id', user.id)
//       .eq('status', 'submitted')
//       .maybeSingle()

//     if (completedError) {
//       return NextResponse.json({ error: completedError.message }, { status: 500 })
//     }
//     if (completed) {
//       return NextResponse.json({ error: 'You have already submitted this assessment.' }, { status: 400 })
//     }

//     // Check for expired
//     const { data: expired, error: expiredError } = await supabase
//       .from('submissions')
//       .select('id')
//       .eq('assessment_id', assessment_id)
//       .eq('student_id', user.id)
//       .eq('status', 'expired')
//       .maybeSingle()

//     if (expiredError) {
//       return NextResponse.json({ error: expiredError.message }, { status: 500 })
//     }
//     if (expired) {
//       return NextResponse.json({ error: 'Assessment expired. Cannot submit.' }, { status: 400 })
//     }

//     return NextResponse.json({ error: 'No active submission found. Please start the assessment first.' }, { status: 400 })
//   }

//   // Check 3-hour time limit
//   const startedAt = new Date(submission.started_at).getTime()
//   const now = Date.now()
//   const threeHoursMs = 3 * 60 * 60 * 1000
//   if (now - startedAt > threeHoursMs) {
//     // Mark as expired
//     await supabase
//       .from('submissions')
//       .update({ status: 'expired' })
//       .eq('id', submission.id)
//     return NextResponse.json({ error: 'Time limit (3 hours) exceeded. Submission no longer accepted.' }, { status: 400 })
//   }

//   // Fetch questions for this assessment
//   const { data: questions, error: qError } = await supabase
//     .from('questions')
//     .select('id, points, correct_answer')
//     .eq('assessment_id', assessment_id)

//   if (qError || !questions) {
//     return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
//   }

//   // Map answers by question_id
//   const answerMap = new Map(answers.map((a: any) => [a.question_id, a.answer_text]))
//   let totalScore = 0
//   const answerRecords = []

//   for (const q of questions) {
//     const studentAnswer = answerMap.get(q.id) || ''
//     const isCorrect = studentAnswer.trim().toLowerCase() === q.correct_answer.trim().toLowerCase()
//     if (isCorrect) {
//       totalScore += q.points || 1
//     }
//     answerRecords.push({
//       question_id: q.id,
//       answer_text: studentAnswer,
//       is_correct: isCorrect,
//     })
//   }

//   // Update submission with score and mark as submitted
//   const { error: updateError } = await supabase
//     .from('submissions')
//     .update({
//       score: totalScore,
//       status: 'submitted',
//       graded_at: new Date().toISOString(),
//     })
//     .eq('id', submission.id)

//   if (updateError) {
//     return NextResponse.json({ error: updateError.message }, { status: 500 })
//   }

//   // Delete any previous answers for this submission (if any)
//   const { error: deleteError } = await supabase
//     .from('answers')
//     .delete()
//     .eq('submission_id', submission.id)

//   if (deleteError) {
//     console.error('Failed to delete old answers:', deleteError)
//     // Continue; we'll attempt to insert new ones anyway
//   }

//   // Insert answers
//   const answersToInsert = answerRecords.map(rec => ({
//     submission_id: submission.id,
//     ...rec,
//   }))
//   const { error: ansError } = await supabase
//     .from('answers')
//     .insert(answersToInsert)

//   if (ansError) {
//     // Rollback: revert submission status to in_progress? For simplicity, return error.
//     await supabase
//       .from('submissions')
//       .update({ status: 'in_progress', score: null })
//       .eq('id', submission.id)
//     return NextResponse.json({ error: ansError.message }, { status: 500 })
//   }

//   return NextResponse.json({ success: true, score: totalScore })
// }













import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  console.log('📥 Submission API called')
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      console.error('❌ Unauthorized: No user')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check user is student
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle()

    if (profileError) {
      console.error('❌ Profile fetch error:', profileError)
      return NextResponse.json({ error: 'Profile fetch failed' }, { status: 500 })
    }
    if (!profile) {
      console.error('❌ Profile not found for user:', user.id)
      return NextResponse.json({ error: 'Profile not found' }, { status: 403 })
    }
    if (profile.role !== 'student') {
      console.error('❌ User is not a student, role:', profile.role)
      return NextResponse.json({ error: 'Only students can submit' }, { status: 403 })
    }

    const { assessment_id, answers } = await request.json()
    if (!assessment_id || !answers || !Array.isArray(answers)) {
      console.error('❌ Invalid request body:', { assessment_id, answers })
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    // Find existing in-progress submission
    const { data: submissions, error: subFetchError } = await supabase
  .from('submissions')
  .select('id, started_at, status')
  .eq('assessment_id', assessment_id)
  .eq('student_id', user.id)
  .eq('status', 'in_progress')
  .order('started_at', { ascending: false }) // most recent first

if (subFetchError) {
  console.error('❌ Error fetching in-progress submissions:', subFetchError)
  return NextResponse.json({ error: subFetchError.message }, { status: 500 })
}

let submission
if (!submissions || submissions.length === 0) {
  submission = null
} else {
  if (submissions.length > 1) {
    console.warn(`⚠️ Multiple (${submissions.length}) in-progress submissions found for assessment ${assessment_id}, student ${user.id}. Using the most recent.`)
    // Optional: you could delete the older ones here (be cautious if they have answers)
  }
  submission = submissions[0]
}

    if (!submission) {
      // Check if already submitted
      const { data: completed, error: completedError } = await supabase
        .from('submissions')
        .select('id')
        .eq('assessment_id', assessment_id)
        .eq('student_id', user.id)
        .eq('status', 'submitted')
        .maybeSingle()

      if (completedError) {
        console.error('❌ Error checking completed submission:', completedError)
        return NextResponse.json({ error: completedError.message }, { status: 500 })
      }
      if (completed) {
        console.log('⚠️ User already submitted assessment:', assessment_id)
        return NextResponse.json({ error: 'You have already submitted this assessment.' }, { status: 400 })
      }

      // Check for expired
      const { data: expired, error: expiredError } = await supabase
        .from('submissions')
        .select('id')
        .eq('assessment_id', assessment_id)
        .eq('student_id', user.id)
        .eq('status', 'expired')
        .maybeSingle()

      if (expiredError) {
        console.error('❌ Error checking expired submission:', expiredError)
        return NextResponse.json({ error: expiredError.message }, { status: 500 })
      }
      if (expired) {
        console.log('⚠️ Assessment expired for user:', user.id)
        return NextResponse.json({ error: 'Assessment expired. Cannot submit.' }, { status: 400 })
      }

      console.log('⚠️ No active submission found for user:', user.id, 'assessment:', assessment_id)
      return NextResponse.json({ error: 'No active submission found. Please start the assessment first.' }, { status: 400 })
    }

    // Check 3-hour time limit
    const startedAt = new Date(submission.started_at).getTime()
    const now = Date.now()
    const threeHoursMs = 3 * 60 * 60 * 1000
    if (now - startedAt > threeHoursMs) {
      // Mark as expired
      const { error: expireError } = await supabase
        .from('submissions')
        .update({ status: 'expired' })
        .eq('id', submission.id)

      if (expireError) {
        console.error('❌ Failed to mark submission as expired:', expireError)
        // Continue to return error to user, but log it
      }
      console.log('⏰ Time limit exceeded for submission:', submission.id)
      return NextResponse.json({ error: 'Time limit (3 hours) exceeded. Submission no longer accepted.' }, { status: 400 })
    }

    // Fetch questions for this assessment
    const { data: questions, error: qError } = await supabase
      .from('questions')
      .select('id, points, correct_answer')
      .eq('assessment_id', assessment_id)

    if (qError) {
      console.error('❌ Error fetching questions:', qError)
      return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
    }
    if (!questions || questions.length === 0) {
      console.error('❌ No questions found for assessment:', assessment_id)
      return NextResponse.json({ error: 'No questions found for this assessment' }, { status: 500 })
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

    // Update submission with score and mark as submitted
    const { error: updateError } = await supabase
      .from('submissions')
      .update({
        score: totalScore,
        status: 'submitted',
        graded_at: new Date().toISOString(),
      })
      .eq('id', submission.id)

    if (updateError) {
      console.error('❌ Error updating submission:', updateError)
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    // Delete any previous answers for this submission (if any)
    const { error: deleteError } = await supabase
      .from('answers')
      .delete()
      .eq('submission_id', submission.id)

    if (deleteError) {
      console.error('❌ Failed to delete old answers:', deleteError)
      // Continue; we'll attempt to insert new ones anyway
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
      console.error('❌ Error inserting answers:', ansError)
      // Rollback: revert submission status to in_progress and clear score
      await supabase
        .from('submissions')
        .update({ status: 'in_progress', score: null })
        .eq('id', submission.id)
      return NextResponse.json({ error: ansError.message }, { status: 500 })
    }

    console.log('✅ Submission successful for user:', user.id, 'score:', totalScore)
    return NextResponse.json({ success: true, score: totalScore })
  } catch (err) {
    console.error('❌ Unhandled exception in submission API:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}