// import { createServerClient, type CookieOptions } from '@supabase/ssr'
// import { cookies } from 'next/headers'

// export const createClient = () => {
//   const cookieStore = cookies()
//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return cookieStore.get(name)?.value
//         },
//         set(name: string, value: string, options: CookieOptions) {
//           cookieStore.set({ name, value, ...options })
//         },
//         remove(name: string, options: CookieOptions) {
//           cookieStore.set({ name, value: '', ...options })
//         },
//       },
//     }
//   )
// }











// import { createServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'

// export const createClient = async () => {
//   const cookieStore = await cookies()

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return cookieStore.get(name)?.value
//         },
//         set(name: string, value: string, options: any) {
//           try {
//             cookieStore.set(name, value, options)
//           } catch (error) {
//             // The `set` method was called from a Server Component.
//             // This can be ignored if you have middleware refreshing user sessions.
//           }
//         },
//         remove(name: string, options: any) {
//           try {
//             cookieStore.set(name, '', { ...options, maxAge: 0 })
//           } catch (error) {
//             // Ignore if called from Server Component
//           }
//         },
//       },
//     }
//   )
// }











// import { createServerClient, type CookieOptions } from '@supabase/ssr'
// import { cookies } from 'next/headers'

// export const createClient = () => {
//   const cookieStore = cookies()
//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return cookieStore.get(name)?.value
//         },
//         set(name: string, value: string, options: CookieOptions) {
//           try {
//             cookieStore.set({ name, value, ...options })
//           } catch (error) {
//             // ignore
//           }
//         },
//         remove(name: string, options: CookieOptions) {
//           try {
//             cookieStore.set({ name, value: '', ...options })
//           } catch (error) {
//             // ignore
//           }
//         },
//       },
//     }
//   )
// }















import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = async () => {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // ignore
          }
        },
      },
    }
  )
}