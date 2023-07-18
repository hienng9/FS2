import { useDispatch } from "react-redux"
import { loginUser, logout } from "../reducers/userReducer"
import { useState } from "react"
import { TextField, Button } from "@mui/material"

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
  }
  return (
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          required
          id="username"
          label="Username"
          variant="standard"
          {...username}
        />
      </div>
      <div>
        <TextField
          required
          id="password"
          label="Password"
          variant="standard"
          {...password}
        />
      </div>
      <div>
        <Button
          color="primary"
          variant="contained"
          id="login-button"
          type="submit"
        >
          login
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
