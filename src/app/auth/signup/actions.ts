'use server'

import { createClient } from '@supabase/supabase-js'

export async function createProfile(data: {
  id: string
  email: string
  full_name: string
  gender: string
  whatsapp_number: string
  address: string
  course: string
}) {
  // We use the Service Role Key to bypass Row Level Security.
  // This is necessary because when email confirmations are enabled, 
  // the user is not signed in immediately after signing up, 
  // so a client-side insert into the profiles table would be anonymous and blocked by RLS.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: data.id,
      email: data.email,
      role: 'student',
      full_name: data.full_name,
      gender: data.gender,
      whatsapp_number: data.whatsapp_number,
      address: data.address,
      course: data.course,
    })

  if (error) {
    console.error('Server action profile create error:', error)
    return { error: error.message }
  }

  return { success: true }
}
