import React, { forwardRef, useImperativeHandle, useState } from "react"
import PropTypes from "prop-types"

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)
  const hidewhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })
  const toggleVisibility = () => setVisible(!visible)
  console.log("props", props.children)
  return (
    <React.Fragment>
      <button style={hidewhenVisible} onClick={toggleVisibility}>
        {props.buttonLabel}
      </button>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </React.Fragment>
  )
})

Togglable.propTypes = { buttonLabel: PropTypes.string.isRequired }
Togglable.displayName = "Togglable"
export default Togglable
