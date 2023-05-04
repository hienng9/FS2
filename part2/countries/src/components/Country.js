import React from 'react';

const DisplayCountry = ({country}) => {
    return (
    <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>
        <h4>languages:</h4>
            <ul>
                {Object.values(country.languages).map(lan => <li key={lan}>{lan}</li>)}
            </ul>
        <div className='flag'>{country.flag}</div> 
        
    </div>
    )
    }

export default DisplayCountry;