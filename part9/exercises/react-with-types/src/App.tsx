import { useEffect, useState } from "react"
import noteService from "./noteService"
import { Note } from "./types"

const App = () => {
  const [newNote, setNewNote] = useState("")
  const [notes, setNotes] = useState<Note[]>([])

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    noteService
      .createNote({ content: newNote })
      .then((note) => setNotes(notes.concat(note)))
    setNewNote("")
  }

  useEffect(() => {
    noteService.getNotes().then((notes) => setNotes(notes))
  }, [])
  return (
    <div>
      <h3>Create New Notes</h3>
      <form onSubmit={noteCreation}>
        Content:{" "}
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type="submit">create</button>
      </form>
      <h3>Existing notes</h3>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
