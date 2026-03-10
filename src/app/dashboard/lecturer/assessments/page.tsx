import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function LecturerAssessments() {
  const supabase = await createClient()
  const user = (await supabase.auth.getUser()).data.user
  if (!user) return null

  const { data: assessments } = await supabase
    .from('assessments')
    .select('*')
    .eq('created_by', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Assessments</h1>
        <Link
          href="/dashboard/lecturer/assessments/new"
          className="bg-blue-900 text-white px-4 py-2 rounded"
        >
          Create New
        </Link>
      </div>
      <div className="space-y-4">
        {assessments?.map(a => (
          <div key={a.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{a.title}</h2>
            <p className="mb-2">{a.description}</p>
            <p className="text-sm text-gray-600">
              Published: {a.is_published ? 'Yes' : 'No'} | Due: {a.due_date ? new Date(a.due_date).toLocaleString() : 'No due date'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}