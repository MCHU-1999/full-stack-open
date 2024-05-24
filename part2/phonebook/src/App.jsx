import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(res => {
        console.log('promise fulfilled')
        setPersons(res.data)
      })
  },[])

  const handleNameChange = (event) => {
    if (event.target.value.length > 100) {
      window.alert("Name shouldn't exceed 100 characters")
    } else {
      // console.log(event.target.value)
      setNewName(event.target.value)
    }
  }

  const handleNumChange = (event) => {
    if (event.target.value.length > 100) {
      window.alert("Phone number shouldn't exceed 100 characters")
    } else {
      // console.log(event.target.value)
      setNewNum(event.target.value)
    }
  }

  const handleSearch = (event) => setQuery(event.target.value)

  const addNumber = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    if (newName.length === 0) {
      window.alert("Name cannot be empty!")
    } else if (newNum.length === 0) {
      window.alert("Number cannot be empty!")
    } else if (persons.findIndex(element => newName === element.name) >= 0) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setNewName('')
      setNewNum('')
      axios.post('http://localhost:3001/persons', { name: newName, number: newNum, id: persons.length+1 })
      .then(response => {
        console.log(response.data)
        setPersons(persons.concat(response.data))
      })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
        <Filter value={query} onChange={handleSearch}/>
      <h3>Add a new</h3>
        <PersonForm onSubmit={addNumber} nameValue={newName} numValue={newNum}
          onNameChange={handleNameChange} onNumChange={handleNumChange}
        />
      <h3>Numbers</h3>
        <Persons list={persons} query={query}/>
    </div>
  )
}

export default App