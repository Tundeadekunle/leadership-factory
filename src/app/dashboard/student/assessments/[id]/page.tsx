













'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function TakeAssessment() {
  const { id } = useParams()
  const [assessment, setAssessment] = useState<any>(null)
  const [questions, setQuestions] = useState<any[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  // Ref for the timer interval
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const initializeAssessment = async () => {
      setLoading(true)
      setError(null)

      // Fetch assessment details
      const { data: ass, error: assError } = await supabase
        .from('assessments')
        .select('*')
        .eq('id', id)
        .single()

      if (assError || !ass) {
        setError('Assessment not found')
        setLoading(false)
        return
      }
      setAssessment(ass)

      // Fetch questions
      const { data: qs, error: qError } = await supabase
        .from('questions')
        .select('*')
        .eq('assessment_id', id)
        .order('id')

      if (qError) {
        setError('Failed to load questions')
        setLoading(false)
        return
      }
      setQuestions(qs || [])

      // Check for existing submission
      // const { data: submissions, error: subError } = await supabase
      //   .from('submissions')
      //   .select('id, started_at, status')
      //   .eq('assessment_id', id)
      //   .eq('student_id', (await supabase.auth.getUser()).data.user?.id)
      //   .in('status', ['in_progress', 'submitted', 'expired'])



      // Check for existing submission
const { data: submissions, error: subError } = await supabase
  .from('submissions')
  .select('id, started_at, status, score')  // ✅ added 'score'
  .eq('assessment_id', id)
  .eq('student_id', (await supabase.auth.getUser()).data.user?.id)
  .in('status', ['in_progress', 'submitted', 'expired'])
      if (subError) {
        setError('Error checking submission status')
        setLoading(false)
        return
      }

      const inProgress = submissions?.find(s => s.status === 'in_progress')
      const completed = submissions?.find(s => s.status === 'submitted')
      const expired = submissions?.find(s => s.status === 'expired')

      if (completed) {
        // Already submitted – show score
        setSubmitted(true)
        setScore(completed.score)
        setLoading(false)
        return
      }

      if (expired) {
        setError('Your time limit for this assessment has expired. You cannot retake it.')
        setLoading(false)
        return
      }

      if (inProgress) {
        // Resume existing session
        const startedAt = new Date(inProgress.started_at).getTime()
        const now = Date.now()
        const elapsed = now - startedAt
        const threeHours = 3 * 60 * 60 * 1000

        if (elapsed >= threeHours) {
          // Mark as expired
          await supabase
            .from('submissions')
            .update({ status: 'expired' })
            .eq('id', inProgress.id)
          setError('Your time limit has expired. You cannot continue.')
          setLoading(false)
          return
        }

        // Load saved answers (if any)
        const { data: savedAnswers } = await supabase
          .from('answers')
          .select('question_id, answer_text')
          .eq('submission_id', inProgress.id)

        const savedMap: Record<string, string> = {}
        savedAnswers?.forEach(a => {
          savedMap[a.question_id] = a.answer_text
        })
        setAnswers(savedMap)

        // Start timer
        startTimer(startedAt)
      } else {
        // No submission yet – create a new in‑progress submission
        const { data: newSub, error: createError } = await supabase
          .from('submissions')
          .insert({
            assessment_id: id,
            student_id: (await supabase.auth.getUser()).data.user?.id,
            started_at: new Date().toISOString(),
            status: 'in_progress',
          })
          .select('id, started_at')
          .single()

        if (createError) {
          setError('Failed to start assessment')
          setLoading(false)
          return
        }

        startTimer(new Date(newSub.started_at).getTime())
      }

      setLoading(false)
    }

    const startTimer = (startTime: number) => {
      const updateTimer = () => {
        const now = Date.now()
        const elapsed = now - startTime
        const remaining = 3 * 60 * 60 * 1000 - elapsed
        if (remaining <= 0) {
          setTimeLeft('00:00:00')
          if (timerRef.current) clearInterval(timerRef.current)
          // Optionally show expired modal
        } else {
          const hours = Math.floor(remaining / (1000 * 60 * 60))
          const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((remaining % (1000 * 60)) / 1000)
          setTimeLeft(
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
          )
        }
      }

      updateTimer()
      timerRef.current = setInterval(updateTimer, 1000)
    }

    initializeAssessment()

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [id, supabase])

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleSubmit = async () => {
    // Convert answers object to array for API
    const answerArray = Object.entries(answers).map(([qid, ans]) => ({
      question_id: qid,
      answer_text: ans,
    }))

    const res = await fetch('/api/submit-assessment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assessment_id: id, answers: answerArray }),
    })
    const data = await res.json()
    if (data.success) {
      setScore(data.score)
      setSubmitted(true)
      if (timerRef.current) clearInterval(timerRef.current)
    } else {
      alert('Submission failed: ' + data.error)
    }
  }

  if (loading) return <div className="p-6 text-center">Loading assessment...</div>
  if (error) return (
    <div className="p-6 text-center text-red-600">
      <p>{error}</p>
      <button
        onClick={() => router.push('/dashboard/student/assessments')}
        className="mt-4 bg-blue-900 text-white px-4 py-2 rounded"
      >
        Back to Assessments
      </button>
    </div>
  )
  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Assessment Submitted</h1>
        <p className="text-lg">Your score: <span className="font-bold">{score}</span> / {assessment.total_points || questions.reduce((sum, q) => sum + (q.points || 1), 0)}</p>
        <button
          onClick={() => router.push('/dashboard/student/assessments')}
          className="mt-4 bg-blue-900 text-white px-4 py-2 rounded"
        >
          Back to Assessments
        </button>
      </div>
    )
  }

  return (
  <div className="max-w-full sm:max-w-3xl mx-auto p-4 sm:p-6 antialiased">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">{assessment.title}</h1>
      <div className="bg-gray-200 px-4 py-2 rounded">
        Time left: <span className="font-mono font-bold">{timeLeft}</span>
      </div>
    </div>
    <p className="mb-6">{assessment.description}</p>
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      {questions.map((q, idx) => (
        <div key={q.id} className="mb-6 border p-4 rounded">
          <p className="font-medium">{idx + 1}. {q.question_text} ({q.points || 1} pts)</p>
          <div className="mt-2 space-y-2">
            {q.options?.map((opt: string, optIdx: number) => (
              <label key={optIdx} className="flex items-center">
                <input
                  type="radio"
                  name={q.id}
                  value={opt}
                  checked={answers[q.id] === opt}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  className="mr-2"
                  required
                />
                <span className="text-base">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-900 text-white px-6 py-2 rounded"
      >
        Submit Assessment
      </button>
    </form>
  </div>
)
}