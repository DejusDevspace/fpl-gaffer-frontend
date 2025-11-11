import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFPL from "../hooks/useFPL";
import { useSidebar } from "../hooks/useSidebar";
import apiClient from "../api/apiClient";
import { ChevronRight, ChevronLeft, ArrowLeft } from "lucide-react";

export interface standingsData {
  new_entries: Array<any>;
  league: {
    name: string;
    start_event: number;
    scoring: string;
  };
  standings: {
    has_next: boolean;
    page: number;
    results: leagueManagerData[];
  };
}

export interface leagueManagerData {
  id: number;
  event_total: number;
  player_name: string;
  rank: number;
  last_rank: number;
  rank_sort: number;
  total: number;
  entry: number;
  entry_name: string;
}

export default function Leagues() {
  const { loading, leaguesData } = useFPL();
  const { isOpen } = useSidebar();
  const navigate = useNavigate();

  // const [activeTab, setActiveTab] = useState<"classic" | "h2h">("classic");
  const [selectedLeagueId, setSelectedLeagueId] = useState<number | null>(null);
  const [standings, setStandings] = useState<standingsData | null>(null);
  // const [loadingStandings, setLoadingStandings] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleLeagueClick = async (leagueId: number) => {
    setSelectedLeagueId(leagueId);
    setCurrentPage(1);
    await fetchStandings(leagueId, currentPage);
  };

  const fetchStandings = async (leagueId: number, page: number) => {
    try {
      // setLoadingStandings(true);
      const data = await apiClient.getLeagueStandings(leagueId, page);
      setStandings(data.standings);
      setCurrentPage(page);
    } catch (err) {
      console.error("Error fetching league standings:", err);
    } finally {
      // setLoadingStandings(false);
    }
  };

  const handleNextPage = () => {
    if (selectedLeagueId && standings?.standings.has_next) {
      fetchStandings(selectedLeagueId, currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (selectedLeagueId && currentPage > 1) {
      fetchStandings(selectedLeagueId, currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-background to-accent/50 flex items-center justify-center">
        <div className="text-xl font-semibold text-primary">
          Loading leagues...
        </div>
      </div>
    );
  }

  // Show league details if one is selected
  if (selectedLeagueId && standings) {
    const league = standings.league;
    return (
      <div className="min-h-screen bg-linear-to-br from-background to-accent/50">
        {/* Header */}
        <nav
          className={`bg-surface/70 shadow-sm border-b border-aux h-[85px] p-2 sticky top-0 z-20 transition-all duration-300 ${
            isOpen ? "-ml-72 pl-72" : "-ml-20 pl-20"
          }`}
        >
          <div className="max-w-7xl flex mx-auto px-4 gap-4 py-2">
            <button
              onClick={() => setSelectedLeagueId(null)}
              className="text-accent hover:text-accent/80 flex items-center gap-1 transition"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-primary">{league.name}</h1>
              <p className="text-sm text-muted mt-1">
                {league.scoring === "c"
                  ? "Classic League"
                  : "Head to Head League"}
              </p>
            </div>
          </div>
        </nav>

        {/* Standings Table */}
        <div className="max-w-7xl mx-auto p-6">
          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-aux">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                      Rank
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                      Team & Manager
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-primary">
                      GW
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-primary">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {standings.standings.results.map((player, index) => (
                    <tr
                      key={`${player.entry}-${index}`}
                      // TODO: highlight current user's row on league table
                      className={`border-b border-aux/50 hover:bg-surface/50 transition`}
                    >
                      <td className="px-6 py-4 text-primary font-semibold">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{player.rank}</span>
                          {player.rank === 1 && <span>🥇</span>}
                          {player.rank === 2 && <span>🥈</span>}
                          {player.rank === 3 && <span>🥉</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-primary">
                            {player.entry_name}
                          </p>
                          <p className="text-sm text-muted">
                            {player.player_name}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-primary font-semibold">
                        {player.event_total || 0}
                      </td>
                      <td className="px-6 py-4 text-right text-accent font-bold text-lg">
                        {player.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-aux">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-aux
                text-primary cursor-pointer hover:bg-surface/70 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={18} />
                Previous
              </button>
              <span className="text-sm text-muted">Page {currentPage}</span>

              <button
                onClick={handleNextPage}
                disabled={!standings.standings.has_next}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-aux
                text-primary cursor-pointer hover:bg-surface/70 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show leagues list
  return (
    <div className="min-h-screen bg-linear-to-br from-background to-accent/50">
      {/* Header */}
      <nav
        className={`bg-surface/70 shadow-sm border-b border-aux h-[85px] sticky top-0 z-20 transition-all duration-300 ${
          isOpen ? "-ml-72 pl-72" : "-ml-20 pl-20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Leagues</h1>
          <p className="text-sm text-muted mt-1">
            Manage and view your league standings
          </p>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Invitational Classic Leagues */}
        {leaguesData?.classic && leaguesData.classic.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              Invitational Classic Leagues
            </h2>
            <div className="space-y-2">
              {leaguesData.classic.map((league) => (
                <button
                  key={league.league_id}
                  onClick={() => handleLeagueClick(league.league_id)}
                  className="w-full card hover:bg-surface/70 transition cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-left flex-1">
                        <p className="font-semibold text-primary text-lg">
                          {league.league_name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 mr-4">
                      <div className="text-right">
                        <p className="text-sm text-muted">Current Rank</p>
                        <p className="text-lg font-bold text-accent">
                          {league.entry_rank}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted">Last Rank</p>
                        <p className="text-lg font-bold text-primary">
                          {league.entry_last_rank}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      size={24}
                      className="text-accent group-hover:translate-x-1 transition"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* General Leagues (H2H) */}
        {leaguesData?.h2h && leaguesData.h2h.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              General Leagues
            </h2>
            <div className="space-y-2">
              {leaguesData.h2h.map((league) => (
                <button
                  key={league.league_id}
                  onClick={() => handleLeagueClick(league.league_id)}
                  className="w-full card hover:bg-surface/70 transition cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-left flex-1">
                        <p className="font-semibold text-primary text-lg">
                          {league.league_name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 mr-4">
                      <div className="text-right">
                        <p className="text-sm text-muted">Current Rank</p>
                        <p className="text-lg font-bold text-accent">
                          {league.entry_rank.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted">Last Rank</p>
                        <p className="text-lg font-bold text-primary">
                          {league.entry_last_rank.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      size={24}
                      className="text-accent group-hover:translate-x-1 transition"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {!leaguesData ||
          (leaguesData.classic?.length === 0 &&
            leaguesData.h2h?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted mb-4">
                  No leagues found. Try syncing FPL data!
                </p>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="btn-primary"
                >
                  Back to Dashboard
                </button>
              </div>
            ))}
      </div>
    </div>
  );
}
