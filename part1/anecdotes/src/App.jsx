import { useState } from 'react'

function getRandomInt(max) {
  return Math.floor(Math.random() * (max));
}

const MostVotes = ({ anecdoteArray, pointArray }) => {
  let maxValue = Math.max(...pointArray)
  // if (maxValue <= 0) {
  //   return <p style={{ fontSize: 14, color: "Crimson" }}>No one voted!</p>
  // }
  let index = pointArray.indexOf(maxValue);
  return (
    <>
      <p style={{ fontSize: 14 }}>{anecdoteArray[index]}</p>
      <p style={{ fontSize: 14 }}>has {maxValue} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const zeros = Array(anecdotes.length).fill(0)
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(zeros)

  const handleNext = () => {
    let index = selected
    while (index == selected) {
      index = getRandomInt(anecdotes.length)
    }
    setSelected(index)
  }

  const handleVote = () => {
    let copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    // console.log(copy)
    // console.log(points[selected])
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p style={{ fontSize: 14 }}>{anecdotes[selected]}</p>
      <p style={{ fontSize: 14, color: "Crimson" }}>has {points[selected]} votes</p>
      <button onClick={() => handleVote()}>vote for this one</button>
      <button onClick={() => handleNext()}>next random anecdote</button>
      <h2>Anecdote with most votes</h2>
      <MostVotes anecdoteArray={anecdotes} pointArray={points}/>
    </div>
  )
}

export default App