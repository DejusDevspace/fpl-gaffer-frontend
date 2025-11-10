import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useFPL from "../hooks/useFPL";
import { useSidebar } from "../hooks/useSidebar";
import { MessageSquare, TrendingUp, Settings, LogOut } from "lucide-react";
import StatCard from "../components/StatCard";
import RankChart from "../components/RankChart";
import PointsChart from "../components/PointsChart";
import TransfersChart from "../components/TransfersChart";

export default function Dashboard() {
  const { loading, syncing, error, dashboardData, syncFPLData } = useFPL();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen } = useSidebar();

  const handleLogout = async () => {
    await logout();
  };

  const handleSync = async (fpl_id: number) => {
    try {
      await syncFPLData(fpl_id);
    } catch (err) {
      console.error("Error syncing FPL data:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-background to-accent/50 flex items-center justify-center">
        <div className="flex flex-col justify-center items-center text-xl font-semibold text-primary">
          {syncing && (
            <span className="text-accent">
              Syncing FPL data. Please wait...
            </span>
          )}
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-linear-to-br from-background to-accent/50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-error mb-4">
            {error ? error : "No data available"}
          </div>
          <button onClick={() => navigate("/link-fpl")} className="btn-primary">
            Link FPL Team
          </button>
        </div>
      </div>
    );
  }

  const { team, current_gameweek, gameweek_history, current_captain } =
    dashboardData;

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-accent/50">
      {/* Header */}
      {/* TODO: To replace with sidebar */}
      <nav
        className={`bg-surface/70 shadow-sm border-b border-aux sticky top-0 z-20 transition-all duration-300 ${
          isOpen ? "-ml-72 pl-72" : "-ml-20 pl-20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">
              {team.team_name}
            </h1>
            <p className="text-sm text-muted">
              {team.player_first_name} {team.player_last_name}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/chat"
              className="flex items-center gap-2 text-primary hover:text-accent"
            >
              <MessageSquare size={20} />
              <span className="hidden sm:inline">Chat</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-2 text-primary hover:text-accent"
            >
              <Settings size={20} />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-primary hover:text-error"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatCard
            label="Current GW"
            value={team.current_gameweek.toString()}
            icon="📅"
          />
          <StatCard
            label="Captain"
            value={current_captain?.player_name || "N/A"}
            icon="🔰"
          />
          <StatCard
            label="GW Points"
            value={current_gameweek?.points.toString() || "0"}
            icon="⚽"
          />
          <StatCard
            label="Total Points"
            value={team.overall_points.toLocaleString()}
            icon="🎯"
          />
          <StatCard
            label="Total Transfers"
            value={team.total_transfers.toString()}
            icon="🔄"
          />
        </div>

        {/* Charts */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-accent">Analytics</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RankChart data={gameweek_history} />
            <PointsChart data={gameweek_history} />
          </div>

          <TransfersChart data={gameweek_history} />
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 text-primary">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/chat"
              className="flex items-center gap-3 p-4 bg-surface/50 rounded-lg shadow-lg hover:bg-surface/70 transition"
            >
              <MessageSquare className="text-accent" />
              <div>
                <div className="font-semibold text-primary">
                  Chat with Gaffer
                </div>
                <div className="text-sm text-muted">Get AI advice</div>
              </div>
            </Link>
            <button
              onClick={() => handleSync(dashboardData.team.fpl_id)}
              className="flex items-center gap-3 p-4 bg-surface/50 rounded-lg shadow-lg hover:bg-surface/70 cursor-pointer transition"
            >
              <TrendingUp className="text-greenAccent" />
              <div>
                <div className="font-semibold text-primary">Sync FPL Data</div>
                <div className="text-sm text-muted">Update stats</div>
              </div>
            </button>
            <Link
              to="/settings"
              className="flex items-center gap-3 p-4 bg-surface/50 rounded-lg shadow-lg hover:bg-surface/70 cursor-pointer transition"
            >
              <Settings className="text-accent" />
              <div>
                <div className="font-semibold text-primary">Settings</div>
                <div className="text-sm text-muted">Manage account</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
