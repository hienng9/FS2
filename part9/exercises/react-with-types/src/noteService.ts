import { Note, NewNote } from "./types"
import axios from "axios"

const createNote = (newNote: NewNote) => {
  return axios
    .post<Note>("http://localhost:3001/notes", newNote)
    .then((response) => {
      return response.data
    })
}

const getNotes = () => {
  return axios
    .get<Note[]>("http://localhost:3001/notes")
    .then((response) => response.data)
}

export default { getNotes, createNote }
