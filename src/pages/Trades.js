// src/pages/Trades.js
import React from "react"
import TradeLogTable from "../components/TradeLogTable"

const Trades = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Trades</h1>
      <TradeLogTable />
    </div>
  )
}

export default Trades
