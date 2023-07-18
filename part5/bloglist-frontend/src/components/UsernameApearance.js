import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../reducers/userReducer"
import { Box, Button, Menu } from "@mui/material"
const UsernameAppearance = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
    window.localStorage.removeItem("loggedInUser")
  }
  return (
    <Box aligh="right" sx={{ display: { xs: "none", sm: "block" } }}>
      <strong>Hello, {user.username} </strong>
      <Button color="inherit" onClick={handleLogout}>
        <strong>LOGOUT</strong>
      </Button>
    </Box>
  )
}

export default UsernameAppearance
