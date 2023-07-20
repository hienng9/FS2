import { useQuery } from "@apollo/client"
import { FILTER_BOOKS } from "../queries"
const Recommendations = ({ genre }) => {
  console.log("recomment", genre)

  const result = useQuery(FILTER_BOOKS, {
    variables: { genre },
  })

  if (result.loading) {
    return <div>loading..</div>
  }
  const favoriteBooks = result.data.allBooks
  return (
    <div>
      <h2>Recommendations</h2>
      Books in your favorite genre: <strong>{genre}</strong>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favoriteBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
