// interface Note {
//   id: string
//   title: string
//   file_url: string
//   uploaded_at: string
// }

// export default function AssessmentsList({ notes }: { notes: Note[] }) {
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













interface Assessment {
  id: string
  title: string
  description?: string
  file_url?: string
  created_at: string
}

interface AssessmentsListProps {
  assessments: Assessment[]
}

export default function AssessmentsList({ assessments }: AssessmentsListProps) {
  if (assessments.length === 0) {
    return <p className="text-gray-500">No assessments available.</p>
  }

return (
    <ul className="space-y-4">
      {assessments.map((a) => (
        <li key={a.id} className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800">{a.title}</h3>
          {a.description && (
            <p className="text-gray-600 mt-1">{a.description}</p>
          )}
          {a.file_url && (
            <a
              href={a.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline block mt-2"
            >
              Download Assessment
            </a>
          )}
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
//       {assessments.map((assessment) => (
//         <li key={assessment.id} className="border rounded-lg p-4 shadow-sm">
//           <h3 className="text-lg font-semibold">{assessment.title}</h3>
//           {assessment.description && (
//             <p className="text-gray-600 mt-1">{assessment.description}</p>
//           )}
//           {assessment.file_url && (
//             <a
//               href={assessment.file_url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 hover:underline block mt-2"
//             >
//               Download Assessment
//             </a>
//           )}
//           <p className="text-sm text-gray-500 mt-2">
//             Posted: {new Date(assessment.created_at).toLocaleString()}
//           </p>
//         </li>
//       ))}
//     </ul>
//   )
// }