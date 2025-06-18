import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  {
    name: "Scalp AI",
    ticker: "MSFT",
    type: "Equity",
    asset: "Stocks",
    market: "NASDAQ",
    trades: 40,
    winRate: "63%",
    pnl: "+8.9%",
    status: "Active",
  },
  {
    name: "Range Blaster",
    ticker: "ETH",
    type: "Futures",
    asset: "Crypto",
    market: "Binance",
    trades: 22,
    winRate: "49%",
    pnl: "-3.1%",
    status: "Inactive",
  },
];

const PAGE_SIZE = 3;

const RecentStrategiesTable = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [asset, setAsset] = useState("All");
  const [market, setMarket] = useState("All");
  const [status, setStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = strategiesData.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.ticker.toLowerCase().includes(search.toLowerCase());
    const matchesType = type === "All" || s.type === type;
    const matchesAsset = asset === "All" || s.asset === asset;
    const matchesMarket = market === "All" || s.market === market;
    const matchesStatus = status === "All" || s.status === status;
    return (
      matchesSearch && matchesType && matchesAsset && matchesMarket && matchesStatus
    );
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const resetFilters = () => {
    setSearch("");
    setType("All");
    setAsset("All");
    setMarket("All");
    setStatus("All");
    setCurrentPage(1);
  };

  const paginate = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6 transition-colors duration-300">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Recent Strategies
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 flex-wrap">
        {/* Search */}
        <input
          type="text"
          placeholder="Search strategy or ticker"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />

        {/* Dropdowns */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {[
            ["type", type, setType, ["All", "Equity", "Options", "Futures", "Crypto"]],
            ["asset", asset, setAsset, ["All", "Stocks", "Crypto"]],
            ["market", market, setMarket, ["All", "NASDAQ", "Binance", "Coinbase"]],
          ].map(([key, value, setter, options]) => (
            <motion.select
              key={key}
              value={value}
              onChange={(e) => {
                setter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
              whileFocus={{ scale: 1.02 }}
            >
              {options.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </motion.select>
          ))}
        </div>

        {/* Status Tabs + Clear */}
        <div className="flex flex-wrap gap-2">
          {["All", "Active", "Inactive"].map((s) => (
            <motion.button
              key={s}
              onClick={() => {
                setStatus(s);
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200 ${
                status === s
                  ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-500"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {s}
            </motion.button>
          ))}

          {(search || type !== "All" || asset !== "All" || market !== "All" || status !== "All") && (
            <motion.button
              onClick={resetFilters}
              className="ml-2 px-3 py-1 rounded-full text-sm border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              Clear Filters
            </motion.button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300 uppercase text-xs">
            <tr>
              {["Name", "Ticker", "Type", "Asset", "Market", "Trades", "Win %", "P/L", "Status"].map((h) => (
                <th key={h} className="px-4 py-2 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <AnimatePresence>
            <tbody>
              {paginated.map((s, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className={`${
                    index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"
                  } border-b border-gray-200 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-green-900 transition-all`}
                >
                  <td className="px-4 py-2 font-medium">{s.name}</td>
                  <td className="px-4 py-2">{s.ticker}</td>
                  <td className="px-4 py-2">{s.type}</td>
                  <td className="px-4 py-2">{s.asset}</td>
                  <td className="px-4 py-2">{s.market}</td>
                  <td className="px-4 py-2">{s.trades}</td>
                  <td className="px-4 py-2">{s.winRate}</td>
                  <td className={`px-4 py-2 font-semibold ${s.pnl.startsWith("-") ? "text-red-500" : "text-green-600"}`}>
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
                </motion.tr>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center px-4 py-6 text-gray-500 dark:text-gray-400">
                    No matching strategies found.
                  </td>
                </tr>
              )}
            </tbody>
          </AnimatePresence>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {[...Array(totalPages)].map((_, i) => (
          <motion.button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-3 py-1 rounded-md text-sm font-medium border ${
              currentPage === i + 1
                ? "bg-green-500 text-white border-green-500"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"
            } hover:scale-105 transition`}
            whileTap={{ scale: 0.95 }}
          >
            {i + 1}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default RecentStrategiesTable;
