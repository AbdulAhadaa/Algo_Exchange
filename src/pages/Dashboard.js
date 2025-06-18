// src/pages/Dashboard.js
import React, { useState } from "react";
import StrategyChart from "../components/StrategyChart";
import RecentStrategiesTable from "../components/RecentStrategiesTable";
import { sampleEquityData } from "../data/sampleEquityData.js";
import SummaryStatsPanel from "../components/SummaryStatsPanel";
import MonthlyROIHeatmap from "../components/MonthlyROIHeatmap";
import TradeLogTable from "../components/TradeLogTable.js";

const dummyStats = {
  profitFactor: 1.65,
  winRate: 58.3,
  totalTrades: 276,
  maxDrawdown: 12.7,
};

const Dashboard = () => {
  const [range, setRange] = useState("1Y");

  // Filter equity data based on range
  const filteredData = sampleEquityData.filter((point) => {
    const now = new Date();
    const pointDate = new Date(point.date);

    if (range === "YTD") {
      return pointDate.getFullYear() === now.getFullYear();
    } else if (range === "1Y") {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(now.getFullYear() - 1);
      return pointDate >= oneYearAgo;
    }

    return true; // "All"
  });

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-4">
        {["1Y", "YTD", "All"].map((label) => (
          <button
            key={label}
            onClick={() => setRange(label)}
            className={`px-4 py-2 rounded-md border text-sm ${
              range === label
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <StrategyChart data={filteredData} title="Your Current Strategy - Equity Curve " />
      <SummaryStatsPanel stats={dummyStats} />
      <MonthlyROIHeatmap />
      <TradeLogTable />
      <RecentStrategiesTable />
    </div>
  );
};

export default Dashboard;
