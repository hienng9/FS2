import Blog from "./Blog"
import { useDispatch, useSelector } from "react-redux"
import {
  createSuccessNotification,
  createErrorNotification,
} from "../reducers/notificationReducer"
import { deleteBlogs, addLikes } from "../reducers/blogsReducer"

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)

  const dispatch = useDispatch()

  const handleLikes = async (newBlog) => {
    try {
      dispatch(addLikes(newBlog))
      dispatch(
        createSuccessNotification(
          `+1 like for ${newBlog.title} by ${newBlog.author}`
        )
      )
    } catch (error) {
      dispatch(createErrorNotification(error.response.data.error))
    }
  }

  const deleteBlog = async (blog) => {
    try {
      if (
        window.confirm(
          `Are you sure you want to remove ${blog.tittle} by ${blog.author}?`
        )
      ) {
        dispatch(deleteBlogs(blog))
        dispatch(
          createSuccessNotification(`${blog.title} by ${blog.author} deleted`)
        )
      }
    } catch (error) {
      dispatch(createErrorNotification(error.response.data.error))
    }
  }
  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikes={handleLikes}
          deleteFunc={() => deleteBlog(blog)}
          // userID={userId}
        />
      ))}
    </div>
  )
}

export default Blogs
