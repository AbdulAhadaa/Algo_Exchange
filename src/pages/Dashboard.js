import React, { useState } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import StrategyChart from "../components/StrategyChart"
import RecentStrategiesTable from "../components/RecentStrategiesTable"
import { sampleEquityData } from "../data/sampleEquityData" // we'll create this next

const Dashboard = () => {
  const [range, setRange] = useState("1Y")

  // Filter equity data based on range
  const filteredData = sampleEquityData.filter((point) => {
    const now = new Date()
    const pointDate = new Date(point.date)

    if (range === "YTD") {
      return pointDate.getFullYear() === now.getFullYear()
    } else if (range === "1Y") {
      const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1))
      return pointDate >= oneYearAgo
    }
    return true // "All"
  })

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <main className="p-4 space-y-6">
          {/* Filter Tabs */}
          <div className="flex space-x-2 mb-4">
            {["1Y", "YTD", "All"].map((label) => (
              <button
                key={label}
                onClick={() => setRange(label)}
                className={`px-4 py-2 rounded-md border text-sm ${
                  range === label
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <StrategyChart data={filteredData} />

          <RecentStrategiesTable />
        </main>
      </div>
    </div>
  )
}

export default Dashboard
