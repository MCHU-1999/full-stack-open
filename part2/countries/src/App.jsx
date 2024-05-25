import './App.css'
import { useState, useEffect } from 'react'
import countries from './services/countries'
import { MultiResult, OneResult } from './components/Result'

function App() {
  const [queryString, setQueryString] = useState('')
  const [countriesList, setCountriesList] = useState([])
  const [countriesData, setCountriesData] = useState([])

  const handleInput = (event) => {
    // console.log(event.target.value)
    setQueryString(event.target.value)
  }

  const query = (queryString) => {
    if (countriesList.length === 0 || queryString === '') {
      return []
    }
    let filtered = countriesList.filter(element => element.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
    return filtered
  }
  

  useEffect(() => {
    if (countriesList.length === 0) {
      countries.getAllCountries()
      .then(response => {
        const names = response.map(element => element.name.common)
        // console.log("names: ", names);
        setCountriesList(names)
        setCountriesData(Object.fromEntries(names.map((_, i) => [names[i], response[i]])))
        console.log('countries loaded');
      })
    }
  }, [])

  return (
    <div>
      find countries <input onChange={handleInput}></input>
      { query(queryString).length === 1 ?
        <OneResult name={query(queryString)[0]} data={countriesData}/>
        :
        <MultiResult list={query(queryString)} data={countriesData}/>
      }
    </div>
  )
}

export default App
