import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFPL from "../hooks/useFPL";

export default function LinkFPL() {
  const { loading, error, linkFPL, isLinked } = useFPL();
  const [fplId, setFplId] = useState("");
  const navigate = useNavigate();

  const handleLink = async (e: React.FormEvent) => {
    e.preventDefault();
    await linkFPL(parseInt(fplId));
  };

  if (isLinked) {
    return (
      <div className="min-h-screen bg-linear-to-br from-background to-accent/50 flex items-center justify-center p-4">
        <div className="bg-surface rounded-lg shadow-xl p-8 w-full max-w-md text-center">
          <div className="text-greenAccent text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-accent/80 mb-4">
            FPL Team Linked!
          </h2>
          <p className="text-primary/70">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-accent/50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-primary mb-6">
          Link Your FPL Team
        </h1>

        <div className="mb-6 p-4 bg-surface/50 border border-aux rounded-lg">
          <p className="text-sm text-primary/70">
            Find your FPL Team ID by visiting your team page on the Official FPL
            website. The ID is in the URL:{" "}
            <span className="font-mono">
              fantasy.premierleague.com/entry/<strong>YOUR_ID</strong>
            </span>
          </p>
        </div>

        {error && (
          <div className="bg-error/20 border border-error text-error px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLink} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary/70 mb-1">
              FPL Team ID
            </label>
            <input
              type="number"
              value={fplId}
              onChange={(e) => setFplId(e.target.value)}
              placeholder="e.g. 123456"
              required
              className="w-full border border-aux bg-surface/50 text-primary rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:bg-neutral text-white font-semibold py-2 px-4 rounded-lg cursor-pointer transition-all duration-300"
          >
            {loading ? "Linking..." : "Link FPL Team"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-primary/70 hover:text-accent cursor-pointer transition"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
