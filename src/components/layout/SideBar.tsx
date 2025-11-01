import React from "react";
import { FiSettings, FiHelpCircle, FiSun, FiMoon } from "react-icons/fi";
import { BsChatLeftDots, BsClockHistory, BsGraphDown } from "react-icons/bs";

interface SidebarProps {
  darkMode?: boolean;
  onToggleTheme?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  darkMode = false,
  onToggleTheme,
}) => {
  return (
    <aside
      className={`h-screen w-72 rounded-r-3xl border-r border-accent/75 flex flex-col justify-between ${
        darkMode ? "bg-gray-900 text-white" : "bg-background text-primary"
      }`}
    >
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center px-6 py-5 border-b border-accent/40">
          <div className="w-6 h-6 rounded-md bg-accent/40 mr-2"></div>
          <h1 className="text-lg font-semibold">FPL Gaffer</h1>
        </div>

        {/* Menu */}
        <nav className="mt-4">
          <ul className="space-y-1">
            <li className="px-6 py-2 flex items-center gap-3 font-medium bg-aux/70 rounded-r-full text-green-600 cursor-pointer">
              <BsChatLeftDots /> Chat with Gaffer
            </li>
            <li className="px-6 py-2 flex items-center gap-3 hover:bg-aux/70 cursor-pointer">
              <BsGraphDown /> Dashboard
            </li>
            {/* <li className="px-6 py-2 flex items-center gap-3 hover:bg-aux/70 cursor-pointer">
              <BsImage /> Leagues
            </li> */}
            <li className="px-6 py-2 flex items-center gap-3 hover:bg-aux/70 cursor-pointer">
              <BsClockHistory /> History
            </li>
          </ul>
        </nav>

        {/* Recent Chat Section */}
        <div className="mt-6 border-t border-accent/40 pt-4 px-6">
          <p className="text-sm font-semibold mb-2 text-primary/70">
            Recent Chat
          </p>
          <ul className="space-y-2">
            <li className="text-sm text-gray-700 truncate">
              New Design Ideas for Work...
            </li>
            <li className="text-sm text-gray-700 truncate">
              Smoothie Recipe Suggesti...
            </li>
            <li className="text-sm text-gray-700 truncate">
              Tips for Daily Productivi...
            </li>
          </ul>
          <button className="mt-3 text-sm text-green-600 font-medium cursor-pointer">
            Show More
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-accent/40 px-6 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiSettings /> <span>Settings</span>
          </div>
          <div className="flex items-center gap-3">
            <FiHelpCircle /> <span>Help</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={onToggleTheme}
            className="flex items-center gap-2 text-sm font-medium"
          >
            {darkMode ? (
              <>
                <FiSun /> <span>Light</span>
              </>
            ) : (
              <>
                <FiMoon /> <span>Dark</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <img
            src="https://i.pravatar.cc/40"
            alt="User avatar"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">Jenny Wilson</p>
            <p className="text-xs text-gray-500">jenny@gmail.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
