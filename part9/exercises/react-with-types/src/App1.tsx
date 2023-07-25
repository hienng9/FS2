interface CourseBase {
  name: string
  exerciseCount: number
}
interface CourseDescription extends CourseBase {
  description?: string
}
interface CoursePartBasic extends CourseDescription {
  kind: "basic"
}

interface CoursePartGroup extends CourseDescription {
  groupProjectCount: number
  kind: "group"
}

interface CoursePartBackground extends CourseDescription {
  backgroundMaterial: string
  kind: "background"
}

interface CoursePartSpecial extends CourseDescription {
  requirements: ["nodejs", "jest"]
  kind: "special"
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial

type CoursePartList = {
  parts: CoursePart[]
}

const Part = (part: CoursePart) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>

          <p>
            <em>{part.description}</em>
          </p>
        </div>
      )
    case "group":
      return (
        <div>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>{" "}
          <p>
            <em>{part.description}</em>
          </p>
          project exercises {part.groupProjectCount}
        </div>
      )
    case "background":
      return (
        <div>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>{" "}
          <p>
            <em>{part.description}</em>
          </p>
          submit to this link {part.backgroundMaterial}
        </div>
      )
    case "special":
      return (
        <div>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <p>
            <em>{part.description}</em>
          </p>
          required skills: {part.requirements.join(", ")}
        </div>
      )
    default:
      return assertNever(part)
  }
}
const Header = ({ name }: { name: string }): JSX.Element => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Content = ({ parts }: CoursePartList) => {
  return (
    <div>
      {parts.length === 0 ? (
        <p>No course parts to show</p>
      ) : (
        parts.map((p: CoursePart) => <Part key={p.name} {...p} />)
      )}
    </div>
  )
}

const Total = ({ parts }: CoursePartList) => {
  return (
    <div>
      <p>
        <strong>Number of exercises </strong>
      </p>
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  )
}

const App = () => {
  const courseName = "Half stack application development"
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "Blah blah",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ]
  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  )
}

export default App
