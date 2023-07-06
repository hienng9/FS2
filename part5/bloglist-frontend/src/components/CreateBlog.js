import React, { useState } from 'react'

const BlogCreate = ({ handleCreateBlogF }) => {
  const [ newTitle, setNewTittle ] = useState('')
  const [ newAuthor, setNewAuthor ] = useState('')
  const [ newUrl, setNewUrl ] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    handleCreateBlogF(blog)
    setNewTittle('')
    setNewAuthor('')
    setNewUrl('')
  }
  return (
    <form onSubmit={createBlog}>
      <div>
          title: <input
          id='title'
          type="text"
          value={newTitle}
          onChange={({ target }) => setNewTittle(target.value)}
          placeholder='write blog title here'/>
      </div>

      <div>
          author: <input
          id='author'
          type="text"
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
          placeholder='write blog author here'/>
      </div>

      <div>
          url: <input
          id='url'
          type="text"
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
          placeholder='write url here'/>
      </div>

      <button id='create-button' type="submit">create</button>
    </form>
  )}

export default BlogCreate