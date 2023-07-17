import { createSlice } from "@reduxjs/toolkit"

const initialState = { className: null, message: "" }
const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    createSuccessNotification(state, action) {
      return { className: "success", message: action.payload }
    },
    createErrorNotification(state, action) {
      console.log(action)
      return { className: "error", message: action.payload }
    },
    removeNotification(state, action) {
      return initialState
    },
  },
})

export const {
  createSuccessNotification,
  createErrorNotification,
  removeNotification,
} = notificationSlice.actions

export const createAndRemoveSuccess = (message) => {
  return async (dispatch) => {
    dispatch(createSuccessNotification(message))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }
}

export const createAndRemoveError = (message) => {
  return async (dispatch) => {
    dispatch(createErrorNotification(message))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }
}

export default notificationSlice.reducer
