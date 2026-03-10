'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function NewAssessment() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [totalPoints, setTotalPoints] = useState(0)
  const [published, setPublished] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])
  const router = useRouter()
  const supabase = createClient()

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question_text: '',
        points: 1,
        options: ['', ''],
        correct_answer: '',
      },
    ])
  }

  const updateQuestion = (index: number, field: string, value: any) => {
    const updated = [...questions]
    updated[index][field] = value
    setQuestions(updated)
  }

  const updateOption = (qIndex: number, optIndex: number, value: string) => {
    const updated = [...questions]
    updated[qIndex].options[optIndex] = value
    setQuestions(updated)
  }

  const addOption = (qIndex: number) => {
    const updated = [...questions]
    updated[qIndex].options.push('')
    setQuestions(updated)
  }

  const removeOption = (qIndex: number, optIndex: number) => {
    const updated = [...questions]
    updated[qIndex].options.splice(optIndex, 1)
    setQuestions(updated)
  }

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = (await supabase.auth.getUser()).data.user
    if (!user) return

    // Insert assessment
    const { data: assessment, error: assError } = await supabase
      .from('assessments')
      .insert({
        title,
        description,
        due_date: dueDate || null,
        total_points: totalPoints,
        is_published: published,
        created_by: user.id,
      })
      .select()
      .single()

    if (assError) {
      alert('Error creating assessment: ' + assError.message)
      return
    }

    // Insert questions
    const questionsToInsert = questions.map(q => ({
      assessment_id: assessment.id,
      question_text: q.question_text,
      points: q.points,
      options: q.options.filter((opt: string) => opt.trim() !== ''),
      correct_answer: q.correct_answer,
    }))

    const { error: qError } = await supabase
      .from('questions')
      .insert(questionsToInsert)

    if (qError) {
      alert('Error adding questions: ' + qError.message)
      await supabase.from('assessments').delete().eq('id', assessment.id)
      return
    }

    router.push('/dashboard/lecturer/assessments')
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Assessment</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
            rows={3}
          />
        </div>
        <div>
          <label className="block font-medium">Due Date (optional)</label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Total Points (optional)</label>
          <input
            type="number"
            value={totalPoints}
            onChange={(e) => setTotalPoints(parseInt(e.target.value))}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="mr-2"
          />
          <label>Publish immediately (visible to students)</label>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Questions</h2>
          {questions.map((q, idx) => (
            <div key={idx} className="border p-4 mb-4 rounded">
              <div className="flex justify-between">
                <h3 className="font-medium">Question {idx + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeQuestion(idx)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>
              <div className="mt-2">
                <label className="block text-sm">Question Text</label>
                <input
                  type="text"
                  value={q.question_text}
                  onChange={(e) => updateQuestion(idx, 'question_text', e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm">Points</label>
                <input
                  type="number"
                  value={q.points}
                  onChange={(e) => updateQuestion(idx, 'points', parseInt(e.target.value))}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm">Options</label>
                {q.options.map((opt: string, optIdx: number) => (
                  <div key={optIdx} className="flex items-center mt-1">
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => updateOption(idx, optIdx, e.target.value)}
                      className="flex-1 border p-2 rounded"
                      placeholder={`Option ${optIdx + 1}`}
                      required
                    />
                    {q.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(idx, optIdx)}
                        className="ml-2 text-red-600"
                      >
                        X
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addOption(idx)}
                  className="mt-2 text-sm text-blue-600"
                >
                  + Add Option
                </button>
              </div>
              <div className="mt-2">
                <label className="block text-sm">Correct Answer</label>
                <select
                  value={q.correct_answer}
                  onChange={(e) => updateQuestion(idx, 'correct_answer', e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                >
                  <option value="">Select correct answer</option>
                  {q.options.map((opt: string, optIdx: number) => (
                    <option key={optIdx} value={opt}>
                      {opt || `Option ${optIdx + 1}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="bg-blue-600 text-primary px-4 py-2 rounded"
          >
            Add Question
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-900 text-white px-6 py-3 rounded"
        >
          Create Assessment
        </button>
      </form>
    </div>
  )
}