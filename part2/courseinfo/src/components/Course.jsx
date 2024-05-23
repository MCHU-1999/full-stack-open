const Header = ({ text }) => {
  return <h2>{text}</h2>
}

const Content = ({ course }) => {
  return <ul>{ course.parts.map(element => <Part key={element.id} part={element} />) }</ul>
}

const Part = ({ part }) => {
  return <li>{ part.name } { part.exercises }</li>
}

const Total = ({ course }) => {
  let sum = course.parts.reduce((accumulator, element) => accumulator + element.exercises, 0)
  return <p style={{ fontWeight: "bold" }}>total of {sum} exercises</p>
}

const Course = ({ course }) => {
  return (
    <>
      <Header text={course.name}/>
      <Content course={course}/>
      <Total course={course} />
    </>
  )
}

export default Course