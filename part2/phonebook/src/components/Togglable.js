
import React, { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return { toggleVisibility }
    } )
    return (
        <React.Fragment>
            <div stype={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible} className="toggableContent">
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </React.Fragment>
    )
 })

 export default Togglable