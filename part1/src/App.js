import React from 'react';
import { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/note';

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
 }
 return (
  <div style={footerStyle}>
    <br />
    <em>Note app 2023</em>
  </div>
 )
}
const App = () => {
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    noteService
      .getAll()
      .then(initalNotes => {
        setNotes(initalNotes)
      })
  }
  useEffect(hook, []) // the second parameter is used to specify how often the effect is run.
  // [] means only run along with the first render of the component.
  if (!notes) {
    return null
  }
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const toggleImportanceOf = (id) => {
    console.log("id", id)
    const note = notes.find(n => n.id === id)
    console.log("find, note", note)
    const changedNote = {...note, important: !note.important}
    console.log('changedNoe', changedNote)

    noteService
      .update({id, changedNote})
      .then(returnedNote => {
        console.log(returnedNote)
      setNotes(notes.map(n=> n.id !== id ? n : returnedNote))})
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was deleted from server`
          )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      }) 
  }

  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important)

  return (
    <React.Fragment> 
      <div>
        <h1>Notes</h1>
        <Notification message={errorMessage} />
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all'}
          </button>
        </div>
        <ul>
          {notesToShow.map(note => 
            <Note 
              key={note.id} 
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)} />)}
        </ul>
        <form onSubmit={addNote}>
          <input 
            value={newNote}
            onChange={handleNoteChange}
          />
          <button type="submit">save</button>
        </form>
        <Footer />
      </div>
    </React.Fragment>
  )
} 

export default App
