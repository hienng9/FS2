import axios from "axios"

const baseUrl = "api/login"

const login = async (credentials) => {
  try {
    return await axios.post(baseUrl, credentials)
  } catch (error) {
    return error
  }
  // console.log("loging response", response.data)
  // return response.data
}

export default { login }
