import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}
const updateLikes = async (newBlog) => {
  // const config = {
  //   headers: {Authorization: token}
  // }
  const response = axios.put(`${baseUrl}/${newBlog.id}`, newBlog)
  return response.then((res) => {
    return res.data
  })
}

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

// eslint-disable-next-line
export default { getAll, create, setToken, updateLikes, deleteBlog }
