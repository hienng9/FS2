import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import "./index.css"
import { BrowserRouter as Router } from "react-router-dom"
import notificationReducer from "./reducers/notificationReducer"
import blogsReducer from "./reducers/blogsReducer"
import userReducer from "./reducers/userReducer"
import usersReducer from "./reducers/usersReducer"
const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notifications: notificationReducer,
    user: userReducer,
    users: usersReducer,
  },
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
