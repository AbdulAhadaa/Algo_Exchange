import React, { useEffect, useState } from "react"
import { format } from "date-fns"
import sampleTrades from "../data/sampleTradeLog"

const TradeLogTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
const [selectedBroker, setSelectedBroker] = useState("")

  // Date filtering
const filteredTrades = sampleTrades.filter((trade) => {
  const tradeDate = new Date(trade.timestamp).setHours(0, 0, 0, 0)
  const from = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null
  const to = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null

  const matchesDate = (!from || tradeDate >= from) && (!to || tradeDate <= to)
  const matchesBroker = !selectedBroker || trade.broker === selectedBroker

  return matchesDate && matchesBroker
})



  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentTrades = filteredTrades.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredTrades.length / itemsPerPage)
useEffect(() => {
  setCurrentPage(1)
}, [startDate, endDate, selectedBroker])

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Trade Log</h2>

      {/* Date Range Filter */}
  <div className="flex flex-wrap gap-4 mb-5">
  {/* Start Date */}
  <input
    type="date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    placeholder="Start Date"
    className="border border-gray-300 rounded px-3 py-1 text-sm w-full sm:w-auto placeholder-gray-400"
  />

  {/* End Date */}
  <input
    type="date"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
    placeholder="End Date"
    className="border border-gray-300 rounded px-3 py-1 text-sm w-full sm:w-auto placeholder-gray-400"
  />
</div>

<select
  className="border rounded px-3 py-2 text-sm mb-4"
  value={selectedBroker}
  onChange={(e) => setSelectedBroker(e.target.value)}
>
  <option value="">All Brokers</option>
  {[...new Set(sampleTrades.map((trade) => trade.broker))].map((broker) => (
    <option key={broker} value={broker}>
      {broker}
    </option>
  ))}
</select>
<button
  onClick={() => {
    setStartDate("")
    setEndDate("")
    setSelectedBroker("")
  }}
  className="bg-gray-200 text-gray-700 mx-2 px-4 py-2 rounded text-sm hover:bg-gray-300 transition"
>
  Reset Filters
</button>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="hidden md:table w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100">
            <tr>
              <th className="px-4 py-2">Broker</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Side</th>
              <th className="px-4 py-2">Qty</th>
              <th className="px-4 py-2">Entry</th>
              <th className="px-4 py-2">Exit</th>
              <th className="px-4 py-2">PnL</th>
              <th className="px-4 py-2">Drawdown</th>
            </tr>
          </thead>
          <tbody>
            {currentTrades.map((trade, i) => (
              <tr key={i} className="border-b">
                <td className="px-4 py-2">{trade.broker}</td>
                <td className="px-4 py-2">{format(new Date(trade.timestamp), "MM-dd-yyyy")}</td>
                
                <td className="px-4 py-2">{trade.side}</td>
                <td className="px-4 py-2">{trade.quantity}</td>
                <td className="px-4 py-2">${trade.entryPrice}</td>
                <td className="px-4 py-2">${trade.exitPrice}</td>
                <td className="px-4 py-2 text-green-600">${trade.pnl}</td>
                <td className="px-4 py-2 text-red-500">{trade.drawdown}%</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile layout */}
        <div className="md:hidden space-y-4">
          {currentTrades.map((trade, i) => (
            <div key={i} className="border border-gray-200 rounded p-3 shadow-sm">
              <div className="font-semibold">{trade.broker}</div>
              <div className="text-sm text-gray-600">{format(new Date(trade.timestamp), "PPpp")}</div>
              <div className="mt-2">
                <p><strong>Side:</strong> {trade.side}</p>
                <p><strong>Qty:</strong> {trade.quantity}</p>
                <p><strong>Entry:</strong> ${trade.entryPrice}</p>
                <p><strong>Exit:</strong> ${trade.exitPrice}</p>
                <p><strong>PnL:</strong> <span className="text-green-600">${trade.pnl}</span></p>
                <p><strong>Drawdown:</strong> <span className="text-red-500">{trade.drawdown}%</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className="space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default TradeLogTable
