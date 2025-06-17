import React, { useState } from "react"
import { sampleTradeLog } from "../data/sampleTradeLog"

const TradeLogTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState("")
  const itemsPerPage = 10

  const filteredTrades = sampleTradeLog.filter((trade) =>
    trade.broker.toLowerCase().includes(filter.toLowerCase())
  )

  const totalPages = Math.ceil(filteredTrades.length / itemsPerPage)
  const currentTrades = filteredTrades.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 overflow-x-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h2 className="text-lg font-semibold text-gray-800">Trade Log</h2>
        <input
          type="text"
          placeholder="Filter by Broker"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value)
            setCurrentPage(1)
          }}
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full md:w-64"
        />
      </div>

      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase">
          <tr>
            <th className="px-4 py-2">Broker</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Side</th>
            <th className="px-4 py-2">Qty</th>
            <th className="px-4 py-2">Entry</th>
            <th className="px-4 py-2">Exit</th>
            <th className="px-4 py-2">PnL</th>
            <th className="px-4 py-2">Drawdown</th>
          </tr>
        </thead>
        <tbody>
          {currentTrades.map((trade, idx) => (
            <tr key={idx} className="border-b last:border-0">
              <td className="px-4 py-2">{trade.broker}</td>
              <td className="px-4 py-2 whitespace-nowrap">{trade.timestamp}</td>
              <td className="px-4 py-2">{trade.side}</td>
              <td className="px-4 py-2">{trade.quantity}</td>
              <td className="px-4 py-2">${trade.entryPrice}</td>
              <td className="px-4 py-2">${trade.exitPrice}</td>
              <td className="px-4 py-2 text-green-600 font-medium">
                ${trade.pnl.toFixed(2)}
              </td>
              <td className="px-4 py-2 text-red-600">
                ${trade.drawdown.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredTrades.length)}–
          {Math.min(currentPage * itemsPerPage, filteredTrades.length)} of{" "}
          {filteredTrades.length}
        </span>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-100 text-sm rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-100 text-sm rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default TradeLogTable
