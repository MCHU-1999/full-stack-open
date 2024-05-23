import { useState } from 'react'

const Numbers = ({ numbers }) => {
  return 
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleInputChange = (event) => {
    if (event.target.value.length >= 100) {
      window.alert("Name shouldn't exceed 10 characters")
    } else {
      // console.log(event.target.value)
      setNewName(event.target.value)
    }
  }

  const addNumber = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    if (newName.length === 0) {
      window.alert("The 'name' cannot be empty!")
    } else if (persons.findIndex(element => newName === element.name) >= 0) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName }))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        { persons.map((element) => <li key={element.name}>{ element.name }</li>) }
      </ul>
    </div>
  )
}

export default App