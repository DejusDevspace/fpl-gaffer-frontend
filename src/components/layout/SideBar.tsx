import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSettings, FiChevronLeft } from "react-icons/fi";
import {
  BsChatLeftDots,
  BsClockHistory,
  BsGraphDown,
  BsTrophy,
  BsQuestionCircleFill,
} from "react-icons/bs";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen rounded-r-2xl border-r border-aux flex flex-col justify-between bg-surface text-primary transition-all duration-300 z-30 ${
        isOpen ? "w-72" : "w-20"
      }`}
    >
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-aux">
          {isOpen && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-accent/50"></div>
              <h1 className="text-lg font-semibold text-primary">FPL Gaffer</h1>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary hover:text-accent transition-colors p-1 z-20"
            title={isOpen ? "Collapse" : "Expand"}
          >
            <FiChevronLeft
              size={20}
              className={`transition-transform duration-300 ${
                isOpen ? "" : "rotate-180"
              }`}
            />
          </button>
        </div>

        {/* Menu Section */}
        <div className="mt-6">
          {isOpen && (
            <p className="text-xs font-semibold uppercase px-6 text-muted mb-3">
              Menu
            </p>
          )}
          <nav>
            <ul className="space-y-1">
              <Link to="/chat" title="Chat with Gaffer">
                <li
                  className={`px-6 py-2 flex items-center gap-3 font-medium cursor-pointer rounded-r-full transition-colors ${
                    isActive("/chat")
                      ? "bg-active/20 text-active border-r-4 border-active"
                      : "hover:bg-aux/80 text-primary"
                  }`}
                >
                  <BsChatLeftDots />
                  {isOpen && "Chat with Gaffer"}
                </li>
              </Link>

              <Link to="/dashboard" title="Dashboard">
                <li
                  className={`px-6 py-2 flex items-center gap-3 cursor-pointer rounded-r-full transition-colors ${
                    isActive("/dashboard")
                      ? "bg-active/20 text-active border-r-4 border-active"
                      : "hover:bg-aux/80 text-primary"
                  }`}
                >
                  <BsGraphDown />
                  {isOpen && "Dashboard"}
                </li>
              </Link>

              <li
                className="px-6 py-2 flex items-center gap-3 hover:bg-aux/80 cursor-pointer text-primary rounded-r-full transition-colors"
                title="Leagues"
              >
                <BsTrophy />
                {isOpen && "Leagues"}
              </li>

              <li
                className="px-6 py-2 flex items-center gap-3 hover:bg-aux/80 cursor-pointer text-primary rounded-r-full transition-colors"
                title="History"
              >
                <BsClockHistory />
                {isOpen && "History"}
              </li>
            </ul>
          </nav>
        </div>

        {/* Recent Chat Section */}
        {isOpen && (
          <div className="mt-6 border-t border-aux pt-4 px-6">
            <p className="text-xs font-semibold uppercase text-muted mb-3">
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
        )}
      </div>

      {/* Bottom Section - Settings & Help */}
      <div className="border-t border-aux px-6 py-4">
        {isOpen && (
          <p className="text-xs font-semibold uppercase mb-3 text-muted">
            Settings & Help
          </p>
        )}
        <ul className="space-y-1">
          <Link to="/settings" title="Settings">
            <li className="px-3 py-2 flex items-center gap-3 hover:bg-aux/80 cursor-pointer text-primary rounded-lg transition-colors">
              <FiSettings size={18} />
              {isOpen && <span>Settings</span>}
            </li>
          </Link>
          <Link to="/help" title="Help">
            <li className="px-3 py-2 flex items-center gap-3 hover:bg-aux/80 cursor-pointer text-primary rounded-lg transition-colors">
              <BsQuestionCircleFill size={18} />
              {isOpen && <span>Help</span>}
            </li>
          </Link>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
