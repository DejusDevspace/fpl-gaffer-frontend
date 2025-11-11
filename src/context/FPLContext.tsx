import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import apiClient from "../api/apiClient";

export interface FPLContextType {
  loading: boolean;
  syncing: boolean;
  error: string | null;
  isLinked: boolean | null;
  linkFPL: (fplId: number) => Promise<void>;
  unlinkFPL: () => Promise<void>;
  fplTeam: any | null;
  getFPLTeam: () => Promise<void>;
  syncFPLData: (fplId: number) => Promise<void>;
  dashboardData: DashboardData | null;
  leaguesData: LeaguesData | null;
  getLeagues: () => Promise<void>;
  selectedLeague: LeagueStanding | null;
  setSelectedLeague: (league: LeagueStanding | null) => void;
}

export interface LeaguesData {
  classic: LeagueInfo[];
  h2h?: LeagueInfo[];
}

export interface LeagueInfo {
  league_id: number;
  league_name: string;
  league_type: string;
  entry_rank: number;
  entry_last_rank: number;
  start_event: number;
}

export interface LeagueStanding {
  entry: number;
  event_total: number;
  league_entry: number;
  league_entry_id: number;
  player_first_name: string;
  player_last_name: string;
  player_name?: string;
  rank: number;
  rank_sort: number;
  team_name: string;
  total: number;
}

export interface DashboardData {
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

export const FPLContext = createContext<FPLContextType | undefined>(undefined);

interface FPLProviderProps {
  children: React.ReactNode;
}

export default function FPLProvider({ children }: FPLProviderProps) {
  const { authenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [syncing, setSyncing] = useState<boolean>(false);

  const [isLinked, setIsLinked] = useState<boolean | null>(() => {
    const stored = localStorage.getItem("isLinked");
    return stored ? JSON.parse(stored) : null;
  });

  const [error, setError] = useState<string | null>(null);

  const [fplTeam, setFplTeam] = useState<any>(() => {
    const stored = localStorage.getItem("fplTeam");
    return stored ? JSON.parse(stored) : null;
  });

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    () => {
      const stored = localStorage.getItem("dashboardData");
      return stored ? JSON.parse(stored) : null;
    }
  );

  const [leaguesData, setLeaguesData] = useState<LeaguesData | null>(() => {
    const stored = localStorage.getItem("leaguesData");
    return stored ? JSON.parse(stored) : null;
  });

  const [selectedLeague, setSelectedLeague] = useState<LeagueStanding | null>(
    null
  );

  const setIsLinkedWithPersist = (linked: boolean | null) => {
    setIsLinked(linked);
    if (linked !== null) {
      localStorage.setItem("isLinked", JSON.stringify(linked));
    } else {
      localStorage.removeItem("isLinked");
    }
  };

  const setFplTeamWithPersist = (team: any) => {
    setFplTeam(team);
    if (team) {
      localStorage.setItem("fplTeam", JSON.stringify(team));
    } else {
      localStorage.removeItem("fplTeam");
    }
  };

  const setDashboardDataWithPersist = (data: DashboardData | null) => {
    setDashboardData(data);
    if (data) {
      localStorage.setItem("dashboardData", JSON.stringify(data));
    } else {
      localStorage.removeItem("dashboardData");
    }
  };

  const setLeaguesDataWithPersist = (data: LeaguesData | null) => {
    setLeaguesData(data);
    if (data) {
      localStorage.setItem("leaguesData", JSON.stringify(data));
    } else {
      localStorage.removeItem("leaguesData");
    }
  };

  useEffect(() => {
    if (!authenticated) {
      return;
    }

    getDashboardData();
    getFPLTeam();
    getLeagues();
  }, [authenticated]);

  const linkFPL = async (fplId: number) => {
    try {
      setLoading(true);
      await apiClient.linkFPLTeam(fplId);
      await syncFPLData(fplId);

      setIsLinkedWithPersist(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to link FPL team");
    } finally {
      setLoading(false);
    }
  };

  const unlinkFPL = async () => {
    try {
      setLoading(true);
      await apiClient.unlinkFPLTeam();

      setFplTeamWithPersist(null);
      setDashboardDataWithPersist(null);
      setIsLinkedWithPersist(false);

      setTimeout(() => navigate("/link-fpl"), 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to unlink FPL team"
      );
    } finally {
      setLoading(false);
    }
  };

  const getFPLTeam = async () => {
    try {
      setLoading(true);
      const team = await apiClient.getFPLTeam();
      setFplTeamWithPersist(team);
    } catch (err) {
      setFplTeamWithPersist(null);
      setError(err instanceof Error ? err.message : "Failed to get FPL team");
    } finally {
      setLoading(false);
    }
  };

  const syncFPLData = async (fplId: number) => {
    try {
      setLoading(true);
      setSyncing(true);
      await apiClient.syncFPLData(fplId);
      getDashboardData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sync FPL data");
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  };

  const getDashboardData = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getDashboard();
      setDashboardDataWithPersist(data);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setDashboardDataWithPersist(null);
        navigate("/link-fpl");
      } else {
        setError("Failed to load dashboard");
      }
    } finally {
      setLoading(false);
    }
  };

  const getLeagues = async () => {
    try {
      const data = await apiClient.getLeagues();
      setLeaguesDataWithPersist(data);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setLeaguesDataWithPersist(null);
      } else {
        console.error("Failed to load leagues:", err);
      }
    }
  };

  const value: FPLContextType = {
    loading,
    syncing,
    error,
    isLinked,
    linkFPL,
    unlinkFPL,
    fplTeam,
    getFPLTeam,
    syncFPLData,
    dashboardData,
    leaguesData,
    getLeagues,
    selectedLeague,
    setSelectedLeague,
  };

  return <FPLContext.Provider value={value}>{children}</FPLContext.Provider>;
}
