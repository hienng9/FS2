import React from 'react';

const Notification = ({message, nameClass}) =>{
    if (message !== null) {
        return(
            <div className={nameClass}>
                {message}
            </div>)
    }
    else { return null }

}
export default Notification;
