import React, { useState, useEffect, useRef } from "react"

import BlogCreate from "./components/CreateBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import Blogs from "./components/Blogs"
import { useDispatch, useSelector } from "react-redux"
import {
  createSuccessNotification,
  createErrorNotification,
} from "./reducers/notificationReducer"
import { intializeBlogs, createNewBlogs } from "./reducers/blogsReducer"

import { loginUser, logout } from "./reducers/userReducer"
const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(intializeBlogs())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser({ username, password }))
      setTimeout(() => {
        console.log("user time out", user)
        dispatch(logout())
      }, 3600000)
      setUsername("")
      setPassword("")
    } catch (error) {
      dispatch(createErrorNotification("Wrong username or password"))
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => {
            setPassword(target.value)
          }}
        />
      </div>
      <div>
        <button id="login-button" type="submit">
          login
        </button>
      </div>
    </form>
  )

  const handleLogout = () => {
    dispatch(logout())
    window.localStorage.removeItem("loggedInUser")
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      dispatch(createNewBlogs(blogObject))
      dispatch(
        createSuccessNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`
        )
      )
    } catch (error) {
      dispatch(createErrorNotification(error.response.data.error))
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div>
            Hello, {user.username}
            <button onClick={handleLogout}>logout</button>
          </div>
          <h2>create new blog</h2>
          <div>
            <Togglable buttonLabel="create blog" ref={blogFormRef}>
              <BlogCreate handleCreateBlogF={handleCreateBlog} />
            </Togglable>
          </div>
          <h2>existing blogs</h2>
          <Blogs />
        </div>
      )}
    </div>
  )
}

export default App
