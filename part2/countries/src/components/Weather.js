import React from 'react';

const DisplayWeather = ({city, weather}) => {
    const imageUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
    return (
    <div>
        <h1>Weather in {city}</h1>
        <div>temperature in {weather.temp} Celcius</div>
        <img 
        src={imageUrl} 
        alt="weatherIcon"
        />
        <div>wind {weather.speed} m/s</div>
    </div>
    )
    }

export default DisplayWeather;