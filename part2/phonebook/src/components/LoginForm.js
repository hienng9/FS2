import React, { useState } from "react"
const LoginForm = ({ loginFunc }) => {
    const [newUsername, setUsername] = useState('')
    const [newPassword, setPassword] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()
        loginFunc({
            username: newUsername,
            password: newPassword
        })
        setUsername('')
        setPassword('')
    }
    return (
    <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={newUsername}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={newPassword}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      )
}   

  export default LoginForm