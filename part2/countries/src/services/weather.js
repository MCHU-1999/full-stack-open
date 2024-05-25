import axios from 'axios'

const apiURL = "https://api.openweathermap.org/data/2.5/weather"
const apiKey = import.meta.env.VITE_WEATHER_API_KEY
// variable api_key now has the value set in startup

async function getWeather(city) {
  const response = await axios.get(`${apiURL}/?q=${city}&appid=${apiKey}&units=metric`)
  return response.data
}

export default { getWeather }