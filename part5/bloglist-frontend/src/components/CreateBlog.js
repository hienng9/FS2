import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createNewBlogs } from "../reducers/blogsReducer"
import {
  createAndRemoveSuccess,
  createAndRemoveError,
} from "../reducers/notificationReducer"
import useField from "../custom-hooks/useField"
import { TextField, Button } from "@mui/material"

const BlogCreate = () => {
  const dispatch = useDispatch()
  const [titleReset, title] = useField("text")
  const [authorReset, author] = useField("text")
  const [urlReset, url] = useField("text")

  const createBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
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
    titleReset()
    authorReset()
    urlReset()
  }
  return (
    <form onSubmit={createBlog}>
      Filling the form to create new blog
      <div>
        <TextField
          required
          id="title"
          label="Blog Title"
          variant="standard"
          {...title}
        />
      </div>
      <div>
        <TextField id="author" label="Author" variant="standard" {...author} />
      </div>
      <div>
        <TextField required id="url" label="URL" variant="standard" {...url} />
      </div>
      <Button variant="contained" color="primary" type="submit">
        <strong>create</strong>
      </Button>
    </form>
  )
}

export default BlogCreate
