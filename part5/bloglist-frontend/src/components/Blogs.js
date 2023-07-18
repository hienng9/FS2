import { useRef } from "react"
import { useSelector } from "react-redux"

import BlogCreate from "./CreateBlog"
import Togglable from "./Togglable"
import { Link } from "react-router-dom"

import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material"

const Blogs = ({ blogs }) => {
  const blogFormRef = useRef()

  return (
    <div>
      <h2>Existing Blogs</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
