import React from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  createAndRemoveError,
  createAndRemoveSuccess,
} from "../reducers/notificationReducer"
import { addLikes, deleteBlogs } from "../reducers/blogsReducer"
import { addComment } from "../reducers/blogsReducer"
import { Link, useParams } from "react-router-dom"
import useField from "../custom-hooks/useField"

import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  Paper,
  TableHead,
  Button,
  TextField,
  Box,
  Container,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material"

const Blog = () => {
  const id = useParams().id

  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((blog) => blog.id === id)
  console.log("blog", blog)

  if (!blog) {
    return null
  }
  const [contentReset, content] = useField("text")
  console.log("content", content)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLikes = (blog) => {
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

  const deleteBlog = (blog) => {
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

  const handleCreateComment = (event) => {
    event.preventDefault()

    console.log("id", blog.id)
    dispatch(addComment({ blogId: blog.id, content: content.value }))
    contentReset()
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <Container>
      <Box xs={{ bgcolor: "#cfe8fc", height: "100vh" }} />
      <CardContent>
        <Typography variant="h6" xs={{ fontSize: 14 }} gutterBottom>
          {blog.title}
        </Typography>
        <Typography component="div">
          <Link to={blog.url}>{blog.url}</Link>
        </Typography>
        <Typography variant="body2">
          <strong>{blog.likes}</strong> likes
        </Typography>
        <Typography variant="body2">
          added by <strong>{blog.creator.name}</strong>
        </Typography>
      </CardContent>
      <Button
        variant="contained"
        className="like"
        onClick={() => handleLikes(blog)}
      >
        like
      </Button>
      <Button
        variant="contained"
        style={{
          display:
            user.id.toString() === blog.creator.toString() ? "block" : "none",
        }}
        onClick={() => deleteBlog(blog)}
      >
        remove
      </Button>
      <br />
      <Box>
        <h3>Comments</h3>
        <form onSubmit={handleCreateComment}>
          <TextField {...content} placeholder="write a comment ..." />
          <Button variant="contained" type="submit">
            create
          </Button>
        </form>
        <List>
          {blog.comments.map((comment) => (
            <ListItem key={comment.id}>
              <ListItemText>{comment.content}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
    // <TableContainer style={blogStyle} className="details" component={Paper}>
    //   <Table className="blogUrl">
    //     <TableHead>
    //       <TableRow>{blog.title}</TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {/* <TableRow> */}
    //       <TableRow>
    //         <Link to={blog.url}>{blog.url}</Link>
    //       </TableRow>
    //       <TableRow>{blog.likes} likes</TableRow>
    //       <TableRow>added by {blog.creator.name}</TableRow>
    //       {/* </TableRow> */}
    //     </TableBody>
    //   </Table>

    // </TableContainer>
  )
}

export default Blog
