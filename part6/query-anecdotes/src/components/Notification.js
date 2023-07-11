import { useNotificationDispatch, useNotificationValue } from "../NotificationContext"
import { useEffect } from 'react'
const Notification = () => {
  const notification = useNotificationValue()
  const notificationDispatch = useNotificationDispatch()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  useEffect(() => {
    if (!notification) {
      setTimeout(() => notificationDispatch({type: 'REMOVE'}), 5000)
    }
  },[notificationDispatch, notification])
  

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
