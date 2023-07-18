import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlogs(state, action) {
      return state.concat(action.payload)
    },

    removeBlogs(state, action) {
      const id = action.payload.id
      return state.filter((blog) => {
        return blog.id !== id
      })
    },
    changeContent(state, action) {
      const id = action.payload.id
      return state.map((blog) => (blog.id !== id ? blog : action.payload))
    },
  },
})

export const { setBlogs, appendBlogs, removeBlogs, changeContent } =
  blogSlice.actions

export const intializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)))
  }
}

export const createNewBlogs = (newBlog) => {
  return async (dispatch) => {
    const response = await blogService.create(newBlog)
    dispatch(appendBlogs(response))
  }
}

export const deleteBlogs = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog)
    dispatch(removeBlogs(blog))
  }
}

export const addLikes = (newBlog) => {
  return async (dispatch) => {
    await blogService.updateLikes(newBlog)
    dispatch(changeContent(newBlog))
  }
}

export const addComment = ({ blogId, content }) => {
  console.log("id reducer", blogId, content)
  return async (dispatch) => {
    await blogService.createComment({ blogId, content })
    const updatedBlogs = await blogService.getAll()
    dispatch(setBlogs(updatedBlogs))
  }
}
export default blogSlice.reducer
