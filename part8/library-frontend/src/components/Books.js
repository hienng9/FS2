import { useState } from "react"
import BookFilter from "./BookFilter"
import { useQuery } from "@apollo/client"
import { FILTER_BOOKS } from "../queries"

const FilteredBook = ({ filteredBooks, chosenGenre }) => {
  return (
    <div>
      <h2>BOOKS</h2>
      In Genre <strong>{chosenGenre}</strong>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
    </div>
  )
}

const Books = ({ books }) => {
  const [chosenGenre, setChosenGenre] = useState(null)

  const result = useQuery(FILTER_BOOKS, {
    variables: { genre: chosenGenre },
    skip: !chosenGenre,
    update: (cache, response) => {
      cache.updateQuery({ query: FILTER_BOOKS }, ({ allBooks }) => {
        console.log("allBooks", allBooks)
        return {
          allBooks: response.data.allBooks,
        }
      })
    },
  })
  if (result.loading) {
    return <div>loading...</div>
  }

  if (chosenGenre && result.data) {
    return (
      <div>
        <FilteredBook
          filteredBooks={result.data.allBooks}
          chosenGenre={chosenGenre}
        />
        <BookFilter setGenre={setChosenGenre} books={books} />
      </div>
    )
  }

  // const booksToShow = chosenGenre
  //   ? books.filter((book) => book.genres.includes(chosenGenre))
  //   : books

  return (
    <div>
      <h2>BOOKS</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <BookFilter setGenre={setChosenGenre} books={books} />
    </div>
  )
}

export default Books
