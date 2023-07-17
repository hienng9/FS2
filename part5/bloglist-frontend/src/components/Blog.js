import React from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  createAndRemoveError,
  createAndRemoveSuccess,
} from "../reducers/notificationReducer"
import { addLikes, deleteBlogs } from "../reducers/blogsReducer"
import { Link, useParams } from "react-router-dom"

const Blog = ({ blogs }) => {
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLikes = async (blog) => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    try {
      dispatch(addLikes(newBlog))
      dispatch(
        createAndRemoveSuccess(
          `+1 like for ${newBlog.title} by ${newBlog.author}`
        )
      )
    } catch (error) {
      dispatch(createAndRemoveError(error.response.data.error))
    }
  }

  const deleteBlog = async (blog) => {
    try {
      if (
        window.confirm(
          `Are you sure you want to remove ${blog.tittle} by ${blog.author}?`
        )
      ) {
        dispatch(deleteBlogs(blog))
        dispatch(
          createAndRemoveSuccess(`${blog.title} by ${blog.author} deleted`)
        )
      }
    } catch (error) {
      dispatch(createAndRemoveError(error.response.data.error))
    }
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="details">
      <h2>{blog.title}</h2>
      <div className="blogUrl">
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button className="like" onClick={() => handleLikes(blog)}>
          like
        </button>
      </div>
      <div>added by {blog.author}</div>
      <button
        style={{
          display:
            user.id.toString() === blog.creator.toString() ? "block" : "none",
        }}
        onClick={() => deleteBlog(blog)}
      >
        remove
      </button>
    </div>
  )
}

export default Blog
