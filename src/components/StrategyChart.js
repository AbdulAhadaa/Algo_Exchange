import React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

const StrategyChart = ({ data, title }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4 transition-colors duration-300 w-full">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            strokeOpacity={0.3}
          />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#6b7280" }} // gray-500
            axisLine={{ stroke: "#d1d5db" }} // gray-300
            tickLine={{ stroke: "#d1d5db" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={{ stroke: "#d1d5db" }}
            tickLine={{ stroke: "#d1d5db" }}
          />
          <Tooltip
            formatter={(value) =>
              `$${value.toFixed ? value.toFixed(2) : value}`
            }
            labelStyle={{ fontSize: 12 }}
            contentStyle={{
              fontSize: 12,
              backgroundColor: "#1f2937", // dark gray
              borderColor: "#4b5563", // dark border
              color: "#f9fafb", // light text
            }}
            wrapperStyle={{ zIndex: 50 }}
          />
          <Line
            type="monotone"
            dataKey="equity"
            stroke="#10b981" // emerald-500
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StrategyChart
