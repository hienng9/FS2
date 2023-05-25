const Notification = ({ message, nameClass }) => {
  if (message) {
    return (
      <div className={nameClass}>{message}</div>
    )
  } else { return null }
}

export default Notification