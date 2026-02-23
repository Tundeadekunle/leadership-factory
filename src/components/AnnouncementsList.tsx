// interface Note {
//   id: string
//   title: string
//   file_url: string
//   uploaded_at: string
// }

// export default function AnnouncementsList({ notes }: { notes: Note[] }) {
//   if (notes.length === 0) return <p>No lecture notes available.</p>
//   return (
//     <ul className="space-y-2">
//       {notes.map((note) => (
//         <li key={note.id} className="border p-4 rounded">
//           <h3 className="font-semibold">{note.title}</h3>
//           <a href={note.file_url} target="_blank" rel="noopener" className="text-blue-600">
//             Download / View
//           </a>
//           <p className="text-sm text-gray-500">
//             Uploaded: {new Date(note.uploaded_at).toLocaleString()}
//           </p>
//         </li>
//       ))}
//     </ul>
//   )
// }















interface Announcement {
  id: string
  content: string
  created_at: string
}

interface AnnouncementsListProps {
  announcements: Announcement[]
}

export default function AnnouncementsList({ announcements }: AnnouncementsListProps) {
  if (announcements.length === 0) {
    return <p className="text-gray-500">No announcements.</p>
  }

return (
    <ul className="space-y-4">
      {announcements.map((a) => (
        <li key={a.id} className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-800">{a.content}</p>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(a.created_at).toLocaleString()}
          </p>
        </li>
      ))}
    </ul>
  )
}


//   return (
//     <ul className="space-y-4">
//       {announcements.map((announcement) => (
//         <li key={announcement.id} className="border rounded-lg p-4 shadow-sm">
//           <p className="text-gray-800">{announcement.content}</p>
//           <p className="text-sm text-gray-500 mt-2">
//             Posted: {new Date(announcement.created_at).toLocaleString()}
//           </p>
//         </li>
//       ))}
//     </ul>
//   )
// }