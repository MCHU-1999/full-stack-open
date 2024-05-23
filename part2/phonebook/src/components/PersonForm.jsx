const PersonForm = ({ onSubmit, nameValue, onNameChange, onNumChange, numValue }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} onChange={onNameChange} />
        <br></br>
        number: <input value={numValue} onChange={onNumChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm