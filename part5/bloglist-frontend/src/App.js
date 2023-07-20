import React, { useEffect, useRef } from "react"
import { Routes, Route, Link } from "react-router-dom"

import Notification from "./components/Notification"
import Blogs from "./components/Blogs"
import LoginForm from "./components/LoginForm"
import UsernameAppearance from "./components/UsernameApearance"
import Users from "./components/Users"
import User from "./components/User"
import Blog from "./components/Blog"

import { useDispatch, useSelector } from "react-redux"
import { intializeBlogs } from "./reducers/blogsReducer"
import { initialUsers } from "./reducers/usersReducer"
import { AppBar, Container, Box, Toolbar, MenuItem } from "@mui/material"
const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)
  useEffect(() => {
    dispatch(intializeBlogs())
    dispatch(initialUsers())
  }, [dispatch])

  const padding = { padding: 5 }

  return (
    <Container>
      <h2>blogs</h2>
      <Notification />

      {user === null ? (
        <LoginForm />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Container>
              <Toolbar>
                <Link style={{ textDecoration: "none" }} to="/">
                  <MenuItem>BLOGS</MenuItem>
                </Link>
                <Link style={{ textDecoration: "none" }} to="users">
                  <MenuItem>USERS</MenuItem>
                </Link>
                <UsernameAppearance />
              </Toolbar>
            </Container>
          </AppBar>
          <Routes>
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users/:id" element={<User users={users} />} />
            <Route path="/" element={<Blogs blogs={blogs} />} />
            <Route path="/users" element={<Users users={users} />} />
          </Routes>
        </Box>
      )}
    </Container>
  )
}

export default App
