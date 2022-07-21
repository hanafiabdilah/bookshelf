import './scss/style.scss'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AdminPanel from './layouts/AdminPanel'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" name="Login" element={''}></Route>
        <Route path="*" name="Home" element={<AdminPanel />} />
      </Routes>
    </Router>
  )
}

export default App
