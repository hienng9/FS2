import React, { useState } from "react"
import { useSelector } from "react-redux"

const Blog = ({ blog, handleLikes, deleteFunc }) => {
  const user = useSelector((state) => state.user)
  console.log("user Blog", user)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? "" : "none" }

  const sendLikes = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    handleLikes(newBlog)
  }

  const deleteBlog = () => {
    deleteFunc(blog)
  }

  return (
    <div style={blogStyle} className="details">
      {blog.title} by {blog.author}
      <button className="button" onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "show"}
      </button>
      <div style={showWhenVisible} className="info">
        <div className="blogUrl">{blog.url}</div>
        <div>
          likes {blog.likes}
          <button className="like" onClick={sendLikes}>
            like
          </button>
        </div>
        <div>{blog.author}</div>
        <button
          style={{
            display:
              user.id.toString() === blog.creator.toString() ? "block" : "none",
          }}
          onClick={deleteBlog}
        >
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
