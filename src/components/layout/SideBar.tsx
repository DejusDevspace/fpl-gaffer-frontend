import React from "react";
import { FiSettings, FiHelpCircle, FiSun, FiMoon } from "react-icons/fi";
import {
  BsChatLeftDots,
  BsImage,
  BsCameraVideo,
  BsClockHistory,
} from "react-icons/bs";

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
      className={`h-screen w-72 border-r border-gray-200 flex flex-col justify-between ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center px-6 py-5 border-b border-gray-200">
          <div className="w-6 h-6 rounded-md bg-green-500 mr-2"></div>
          <h1 className="text-lg font-semibold">Relatus.AI</h1>
        </div>

        {/* Menu */}
        <nav className="mt-4">
          <ul className="space-y-1">
            <li className="px-6 py-2 flex items-center gap-3 font-medium bg-gray-100 rounded-r-full text-green-600">
              <BsChatLeftDots /> AI Chat
            </li>
            <li className="px-6 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
              <BsCameraVideo /> AI Video
            </li>
            <li className="px-6 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
              <BsImage /> AI Image
            </li>
            <li className="px-6 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
              <BsClockHistory /> History
            </li>
          </ul>
        </nav>

        {/* Recent Chat Section */}
        <div className="mt-6 border-t border-gray-200 pt-4 px-6">
          <p className="text-sm font-semibold mb-2 text-gray-500">
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
          <button className="mt-3 text-sm text-green-600 font-medium">
            Show More
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 px-6 py-4 space-y-4">
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
