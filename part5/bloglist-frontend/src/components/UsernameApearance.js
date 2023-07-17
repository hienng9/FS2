import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../reducers/userReducer"

const UsernameAppearance = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
    window.localStorage.removeItem("loggedInUser")
  }
  return (
    <React.Fragment>
      Hello, {user.username}
      <button onClick={handleLogout}>logout</button>
    </React.Fragment>
  )
}

export default UsernameAppearance
