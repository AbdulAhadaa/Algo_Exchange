import React from "react";

const Topbar = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
      <input
        type="text"
        placeholder="Type strategy name, ticker, instrument (e.g. futures)..."
        className="w-full sm:w-1/2 px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 mb-3 sm:mb-0"
      />
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm text-gray-600">
        <div className="text-right mb-2 sm:mb-0">
          <div>Demo Account</div>
          <div className="text-xs text-gray-400">Last visit: Today</div>
        </div>
       
      </div>
    </div>
  );
};

export default Topbar;
