import React from 'react';
import { useState } from 'react';

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>
const StatisticsLine = ({text, value, end}) => {
  return(
  <tr>
    <td>{text}</td> 
    <td>{value}{end}</td>
    </tr>
    )
}
const Statistics = (props) =>{
  if (props.total === 0){
    return (<p>No feedback given</p>)
  }
  return (
    <table>
      <tbody>
        <StatisticsLine value={props.good} text="good" />
        <StatisticsLine value={props.neutral} text="neutral" />
        <StatisticsLine value={props.bad} text="bad" />
        <StatisticsLine value={props.total} text="all" />
        <StatisticsLine value={props.average.toFixed(1)} text="average" />
        <StatisticsLine value={props.positive.toFixed(1)} text="positive" end="%" />
      </tbody>
    </table>
  )
}




const App = () =>{
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const[positive, setPositive] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedTotal = updatedGood + neutral + bad

    // console.log("Updated Good neutral bad", updatedGood, neutral, bad)
    // console.log("Updated Total", updatedTotal)
    setGood(updatedGood)
    setTotal(updatedTotal)
    setPositive(updatedGood*100/ updatedTotal)
    setAverage((updatedGood - bad)/updatedTotal)
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedTotal = good + updatedNeutral + bad
    // console.log("Updated Neutral good bad", updatedNeutral, good, bad)
    // console.log("Updated Total", updatedTotal)
    setNeutral(updatedNeutral)
    setTotal(updatedTotal)
    setPositive(good*100/updatedTotal)
    setAverage((good - bad)/updatedTotal)
  }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedTotal = good + neutral + updatedBad
    // console.log("Updated Bad neutral good", updatedBad, neutral, good)
    // console.log("Updated Total", updatedTotal)
    setBad(updatedBad)
    setTotal(updatedTotal)
    setPositive(good*100/updatedTotal)
    setAverage((good - updatedBad)/updatedTotal)
  }
  return (
    <div>
      <h1>Give Feedback Here</h1>
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />
      
      <h1>Feedback Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>
    </div>
  )
}


export default App;
