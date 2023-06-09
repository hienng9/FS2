// import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNotificationDispatch, useNotificationValue } from "../NotificationContext"



const Notification = () => {
  const notification = useNotificationValue()
  const notificationDispatch = useNotificationDispatch()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  useEffect(() => {
    if (!notification) {
      setTimeout(() => {notificationDispatch({ type: 'REMOVE' })}, 5000)
    }
  }, [notification])

  return (
    <div style={notification === '' ? {display:'none'} : style}>
      { notification }
    </div>
  )
}

export default Notification