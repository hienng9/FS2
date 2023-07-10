import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => {
    console.log(state)
    return state.notifications })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={notification === '' ? {display:'none'} : style}>
      { notification }
    </div>
  )
}

export default Notification