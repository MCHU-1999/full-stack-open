import './App.css'

import { useState, useEffect } from 'react'

import countries from './services/countries'

const tooMany = "Too many matches, specify another filter."

const MultiResult = ({ list, data }) => {
  const [showDetail, setShowDetail] = useState(Array(list.length).fill(false))
  
  useEffect(() => {
    setShowDetail(Array(list.length).fill(false))
  }, [list])

  const toggleShow = (index) => {
    console.log("toggle! index: ", index);
    setShowDetail(showDetail.map((element, i) => i === index ? !element : element ))
  }
  
  if (list.length > 10) {
    return <p>{tooMany}</p>
  } else {
    // console.log("list: ", list)
    // console.log("showDetail: ", showDetail)
    return (
      <ul>
        {
          list.map((element, i) => {
            if (showDetail[i]) {
              return (
                <li key={element}>
                  {element} <button onClick={() => toggleShow(i)}>fold</button>
                  <OneResult name={element} data={data} />
                </li>
              )
            } else {
              return (
                <li key={element}>
                  {element} <button onClick={() => toggleShow(i)}>show</button>
                </li>
              )
            }
          })
        }
      </ul>
    )
  }
}

const OneResult = ({ name, data }) => {
  const [result, setResult] = useState(null)
  // console.log(data)

  useEffect(() => {
    console.log("useEffect fires in <OneResult>")
    setResult(data[name])
    // countries.getCountry(name)
    // .then(res => {
    //   setResult(res)
    // })
  }, [])

  // console.log("one country: ", result);
  if (result !== null && result !== undefined) {
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
      {/* <p>{query(queryString)}</p> */}
      { query(queryString).length === 1 ?
        <OneResult name={query(queryString)[0]} data={countriesData}/>
        :
        <MultiResult list={query(queryString)} data={countriesData}/>
      }
      
      
    </div>
  )
}

export default App
