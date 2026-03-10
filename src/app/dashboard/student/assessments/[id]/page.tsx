'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function TakeAssessment() {
  const { id } = useParams()
  const [assessment, setAssessment] = useState<any>(null)
  const [questions, setQuestions] = useState<any[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const { data: ass } = await supabase
        .from('assessments')
        .select('*')
        .eq('id', id)
        .single()
      setAssessment(ass)

      const { data: qs } = await supabase
        .from('questions')
        .select('*')
        .eq('assessment_id', id)
        .order('id')
      setQuestions(qs || [])
    }
    fetchData()
  }, [id, supabase])

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleSubmit = async () => {
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
    } else {
      alert('Submission failed: ' + data.error)
    }
  }

  if (!assessment) return <div>Loading...</div>

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl bg-blue-600 font-bold mb-4">Assessment Submitted</h1>
        <p>Your score: {score} / {assessment.total_points || questions.reduce((sum, q) => sum + q.points, 0)}</p>
        <button
          onClick={() => router.push('/dashboard/student/assessments')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Assessments
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{assessment.title}</h1>
      <p className="mb-6">{assessment.description}</p>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        {questions.map((q, idx) => (
          <div key={q.id} className="mb-6 border p-4 rounded">
            <p className="font-medium">{idx + 1}. {q.question_text} ({q.points} pts)</p>
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
                  {opt}
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