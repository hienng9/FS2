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
  const style = {
    backgroundColor: "grey",
    borderStyle: "hidden",
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <div className="container" style={style}>
            <Link style={padding} to="/">
              blogs
            </Link>
            <Link style={padding} to="users">
              users
            </Link>
            <UsernameAppearance />
          </div>
          <Routes>
            <Route path="/users/:id" element={<User users={users} />} />
            <Route path="/blogs/:id" element={<Blog blogs={blogs} />} />
            <Route path="/" element={<Blogs blogs={blogs} />} />
            <Route path="/users" element={<Users users={users} />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
