import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import UploadNoteForm from '@/components/UploadNoteForm'
import NotesList from '@/components/NotesList'
import Link from 'next/link'

export default async function LecturerDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  if (profile?.role !== 'lecturer') redirect('/')

  // Fetch notes uploaded by this lecturer
  const { data: notes } = await supabase
    .from('lecture_notes')
    .select('*')
    .eq('uploaded_by', user.id)
    .order('uploaded_at', { ascending: false })

return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Lecturer Dashboard</h1>
      <Link
                href="/dashboard/lecturer/assessments"
                className="bg-white text-blue-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-900 hover:text-white transition"
              >
                Assessment
              </Link>
      <div className="grid grid-cols-1 gap-8">
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload New Lecture Note</h2>
          <UploadNoteForm />
        </section>
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Uploaded Notes</h2>
          <NotesList notes={notes || []} showExpiry />
        </section>
      </div>
    </div>
  )
}


//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">Lecturer Dashboard</h1>
//       <section className="mb-8">
//         <h2 className="text-2xl mb-4">Upload New Lecture Note</h2>
//         <UploadNoteForm />
//       </section>
//       <section>
//         <h2 className="text-2xl mb-4">Your Uploaded Notes</h2>
//         <NotesList notes={notes || []} showExpiry />
//       </section>
//     </div>
//   )
// }