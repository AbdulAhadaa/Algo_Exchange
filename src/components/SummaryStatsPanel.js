import React from "react"

const SummaryStatsPanel = ({ stats }) => {
  const statBox =
    "flex flex-col items-center justify-center p-4 bg-white rounded shadow border border-gray-200"

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className={statBox}>
        <span className="text-sm text-gray-500">Profit Factor</span>
        <span className="text-xl font-bold text-green-600">
          {stats.profitFactor}
        </span>
      </div>
      <div className={statBox}>
        <span className="text-sm text-gray-500">Win Rate</span>
        <span className="text-xl font-bold text-green-600">
          {stats.winRate}%
        </span>
      </div>
      <div className={statBox}>
        <span className="text-sm text-gray-500">Total Trades</span>
        <span className="text-xl font-bold text-gray-800">
          {stats.totalTrades}
        </span>
      </div>
      <div className={statBox}>
        <span className="text-sm text-gray-500">Max Drawdown</span>
        <span className="text-xl font-bold text-red-600">
          {stats.maxDrawdown}%
        </span>
      </div>
    </div>
  )
}

export default SummaryStatsPanel
