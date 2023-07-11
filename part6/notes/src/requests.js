import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

export const getNotes = () => 
    axios.get(baseUrl).then(response => response.data)

export const createNew = async (newNote) =>  {
    const response = await axios.post(baseUrl, newNote)
    console.log('reponse data', response.data)
    return response.data

}
    
export const updateNote = async (updatedNote) => {
    const response = await axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote)
    return response.data
    }