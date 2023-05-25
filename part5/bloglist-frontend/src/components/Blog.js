import React, { useState } from 'react'

const Blog = ({ blog, handleLikes, deleteFunc, userID }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const sendLikes = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    handleLikes(newBlog)
  }

  const deleteBlog = () => {
    deleteFunc(blog)
  }

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'show'}</button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
        likes {blog.likes}
          <button onClick={sendLikes}>likes</button>
        </div>
        <div>
          {blog.author}
        </div>
        <button style={{ display: (userID.toString() === blog.creator.toString()) ? 'blog' : 'none' }}  onClick={deleteBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog