import ReactDOM from "react-dom/client"

interface WelcomeProps {
  name: string
}
const Welcome = (props: WelcomeProps): JSX.Element => {
  return <h1>Hello, {props.name}</h1>
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(<Welcome name="Hien" />)
