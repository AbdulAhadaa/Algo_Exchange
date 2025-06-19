import React, { useMemo } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import StrategyChart from "../components/StrategyChart"
import { generateSampleEquityData } from "../data/analyticsData"

const strategies = ["Momentum", "Mean Reversion", "Breakout", "Swing", "Scalping"]

const Analytics = () => {
  // Generate and memoize data for each strategy (runs only once)
  const strategyDataMap = useMemo(() => {
    const dataMap = {}
    strategies.forEach((strategy) => {
      dataMap[strategy] = generateSampleEquityData()
    })
    return dataMap
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col md:flex-row">
    
      <div className="flex-1">
   
        <main className="p-4 space-y-6">
          <h2 className="text-xl font-semibold mb-4">Strategy Analytics</h2>

          {/* Responsive grid of charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategies.map((strategy) => (
              <StrategyChart
                key={strategy}
                data={strategyDataMap[strategy]}
                title={`${strategy} Strategy - Equity Curve`}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Analytics
