import React, { useState, useMemo } from "react"

import StrategyChart from "../components/StrategyChart"
import { sampleStrategies } from "../data/analyticsData"



const filterDataByRange = (data, range) => {
  const now = new Date()
  return data.filter((point) => {
    const pointDate = new Date(point.date)
    if (range === "YTD") {
      return pointDate.getFullYear() === now.getFullYear()
    } else if (range === "1Y") {
      const oneYearAgo = new Date()
      oneYearAgo.setFullYear(now.getFullYear() - 1)
      return pointDate >= oneYearAgo
    }
    return true // All
  })
}

const calculateStats = (data) => {
  if (!data || data.length < 2) return { pnl: 0, winRate: 0, drawdown: 0 }

  const trades = data.slice(1).map((d, i) => d.equity - data[i].equity)
  const wins = trades.filter((p) => p > 0).length
  const losses = trades.filter((p) => p < 0).length
  const pnl = data[data.length - 1].equity - data[0].equity
  const maxEquity = Math.max(...data.map((d) => d.equity))
  const minEquity = Math.min(...data.map((d) => d.equity))
  const drawdown = maxEquity > 0 ? ((maxEquity - minEquity) / maxEquity) * 100 : 0

  return {
    pnl: pnl.toFixed(2),
    winRate: ((wins / (wins + losses)) * 100).toFixed(1),
    drawdown: drawdown.toFixed(1),
  }
}

const Analytics = () => {
  const [filters, setFilters] = useState(
    Object.keys(sampleStrategies).reduce((acc, key) => {
      acc[key] = "1Y"
      return acc
    }, {})
  )

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col md:flex-row">
     
      <div className="flex-1">
      
        <main className="p-4 space-y-6">
          <h2 className="text-xl font-semibold mb-4">Analytics by Strategy</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(sampleStrategies).map(([strategyName, equityData]) => {
              const range = filters[strategyName]
              const filteredData = filterDataByRange(equityData, range)
              const stats = calculateStats(filteredData)

              return (
                <div key={strategyName} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                  {/* Tabs */}
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-md font-semibold">{strategyName}</h3>
                    <div className="flex space-x-1">
                      {["1Y", "YTD", "All"].map((label) => (
                        <button
                          key={label}
                          onClick={() => setFilters((prev) => ({ ...prev, [strategyName]: label }))}
                          className={`px-3 py-1 text-xs rounded border ${
                            range === label
                              ? "bg-green-500 text-white"
                              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Chart */}
                  <StrategyChart data={filteredData} title="" />

                  {/* Stats */}
                  <div className="mt-3 text-sm grid grid-cols-3 gap-4 text-center text-gray-800 dark:text-gray-200">
                    <div>
                      <div className="font-medium">PnL</div>
                      <div className="text-green-500">${stats.pnl}</div>
                    </div>
                    <div>
                      <div className="font-medium">Win Rate</div>
                      <div>{stats.winRate}%</div>
                    </div>
                    <div>
                      <div className="font-medium">Drawdown</div>
                      <div className="text-red-500">{stats.drawdown}%</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Analytics
