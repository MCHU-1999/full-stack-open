import axios from 'axios'

const apiURL = "https://studies.cs.helsinki.fi/restcountries/api"

async function getAllCountries() {
  const response = await axios.get(`${apiURL}/all`)
  return response.data
}

async function getCountry(name) {
  const response = await axios.get(`${apiURL}/name/${name}`)
  return response.data
}

export default { getAllCountries, getCountry }