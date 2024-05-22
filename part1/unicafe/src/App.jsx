import { useState } from 'react'

const BetterButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ padding: "4px 12px", margin: "0px 8px", backgroundColor: "Beige" }}
    >
      {text}
    </button>
  )
}

const ButtonGroup = ({ param }) => {
  let group = param.map(element => {
    return (
      <BetterButton 
        text={element.text}
        onClick={ ()=>element.set(element.count + 1) }
        key={element.text}
      />
    )
  });
  // console.log(group)
  return group
}

const Stat = ({ param }) => {
  let all=0, avg=0, pos=0
  param.forEach(element => all += element.count)
  if (all == 0) {
    return <p>{"No feedback given yet:)"}</p>
  }
  avg = all==0 ? 0 : (param[0].count - param[2].count) / all
  pos = all==0 ? 0 : param[0].count / all * 100
  let counts = param.map(element => (<p key={element.text}>{element.text} {element.count}</p>))
  let stats = counts = counts.concat([
    <p key="all">all {all}</p>,
    <p key="avg">average {avg}</p>,
    <p key="pos">positive {pos}%</p>
  ])
  // console.log(stats) 
  return stats
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let param = [
    { text: "good", count: good, set: setGood },
    { text: "neutral", count: neutral, set: setNeutral },
    { text: "bad", count: bad, set: setBad },
  ]
  
  return (
    <div>
      <h2>Give Feedback</h2>
      <ButtonGroup param={param}></ButtonGroup>
      <h2>Statistics</h2>
      <Stat param={param} />
    </div>
  )
}

export default App