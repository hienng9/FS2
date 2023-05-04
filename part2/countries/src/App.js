import React, { useState, useEffect } from 'react';
import countryService from './services/country.js';
import DisplayCountry from './components/Country.js';
import Display from './components/Display.js';
import DisplayWeather from './components/Weather.js';
require('dotenv').config()


const App = () => { 
  const [data, setData] = useState(null)
  const [city, setCity] = useState(null)
  const [weather, setWeather] = useState(null)
  const [dataToShow, setDataToShow] = useState([])

  const hook = () => {
      countryService
        .getAll()
        .then(allData => setData(allData))
  }
  useEffect(hook, [])
  
  useEffect(() => {
    if (city) {
      countryService
      .getWeather({city})
      .then(returnedWeather => {
        setWeather(
        {"temp": returnedWeather.main.temp, 
        "speed": returnedWeather.wind.speed,
        "icon": returnedWeather.weather[0].icon
      })
        }
      )
    }
  }, [city])

  const handleChange = (event) => {
    const country = event.target.value
    const countries = data.filter(
      c => c.name.common.toLowerCase().includes(country))
    setDataToShow(countries)
    countries.length === 1
      ? setCity(countries[0].capital[0])
      : setCity(null)
  }

  const displayCountry = ({country}) =>{
    return (
      setDataToShow([country]))
  }
  return(
    <React.Fragment>
    <p>find countries
      <input onChange={handleChange}></input>
    </p>
    <div>{
    (dataToShow.length > 10)
    ? 'Too many matches, specify another filter' 
    : (dataToShow.length === 1)
      ? <div>
          <DisplayCountry country={dataToShow[0]}/> 
          {weather!== null
          ? <DisplayWeather city={city} weather={weather} />
          : console.log("null")
          }
        </div>
      : dataToShow.map(
        country => <Display 
                key={country.name.common} 
                countryName={country.name.common} 
                handleClick={() => displayCountry({country})}
                />)
    }</div>
    </React.Fragment>
  )
}
export default App;
