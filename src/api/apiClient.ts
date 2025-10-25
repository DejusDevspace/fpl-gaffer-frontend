import axios, { type AxiosInstance } from "axios";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.client.interceptors.request.use(async (config) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
      }
      return config;
    });

    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          const { data, error: refreshError } =
            await supabase.auth.refreshSession();
          if (refreshError || !data.session) {
            window.location.href = "/login";
            return Promise.reject(error);
          }
          error.config.headers.Authorization = `Bearer ${data.session.access_token}`;
          return this.client.request(error.config);
        }
        return Promise.reject(error);
      }
    );
  }

  // User/FPL endpoints
  async linkFPLTeam(fplId: number) {
    const response = await this.client.post("/api/user/link-fpl", {
      fpl_id: fplId,
    });
    return response.data;
  }

  async syncFPLData(fplId: number) {
    const response = await this.client.post("/api/user/sync-fpl", {
      fpl_id: fplId,
    });
    return response.data;
  }

  async getDashboard() {
    const response = await this.client.get("/api/user/dashboard");
    return response.data;
  }

  async getFPLTeam() {
    const response = await this.client.get("/api/user/fpl-team");
    return response.data;
  }

  async unlinkFPLTeam() {
    const response = await this.client.delete("/api/user/unlink-fpl");
    return response.data;
  }

  // Chat endpoint
  async chat(message: string, sessionId?: string) {
    const response = await this.client.post("/api/chat", {
      message,
      session_id: sessionId,
    });
    return response.data;
  }

  async getHealth() {
    const response = await this.client.get("/health");
    return response.data;
  }
}

export default new APIClient();
