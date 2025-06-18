import React, { useState, useMemo } from "react";
import { sampleTradeLog } from "../data/sampleTradeLog";
import { motion, AnimatePresence } from "framer-motion";

const TradeLogTable = () => {
  const [trades] = useState(sampleTradeLog);
  const [searchTerm, setSearchTerm] = useState("");
  const [brokerFilter, setBrokerFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expandedRows, setExpandedRows] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = useMemo(() => {
    return trades.filter((trade) => {
      const tradeDate = new Date(trade.timestamp);
      const isWithinRange =
        (!startDate || new Date(startDate) <= tradeDate) &&
        (!endDate || tradeDate <= new Date(endDate));

      const matchesSearch =
        !searchTerm ||
        trade.symbol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trade.broker?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBroker =
        !brokerFilter ||
        (trade.broker || "").toLowerCase() === brokerFilter.toLowerCase();

      return isWithinRange && matchesSearch && matchesBroker;
    });
  }, [trades, searchTerm, startDate, endDate, brokerFilter]);

  const brokers = [...new Set(sampleTradeLog.map((trade) => trade.broker))];

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleExpand = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setBrokerFilter("");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4">Trade Log</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-5">
        <input
          type="text"
          placeholder="Search by symbol"
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded px-3 py-1 w-44"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={brokerFilter}
          onChange={(e) => setBrokerFilter(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded px-3 py-1 w-44"
        >
          <option value="">Filter by Broker</option>
          {brokers.map((broker) => (
            <option key={broker} value={broker}>
              {broker}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded px-3 py-1 w-40"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded px-3 py-1 w-40"
        />
        <button
          onClick={clearFilters}
          className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-sm px-4 py-1 rounded border border-gray-300 dark:border-gray-600"
        >
          Clear Filters
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase">
            <tr className="text-gray-600 dark:text-gray-300">
              <th className="px-4 py-2">Symbol</th>
              <th className="px-4 py-2">Broker</th>
              <th className="px-4 py-2">Side</th>
              <th className="px-4 py-2">Qty</th>
              <th className="px-4 py-2">Entry</th>
              <th className="px-4 py-2">Exit</th>
              <th className="px-4 py-2">PnL</th>
              <th className="px-4 py-2">Drawdown</th>
              <th className="px-4 py-2">Timestamp</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {paginatedData.map((trade) => (
                <React.Fragment key={trade.id}>
                  <motion.tr
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-2">{trade.symbol}</td>
                    <td className="px-4 py-2">{trade.broker}</td>
                    <td className="px-4 py-2">{trade.side}</td>
                    <td className="px-4 py-2">{trade.quantity}</td>
                    <td className="px-4 py-2">${trade.entryPrice.toFixed(2)}</td>
                    <td className="px-4 py-2">${trade.exitPrice.toFixed(2)}</td>
                    <td
                      className={`px-4 py-2 font-semibold ${
                        trade.pnl >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-500"
                      }`}
                    >
                      ${trade.pnl.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-red-500">
                      {trade.drawdown ? `${trade.drawdown}%` : "-"}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(trade.timestamp).toLocaleString()}
                    </td>
                    <td className="px-2">
                      {trade.fills?.length > 0 && (
                        <button
                          onClick={() => toggleExpand(trade.id)}
                          aria-expanded={!!expandedRows[trade.id]}
                          aria-controls={`fills-${trade.id}`}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {expandedRows[trade.id] ? "Hide Fills" : "Show Fills"}
                        </button>
                      )}
                    </td>
                  </motion.tr>
                  {expandedRows[trade.id] && (
                    <motion.tr
                      key={`${trade.id}-fills`}
                      id={`fills-${trade.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-50 dark:bg-gray-700"
                    >
                      <td colSpan="10" className="px-4 py-3">
                        <div className="text-sm">
                          <strong>Fills:</strong>
                          <ul className="list-disc ml-5 mt-1">
                            {trade.fills.map((fill, index) => (
                              <li key={index}>
                                {fill.qty} @ ${fill.price} on {fill.time}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </React.Fragment>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <motion.button
            whileTap={{ scale: 0.95 }}
            key={i}
            onClick={() => handlePageChange(i + 1)}
            disabled={currentPage === i + 1}
            className={`px-3 py-1 rounded border transition duration-200 ${
              currentPage === i + 1
                ? "bg-green-500 text-white border-green-500 cursor-not-allowed"
                : "bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
          >
            {i + 1}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TradeLogTable;
