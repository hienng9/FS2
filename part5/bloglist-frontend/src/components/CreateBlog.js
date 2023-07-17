import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createNewBlogs } from "../reducers/blogsReducer"
import {
  createAndRemoveSuccess,
  createAndRemoveError,
} from "../reducers/notificationReducer"

const useField = (type) => {
  const [value, setValue] = useState("")
  const onChange = (event) => setValue(event.target.value)
  const reset = () => setValue("")
  return [reset, { type, value, onChange }]
}

const BlogCreate = () => {
  const dispatch = useDispatch()
  const handleCreateBlog = async (blogObject) => {
    try {
      dispatch(createNewBlogs(blogObject))
      dispatch(
        createAndRemoveSuccess(
          `a new blog ${blogObject.title} by ${blogObject.author} added`
        )
      )
    } catch (error) {
      dispatch(createAndRemoveError(error.response.data.error))
    }
  }
  const [titleReset, title] = useField("text")
  const [authorReset, author] = useField("text")
  const [urlReset, url] = useField("text")

  const createBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    handleCreateBlog(blog)
    titleReset()
    authorReset()
    urlReset()
  }
  return (
    <form onSubmit={createBlog}>
      <div>
        title:
        <input id="title" {...title} placeholder="write blog title here" />
      </div>

      <div>
        author:
        <input id="author" {...author} placeholder="write blog author here" />
      </div>

      <div>
        url:
        <input id="url" {...url} placeholder="write url here" />
      </div>

      <button id="create-button" type="submit">
        create
      </button>
    </form>
  )
}

export default BlogCreate
