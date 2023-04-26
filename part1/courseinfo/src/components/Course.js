import React from 'react';

const Header = ({name}) => <h2>{name}</h2>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>


const ShowTotal = ({parts}) => {
    const sum = parts.map(part => part.exercises).reduce((a,b) => a+b)
    return (
        <p><strong>Total of {sum} exercises</strong></p>
        )
}

const Content = ({parts}) => {
  return (
    <React.Fragment>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </React.Fragment>
  )
}
const Course = (props) => {
    const {course} = props
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <ShowTotal parts={course.parts} />
        </div>
    )

}

export default Course;