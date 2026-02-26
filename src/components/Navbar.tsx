// 'use client'

// import Link from 'next/link'
// import { usePathname, useRouter } from 'next/navigation'
// import { createClient } from '@/lib/supabase/client'
// import { useEffect, useState } from 'react'

// export default function Navbar() {
//   const [user, setUser] = useState<any>(null)
//   const [profile, setProfile] = useState<any>(null)
//   const supabase = createClient()
//   const pathname = usePathname()
//   const router = useRouter()

//   useEffect(() => {
//     const getUser = async () => {
//       const { data: { user } } = await supabase.auth.getUser()
//       setUser(user)
//       if (user) {
//         const { data } = await supabase
//           .from('profiles')
//           .select('role')
//           .eq('id', user.id)
//           .single()
//         setProfile(data)
//       }
//     }
//     getUser()
//   }, [supabase])

//   const signOut = async () => {
//     await supabase.auth.signOut()
//     router.push('/')
//     router.refresh()
//   }

//   // Don't show navbar on auth pages
//   if (pathname.startsWith('/auth')) return null

//   return (
//     <nav className="bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link href="/" className="text-xl font-bold text-primary-600">
//               Skill Leadership Factory
//             </Link>
//           </div>
//           <div className="flex items-center space-x-4">
//             {user ? (
//               <>
//                 <span className="text-gray-700">
//                   {user.email} ({profile?.role})
//                 </span>
//                 {profile?.role === 'student' && (
//                   <Link href="/dashboard/student" className="text-gray-700 hover:text-primary-600">
//                     Dashboard
//                   </Link>
//                 )}
//                 {profile?.role === 'lecturer' && (
//                   <Link href="/dashboard/lecturer" className="text-gray-700 hover:text-primary-600">
//                     Dashboard
//                   </Link>
//                 )}
//                 {profile?.role === 'admin' && (
//                   <Link href="/dashboard/admin" className="text-gray-700 hover:text-primary-600">
//                     Dashboard
//                   </Link>
//                 )}
//                 <button
//                   onClick={signOut}
//                   className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
//                 >
//                   Sign Out
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   href="/auth/signin"
//                   className="text-white bg-blue-600 hover:text-primary-600 px-3 py-2 rounded-md"
//                 >
//                   Sign In
//                 </Link>
//                 <Link
//                   href="/auth/signup"
//                   className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }









'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react' // or use react-icons

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/programs', label: 'Programs' },
    { href: '/admissions', label: 'Admissions' },
    { href: '/certifications', label: 'Certifications' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="bg-[#C6A75E] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-heading font-bold text-secondary">
              Skill Leadership Factory
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-secondary transition ${
                  pathname === link.href ? 'text-secondary' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side - Auth / Dashboard */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm">
                  {user.email} ({profile?.role})
                </span>
                {profile?.role && (
                  <Link
                    href={`/dashboard/${profile.role}`}
                    className="bg-secondary text-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-opacity-90 transition"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={signOut}
                  className="bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-white hover:text-secondary transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-secondary text-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-opacity-90 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-secondary focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-primary border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium hover:text-secondary ${
                  pathname === link.href ? 'text-secondary' : 'text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <div className="px-3 py-2 text-white">Logged in as {user.email}</div>
                <Link
                  href={`/dashboard/${profile?.role}`}
                  className="block px-3 py-2 bg-secondary text-primary rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => { signOut(); setMobileMenuOpen(false); }}
                  className="block w-full text-left px-3 py-2 bg-red-600 text-white rounded-md text-base font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="block px-3 py-2 text-white hover:text-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="block px-3 py-2 bg-secondary text-primary rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}