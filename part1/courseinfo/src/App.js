import React from 'react';

const Header = (props) => {
  return (<h1>{props.name}</h1>)
}

const Part = (props) => {
  return (<p>{props.part_num} {props.exercises_num}</p>)
}

const Content = (props) => {
  return (
    <React.Fragment>
      <Part part_num={props.parts[0].name} exercises_num={props.parts[0].exercises} />
      <Part part_num={props.parts[1].name} exercises_num={props.parts[1].exercises} />
      <Part part_num={props.parts[2].name} exercises_num={props.parts[2].exercises} />
    </React.Fragment>
  )
}

const Total = (props) => {
  console.log(props)
  return (
      <p>Number of exercises {[props.parts[0].exercises, props.parts[1].exercises, props.parts[2].exercises].reduce((a, b) => a + b)}</p>
  )
}
const App = () => {
  const course = 
  {
    name: 'Half Stack application development',
    parts: [{
    name:'Fundamentals of React',
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
      <Header course={course.name}/>
      <Content parts={course.parts}
        />
      <Total parts={course.parts} />
    </div>
  )
}


export default App;
