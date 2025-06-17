// src/App.js
import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "./pages/Dashboard"


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
    
        {/* You can add more routes here later */}
      </Routes>
    </Router>
  )
}

export default App
