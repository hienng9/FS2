import { useParams } from "react-router"
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
      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </div>
  )
}

export default User
