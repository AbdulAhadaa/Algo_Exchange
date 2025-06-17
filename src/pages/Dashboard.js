// src/pages/Dashboard.js
import React from "react"
import Topbar from "../components/Topbar"
import Sidebar from "../components/Sidebar"
import StrategyChart from "../components/StrategyChart"
import RecentStrategiesTable from "../components/RecentStrategiesTable"

// Dummy data (can be moved to separate file)
const strategiesData = [
  {
    name: "Alpha Scalper",
    ticker: "AAPL",
    type: "Equity",
    asset: "Stocks",
    market: "NASDAQ",
    trades: 35,
    winRate: "68%",
    pnl: "+12.5%",
    status: "Active",
  },
  {
    name: "Mean Reversion X",
    ticker: "TSLA",
    type: "Options",
    asset: "Stocks",
    market: "NASDAQ",
    trades: 50,
    winRate: "55%",
    pnl: "-5.2%",
    status: "Inactive",
  },
  {
    name: "Momentum Trend",
    ticker: "BTC",
    type: "Futures",
    asset: "Crypto",
    market: "Binance",
    trades: 28,
    winRate: "72%",
    pnl: "+19.3%",
    status: "Active",
  },
  {
    name: "Breakout Bot",
    ticker: "AMZN",
    type: "Crypto",
    asset: "Crypto",
    market: "Coinbase",
    trades: 18,
    winRate: "61%",
    pnl: "+6.8%",
    status: "Active",
  },
]

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <main className="p-4 space-y-6">
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StrategyChart data={strategiesData} type="pnl" />
            <StrategyChart data={strategiesData} type="winRate" />
          </div>

          {/* Table Section */}
          <RecentStrategiesTable />
        </main>
      </div>
    </div>
  )
}

export default Dashboard
