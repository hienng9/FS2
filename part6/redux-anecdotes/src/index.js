import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { NotficationContextProvider } from './NotificationContext'
import App from './App'

import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <NotficationContextProvider>
      <App />
    </NotficationContextProvider>
  </Provider>
)