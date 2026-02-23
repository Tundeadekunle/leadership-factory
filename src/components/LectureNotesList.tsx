interface Note {
  id: string
  title: string
  file_url: string
  uploaded_at: string
}

export default function LectureNotesList({ notes }: { notes: Note[] }) {
  if (notes.length === 0) return <p>No lecture notes available.</p>

return (
    <ul className="divide-y divide-gray-200">
      {notes.map((note) => (
        <li key={note.id} className="py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{note.title}</h3>
            <p className="text-sm text-gray-500">
              Uploaded: {new Date(note.uploaded_at).toLocaleString()}
            </p>
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
      ))}
    </ul>
  )
}




//   return (
//     <ul className="space-y-2">
//       {notes.map((note) => (
//         <li key={note.id} className="border p-4 rounded">
//           <h3 className="font-semibold">{note.title}</h3>
//           <a href={note.file_url} target="_blank" rel="noopener" className="text-blue-600">
//             View
//           </a>
//           <p className="text-sm text-gray-500">
//             Uploaded: {new Date(note.uploaded_at).toLocaleString()}
//           </p>
//         </li>
//       ))}
//     </ul>
//   )
// }