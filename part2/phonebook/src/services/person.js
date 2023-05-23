import axios from 'axios';
const baseUrl = "/api/persons"

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data
    })
}

const create = async newObject => {
    const config = {
        headers: {Authorization: token}
    }
    const response = axios.post(baseUrl, newObject, config)
    return response.then(response => { return response.data})
}

const update = ({id, changedPerson}) => {
    const request = axios.put(`${baseUrl}/${id}`, changedPerson)
    return request.then(response => response.data)
}
const deleteID = (id) =>{
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(reponse => reponse.data)
    
            // return response.data
        
} 
export default {getAll, create, deleteID, update, setToken};