import { useState, useEffect } from 'react'
import weatherApi from '../services/weather'

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {    
    weatherApi.getWeather(city)
    .then(res => {
      setWeather(res)
    })
    .catch(error => {
      console.log("Failed to get weather data, status code 404")
    })
  }, [])

  // console.log("one country: ", result);
  if (weather !== null) {
    return (
      <>
        <h2>Weather in {weather.name}</h2>
        <p>temperature {weather.main.temp} Celcius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
        <p>wind {weather.wind.speed} m/s</p>
      </>
    )
  } else {
    return <p>fetching weather detail...</p>
  }
}

export default Weather