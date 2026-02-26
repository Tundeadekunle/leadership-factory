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















'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()
  // const [error, setError] = useState<string | null>(null)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: signUpError, data } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      // Insert profile
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        email: data.user.email,
        role: 'student',
      })

      if (profileError) {
        setError('Failed to create profile: ' + profileError.message)
        // You might want to delete the auth user here if profile insert fails, but for now just show error
      } else {
        router.push('/') // or directly to dashboard after signup? Usually you want email confirmation.
      }
    }
    setLoading(false)
  }

return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1F3B] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
            Sign up for an account
          </h2>
          <p className="mt-2 text-center text-sm text-white">
            Or{' '}
            <Link href="/auth/signin" className="font-medium text-white hover:text-primary-500">
              sign in if you already have an account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Password"
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
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing up...' : 'Sign up'}
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