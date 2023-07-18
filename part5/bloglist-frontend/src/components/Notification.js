import { useSelector } from "react-redux"
import { Alert } from "@mui/material"
const Notification = () => {
  const notification = useSelector((state) => state.notifications)
  if (notification.className) {
    return (
      <Alert severity={notification.className}>{notification.message}</Alert>
    )
  }
  return null
}

export default Notification
