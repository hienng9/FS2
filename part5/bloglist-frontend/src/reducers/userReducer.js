import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { createAndRemoveError } from "./notificationReducer"

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
    const response = await loginService.login(credentials)
    if (response.status === 200) {
      const loggedInUser = response.data
      blogService.setToken(loggedInUser.token)
      window.localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))
      dispatch(login(loggedInUser))
    } else {
      dispatch(createAndRemoveError("wrong username or password"))
    }
  }
}
export default userSlice.reducer
