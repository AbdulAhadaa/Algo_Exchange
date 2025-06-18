import React from "react"

const SummaryStatsPanel = ({ stats }) => {
  const statBox =
    "flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded shadow border border-gray-200 dark:border-gray-700 transition-colors duration-300"

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className={statBox}>
        <span className="text-sm text-gray-500 dark:text-gray-400">Profit Factor</span>
        <span className="text-xl font-bold text-green-600 dark:text-green-400">
          {stats.profitFactor}
        </span>
      </div>
      <div className={statBox}>
        <span className="text-sm text-gray-500 dark:text-gray-400">Win Rate</span>
        <span className="text-xl font-bold text-green-600 dark:text-green-400">
          {stats.winRate}%
        </span>
      </div>
      <div className={statBox}>
        <span className="text-sm text-gray-500 dark:text-gray-400">Total Trades</span>
        <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
          {stats.totalTrades}
        </span>
      </div>
      <div className={statBox}>
        <span className="text-sm text-gray-500 dark:text-gray-400">Max Drawdown</span>
        <span className="text-xl font-bold text-red-600 dark:text-red-400">
          {stats.maxDrawdown}%
        </span>
      </div>
    </div>
  )
}

export default SummaryStatsPanel
