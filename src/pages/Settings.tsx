import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useFPL from "../hooks/useFPL";

export default function Settings() {
  const { loading, fplTeam, unlinkFPL, getFPLTeam } = useFPL();
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!fplTeam) {
      getFPLTeam();
    }
  }, []);

  const handleUnlinkFPL = async () => {
    if (
      !confirm(
        "Are you sure you want to unlink your FPL team? This will delete all your FPL data."
      )
    ) {
      return;
    }

    try {
      await unlinkFPL();
    } catch (error) {
      alert("Failed to unlink FPL team");
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      // Delete FPL data first
      await unlinkFPL().catch(() => {});

      // Delete Supabase auth account
      await logout();
    } catch (error) {
      alert("Failed to delete account. Please contact support.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-xl">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface shadow-sm border-b border-aux p-4 flex items-center gap-4 -ml-72 pl-72">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-muted hover:text-primary ml-2"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-primary">Settings</h1>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* FPL Team Info */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4 text-primary">FPL Team</h2>
          {fplTeam ? (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-accent">Team Name:</span>
                <span className="font-semibold text-primary">
                  {fplTeam.team_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Manager:</span>
                <span className="font-semibold text-accent">
                  {fplTeam.player_first_name} {fplTeam.player_last_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">FPL ID:</span>
                <span className="font-semibold text-accent">
                  {fplTeam.fpl_id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Last Synced:</span>
                <span className="font-semibold text-accent">
                  {new Date(fplTeam.last_synced_at).toLocaleString()}
                </span>
              </div>
              <button
                onClick={handleUnlinkFPL}
                className="w-full mt-4 bg-error hover:bg-red-700 text-white py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                Unlink FPL Team
              </button>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted mb-4">No FPL team linked</p>
              <button
                onClick={() => navigate("/link-fpl")}
                className="btn-primary"
              >
                Link FPL Team
              </button>
            </div>
          )}
        </div>

        {/* Account Settings */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4 text-primary">Account</h2>
          <div className="space-y-4">
            <button
              onClick={async () => {
                await logout();
              }}
              className="w-full bg-neutral hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition"
            >
              Sign Out
            </button>
            <button
              onClick={handleDeleteAccount}
              className="w-full bg-error hover:bg-red-700 text-white py-2 px-4 rounded-lg transition"
            >
              Delete Account
            </button>
          </div>
        </div>

        {/* About */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4 text-primary">About</h2>
          <div className="space-y-2 text-sm text-muted">
            <p>FPL Gaffer - Your AI Fantasy Premier League Assistant</p>
            <p>Version 0.1.0</p>
            <p>Built with React, FastAPI, and Supabase</p>
          </div>
        </div>
      </div>
    </div>
  );
}
