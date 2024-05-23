import { useState } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [query, setQuery] = useState('')

  const handleNameChange = (event) => {
    if (event.target.value.length >= 100) {
      window.alert("Name shouldn't exceed 100 characters")
    } else {
      // console.log(event.target.value)
      setNewName(event.target.value)
    }
  }

  const handleNumChange = (event) => {
    if (event.target.value.length >= 100) {
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
      setPersons(persons.concat({ name: newName, number: newNum, id: persons.length+1 }))
      setNewName('')
      setNewNum('')
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