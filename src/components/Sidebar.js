import React from "react"
import {
  FaBars,
  FaTimes,
  FaChartLine,
  FaClipboardList,
  FaCogs,
  FaSignInAlt,
  FaChartPie,
  FaExchangeAlt,
} from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation()

  const handleMobileClick = () => {
    if (window.innerWidth < 768 && toggleSidebar) {
      toggleSidebar() // auto-close only on mobile
    }
  }

  const SidebarItem = ({ icon, label, to, small }) => (
    <Link
      to={to}
      onClick={handleMobileClick}
      className={`flex items-center space-x-3 px-2 py-2 rounded hover:bg-[#4a5568] cursor-pointer transition-all duration-150 ${
        small ? "ml-4 text-xs" : ""
      } ${location.pathname === to ? "bg-[#4a5568]" : ""}`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )

  return (
    <>
      {/* Mobile Topbar */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-[#2d3748] text-white sticky top-0 z-50">
      <Link to="/analytics">
        <div className="text-xl font-bold " >
          <span className="text-green-400">ALGO</span> EXCHANGE
        </div>
        </Link>
        <button onClick={toggleSidebar}>
          {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:sticky top-0 left-0 h-full md:h-screen w-64 bg-[#2d3748] text-white flex-col z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:flex`}
      >
        {/* Logo */}
        <div className="p-6 text-2xl font-bold border-b border-gray-600 hidden md:block">
          <span className="text-green-400">ALGO</span> EXCHANGE
        </div>

        {/* Welcome */}
        <div className="p-4 text-sm text-gray-300">
          WELCOME BACK<br />
          <span className="font-bold">Demo</span>
        </div>

        {/* Links */}
        <nav className="flex-1 px-4 space-y-2 text-sm overflow-y-auto pb-4">
          <SidebarItem icon={<FaChartLine />} label="Dashboard" to="/dashboard" />
          <SidebarItem icon={<FaChartPie />} label="Analytics" to="/analytics" />
          <SidebarItem icon={<FaExchangeAlt />} label="Trades" to="/trades" />
          <SidebarItem icon={<FaClipboardList />} label="My Watch List" to="#" />
          <SidebarItem icon={<FaCogs />} label="System Selector" to="#" />
          <SidebarItem icon={<FaSignInAlt />} label="Open Broker Account" to="#" />

          <div>
            <p className="text-gray-400 uppercase text-xs mt-4 mb-1">AutoTrade</p>
            <SidebarItem icon={<FaCogs />} label="AutoTrade Control Panel" to="#" small />
            <SidebarItem icon={<FaClipboardList />} label="Manage Positions" to="#" small />
            <SidebarItem icon={<FaChartLine />} label="P/L Report" to="#" small />
          </div>
        </nav>
      </div>
    </>
  )
}

export default Sidebar
