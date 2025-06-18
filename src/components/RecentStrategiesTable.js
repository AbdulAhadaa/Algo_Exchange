import React, { useState } from "react"

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

const RecentStrategiesTable = () => {
  const [search, setSearch] = useState("")
  const [type, setType] = useState("All")
  const [asset, setAsset] = useState("All")
  const [market, setMarket] = useState("All")
  const [status, setStatus] = useState("All")

  const filteredStrategies = strategiesData.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.ticker.toLowerCase().includes(search.toLowerCase())

    const matchesType = type === "All" || s.type === type
    const matchesAsset = asset === "All" || s.asset === asset
    const matchesMarket = market === "All" || s.market === market
    const matchesStatus = status === "All" || s.status === status

    return (
      matchesSearch &&
      matchesType &&
      matchesAsset &&
      matchesMarket &&
      matchesStatus
    )
  })

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 transition-colors duration-300">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Recent Strategies
      </h2>

      {/* Filters Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 flex-wrap">
        {/* Search */}
        <input
          type="text"
          placeholder="Search strategy or ticker"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/4 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />

        {/* Dropdowns */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {[
            ["type", type, setType, ["All", "Equity", "Options", "Futures", "Crypto"]],
            ["asset", asset, setAsset, ["All", "Stocks", "Crypto"]],
            ["market", market, setMarket, ["All", "NASDAQ", "Binance", "Coinbase"]],
          ].map(([key, value, setter, options]) => (
            <select
              key={key}
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            >
              {options.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          ))}
        </div>

        {/* Status Tabs + Clear Button */}
        <div className="flex flex-wrap gap-2">
          {["All", "Active", "Inactive"].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
                status === s
                  ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-500"
                  : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"
              }`}
            >
              {s}
            </button>
          ))}

          {(search || type !== "All" || asset !== "All" || market !== "All" || status !== "All") && (
            <button
              onClick={() => {
                setSearch("")
                setType("All")
                setAsset("All")
                setMarket("All")
                setStatus("All")
              }}
              className="ml-2 px-3 py-1 rounded-full text-sm border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200 transition">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 uppercase text-xs whitespace-nowrap">
            <tr>
              {["Name", "Ticker", "Type", "Asset", "Market", "Trades", "Win %", "P/L", "Status"].map((h) => (
                <th key={h} className="px-4 py-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredStrategies.map((s, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"
                } border-b border-gray-200 dark:border-gray-600 whitespace-nowrap transition`}
              >
                <td className="px-4 py-2 font-medium text-gray-900 dark:text-gray-100">{s.name}</td>
                <td className="px-4 py-2">{s.ticker}</td>
                <td className="px-4 py-2">{s.type}</td>
                <td className="px-4 py-2">{s.asset}</td>
                <td className="px-4 py-2">{s.market}</td>
                <td className="px-4 py-2">{s.trades}</td>
                <td className="px-4 py-2">{s.winRate}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    s.pnl.startsWith("-") ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {s.pnl}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      s.status === "Active"
                        ? "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300"
                        : "bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-300"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}

            {filteredStrategies.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center px-4 py-6 text-gray-500 dark:text-gray-400">
                  No matching strategies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentStrategiesTable
