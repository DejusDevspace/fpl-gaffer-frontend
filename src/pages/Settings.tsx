import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Trash2,
  Link as LinkIcon,
  LogOut,
  AlertCircle,
  Shield,
  Clock,
  User,
  Trophy,
  RefreshCw,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import useFPL from "../hooks/useFPL";
import { useSidebar } from "../hooks/useSidebar";

export default function Settings() {
  const { loading, syncing, fplTeam, unlinkFPL, getFPLTeam, syncFPLData } =
    useFPL();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen } = useSidebar();
  const [syncError, setSyncError] = useState<string | null>(null);

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

  const handleSyncFPL = async () => {
    if (!fplTeam) return;
    setSyncError(null);
    try {
      await syncFPLData(fplTeam.fpl_id);
    } catch (error) {
      setSyncError("Failed to sync FPL data. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-background to-accent/50 flex items-center justify-center">
        <div className="text-xl text-primary">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-accent/50">
      {/* Header */}
      <div
        className={`bg-surface/70 backdrop-blur-sm border-b border-aux sticky top-0 z-20 h-[85px] p-4 transition-all duration-300 ${
          isOpen ? "-ml-72 pl-72" : "-ml-20 pl-20"
        }`}
      >
        <div className="max-w-5xl mx-auto ml-2 flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-muted hover:text-accent transition-colors p-2"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-primary">Settings</h1>
            <p className="text-sm text-muted mt-1">
              Manage your account and FPL team
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* FPL Team Section */}
        <div className="card border border-aux/50 shadow-lg">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-aux/30">
            <Trophy className="text-accent" size={24} />
            <div>
              <h2 className="text-2xl font-bold text-primary">FPL Team</h2>
              <p className="text-sm text-muted">
                Your Fantasy Premier League account
              </p>
            </div>
          </div>

          {fplTeam ? (
            <div className="space-y-6">
              {/* Team Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface/50 rounded-lg p-4 border border-aux/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy size={16} className="text-accent" />
                    <span className="text-xs font-semibold uppercase text-muted">
                      Team Name
                    </span>
                  </div>
                  <p className="text-lg font-bold text-primary">
                    {fplTeam.team_name}
                  </p>
                </div>

                <div className="bg-surface/50 rounded-lg p-4 border border-aux/30">
                  <div className="flex items-center gap-2 mb-2">
                    <User size={16} className="text-accent" />
                    <span className="text-xs font-semibold uppercase text-muted">
                      Manager
                    </span>
                  </div>
                  <p className="text-lg font-bold text-primary">
                    {fplTeam.player_first_name} {fplTeam.player_last_name}
                  </p>
                </div>

                <div className="bg-surface/50 rounded-lg p-4 border border-aux/30">
                  <div className="flex items-center gap-2 mb-2">
                    <LinkIcon size={16} className="text-greenAccent" />
                    <span className="text-xs font-semibold uppercase text-muted">
                      FPL ID
                    </span>
                  </div>
                  <p className="text-lg font-mono font-bold text-primary">
                    {fplTeam.fpl_id}
                  </p>
                </div>

                <div className="bg-surface/50 rounded-lg p-4 border border-aux/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={16} className="text-warning" />
                    <span className="text-xs font-semibold uppercase text-muted">
                      Last Synced
                    </span>
                  </div>
                  <p className="text-lg font-bold text-primary">
                    {new Date(fplTeam.last_synced_at).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted mt-1">
                    {new Date(fplTeam.last_synced_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              {/* Sync Error Message */}
              {syncError && (
                <div className="bg-error/10 border border-error/30 rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle size={16} className="text-error shrink-0" />
                  <p className="text-sm text-error">{syncError}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleSyncFPL}
                  disabled={syncing}
                  className="flex-1 bg-greenAccent/10 hover:bg-greenAccent/20 disabled:opacity-50 text-greenAccent py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 border border-greenAccent/30 font-semibold"
                >
                  <RefreshCw
                    size={18}
                    className={syncing ? "animate-spin" : ""}
                  />
                  {syncing ? "Syncing..." : "Sync FPL Data"}
                </button>
                <button
                  onClick={handleUnlinkFPL}
                  className="flex-1 bg-error/10 hover:bg-error/20 text-error py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 border border-error/30 font-semibold"
                >
                  <Trash2 size={18} />
                  Unlink
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="mx-auto mb-4 text-warning" size={48} />
              <p className="text-muted mb-6">No FPL team linked</p>
              <button
                onClick={() => navigate("/link-fpl")}
                className="btn-primary inline-block"
              >
                Link FPL Team
              </button>
            </div>
          )}
        </div>

        {/* Account Settings Section */}
        <div className="card border border-aux/50 shadow-lg">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-aux/30">
            <Shield className="text-accent" size={24} />
            <div>
              <h2 className="text-2xl font-bold text-primary">Account</h2>
              <p className="text-sm text-muted">
                Security and session management
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={async () => {
                await logout();
              }}
              className="w-full bg-neutral/10 hover:bg-neutral/20 text-neutral py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 border border-neutral/30 font-semibold"
            >
              <LogOut size={18} />
              Sign Out
            </button>
            <button
              onClick={handleDeleteAccount}
              className="w-full bg-error/10 hover:bg-error/20 text-error py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 border border-error/30 font-semibold"
            >
              <AlertCircle size={18} />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
