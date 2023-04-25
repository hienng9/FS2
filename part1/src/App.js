import React from 'react';
import { useState } from 'react';

const Hello = ({name, age}) => {

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, you are {age} years old.</p>
      <p>So you were probably born in {bornYear()} </p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by HienNguyen
    </div>
  )
}

const Display = ({counter}) => <div>{counter}</div>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}
const App = (props) => {

  const [counter, setCounter] = useState(0)
  
  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)
  const [value, setToValue] = useState(10)
  const name = "Hien"
  const age = 33

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left + updatedRight)
  }
 
  
  return (
    <React.Fragment> 
      <div>
        <div>
        <Display counter={value}/>
        <Button handleClick={() => setToValue(0)} text="Zero" />
        <Button handleClick={() => setToValue(1000)} text="Thousand" />
        <Button handleClick={() => setToValue(value + 1)} text="Incrememt" />
        </div>
        {left}
        <Button handleClick={handleLeftClick} text="Left"/>
        <Button handleClick={handleRightClick} text="Right"/>
        {right}
        <p>{allClicks.join(' ')}</p>
        <p>total: {total}</p>
        <History allClicks={allClicks} />
      </div>

      <Display counter={counter}/>    
      <Button handleClick={increaseByOne} text="Plus" />
      <Button handleClick={decreaseByOne} text="Minus" /> 
      <Button handleClick={setToZero} text="Zero" /> 
      <h1>Greetings</h1>
      <Hello name="George" age={22} />
      <Hello name="Daisy" age={12} />
      <Hello name={name} age={age} />
      <Footer />
    </React.Fragment>
  )
} 

export default App
