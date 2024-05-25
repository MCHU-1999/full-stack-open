import './App.css'

import { useState, useEffect } from 'react'

import countries from './services/countries'

const tooMany = "Too many matches, specify another filter."

const MultiResult = ({ list }) => {
  if (list.length > 10) {
    return <p>{tooMany}</p>
  } else {
    return (
      <ul>{ list.map(element => <li key={element}>{element}</li>) }</ul>
    )
  }
}

const OneResult = ({ name }) => {
  const [result, setResult] = useState(null)
  // console.log(list)

  useEffect(() => {
    console.log("useEffect fires")
    countries.getCountry(name)
    .then(res => {
      // console.log('res', res)
      setResult(res)
    })
  }, [])

  console.log("result: ", result);
  if (result !== null) {
    return (
      <>
        <h1>{result.name.common}</h1>
        <p>capital: {result.capital.join(',')}<br/>area: {result.area}</p>
        <h2>languages:</h2>
        <ul>
          { Object.keys(result.languages).map(element => <li key={element}>{result.languages[element]}</li>) }
        </ul>
        <img src={result.flags.png} alt={result.flags.alt}/>
      </>
    )
  } else {
    return <p>fetching detail...</p>
  }
}

function App() {
  const [queryString, setQueryString] = useState('')
  const [countriesList, setCountriesList] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  // const [queryString, setQueryString] = useState('')


  const handleInput = (event) => {
    console.log(event.target.value)
    setQueryString(event.target.value)
  }

  const query = (queryString) => {
    if (countriesList.length === 0 || queryString === '') {
      return []
    }
    let filtered = countriesList.filter(element => element.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
    // console.log(filtered)
    return filtered
  }
  

  useEffect(() => {
    if (countriesList.length === 0) {
      countries.getAllCountries()
      .then(response => {
        // console.log(response.map(element => element.name.common))
        setCountriesList(response.map(element => element.name.common))
        console.log('countries loaded');
      })
    }
  }, [])

  return (
    <div>
      find countries <input onChange={handleInput}></input>
      {/* <p>{query(queryString)}</p> */}
      { query(queryString).length === 1 ?
        <OneResult name={query(queryString)[0]}/>
        :
        <MultiResult list={query(queryString)}/>
      }
      
      
    </div>
  )
}

export default App
