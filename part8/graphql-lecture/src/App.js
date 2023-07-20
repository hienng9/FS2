import { useApolloClient, useQuery } from "@apollo/client"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import { ALL_PERSONS } from "./queries/queries"
import { useState } from "react"
import Notification from "./components/Notification"
import UpdatePhoneForm from "./components/UpdatePhoneForm"
import LoginForm from "./components/LoginForm"

const App = () => {
  const client = useApolloClient()
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 10000)
  }

  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>loading...</div>
  }
  console.log(result)
  console.log("token", !token)
  console.log("tokens", token)

  if (!token) {
    return (
      <div>
        <Notification error={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    )
  }
  const handleLogout = () => {
    setToken(null)
    window.localStorage.clear()
    client.resetStore()
  }
  return (
    <div>
      <Notification error={errorMessage} />
      <button onClick={handleLogout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <UpdatePhoneForm setError={notify} />
    </div>
  )
}

export default App
