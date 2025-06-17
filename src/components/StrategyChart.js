// src/components/StrategyChart.js
import React from "react"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const StrategyChart = ({ data, type = "pnl" }) => {
  const labels = data.map((s) => s.name)

  const chartData = {
    labels,
    datasets: [
      {
        label: type === "winRate" ? "Win Rate (%)" : "P/L (%)",
        data: data.map((s) =>
          type === "winRate"
            ? parseFloat(s.winRate.replace("%", ""))
            : parseFloat(s.pnl.replace("%", ""))
        ),
        backgroundColor: data.map((s) =>
          s.pnl.startsWith("-") ? "#ef4444" : "#10b981"
        ),
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (val) => `${val}%`,
        },
      },
    },
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {type === "winRate" ? "Strategy Win Rate" : "Strategy P&L"}
      </h2>
      <Bar data={chartData} options={options} />
    </div>
  )
}

export default StrategyChart
