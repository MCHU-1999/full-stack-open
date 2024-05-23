const Persons = ({ list, query }) => {
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
      { search(list, query).map(element => <li key={element.name}>{ element.name } { element.number }</li>) }
    </ul>
  )
}

export default Persons