import { useState } from "react"
import { ADD_BOOK, ALL_BOOKS, FILTER_BOOKS } from "../queries"
import { useMutation } from "@apollo/client"
const NewBook = ({ setError }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [published, setPublished] = useState("")
  const [genre, setGenre] = useState("")
  const [genres, setGenres] = useState([])

  const [createNewBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: FILTER_BOOKS }],
    onError: (error) => {
      console.log("error", error)
      const message = error.graphQLErrors[0].message
      setError(message)
    },

    update: (cache, response) => {
      console.log("cache", cache)
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        console.log("allBooks", allBooks)
        return {
          allBooks: allBooks.concat(response.data.addBook),
          // filteredBooks: filteredBooks.concat(response.data.addBook),
        }
      })
    },
  })
  const submit = async (event) => {
    event.preventDefault()

    console.log("add book...")
    createNewBook({
      variables: { title, author, published: Number(published), genres },
    })
    setTitle("")
    setPublished("")
    setAuthor("")
    setGenres([])
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre("")
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
