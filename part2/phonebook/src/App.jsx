import { useState } from 'react'

// const Numbers = ({ numbers }) => {
//   return 
// }

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

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
      setPersons(persons.concat({ name: newName, number: newNum }))
      setNewName('')
      setNewNum('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <br></br>
          number: <input value={newNum} onChange={handleNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        { persons.map((element) => <li key={element.name}>{ element.name } { element.number }</li>) }
      </ul>
    </div>
  )
}

export default App