import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function StudentAssessments() {
  const supabase = await createClient()
  const user = (await supabase.auth.getUser()).data.user
  if (!user) return <div>Please sign in</div>

  const { data: assessments } = await supabase
    .from('assessments')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  const { data: submissions } = await supabase
    .from('submissions')
    .select('assessment_id, score')
    .eq('student_id', user.id)

  const submittedMap = new Map(submissions?.map(s => [s.assessment_id, s.score]) || [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Available Assessments</h1>
      <div className="space-y-4">
        {assessments?.map(a => {
          const score = submittedMap.get(a.id)
          return (
            <div key={a.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{a.title}</h2>
              <p className="mb-2">{a.description}</p>
              {score !== undefined ? (
                <p className="text-green-600">You scored: {score} / {a.total_points || '?'}</p>
              ) : (
                <Link href={`/dashboard/student/assessments/${a.id}`} className="text-black bg-blue-900 underline">
                  Take Assessment
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}