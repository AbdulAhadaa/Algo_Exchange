// src/App.js
import React, { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "./pages/Dashboard"

const App = () => {
  useEffect(() => {
    // Sync Tailwind dark mode class to <body>
    const root = window.document.documentElement
    const savedTheme = localStorage.getItem("theme")

    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    // Apply transition to body background
    document.body.classList.add("transition-colors", "duration-300", "bg-white", "dark:bg-gray-900")
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
