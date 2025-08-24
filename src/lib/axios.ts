import axios from "axios";
<<<<<<< HEAD
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "./api-config";
=======
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { authCookies } from "@/lib/cookies";
import { Pages, Routes } from "@/constants/enums";
>>>>>>> sketch

// Create axios instance with centralized configuration
export const api = axios.create({
<<<<<<< HEAD
  baseURL: API_BASE_URL,
=======
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
>>>>>>> sketch
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
<<<<<<< HEAD
    console.error("Axios error:", error);
    
    if (error.response?.status === 401) {
      console.log("Unauthorized access, redirecting to login");
      // Redirect to login page if unauthorized
      // The backend's cookie middleware should handle clearing expired/invalid cookies
      window.location.href = "/auth/signin";
=======
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = authCookies.getRefreshToken();
      if (refreshToken) {
        try {
          // Try to refresh the token
          const response = await axios.post(
            `${api.defaults.baseURL}/auth/refresh`,
            {
              refresh_token: refreshToken,
            }
          );

          const { access_token, refresh_token: newRefreshToken } =
            response.data;

          // Update tokens in cookies
          authCookies.setTokens(access_token, newRefreshToken);

          // Update the original request with new token
          originalRequest.headers.Authorization = `Bearer ${access_token}`;

          // Retry the original request
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // Clear invalid auth cookies and redirect to login
          authCookies.clearAll();
          window.location.href = `${Routes.AUTH}/${Pages.SIGNIN}`;
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token available, clear auth and redirect
        authCookies.clearAll();
        window.location.href = `${Routes.AUTH}/${Pages.SIGNIN}`;
      }
>>>>>>> sketch
    }
    return Promise.reject(error);
  }
);

export default api;
