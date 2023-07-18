import { useParams } from "react-router"
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material"
import { Link } from "react-router-dom"
const User = ({ users }) => {
  const userID = useParams().id
  const user = users.find((u) => u.id === userID)
  if (!user) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Own Blogs</h3>
      {user.blogs.length === 0 ? (
        <div> No blogs added yet </div>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {user.blogs.map((blog) => {
                return (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}

export default User
