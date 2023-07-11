import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    toggleImportance(state, action) {
      const id = action.payload
      const noteToChange= state.find(n => n.id === id)
      const changedNote = {...noteToChange, important: !noteToChange.important}
      console.log(JSON.parse(JSON.stringify(state)))
      return state.map(note => note.id !== id ? note : changedNote)
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
  },
})


export const { toggleImportance, appendNote, setNotes } = noteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const createNew = (content) => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    console.log('note', newNote)
    dispatch(appendNote(newNote))
  }
}
export default noteSlice.reducer

