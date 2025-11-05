import React from "react";
import { FiSettings, FiHelpCircle, FiSun, FiMoon } from "react-icons/fi";
import {
  BsChatLeftDots,
  BsClockHistory,
  BsGraphDown,
  BsTrophy,
  BsQuestionCircleFill,
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
      className={`fixed left-0 top-0 h-screen w-72 rounded-r-2xl border-r border-aux flex flex-col justify-between ${
        darkMode ? "bg-gray-900 text-white" : "bg-surface text-primary"
      }`}
    >
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center px-6 py-5 border-b border-aux">
          <div className="w-6 h-6 rounded-md bg-accent/50 mr-2"></div>
          <h1 className="text-lg font-semibold text-primary">FPL Gaffer</h1>
        </div>

        {/* Menu */}
        <nav className="mt-4">
          <ul className="space-y-1">
            <li className="px-6 py-2 flex items-center gap-3 font-medium bg-aux/80 rounded-r-full text-greenAccent cursor-pointer">
              <BsChatLeftDots /> Chat with Gaffer
            </li>
            <li className="px-6 py-2 flex items-center gap-3 hover:bg-aux/80 cursor-pointer text-primary">
              <BsGraphDown /> Dashboard
            </li>
            <li className="px-6 py-2 flex items-center gap-3 hover:bg-aux/80 cursor-pointer text-primary">
              <BsTrophy /> Leagues
            </li>
            <li className="px-6 py-2 flex items-center gap-3 hover:bg-aux/80 cursor-pointer text-primary">
              <BsClockHistory /> History
            </li>
            <li className="px-6 py-2 flex items-center gap-3 hover:bg-aux/80 cursor-pointer text-primary">
              <BsQuestionCircleFill /> Help
            </li>
          </ul>
        </nav>

        {/* Recent Chat Section */}
        <div className="mt-6 border-t border-aux pt-4 px-6">
          <p className="text-sm font-semibold mb-2 text-muted">
            Recent Chat
          </p>
          <ul className="space-y-2">
            <li className="text-sm text-primary truncate">
              Best captain picks for...
            </li>
            <li className="text-sm text-primary truncate">
              Wildcard suggestions for gameweek...
            </li>
            <li className="text-sm text-primary truncate">
              Best gameweek differentials for...
            </li>
          </ul>
          <button className="mt-3 text-sm text-greenAccent font-medium cursor-pointer">
            Show More
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-aux px-6 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-primary">
            <FiSettings /> <span>Settings</span>
          </div>
          <div className="flex items-center gap-3 text-primary">
            <FiHelpCircle /> <span>Help</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={onToggleTheme}
            className="flex items-center gap-2 text-sm font-medium text-primary"
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
            <p className="text-sm font-semibold text-primary">Jenny Wilson</p>
            <p className="text-xs text-muted">jenny@gmail.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
