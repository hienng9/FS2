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
      return { className: "error", message: action.payload }
    },
    removeNotification() {
      return initialState
    },
  },
})

export const {
  createSuccessNotification,
  createErrorNotification,
  removeNotification,
} = notificationSlice.actions

// export const createAndRemoveSuccess = (message) => {
//   return async (dispatch) => {
//     dispatch(createSuccessNotification(message))
//     setTimeout(dispatch(createSuccessNotification(null)), 5000)
//   }
// }

// export const createAndRemoveError = (message) => {
//   return async (dispatch) => {
//     dispatch(createErrorNotification(message))
//     setTimeout(dispatch(createErrorNotification(null)), 5000)
//   }
// }

export default notificationSlice.reducer
