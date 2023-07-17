import { useDispatch } from "react-redux"
import { loginUser, logout } from "../reducers/userReducer"
import { useState } from "react"
import { createErrorNotification } from "../reducers/notificationReducer"

const useField = ({ type, name }) => {
  const [value, setValue] = useState("")

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => setValue("")
  return [
    reset,
    {
      type,
      value,
      name,
      onChange,
    },
  ]
}

const LoginForm = () => {
  const dispatch = useDispatch()
  const [usernameReset, username] = useField({ type: "text", name: "Username" })
  const [passwordReset, password] = useField({
    type: "password",
    name: "Password",
  })
  const handleLogin = async (event) => {
    event.preventDefault()
    // try {
    dispatch(loginUser({ username: username.value, password: password.value }))
    setTimeout(() => {
      dispatch(logout())
    }, 3600000)
    usernameReset()
    passwordReset()
    // } catch (error) {
    //   console.log("error", error.response.data.error)
    //   dispatch(createErrorNotification("Wrong username or password"))
    // }
  }
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input {...username} />
      </div>
      <div>
        password
        <input {...password} />
      </div>
      <div>
        <button id="login-button" type="submit">
          login
        </button>
      </div>
    </form>
  )
}

export default LoginForm
