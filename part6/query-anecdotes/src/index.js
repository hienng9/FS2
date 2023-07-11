import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { NotficationContextProvider } from './NotificationContext'
const clientQuery = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotficationContextProvider>
  <QueryClientProvider client={clientQuery}>
    
      <App />
    
  </QueryClientProvider>
  </NotficationContextProvider>
)