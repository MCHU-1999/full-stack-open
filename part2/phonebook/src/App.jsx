import './index.css'

import { useState, useEffect } from 'react'
import personsDB from './services/persons'

import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from "./components/Notification"


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [query, setQuery] = useState('')
  const [noti, setNoti] = useState({ message: null, type: null })

  useEffect(() => {
    personsDB.getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
      })
      .catch(error => {
        console.log(error.response.data.message)
      })
  },[])

  const popToast = (message, type) => {
    setNoti({ message, type })
    setTimeout(() => {
      setNoti({ message: null, type: null })
    }, 5000)
    return null
  }

  const handleNameChange = (event) => {
    if (event.target.value.length > 100) {
      popToast("Name shouldn't exceed 100 characters", 'error')
    } else {
      // console.log(event.target.value)
      setNewName(event.target.value)
    }
  }

  const handleNumChange = (event) => {
    if (event.target.value.length > 100) {
      popToast("Phone number shouldn't exceed 100 characters", 'error')
    } else {
      // console.log(event.target.value)
      setNewNum(event.target.value)
    }
  }

  const handleSearch = (event) => setQuery(event.target.value)

  const addNumber = (event) => {
    event.preventDefault()
    // console.log('button clicked', event.target)
    const duplicatedIndex = persons.findIndex(element => newName === element.name)

    if (duplicatedIndex >= 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsDB.update(persons[duplicatedIndex].id, { name: newName, number: newNum })
        .then(response => {
          popToast(`updated ${newName}` , 'success')
          let copy = [...persons]
          copy.splice(duplicatedIndex, 1, response)
          setPersons(copy)
        })
        .catch(error => {
          // console.log(error.response.data.message)
          popToast(error.response.data.message , 'error')
        })
      }
    } else {
      personsDB.create({ name: newName, number: newNum })
      .then(response => {
        popToast(`created ${newName}` , 'success')
        setPersons(persons.concat(response))
      })
      .catch(error => {
        // console.log(error.response.data.message)
        popToast(error.response.data.message , 'error')
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
        setPersons(persons.filter(element => element.id !== id))
        popToast(`Information of ${person.name} removed successfully`, 'success')
        // console.log('removed: ', response)
      })
      .catch(error => {
        popToast(`Information of '${person.name}' has already been removed from server`, 'error')
        setPersons(persons.filter(element => element.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={noti.message} type={noti.type}/>
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