import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogCreate from './components/CreateBlog'
import Notification from './components/Notification'





const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect (() => {
    const existingUser = window.localStorage.getItem('loggedInUser')
    if (existingUser) {
      setUser(JSON.parse(existingUser))
    }
  }, [])
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const loginUser = await loginService.login({username, password})
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
          type="text"
          value={username}
          name="Username"
          onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="text"
          value={password}
          name="Password"
          onChange={({target}) => {
            setPassword(target.value)
          }}
        />
      </div>
      <div>
        <button>login</button>
      </div>
    </form>
  )

  const blogsShow = (blogs) => (
        blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />)
  )
  
  const handleLogout = () =>{
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    try {
      const createdBlog = await blogService.create(newBlog)
      console.log("created blog", createdBlog)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setSuccessMessage( `a new blog ${newTitle} by ${newAuthor} added`)
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
  
  const handleChangeTitle = (event) => {
    setNewTitle(event.target.value)
  }
  
  const handleChangeAuthor = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleChangeURL = (event) => {
    setNewUrl(event.target.value)
  }


  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} nameClass='error'/>
      <Notification message={successMessage} nameClass='success'/>
      { (user == null)
        ? loginForm() 
        : (<div>
          <div>
            Hello, {user.username} 
            <button onClick={ handleLogout }>logout</button> 
          </div>
          <h2>create new blog</h2>
          <div>
          <BlogCreate 
            newTitle={newTitle} 
            newAuthor={newAuthor} 
            newUrl={newUrl} 
            handleChangeTitleF={handleChangeTitle}
            handleChangeAuthorF={handleChangeAuthor}
            handleChangeUrlF={handleChangeURL}
            handleCreateBlogF={handleCreateBlog} />
          </div>
          <h2>existing blogs</h2>
          {blogsShow(blogs)}
          </div>)
          
        }
    </div>
  )
}

export default App