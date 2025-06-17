// src/components/MonthlyROIHeatmap.js
import React, { useState } from "react"
import { sampleMonthlyROIData } from "../data/sampleMonthlyROIData"
import { parseCSVtoROI } from "../utils/csvparser"

const months = [
  "Jan", "Feb", "Mar", "Apr",
  "May", "Jun", "Jul", "Aug",
  "Sep", "Oct", "Nov", "Dec"
]

const getColor = (value) => {
  if (value > 2) return "bg-green-500"
  if (value > 0) return "bg-green-300"
  if (value < -2) return "bg-red-500"
  if (value < 0) return "bg-red-300"
  return "bg-gray-200"
}

const MonthlyROIHeatmap = () => {
  const [roiData, setRoiData] = useState(sampleMonthlyROIData)
  const [selectedYear, setSelectedYear] = useState(Object.keys(roiData)[0])

  const handleCSVUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const csvText = e.target.result
      const parsedData = parseCSVtoROI(csvText)
      setRoiData(parsedData)
      setSelectedYear(Object.keys(parsedData)[0])
    }
    reader.readAsText(file)
  }

  return (
    <div className="bg-white p-4 border rounded shadow space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-800">Monthly ROI Heatmap</h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            {Object.keys(roiData).map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
          <input
            type="file"
            accept=".csv"
            onChange={handleCSVUpload}
            className="text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-2 text-center text-sm">
        {months.map((month) => {
          const value = roiData[selectedYear]?.[month]
          return (
            <div
              key={month}
              className={`rounded p-2 text-white ${getColor(value ?? 0)}`}
            >
              <div>{month}</div>
              <div className="font-bold">{value != null ? `${value.toFixed(1)}%` : "—"}</div>
            </div>
          )
        })}
      </div>

      {/* Color Legend */}
      <div className="text-xs text-gray-600 space-y-1">
        <div><span className="inline-block w-4 h-4 mr-2 bg-green-500" /> >2% gain</div>
        <div><span className="inline-block w-4 h-4 mr-2 bg-green-300" /> 0–2% gain</div>
        <div><span className="inline-block w-4 h-4 mr-2 bg-red-300" /> 0–2% loss</div>
        <div><span className="inline-block w-4 h-4 mr-2 bg-red-500" /> >2% loss</div>
        <div><span className="inline-block w-4 h-4 mr-2 bg-gray-200" /> No data</div>
      </div>
    </div>
  )
}

export default MonthlyROIHeatmap
