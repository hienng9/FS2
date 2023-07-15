import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
import blogService from "../services/blogs"

const existingUser = window.localStorage.getItem("loggedInUser")
const initialState = existingUser ? JSON.parse(existingUser) : null
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    login(state, action) {
      return action.payload
    },

    logout(state, action) {
      return null
    },
  },
})

export const { login, logout } = userSlice.actions

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const loggedInUser = await loginService.login(credentials)
    console.log("logged in user", JSON.stringify(loggedInUser))
    blogService.setToken(loggedInUser.token)
    window.localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))
    dispatch(login(loggedInUser))
  }
}
export default userSlice.reducer
