import { createSlice } from "@reduxjs/toolkit";

const initialState = ''
const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        removeNotification(state, action) {
            return initialState
        }, 
        createNotification(state, action) {
            return action.payload
        }
        
    }
})

export const notify = (message, timeout = 5000) => {
    return async (dispatch) => {
        await dispatch(createNotification(message))
        setTimeout(() => dispatch(removeNotification(message)), timeout)
    }

}

export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer