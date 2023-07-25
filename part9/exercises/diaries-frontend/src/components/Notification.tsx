import { Message } from "../types"
const Notification = (error: Message) => {
  if (!error) {
    return null
  }

  return <div style={{ color: "red" }}>{error.message}</div>
}
export default Notification
