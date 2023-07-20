const BookFilter = ({ books, setGenre }) => {
  const genres = books.reduce(
    (accumulator, book) => accumulator.concat(book.genres),
    []
  )
  const uniqueGenres = [...new Set(genres)]

  return (
    <div style={{ padding: 10 }}>
      {uniqueGenres.map((genre) => (
        <button
          key={genre}
          value={genre}
          onClick={(event) => setGenre(event.target.value)}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}

export default BookFilter
