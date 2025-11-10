import { Link, useLocation } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import {
  BsChatLeftDots,
  BsClockHistory,
  BsGraphDown,
  BsTrophy,
  BsQuestionCircleFill,
} from "react-icons/bs";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 rounded-r-2xl border-r border-aux flex flex-col justify-between bg-surface text-primary">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center px-6 py-5 border-b border-aux">
          <div className="w-6 h-6 rounded-md bg-accent/50 mr-2"></div>
          <h1 className="text-lg font-semibold text-primary">FPL Gaffer</h1>
        </div>

        {/* Menu Section */}
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase px-6 text-muted mb-3">
            Menu
          </p>
          <nav>
            <ul className="space-y-1">
              <Link to="/chat">
                <li
                  className={`px-6 py-2 flex items-center gap-3 font-medium cursor-pointer rounded-r-full transition-colors ${
                    isActive("/chat")
                      ? "bg-active/20 text-active border-r-4 border-active"
                      : "hover:bg-aux/80 text-primary"
                  }`}
                >
                  <BsChatLeftDots /> Chat with Gaffer
                </li>
              </Link>

              <Link to="/dashboard">
                <li
                  className={`px-6 py-2 flex items-center gap-3 cursor-pointer rounded-r-full transition-colors ${
                    isActive("/dashboard")
                      ? "bg-active/20 text-active border-r-4 border-active"
                      : "hover:bg-aux/80 text-primary"
                  }`}
                >
                  <BsGraphDown /> Dashboard
                </li>
              </Link>

              <li className="px-6 py-2 flex items-center gap-3 hover:bg-aux/80 cursor-pointer text-primary rounded-r-full transition-colors">
                <BsTrophy /> Leagues
              </li>

              <li className="px-6 py-2 flex items-center gap-3 hover:bg-aux/80 cursor-pointer text-primary rounded-r-full transition-colors">
                <BsClockHistory /> History
              </li>
            </ul>
          </nav>
        </div>

        {/* Recent Chat Section */}
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
      </div>

      {/* Bottom Section - Settings & Help */}
      <div className="border-t border-aux px-6 py-4">
        <div>
          <p className="text-xs font-semibold uppercase mb-3 text-muted">
            Settings & Help
          </p>
          <ul className="space-y-1">
            <Link to="/settings">
              <li className="px-3 py-2 flex items-center gap-3 hover:bg-aux/80 cursor-pointer text-primary rounded-lg transition-colors">
                <FiSettings size={18} /> <span>Settings</span>
              </li>
            </Link>
            <Link to="/help">
              <li className="px-3 py-2 flex items-center gap-3 hover:bg-aux/80 cursor-pointer text-primary rounded-lg transition-colors">
                <BsQuestionCircleFill size={18} /> <span>Help</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
