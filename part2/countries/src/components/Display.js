import React from 'react';

const Display = ({countryName, handleClick}) => {
    return (
    <div >{countryName}<button onClick={handleClick}>show</button></div>
    )
    }
  
export default Display;