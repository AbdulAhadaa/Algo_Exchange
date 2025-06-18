// src/App.js
import React, { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Analytics from "./pages/Analytics"
import Trades from "./pages/Trades"
import Layout from "./components/Layout"

const App = () => {
  useEffect(() => {
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

    document.body.classList.add("transition-colors", "duration-300", "bg-white", "dark:bg-gray-900")
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
          <Route path="/trades" element={<Layout><Trades /></Layout>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
