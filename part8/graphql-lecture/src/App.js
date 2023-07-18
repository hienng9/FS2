import { useQuery } from "@apollo/client"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import { ALL_PERSONS } from "./queries/queries"
import { useState } from "react"
import Notification from "./components/Notification"
import UpdatePhoneForm from "./components/UpdatePhoneForm"

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const result = useQuery(ALL_PERSONS)
  if (result.loading) {
    return <div>loading...</div>
  }
  console.log(result)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 10000)
  }

  return (
    <div>
      <Notification error={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <UpdatePhoneForm setError={notify} />
    </div>
  )
}

export default App
