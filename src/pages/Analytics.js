// src/pages/Analytics.js
import React from "react"

const Analytics = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Analytics</h1>
      <p className="text-gray-600 dark:text-gray-300">
        This page will show advanced performance analytics like:
      </p>
      <ul className="list-disc ml-6 text-gray-600 dark:text-gray-300">
        <li>Profit Factor Trends</li>
        <li>Win Rate per Symbol</li>
        <li>Strategy Grouping Comparison</li>
        <li>Trade Distribution Charts</li>
      </ul>
      <p className="text-sm text-gray-500 italic">Coming soon...</p>
    </div>
  )
}

export default Analytics
