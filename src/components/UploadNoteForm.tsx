'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function UploadNoteForm() {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !title) return

    setUploading(true)
    const user = (await supabase.auth.getUser()).data.user
    if (!user) return

    // Upload file to Storage
    const fileName = `${user.id}/${Date.now()}-${file.name}`
    const { error: uploadError, data } = await supabase.storage
      .from('lecture-notes')
      .upload(fileName, file)

    if (uploadError) {
      alert('Upload failed: ' + uploadError.message)
      setUploading(false)
      return
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('lecture-notes')
      .getPublicUrl(fileName)

    // Insert record with expires_at = now + 24h
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24)

    const { error: dbError } = await supabase.from('lecture_notes').insert({
      title,
      file_url: publicUrl,
      uploaded_by: user.id,
      expires_at: expiresAt.toISOString(),
    })

    // if (dbError) {
    //   alert('Database error: ' + dbError.message)
    // } else {
    //   setTitle('')
    //   setFile(null)
    //   router.refresh()
    // }
    // setUploading(false)


    if (dbError) {
  console.error('Full insert error:', dbError)
  alert('Upload failed: ' + dbError.message + (dbError.details ? ` (${dbError.details})` : ''))
} else {
  // success
}
  }

return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
          PDF File
        </label>
        <input
          type="file"
          id="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
          required
        />
      </div>
      <button
        type="submit"
        disabled={uploading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-950 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {uploading ? 'Uploading...' : 'Upload Note'}
      </button>
    </form>
  )
}



//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">
//       <div>
//         <label className="block mb-1">Title</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </div>
//       <div>
//         <label className="block mb-1">PDF File</label>
//         <input
//           type="file"
//           accept=".pdf"
//           onChange={(e) => setFile(e.target.files?.[0] || null)}
//           className="w-full"
//           required
//         />
//       </div>
//       <button
//         type="submit"
//         disabled={uploading}
//         className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
//       >
//         {uploading ? 'Uploading...' : 'Upload Note'}
//       </button>
//     </form>
//   )
// }