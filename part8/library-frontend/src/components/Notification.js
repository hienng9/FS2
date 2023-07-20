const Notification = ({ error }) => {
  if (!error) {
    return null
  }
  return (
    <div
      style={{
        color: "white",
        border: "solid",
        borderColor: "red",
        background: "red",
      }}
    >
      {error}
    </div>
  )
}

export default Notification
