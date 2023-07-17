import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notifications)
  if (notification.className) {
    return <div className={notification.className}>{notification.message}</div>
  }
  return null
}

export default Notification
