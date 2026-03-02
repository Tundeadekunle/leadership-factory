// 'use client'

// import { useState } from 'react'
// import { createClient } from '@/lib/supabase/client'
// import { useRouter } from 'next/navigation'

// export default function SignUp() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const router = useRouter()
//   const supabase = createClient()

//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const { error, data } = await supabase.auth.signUp({ email, password })
//     if (error) {
//       alert(error.message)
//     } else {
//       // Insert profile (role defaults to 'student')
//       await supabase.from('profiles').insert({ id: data.user?.id, email, role: 'student' })
//       router.push('/')
//     }
//   }

//   return (
//     <form onSubmit={handleSignUp} className="max-w-md mx-auto mt-20 p-6 border rounded">
//       <h2 className="text-2xl mb-4">Sign Up</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="w-full p-2 mb-4 border rounded"
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="w-full p-2 mb-4 border rounded"
//         required
//       />
//       <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
//         Sign Up
//       </button>
//     </form>
//   )
// }















// 'use client'

// import { useState } from 'react'
// import { createClient } from '@/lib/supabase/client'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'


// export default function SignUp() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const router = useRouter()
//   const supabase = createClient()
//   // const [error, setError] = useState<string | null>(null)

//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setError(null)

//     const { error: signUpError, data } = await supabase.auth.signUp({
//       email,
//       password,
//     })

//     if (signUpError) {
//       setError(signUpError.message)
//       setLoading(false)
//       return
//     }

//     if (data.user) {
//       // Insert profile
//       const { error: profileError } = await supabase.from('profiles').insert({
//         id: data.user.id,
//         email: data.user.email,
//         role: 'student',
//       })

//       if (profileError) {
//         setError('Failed to create profile: ' + profileError.message)
//         // You might want to delete the auth user here if profile insert fails, but for now just show error
//       } else {
//         router.push('/') // or directly to dashboard after signup? Usually you want email confirmation.
//       }
//     }
//     setLoading(false)
//   }

// return (
//     <div className="min-h-screen flex items-center justify-center bg-[#0B1F3B] py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
//             Sign up for an account
//           </h2>
//           <p className="mt-2 text-center text-sm text-white">
//             Or{' '}
//             <Link href="/auth/signin" className="font-medium text-white hover:text-primary-500">
//               sign in if you already have an account
//             </Link>
//           </p>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="email-address" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 id="email-address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//               />
//             </div>
//           </div>

//           {error && (
//             <div className="text-red-600 text-sm text-center">{error}</div>
//           )}

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
//             >
//               {loading ? 'Signing up...' : 'Sign up'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }





























'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    gender: '',
    whatsapp: '',
    address: '',
    course: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // 1. Sign up the user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    if (!authData.user) {
      setError('Sign-up succeeded but no user returned.')
      setLoading(false)
      return
    }

    // 2. Update the profile with additional info
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        full_name: formData.fullName,
        gender: formData.gender,
        whatsapp_number: formData.whatsapp,
        address: formData.address,
        course: formData.course,
      })
      .eq('id', authData.user.id)

    // if (updateError) {
    //   setError('Failed to save profile details: ' + updateError.message)
    // } else {
    //   // Redirect to appropriate dashboard (student by default)
    //   router.push('/dashboard/student')
    // }
//     if (updateError) {
//   console.error('Profile update failed:', updateError)
//   setError('Failed to save profile: ' + updateError.message)
// } else {
//   router.push('/dashboard/student')
// }


const { error: upsertError } = await supabase
      .from('profiles')
      .upsert({
        id: authData.user.id,
        email: authData.user.email,
        role: 'student',
        full_name: formData.fullName,
        gender: formData.gender,
        whatsapp_number: formData.whatsapp,
        address: formData.address,
        course: formData.course,
      })

    if (upsertError) {
      console.error('Profile upsert failed:', upsertError)
      setError('Failed to save profile details: ' + upsertError.message)
    } else {
      // Success – redirect to dashboard
      router.push('/dashboard/student')
    }

    setLoading(false)
  }

  // List of courses (you can replace with actual offerings)
  const courses = [
    'Business Leadership',
    'Data Science & AI',
    'Digital Marketing',
    'Cybersecurity',
    'Financial Analysis',
    'Human Resources',
    'Project Management',
    'UX/UI Design',
    'Virtual Assistant',
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1F3B] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Or{' '}
            <Link href="/auth/signin" className="font-medium text-primary-400 hover:text-primary-300">
              sign in to existing account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-white">
                Full Name *
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="John Doe"
              />
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-white">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-gray-300 border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-[#0B1F3B] focus:z-10"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                {/* <option value="other">Other</option> */}
                {/* <option value="prefer-not">Prefer not to say</option> */}
              </select>
            </div>


              {/* Course Selection */}
              {/* Course */}
            <div>
              <label htmlFor="course" className=" block text-sm font-medium text-white">
                Course of Interest *
              </label>
              <select
                id="course"
                name="course"
                required
                value={formData.course}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-white border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-[#0B1F3B]"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
            {/* WhatsApp Number */}
            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-white">
                WhatsApp Number
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                autoComplete="tel"
                value={formData.whatsapp}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="+1234567890"
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-white">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                rows={2}
                value={formData.address}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="123 Main St, City, Country"
              />
            </div>

            
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}





//   return (
//     <form onSubmit={handleSignUp} className="max-w-md mx-auto mt-20 p-6 border rounded">
//       <h2 className="text-2xl mb-4">Sign Up</h2>
//       {error && <p className="text-red-600 mb-4">{error}</p>}
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="w-full p-2 mb-4 border rounded"
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="w-full p-2 mb-4 border rounded"
//         required
//       />
//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
//       >
//         {loading ? 'Creating account...' : 'Sign Up'}
//       </button>
//     </form>
//   )
// }