'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const supabase = createClient()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()
        setProfile(data)
      }
    }
    getUser()
  }, [supabase])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  // Don't show navbar on auth pages
  if (pathname.startsWith('/auth')) return null

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary-600">
              Skill Leadership Factory
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700">
                  {user.email} ({profile?.role})
                </span>
                {profile?.role === 'student' && (
                  <Link href="/dashboard/student" className="text-gray-700 hover:text-primary-600">
                    Dashboard
                  </Link>
                )}
                {profile?.role === 'lecturer' && (
                  <Link href="/dashboard/lecturer" className="text-gray-700 hover:text-primary-600">
                    Dashboard
                  </Link>
                )}
                {profile?.role === 'admin' && (
                  <Link href="/dashboard/admin" className="text-gray-700 hover:text-primary-600">
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={signOut}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}