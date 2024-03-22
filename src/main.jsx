import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { MovieContextProvider } from './Context/Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <MovieContextProvider >

  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </MovieContextProvider>
)
