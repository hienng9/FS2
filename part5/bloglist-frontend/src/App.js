import React, { useState, useEffect , useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogCreate from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


const App = () => {


  const blogFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect (() => {
    const existingUser = window.localStorage.getItem('loggedInUser')
    if (existingUser) {
      const parsedUser = JSON.parse(existingUser)
      blogService.setToken(parsedUser.token)
      setUser(parsedUser)
    }
  }, [])
  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
      setBlogs( sortedBlogs )
    })
  },[errorMessage, successMessage])

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const loginUser = await loginService.login({ username, password })
      blogService.setToken(loginUser.token)
      setUser(loginUser)
      window.localStorage.setItem('loggedInUser', JSON.stringify(loginUser))
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
        <button id="login-button" type="submit">login</button>
      </div>
    </form>
  )

  // const blogsShow = (blogs, handleLikesFunc) => (
  //       blogs.map(blog =>
  //       <Blog key={blog.id} blog={blog} handleLikes={handleLikesFunc} deleteFunc={deleteBlog}/>)
  // )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const handleCreateBlog = async (blogObject) => {
    // blogFormRef.current.toggleVisibility()
    try {
      await blogService.create(blogObject)
      // blogFormRef.current.toggleVisibility()
      setSuccessMessage( `a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    } catch (error){
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const handleLikes = async (newBlog) => {
    try {
      await blogService.updateLikes(newBlog)
      setSuccessMessage( `+1 like for ${newBlog.title} by ${newBlog.author}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error){
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }}

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm(`Are you sure you want to remove ${blog.tittle} by ${blog.author}?`)) {
        await blogService.deleteBlog(blog)
        setSuccessMessage( `${blog.title} by ${blog.author} deleted`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
    }catch (error){
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }}
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} nameClass='error'/>
      <Notification message={successMessage} nameClass='success'/>
      { (user === null)
        ? loginForm()
        : (<div>
          <div>
            Hello, {user.username}
            <button onClick={ handleLogout }>logout</button>
          </div>
          <h2>create new blog</h2>
          <div>
            <Togglable buttonLabel="create blog" ref={blogFormRef}>
              <BlogCreate
                handleCreateBlogF={ handleCreateBlog } />
            </Togglable>
          </div>
          <h2>existing blogs</h2>
          {
            blogs.map(blog =>
              <Blog key={blog.id} blog={blog} handleLikes={handleLikes} deleteFunc={deleteBlog} userID={user.id}/>)}
        </div>)

      }
    </div>
  )
}

export default App