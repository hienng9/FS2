import { useQuery } from "@apollo/client"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import { Link, Routes, Route } from "react-router-dom"
import { ALL_AUTHORS } from "./queries"

const App = () => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const padding = { padding: 10 }
  return (
    <div>
      <div>
        <Link style={padding} to="/">
          authors
        </Link>
        <Link style={padding} to="/books">
          books
        </Link>
        <Link style={padding} to="/add-book">
          add book
        </Link>
      </div>
      <Routes>
        <Route
          path="/"
          element={<Authors authors={result.data.allAuthors} />}
        />
        <Route path="/books" element={<Books />} />
        <Route path="/add-book" element={<NewBook />} />
      </Routes>
    </div>
  )
}

export default App
