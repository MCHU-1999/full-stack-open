// Refactor the code so that it consists of three new components: Header, Content, and Total.
// All data still resides in the App component, which passes the necessary data to each component using props.
// Header takes care of rendering the name of the course,
// Content renders the parts and their number of exercises and Total renders the total number of exercises.

const Header = ({ courseName }) => {
  return (
    <h1>{courseName}</h1>
  )
}

const Part = ({ partNum, exercisesNum }) => {
  return (
    <p>{partNum} {exercisesNum}</p>
  )
}

const Content = ({ partArray }) => {
  return (
    <div>
      <Part partNum={partArray[0].name} exercisesNum={partArray[0].exercises}/>
      <Part partNum={partArray[1].name} exercisesNum={partArray[1].exercises}/>
      <Part partNum={partArray[2].name} exercisesNum={partArray[2].exercises}/>
    </div>
  )
}

const Total = ({ partArray }) => {
  return (
    <p>Number of exercises { partArray[0].exercises + partArray[1].exercises + partArray[2].exercises }</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header courseName={ course.name } />
      <Content partArray={ course.parts } />
      <Total partArray={ course.parts } />
    </div>
  )
}

export default App