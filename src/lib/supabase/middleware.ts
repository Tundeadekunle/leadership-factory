import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export const updateSession = async (request: NextRequest) => {
  let response = NextResponse.next({ request })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return response
  }

  // Fast path: If no Supabase auth cookies exist, skip remote network calls to Supabase
  const allCookies = request.cookies.getAll()
  const hasAuthCookie = allCookies.some(
    (cookie) =>
      cookie.name.startsWith('sb-') ||
      cookie.name.includes('supabase') ||
      cookie.name.includes('auth')
  )

  if (!hasAuthCookie) {
    return response
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    })

    // Race getUser with a 2-second timeout so Edge Middleware never times out on Vercel
    const getUserPromise = supabase.auth.getUser().catch((err) => {
      console.warn('Supabase auth.getUser error in middleware:', err)
      return null
    })

    const timeoutPromise = new Promise((resolve) =>
      setTimeout(() => resolve(null), 2000)
    )

    await Promise.race([getUserPromise, timeoutPromise])
  } catch (error) {
    console.error('Middleware updateSession error:', error)
  }

  return response
}