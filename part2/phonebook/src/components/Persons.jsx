const Persons = ({ list, query, onRemove }) => {
  // search function
  const search = (list, query) => {
    if (query === '') {
      return list
    } else {
      return list.filter(element => element.name.toLowerCase().indexOf(query.toLowerCase()) > -1)
    }
  } 

  return (
    <ul>
      { search(list, query).map(element => 
          <li key={element.id}>
            { element.name } { element.number } <button onClick={() => onRemove(element.id) } >remove</button>
          </li>
        )
      }
    </ul>
  )
}

export default Persons