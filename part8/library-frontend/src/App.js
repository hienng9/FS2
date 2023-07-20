import { useQuery, useApolloClient } from "@apollo/client"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import { Link, Routes, Route } from "react-router-dom"
import { ALL_AUTHORS, ALL_BOOKS, ME } from "./queries"
import React, { useState } from "react"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
import Notification from "./components/Notification"
import Recommendations from "./components/Recommendations"
const App = () => {
  const client = useApolloClient()
  const existingToken = window.localStorage.getItem("library-user-token")
  const [token, setToken] = useState(existingToken)
  const [errorMessage, setErrorMessage] = useState(null)

  const result = useQuery(ALL_AUTHORS)
  const bookResult = useQuery(ALL_BOOKS)
  const userResult = useQuery(ME, {
    skip: !token,
  })

  const notifyError = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 10000)
  }

  if (result.loading || bookResult.loading || userResult.loading) {
    return <div>loading...</div>
  }

  const handleLogout = () => {
    setToken(null)
    window.localStorage.clear()
    client.clearStore()
  }
  const padding = { padding: 10 }
  const books = bookResult.data.allBooks
  const user = userResult.data.me

  return (
    <div>
      <Notification error={errorMessage} />
      <div>
        <Link style={padding} to="/authors">
          authors
        </Link>
        <Link style={padding} to="/">
          books
        </Link>
        {token ? (
          <React.Fragment>
            <Link style={padding} to="/add-book">
              add book
            </Link>
            <Link style={padding} to="/recommend">
              recommend
            </Link>
            Hello, {user.username}
            <button onClick={handleLogout}>logout</button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Togglable buttonLabel="login">
              <LoginForm setToken={setToken} setError={notifyError} />
            </Togglable>
          </React.Fragment>
        )}
        <Routes>
          <Route
            path="/recommend"
            element={<Recommendations genre={user.favoriteGenre} />}
          />
          <Route
            path="/authors"
            element={
              <Authors
                authors={result.data.allAuthors}
                setError={notifyError}
              />
            }
          />
          <Route path="/" element={<Books books={books} />} />
          <Route
            path="/add-book"
            element={<NewBook setError={setErrorMessage} />}
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
