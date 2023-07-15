import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const Notes = () => <div>notes</div>
const Home = () => <div>home</div>
const Users = () => <div>users</div>

const App = () => {
  const padding = {
    padding: 5
  }
  return (
    <Router>
      <div className='container'>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
      </div>

      <Routes>
        <Route path="/notes" element={<Notes />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <div>
        <i>Note app . Nguyen Hien . 2023</i>
      </div>
    </Router>
  )
}

export default App