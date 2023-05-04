import axios from 'axios';



const baseURL = "https://restcountries.com/v3.1/all"
const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const getWeather = ({city}) => {
    const APIKEY = process.env.REACT_APP_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`
    
    const request = axios.get(url)
    return request.then(response => {
        return response.data
    })
}

export default {getAll, getWeather};