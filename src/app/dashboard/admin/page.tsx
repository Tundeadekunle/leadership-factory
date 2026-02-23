import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  if (profile?.role !== 'admin') redirect('/')

  // Fetch some stats
  const { count: students } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'student')
  const { count: lecturers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'lecturer')

return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-medium text-gray-700">Students</h2>
          <p className="text-3xl font-bold text-primary-600">{students || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-medium text-gray-700">Lecturers</h2>
          <p className="text-3xl font-bold text-primary-600">{lecturers || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-medium text-gray-700">Admins</h2>
          {/* <p className="text-3xl font-bold text-primary-600">{admins || 0}</p> */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/dashboard/admin/users"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-gray-800">Manage Users</h2>
          <p className="text-gray-600 mt-2">View and update user roles.</p>
        </Link>
        <Link
          href="/dashboard/admin/announcements"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-gray-800">Post Announcements</h2>
          <p className="text-gray-600 mt-2">Create new announcements for all users.</p>
        </Link>
        <Link
          href="/dashboard/admin/assessments"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-gray-800">Manage Assessments</h2>
          <p className="text-gray-600 mt-2">Create, edit, or remove assessments.</p>
        </Link>
      </div>
    </div>
  )
}




//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
//       <div className="grid grid-cols-2 gap-4 mb-8">
//         <div className="border p-4 rounded">
//           <h2 className="text-xl">Students</h2>
//           <p className="text-2xl font-bold">{students || 0}</p>
//         </div>
//         <div className="border p-4 rounded">
//           <h2 className="text-xl">Lecturers</h2>
//           <p className="text-2xl font-bold">{lecturers || 0}</p>
//         </div>
//       </div>
//       <div className="space-y-2">
//         <Link href="/dashboard/admin/manage-users" className="block text-blue-600">Manage Users</Link>
//         <Link href="/dashboard/admin/announcements" className="block text-blue-600">Post Announcements</Link>
//         <Link href="/dashboard/admin/assessments" className="block text-blue-600">Manage Assessments</Link>
//       </div>
//     </div>
//   )
// }