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

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
    ]
  }

  return <Course course={course} />
}

export default App