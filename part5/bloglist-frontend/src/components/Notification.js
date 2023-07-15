import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { removeNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => {
    return state.notifications
  })
  useEffect(() => {
    if (!notification) {
      setTimeout(dispatch(removeNotification("")), 5000)
    }
  }, [notification])

  if (notification.className) {
    return <div className={notification.className}>{notification.message}</div>
  }
  // if (notification) {
  //   console.log("message", notification.message)
  //   console.log("class name", notification.className)
  //   return <div className={notification.className}>{notification.message}</div>
  // }
  // return null
}

export default Notification
