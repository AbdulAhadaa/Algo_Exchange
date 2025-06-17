import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaChartLine,
  FaClipboardList,
  FaCogs,
  FaSignInAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Topbar to toggle sidebar */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-[#2d3748] text-white sticky top-0 z-50">
        <div className="text-xl font-bold">
          <span className="text-green-400">ALGO</span> EXCHANGE
        </div>
        <button onClick={toggleSidebar}>
          {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:sticky top-0 left-0 h-full md:h-screen w-64 bg-[#2d3748] text-white flex-col z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:flex`}
      >
        {/* Logo (desktop only) */}
        <div className="p-6 text-2xl font-bold border-b border-gray-600 hidden md:block">
          <span className="text-green-400">ALGO</span> EXCHANGE
        </div>

        {/* Welcome section */}
        <div className="p-4 text-sm text-gray-300">
          WELCOME BACK<br />
          <span className="font-bold">Demo</span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-4 space-y-2 text-sm overflow-y-auto pb-4">
          <SidebarItem icon={<FaChartLine />} label="Dashboard" />
          <SidebarItem icon={<FaClipboardList />} label="My Watch List" />
          <SidebarItem icon={<FaCogs />} label="System Selector" />
          <SidebarItem icon={<FaSignInAlt />} label="Open Broker Account" />

          <div>
            <p className="text-gray-400 uppercase text-xs mt-4 mb-1">AutoTrade</p>
            <SidebarItem icon={<FaCogs />} label="AutoTrade Control Panel" small />
            <SidebarItem icon={<FaClipboardList />} label="Manage Positions" small />
            <SidebarItem icon={<FaChartLine />} label="P/L Report" small />
          </div>
        </nav>
      </div>
    </>
  );
};

const SidebarItem = ({ icon, label, small }) => (
  <div
    className={`flex items-center space-x-3 px-2 py-2 rounded hover:bg-[#4a5568] cursor-pointer transition-all duration-150 ${
      small ? "ml-4 text-xs" : ""
    }`}
  >
    {icon}
    <span>{label}</span>
  </div>
);

export default Sidebar;
