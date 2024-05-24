import { useState, useEffect } from 'react'
import personsDB from './services/persons'

import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    personsDB.getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
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
    const duplicatedIndex = persons.findIndex(element => newName === element.name)

    if (newName.length === 0) {
      window.alert("Name cannot be empty!")
    } else if (newNum.length === 0) {
      window.alert("Number cannot be empty!")
    } else if (duplicatedIndex >= 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsDB.update(persons[duplicatedIndex].id, { name: newName, number: newNum })
        .then(response => {
          console.log('updated: ', response)
          let copy = [...persons]
          copy.splice(duplicatedIndex, 1, response)
          setPersons(copy)
        })
      }
    } else {
      personsDB.create({ name: newName, number: newNum, id: undefined })
      .then(response => {
        console.log('created: ', response)
        setPersons(persons.concat(response))
      })
    }
    setNewName('')
    setNewNum('')
  }

  const removePerson = (id) => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Do you really want to remove ${person.name}?`)) {
      personsDB.remove(id)
      .then(response => {
        // personsDB.getAll()
        setPersons(persons.filter(element => element.id !== id))
        console.log('removed: ', response)
      })
      .catch(error => {
        console.log(error)
        alert(`the person '${person.name}' was already deleted from server`)
        setPersons(persons.filter(element => element.id !== id))
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
        <Persons list={persons} query={query} onRemove={removePerson}/>
    </div>
  )
}

export default App