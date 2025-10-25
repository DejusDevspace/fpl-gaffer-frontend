import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import apiClient, { supabase } from "../api/apiClient";

export default function Settings() {
  const [fplTeam, setFplTeam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      if (fplTeam) {
        return;
      }
      const team = await apiClient.getFPLTeam();
      setFplTeam(team);
    } catch (error) {
      console.error("Error loading settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlinkFPL = async () => {
    if (
      !confirm(
        "Are you sure you want to unlink your FPL team? This will delete all your FPL data."
      )
    ) {
      return;
    }

    try {
      await apiClient.unlinkFPLTeam();
      navigate("/link-fpl");
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
      await apiClient.unlinkFPLTeam().catch(() => {});

      // Delete Supabase auth account
      const { error } = await supabase.auth.admin.deleteUser(
        (await supabase.auth.getUser()).data.user?.id || ""
      );

      if (error) throw error;

      await supabase.auth.signOut();
      navigate("/");
    } catch (error) {
      alert("Failed to delete account. Please contact support.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4 flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* FPL Team Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">FPL Team</h2>
          {fplTeam ? (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-accent">Team Name:</span>
                <span className="font-semibold">{fplTeam.team_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Manager:</span>
                <span className="font-semibold text-accent">
                  {fplTeam.player_first_name} {fplTeam.player_last_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">FPL ID:</span>
                <span className="font-semibold text-accent">
                  {fplTeam.fpl_id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Synced:</span>
                <span className="font-semibold text-accent">
                  {new Date(fplTeam.last_synced_at).toLocaleString()}
                </span>
              </div>
              <button
                onClick={handleUnlinkFPL}
                className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                Unlink FPL Team
              </button>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-600 mb-4">No FPL team linked</p>
              <button
                onClick={() => navigate("/link-fpl")}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              >
                Link FPL Team
              </button>
            </div>
          )}
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Account</h2>
          <div className="space-y-4">
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                navigate("/");
              }}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition"
            >
              Sign Out
            </button>
            <button
              onClick={handleDeleteAccount}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition"
            >
              Delete Account
            </button>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">About</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>FPL Gaffer - Your AI Fantasy Premier League Assistant</p>
            <p>Version 0.1.0</p>
            <p>Built with React, FastAPI, and Supabase</p>
          </div>
        </div>
      </div>
    </div>
  );
}
