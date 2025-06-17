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
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
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
          className="w-full sm:w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Dropdowns */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {/* Type */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {["All", "Equity", "Options", "Futures", "Crypto"].map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>

          {/* Asset */}
          <select
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {["All", "Stocks", "Crypto"].map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>

          {/* Market */}
          <select
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {["All", "NASDAQ", "Binance", "Coinbase"].map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Status Tabs + Clear Button */}
        <div className="flex flex-wrap gap-2">
          {["All", "Active", "Inactive"].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-3 py-1 rounded-full text-sm font-medium border ${
                status === s
                  ? "bg-green-100 text-green-700 border-green-500"
                  : "bg-white text-gray-600 border-gray-300"
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
              className="ml-2 px-3 py-1 rounded-full text-sm border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-500 uppercase text-xs whitespace-nowrap">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Ticker</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Asset</th>
              <th className="px-4 py-2">Market</th>
              <th className="px-4 py-2">Trades</th>
              <th className="px-4 py-2">Win %</th>
              <th className="px-4 py-2">P/L</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStrategies.map((s, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border-b whitespace-nowrap`}
              >
                <td className="px-4 py-2 font-medium text-gray-900">{s.name}</td>
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
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}

            {filteredStrategies.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center px-4 py-6 text-gray-500">
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
