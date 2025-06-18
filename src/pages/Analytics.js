import React, { useState } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import StrategyChart from "../components/StrategyChart"
import { sampleEquityData } from "../data/sampleEquityData"
import SummaryStatsPanel from "../components/SummaryStatsPanel"
import MonthlyROIHeatmap from "../components/MonthlyROIHeatmap"
import TradeLogTable from "../components/TradeLogTable"

const dummyStats = {
  profitFactor: 1.78,
  winRate: 61.2,
  totalTrades: 302,
  maxDrawdown: 11.9,
}

const Analytics = () => {
  const [range, setRange] = useState("1Y")

  const filteredData = sampleEquityData.filter((point) => {
    const now = new Date()
    const pointDate = new Date(point.date)

    if (range === "YTD") {
      return pointDate.getFullYear() === now.getFullYear()
    } else if (range === "1Y") {
      const oneYearAgo = new Date()
      oneYearAgo.setFullYear(now.getFullYear() - 1)
      return pointDate >= oneYearAgo
    }

    return true
  })

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col md:flex-row">
      
      <div className="flex-1">
       
        <main className="p-4 space-y-6">
          <h1 className="text-xl font-semibold">Analytics Overview</h1>

          {/* Range Filter Buttons */}
          <div className="flex space-x-2 mb-4">
            {["1Y", "YTD", "All"].map((label) => (
              <button
                key={label}
                onClick={() => setRange(label)}
                className={`px-4 py-2 rounded-md border text-sm ${
                  range === label
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Equity Curve Chart */}
          <StrategyChart data={filteredData} title="Equity Curve (Analytics)" />

          {/* Summary Stats */}
          <SummaryStatsPanel stats={dummyStats} />

         
        </main>
      </div>
    </div>
  )
}

export default Analytics
