import axios from "axios";
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "./api-config";

// Create axios instance with centralized configuration
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Enable credentials so browser sends cookies with requests
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get access token from cookie first, then fallback to localStorage
    let accessToken: string | null = null;
    
    if (typeof window !== 'undefined') {
      // Try to get from cookie first (new method)
      const cookieToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];
      
      // Fallback to localStorage/sessionStorage (old method)
      accessToken = cookieToken || localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    }
    
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    // Do NOT add any Access-Control-Allow-* headers from the client side
    // These headers must only be returned by the server in the response.

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors and token refresh
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    console.error("Axios error:", error);
    
    if (error.response?.status === 401) {
      console.log("Unauthorized access, redirecting to login");
      // Redirect to login page if unauthorized
      // The backend's cookie middleware should handle clearing expired/invalid cookies
      window.location.href = "/auth/signin";
    }
    return Promise.reject(error);
  }
);

export default api;
