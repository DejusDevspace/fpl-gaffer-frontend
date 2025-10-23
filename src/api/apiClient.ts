import axios, { type AxiosInstance } from "axios";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
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

    // Add interceptor to attach Supabase token
    this.client.interceptors.request.use(async (config: any) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
      }

      return config;
    });

    // Add interceptor to handle token refresh
    this.client.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
        if (error.response?.status === 401) {
          // Token expired, try to refresh
          const { data, error: refreshError } =
            await supabase.auth.refreshSession();

          if (refreshError || !data.session) {
            // Refresh failed, redirect to login
            window.location.href = "/admin/login";
            return Promise.reject(error);
          }

          // Retry the original request with new token
          error.config.headers.Authorization = `Bearer ${data.session.access_token}`;
          return this.client.request(error.config);
        }

        return Promise.reject(error);
      }
    );
  }

  async chat(message: string, sessionId?: string) {
    const response = await this.client.post("/api/chat", {
      message,
      session_id: sessionId,
    });
    return response.data;
  }

  async getMetricsSummary(start: string, end: string) {
    const response = await this.client.get("/api/metrics/summary", {
      params: { start, end },
    });
    return response.data;
  }

  async getTimeseries(start: string, end: string) {
    const response = await this.client.get("/api/metrics/timeseries", {
      params: { start, end },
    });
    return response.data;
  }

  async getRequests(limit: number = 100, offset: number = 0, status?: string) {
    const response = await this.client.get("/api/metrics/requests", {
      params: { limit, offset, status },
    });
    return response.data;
  }

  async getUsers(limit: number = 100, offset: number = 0) {
    const response = await this.client.get("/api/users", {
      params: { limit, offset },
    });
    return response.data;
  }

  async getHealth() {
    const response = await this.client.get("/health");
    return response.data;
  }

  async getAdminHealth() {
    const response = await this.client.get("/api/admin/health");
    return response.data;
  }
}

export default new APIClient();
