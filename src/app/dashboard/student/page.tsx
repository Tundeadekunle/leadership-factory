// import { createClient } from '@/lib/supabase/server'
// import { redirect } from 'next/navigation'
// import LectureNotesList from '@/components/LectureNotesList'
// import AnnouncementsList from '@/components/AnnouncementsList'
// import AssessmentsList from '@/components/AssessmentsList'

// export default async function StudentDashboard() {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) redirect('/')

//   const { data: profile, error: profileError } = await supabase
//     .from('profiles')
//     .select('role')
//     .eq('id', user.id)
//     .single()
//   if (profile?.role !== 'student') redirect('/')

// //     if (profileError) {
// //   console.error('Profile fetch error:', profileError)
// //   // Optionally, create profile if missing (as fallback)
// //   await supabase.from('profiles').insert({
// //     id: user.id,
// //     email: user.email,
// //     role: 'student',
// //   })
// //   // After insert, you might want to re-fetch or just assume success
// // } else if (profile?.role !== 'student') {
// //   redirect('/')
// // }

//   console.log('Student dashboard - user ID:', user.id)
// console.log('Profile fetch result:', profile)
// console.log('Profile fetch error:', profileError)

// if (profileError || !profile) {
//   console.log('Redirecting because profile missing or error')
//   redirect('/')
// }

// if (profile.role !== 'student') {
//   console.log('Redirecting because role is not student, role:', profile.role)
//   redirect('/')
// }

//   // Fetch lecture notes (only non‑expired)
//   const { data: notes } = await supabase
//     .from('lecture_notes')
//     .select('*')
//     .gte('expires_at', new Date().toISOString())  // still valid
//     .order('uploaded_at', { ascending: false })

//   // Fetch announcements (all)
//   const { data: announcements } = await supabase
//     .from('announcements')
//     .select('*')
//     .order('created_at', { ascending: false })

//   // Fetch assessments
//   const { data: assessments } = await supabase
//     .from('assessments')
//     .select('*')
//     .order('created_at', { ascending: false })

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
//       <section className="mb-8">
//         <h2 className="text-2xl mb-4">Lecture Notes (available for 24h)</h2>
//         <LectureNotesList notes={notes || []} />
//       </section>
//       <section className="mb-8">
//         <h2 className="text-2xl mb-4">Announcements</h2>
//         <AnnouncementsList announcements ={announcements || []} />
//       </section>
//       <section>
//         <h2 className="text-2xl mb-4">Assessments</h2>
//         <AssessmentsList assessments={assessments || []} />
//       </section>
//     </div>
//   )
// }

















// import { createClient } from '@/lib/supabase/server'
// import { redirect } from 'next/dist/client/components/navigation'
// import { redirect } from 'next/navigation'
// import LectureNotesList from '@/components/LectureNotesList'
// import AnnouncementsList from '@/components/AnnouncementsList'
// import AssessmentsList from '@/components/AssessmentsList'



// const supabase = createClient()  // no await

// const { data: { user } } = await supabase.auth.getUser()
// if (!user)redirect('/')

// const { data: profile, error: profileError } = await supabase
//   .from('profiles')
//   .select('role')
//   .eq('id', user.id)
//   .single()

// console.log('Student dashboard - user ID:', user.id)
// console.log('Profile fetch result:', profile)
// console.log('Profile fetch error:', profileError)

// // If profile is missing due to error, try to create it
// if (profileError || !profile) {
//   console.log('Profile missing or error – attempting to create')
//   const { error: insertError } = await supabase.from('profiles').insert({
//     id: user.id,
//     email: user.email,
//     role: 'student',
//   })
//   if (insertError) {
//     console.log('Failed to create profile:', insertError)
//     redirect('/')
//   } else {
//     console.log('Profile created successfully – refresh or proceed')
//     // You can either refresh the page or re-fetch the profile
//     // For simplicity, we'll redirect to the same page to reload data
//     redirect('/dashboard/student')
//   }
// }

// if (profile.role !== 'student') {
//   console.log('Redirecting because role is not student, role:', profile.role)
//   redirect('/')
// }














import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LectureNotesList from '@/components/LectureNotesList'
import AnnouncementsList from '@/components/AnnouncementsList'
import AssessmentsList from '@/components/AssessmentsList'

export default async function StudentDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')  // get all fields, including full_name
    .eq('id', user.id)
    .single()

// console.log('Profile data:', profile)
// console.log('Profile error:', profileError)

  // Role check (still needed)
  if (profileError || !profile || profile.role !== 'student') redirect('/')

  // Fetch lecture notes (only non‑expired)
  const { data: notes } = await supabase
    .from('lecture_notes')
    .select('*')
    .gte('expires_at', new Date().toISOString())
    .order('uploaded_at', { ascending: false })

  // Fetch announcements
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })

  // Fetch assessments
  const { data: assessments } = await supabase
    .from('assessments')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
      {profile.full_name && (
        <p className="text-xl text-black mb-6">Welcome back, {profile.full_name}!</p>
      )}
      <div className="grid grid-cols-1 gap-8">
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lecture Notes (available for 24h)</h2>
          <LectureNotesList notes={notes || []} />
        </section>
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Announcements</h2>
          <AnnouncementsList announcements={announcements || []} />
        </section>
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Assessments</h2>
          <AssessmentsList assessments={assessments || []} />
        </section>
      </div>
    </div>
  )
}




//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
//       <section className="mb-8">
//         <h2 className="text-2xl mb-4">Lecture Notes (available for 24h)</h2>
//         <LectureNotesList notes={notes || []} />
//       </section>
//       <section className="mb-8">
//         <h2 className="text-2xl mb-4">Announcements</h2>
//         <AnnouncementsList announcements={announcements || []} />
//       </section>
//       <section>
//         <h2 className="text-2xl mb-4">Assessments</h2>
//         <AssessmentsList assessments={assessments || []} />
//       </section>
//     </div>
//   )
// }