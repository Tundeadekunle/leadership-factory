interface Note {
  id: string
  title: string
  file_url: string
  uploaded_at: string
  expires_at?: string  // only present when showExpiry is true
}

interface NotesListProps {
  notes: Note[]
  showExpiry?: boolean
}

export default function NotesList({ notes, showExpiry = false }: NotesListProps) {
  if (notes.length === 0) {
    return <p className="text-gray-500">No notes available.</p>
  }

return (
    <ul className="divide-y divide-gray-200">
      {notes.map((note) => {
        const expiresAt = note.expires_at ? new Date(note.expires_at) : null
        const expiresIn = expiresAt ? expiresAt.getTime() - Date.now() : null
        const hoursLeft =
          expiresIn === null ? null : Math.max(0, Math.floor(expiresIn / (1000 * 60 * 60)))
        return (
          <li key={note.id} className="py-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{note.title}</h3>
              <p className="text-sm text-gray-500">
                Uploaded: {new Date(note.uploaded_at).toLocaleString()}
              </p>
              {showExpiry && note.expires_at && hoursLeft !== null && (
                <p className="text-sm text-gray-500">
                  Expires in: {hoursLeft} hour{hoursLeft !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            <a
              href={note.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              View
            </a>
          </li>
        )
      })}
    </ul>
  )
}



//   return (
//     <ul className="space-y-4">
//       {notes.map((note) => (
//         <li key={note.id} className="border rounded-lg p-4 shadow-sm">
//           <h3 className="text-lg font-semibold">{note.title}</h3>
//           <div className="mt-2 space-y-1 text-sm text-gray-600">
//             <p>
//               <a
//                 href={note.file_url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 hover:underline"
//               >
//                 View / Download
//               </a>
//             </p>
//             <p>Uploaded: {new Date(note.uploaded_at).toLocaleString()}</p>
//             {showExpiry && note.expires_at && (
//               <p className="text-orange-600">
//                 Expires: {new Date(note.expires_at).toLocaleString()}
//               </p>
//             )}
//           </div>
//         </li>
//       ))}
//     </ul>
//   )
// }
