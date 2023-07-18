import { EDIT_AUTHOR, ALL_AUTHORS, ALL_BOOKS } from "../queries"
import { useMutation } from "@apollo/client"
import { useState } from "react"

const YearForm = ({ authors }) => {
  const [setBornTo, setBornToYear] = useState("")
  const [name, setName] = useState("")
  const [updateYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
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
