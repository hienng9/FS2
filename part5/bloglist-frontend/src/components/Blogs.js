import { useRef } from "react"
import { useSelector } from "react-redux"

import BlogCreate from "./CreateBlog"
import Togglable from "./Togglable"
import { Link } from "react-router-dom"
const Blogs = ({ blogs }) => {
  const blogFormRef = useRef()
  console.log("blogs", blogs)
  const style = {
    borderStyle: "solid",
  }
  return (
    <div>
      <h2>existing blogs</h2>
      {blogs.map((blog) => (
        <div key={blog.id} style={style}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
      <h2>create new blog</h2>
      <div>
        <Togglable buttonLabel="create blog" ref={blogFormRef}>
          <BlogCreate />
        </Togglable>
      </div>
    </div>
  )
}

export default Blogs
