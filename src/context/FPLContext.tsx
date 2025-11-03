import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

export interface FPLContextType {
  loading: boolean;
  error: string | null;
  isLinked: boolean | null;
  linkFPL: (fplId: number) => Promise<void>;
}

export const FPLContext = createContext<FPLContextType | undefined>(undefined);

interface FPLProviderProps {
  children: React.ReactNode;
}

export default function FPLProvider({ children }: FPLProviderProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isLinked, setIsLinked] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const linkFPL = async (fplId: number) => {
    try {
      setLoading(true);
      const { response, error } = await apiClient.linkFPLTeam(fplId);

      if (error) {
        setError(error.response?.data?.detail || "Failed to link FPL team");
        return;
      }

      setIsLinked(response.data.success);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to link FPL team");
    } finally {
      setLoading(false);
    }
  };

  const value: FPLContextType = {
    loading,
    error,
    isLinked,
    linkFPL,
  };

  return <FPLContext.Provider value={value}>{children}</FPLContext.Provider>;
}
