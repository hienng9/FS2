// import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material"

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <strong>Username</strong>
              </TableCell>
              <TableCell align="left">
                <strong># Of Blogs</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell align="left">
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell align="left">{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users
