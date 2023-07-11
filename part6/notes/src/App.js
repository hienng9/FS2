//react query version

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotes, createNew, updateNote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const newNoteMutation = useMutation(createNew, {
    onSuccess: (response) => {
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.concat(response))
    }}
  )

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({content, important: true})
  }

  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: async (newNote) => {
      console.log('updated Note', newNote)
      const notes = queryClient.getQueryData(['notes'])
      console.log('get notes', notes)
      queryClient.setQueryData(['notes'], notes.map(note => note.id !== newNote.id ? note : newNote))
    }
  })
  const toggleImportance = (note) => {
    updateNoteMutation.mutate({...note, important: !note.important})
  }

  const result = useQuery(
    ['notes'],
    getNotes, {
      refetchOnWindowFocus: false
    }
  )

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  const notes = result.data
  console.log('final notes', notes)
  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id}>
          {note.content} 
          <button onClick={() => toggleImportance(note)}>
            <strong> {note.important ? 'make not important' : 'make important'}</strong>
            </button>
        </li>
      )}
    </div>
  )
}

export default App
