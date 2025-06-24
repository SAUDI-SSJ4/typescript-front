import { create } from "zustand";
import type { User, LoginRequest, SignupRequest } from "@/types/user";
import { authService } from "./services/authService";
import { authCookies } from "@/lib/cookies";
import { Pages, Routes } from "@/constants/enums";

interface AuthState {
  // State
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string | null, refreshToken: string | null) => void;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  login: (credentials: LoginRequest) => Promise<void>;
  signup: (userData: SignupRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  refreshTokens: () => Promise<void>;
  clearAuth: () => void;

  // Computed
  isStudent: () => boolean;
  isAcademy: () => boolean;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  // Initial state
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  isAuthenticated: false,

  // Actions
  setUser: (user) =>
    set(() => ({
      user,
      isAuthenticated: !!user && !!get().accessToken,
    })),

  setTokens: (accessToken, refreshToken) =>
    set(() => ({
      accessToken,
      refreshToken,
      isAuthenticated: !!get().user && !!accessToken,
    })),

  setAccessToken: (accessToken) =>
    set(() => ({
      accessToken,
      isAuthenticated: !!get().user && !!accessToken,
    })),

  setRefreshToken: (refreshToken) =>
    set(() => ({
      refreshToken,
    })),

  setLoading: (loading) =>
    set(() => ({
      isLoading: loading,
    })),

  login: async (credentials) => {
    set(() => ({ isLoading: true }));

    try {
      const response = await authService.login(credentials);

      set(() => ({
        user: response.user,
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        isAuthenticated: true,
        isLoading: false,
      }));

      // Store in cookies
      authCookies.setTokens(response.access_token, response.refresh_token);
    } catch (error) {
      set(() => ({ isLoading: false }));
      throw error;
    }
  },

  signup: async (userData) => {
    set(() => ({ isLoading: true }));

    try {
      const response = await authService.signup(userData);

      set(() => ({
        user: response.user,
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        isAuthenticated: true,
        isLoading: false,
      }));

      // Store in cookies
      authCookies.setTokens(response.access_token, response.refresh_token);
    } catch (error) {
      set(() => ({ isLoading: false }));
      throw error;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // Clear state regardless of API success
      set(() => ({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
      }));

      // Clear cookies
      authCookies.clearAll();

      // Redirect to login
      window.location.href = `/${Routes.AUTH}/${Pages.SIGNIN}`;
    }
  },

  refreshUser: async () => {
    const { accessToken } = get();
    if (!accessToken) return;

    set(() => ({ isLoading: true }));

    try {
      const user = await authService.getCurrentUser();
      set(() => ({
        user,
        isAuthenticated: true,
        isLoading: false,
      }));

      // Update user data in cookies
      authCookies.setUser(user);
    } catch (error) {
      console.error("Failed to refresh user:", error);
      // If refresh fails, clear auth state
      get().clearAuth();
    }
  },

  refreshTokens: async () => {
    const { refreshToken } = get();
    if (!refreshToken) {
      get().clearAuth();
      return;
    }

    try {
      const response = await authService.refreshToken(refreshToken);

      set(() => ({
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
      }));

      // Update tokens in cookies
      authCookies.setTokens(response.access_token, response.refresh_token);
    } catch (error) {
      console.error("Failed to refresh tokens:", error);
      // If token refresh fails, clear auth state
      get().clearAuth();
      throw error;
    }
  },

  clearAuth: () => {
    set(() => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
    }));

    // Clear cookies
    authCookies.clearAll();
  },

  // Computed getters
  isStudent: () => {
    const { user } = get();
    return user?.user_type === "STUDENT";
  },

  isAcademy: () => {
    const { user } = get();
    return user?.user_type === "ACADEMY";
  },
}));

// Selectors for specific state slices
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useIsLoading = () => useAuthStore((state) => state.isLoading);

// Token selectors
export const useAccessToken = () => useAuthStore((state) => state.accessToken);
export const useRefreshToken = () =>
  useAuthStore((state) => state.refreshToken);
export const useTokens = () =>
  useAuthStore((state) => ({
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
  }));

// Individual action selectors - more stable than returning an object
export const useLogin = () => useAuthStore((state) => state.login);
export const useSignup = () => useAuthStore((state) => state.signup);
export const useLogout = () => useAuthStore((state) => state.logout);
export const useRefreshUser = () => useAuthStore((state) => state.refreshUser);
export const useRefreshTokens = () =>
  useAuthStore((state) => state.refreshTokens);
export const useClearAuth = () => useAuthStore((state) => state.clearAuth);
