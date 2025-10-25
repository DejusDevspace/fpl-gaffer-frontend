import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

export default function LinkFPL() {
  const [fplId, setFplId] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { response, error } = await apiClient.linkFPLTeam(parseInt(fplId));

      if (error) {
        if (error.response?.status === 400) {
          setError("Invalid FPL Team ID");
          return;
        }

        if (error.response?.status === 401) {
          setError("Unauthorized");
          return;
        }

        if (error.response?.status === 500) {
          setError("Internal Server Error");
          return;
        }
        setError(error.response?.data?.detail || "Failed to link FPL team");
        return;
      }

      if (response?.status === 200) {
        setSuccess(true);
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to link FPL team");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md text-center">
          <div className="text-green-600 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            FPL Team Linked!
          </h2>
          <p className="text-gray-700">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Link Your FPL Team
        </h1>

        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            Find your FPL Team ID by visiting your team page on the Official FPL
            website. The ID is in the URL:{" "}
            <span className="font-mono">
              fantasy.premierleague.com/entry/<strong>YOUR_ID</strong>
            </span>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLink} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              FPL Team ID
            </label>
            <input
              type="number"
              value={fplId}
              onChange={(e) => setFplId(e.target.value)}
              placeholder="e.g. 123456"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-accent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white
            font-semibold py-2 px-4 rounded-lg cursor-pointer transition"
          >
            {loading ? "Linking..." : "Link FPL Team"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-gray-600 hover:underline cursor-pointer"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
