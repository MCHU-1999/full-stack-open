import { useState, useEffect } from 'react'
import Weather from "./Weather"

export const MultiResult = ({ list, data }) => {
  const [showDetail, setShowDetail] = useState(Array(list.length).fill(false))
  
  useEffect(() => {
    setShowDetail(Array(list.length).fill(false))
  }, [list])

  const toggleShow = (index) => {
    console.log("toggle! index: ", index);
    setShowDetail(showDetail.map((element, i) => i === index ? !element : element ))
  }
  
  if (list.length > 10) {
    return <p>Too many matches, specify another filter.</p>
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

export const OneResult = ({ name, data }) => {
  const [result, setResult] = useState(null)
  // const [weather, setWeather] = useState(null)
  // console.log(data)

  useEffect(() => {
    console.log("useEffect fires in <OneResult>")
    setResult(data[name])
  }, [])

  // console.log("one country: ", result);
  if (result !== null && result !== undefined) {
    return (
      <>
        <h1>{result.name.common}</h1>
        <p>capital: {result.capital.join(', ')}<br/>area: {result.area}</p>
        <h3>languages:</h3>
        <ul>
          { Object.keys(result.languages).map(element => <li key={element}>{result.languages[element]}</li>) }
        </ul>
        <img src={result.flags.png} alt={result.flags.alt}/>
        <Weather city={result.capital[0]}/>
      </>
    )
  } else {
    return <p>fetching detail...</p>
  }
}
