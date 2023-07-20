import useField from "../useField"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries/queries"
import { useEffect } from "react"
//Variable "$username" got invalid value { type: "text", value: "hien" }; String cannot represent a non string value: { type: "text", value: "hien" }
const LoginForm = ({ setToken, setError }) => {
  const [usernameReset, username] = useField("text")
  const [passwordReset, password] = useField("password")

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      const message = error.graphQLErrors[0].message
      setError(message)
    },
  })

  useEffect(() => {
    if (result.data) {
      console.log("data2", result)
      const token = result.data.login.value
      console.log()
      setToken(token)
      window.localStorage.setItem("phonebook-user-token", token)
    }
  }, [result.data]) //eslint-diable-line

  const handleLogin = (event) => {
    event.preventDefault()
    login({ variables: { username: username.value, password: password.value } })
    usernameReset()
    passwordReset()
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          Username: <input {...username} />
        </div>
        <div>
          Password: <input {...password} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
