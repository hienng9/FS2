import { createContext, useReducer, useContext } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS":
      return { className: "success", message: action.payload }
    case "ERROR":
      return { className: "error", message: action.payload }
    case "REMOVE":
      return { className: null, message: "" }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    className: "",
    message: null,
  })
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}
export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext
