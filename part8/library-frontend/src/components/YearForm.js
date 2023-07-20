import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries"
import { useMutation } from "@apollo/client"
import { useState } from "react"

const YearForm = ({ authors, setError }) => {
  const [setBornTo, setBornToYear] = useState("")
  const [name, setName] = useState("")
  const [updateYear] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      const message = error.graphQLErrors[0].message
      setError(message)
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        const updatedAuthor = response.data.editAuthor
        return {
          allAuthors: allAuthors.map((author) =>
            author.name === updatedAuthor.name ? updatedAuthor : author
          ),
        }
      })
    },
  })

  const handleUpdateBorn = (event) => {
    event.preventDefault()
    updateYear({ variables: { name, setBornTo: Number(setBornTo) } })
    setBornToYear("")
    setName("")
  }
  return (
    <div>
      <form onSubmit={handleUpdateBorn}>
        <div>
          Name:{" "}
          <select
            value={name}
            onChange={(event) => setName(event.target.value)}
          >
            {authors.map((author) => (
              <option key={author.name}>{author.name}</option>
            ))}
          </select>
        </div>
        <div>
          Year born:{" "}
          <input
            type="number"
            value={setBornTo}
            onChange={(event) => setBornToYear(event.target.value)}
          />
        </div>
        <button type="submit">update</button>
      </form>
    </div>
  )
}

export default YearForm
