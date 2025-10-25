import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MessageSquare,
  TrendingUp,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import apiClient, { supabase } from "../api/apiClient";
import StatCard from "../components/StatCard";
import RankChart from "../components/RankChart";
import PointsChart from "../components/PointsChart";
import TransfersChart from "../components/TransfersChart";

interface DashboardData {
  team: {
    fpl_id: number;
    team_name: string;
    player_first_name: string;
    player_last_name: string;
    overall_rank: number;
    overall_points: number;
    current_gameweek: number;
    total_transfers: number;
    team_value: number;
    bank: number;
  };
  current_gameweek: {
    gameweek: number;
    points: number;
    total_points: number;
    overall_rank: number;
    event_transfers: number;
  } | null;
  gameweek_history: Array<{
    gameweek: number;
    points: number;
    total_points: number;
    overall_rank: number;
    event_transfers: number;
  }>;
  transfer_history: Array<any>;
  current_captain: {
    player_name: string;
  } | null;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [syncing, setSyncing] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) {
      loadDashboard();
    }
  }, []);

  const loadDashboard = async () => {
    try {
      const dashboardData = await apiClient.getDashboard();
      setData(dashboardData);
    } catch (err: any) {
      if (err.response?.status === 404) {
        navigate("/link-fpl");
      } else {
        setError("Failed to load dashboard");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleSync = async (fpl_id: number) => {
    try {
      setLoading(true);
      setSyncing(true);
      await apiClient.syncFPLData(fpl_id);
      await loadDashboard();
    } catch (err) {
      setError("Failed to sync FPL data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col justify-center items-center text-xl font-semibold text-gray-700">
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

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-red-600 mb-4">
            {error || "No data available"}
          </div>
          <button
            onClick={() => navigate("/link-fpl")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Link FPL Team
          </button>
        </div>
      </div>
    );
  }

  const { team, current_gameweek, gameweek_history, current_captain } = data;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {team.team_name}
            </h1>
            <p className="text-sm text-gray-600">
              {team.player_first_name} {team.player_last_name}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/chat"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
            >
              <MessageSquare size={20} />
              <span className="hidden sm:inline">Chat</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
            >
              <Settings size={20} />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-700 hover:text-red-600"
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
          <h2 className="text-xl font-bold text-gray-900">Analytics</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RankChart data={gameweek_history} />
            <PointsChart data={gameweek_history} />
          </div>

          <TransfersChart data={gameweek_history} />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/chat"
              className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
            >
              <MessageSquare className="text-blue-600" />
              <div>
                <div className="font-semibold">Chat with Gaffer</div>
                <div className="text-sm text-gray-600">Get AI advice</div>
              </div>
            </Link>
            <button
              onClick={() => handleSync(data.team.fpl_id)}
              className="flex items-center gap-3 p-4 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition"
            >
              <TrendingUp className="text-green-600" />
              <div>
                <div className="font-semibold">Sync FPL Data</div>
                <div className="text-sm text-gray-600">Update stats</div>
              </div>
            </button>
            <Link
              to="/settings"
              className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
            >
              <Settings className="text-purple-600" />
              <div>
                <div className="font-semibold">Settings</div>
                <div className="text-sm text-gray-600">Manage account</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
