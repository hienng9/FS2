import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN } from "../queries"

const LoginForm = ({ setToken, setError }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginUser, result] = useMutation(LOGIN, {
    onError: (error) => {
      const message = error.graphQLErrors[0].message
      console.log("error", message)
      setError(message)
    },
  })
  console.log("result", result)
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      window.localStorage.setItem("library-user-token", token)
    }
  }, [result.data])
  const handleLogin = (event) => {
    event.preventDefault()
    loginUser({ variables: { username, password } })
  }
  return (
    <div>
      <h2>LOGIN</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:{" "}
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
