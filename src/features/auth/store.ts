import { create } from "zustand";
import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from "@/types/auth";
import type { User } from "@/types/user";
import { authService } from "./services/authService";
import { authCookies } from "@/lib/cookies";
import { Pages, Routes, UserType } from "@/constants/enums";

interface AuthState {
  // State
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  signup: (userData: RegisterData) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  refreshTokens: () => Promise<void>;
  clearAuth: () => void;
  forgotPassword: (email: string) => Promise<any>;
  verifyAccount: ({
    email,
    otp,
  }: {
    email: string;
    otp: string;
  }) => Promise<AuthResponse>;
  resendOtp: (data: { email: string }) => Promise<any>;
  resetPassword: (data: {
    email: string;
    otp: string;
    password: string;
    password_confirmation: string;
  }) => Promise<any>;
  // Computed
  isStudent: () => boolean;
  isAcademy: () => boolean;
}

// Initialize authentication state from cookies
const initializeAuthState = () => {
  const { accessToken, refreshToken, user } = authCookies.getAuthData();

  return {
    user,
    accessToken,
    refreshToken,
    isLoading: false,
    isAuthenticated: Boolean(accessToken && refreshToken && user),
  };
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  // Initial state
  ...initializeAuthState(),
  // Actions
  setUser: (user) =>
    set(() => ({
      user,
      isAuthenticated: !!user && !!get().accessToken,
    })),

  setLoading: (loading) =>
    set(() => ({
      isLoading: loading,
    })),

  login: async (credentials) => {
    set(() => ({ isLoading: true }));

    try {
      const data = await authService.login(credentials);

      set(() => ({
        user: data.data.user as unknown as User,
        accessToken: data.data.access_token,
        refreshToken: data.data.access_token, // Note: no refresh token in current response
        isAuthenticated: true,
        isLoading: false,
      }));

      // Store in cookies
      authCookies.setAuthData(
        data.data.access_token,
        data.data.access_token, // Note: no refresh token in current response
        data.data.user as any
      );
      return data;
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
        user: response.data.user as unknown as User,
        accessToken: response.data.access_token,
        refreshToken: response.data.access_token,
        isAuthenticated: true,
        isLoading: false,
      }));

      // Store in cookies
      authCookies.setAuthData(
        response.data.access_token,
        response.data.access_token,
        response.data.user as any
      );
      return response;
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
        user: user as unknown as User,
        isAuthenticated: true,
        isLoading: false,
      }));

      // Update user data in cookies
      authCookies.setUser(user as any);
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

      // Update tokens in cookies
      authCookies.setTokens(response.data.access_token, response.data.access_token);
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
      isAuthenticated: false,
      isLoading: false,
    }));

    // Clear cookies
    authCookies.clearAll();
  },

  // Computed getters
  isStudent: () => {
    const { user } = get();
    return user?.user_type === UserType.STUDENT;
  },

  isAcademy: () => {
    const { user } = get();
    return user?.user_type === UserType.ACADEMY;
  },
  forgotPassword: async (email) => {
    set(() => ({ isLoading: true }));

    try {
      const response = await authService.forgotPassword(email);
      set(() => ({ isLoading: false }));
      return response;
    } catch (error) {
      set(() => ({ isLoading: false }));
      throw error;
    }
  },
  verifyAccount: async (data) => {
    set(() => ({ isLoading: true }));

    try {
      const response = await authService.verifyAccount(data);

      // Update auth state with verified user data and tokens
      set(() => ({
        user: response.data.user as unknown as User,
        accessToken: response.data.access_token,
        refreshToken: response.data.access_token,
        isAuthenticated: true,
        isLoading: false,
      }));

      // Store in cookies
      if (response.data) {
        authCookies.setAuthData(
          response.data.access_token,
          response.data.access_token,
          response.data.user as any
        );
      }

      return response;
    } catch (error) {
      set(() => ({ isLoading: false }));
      throw error;
    }
  },
  resendOtp: async (data) => {
    set(() => ({ isLoading: true }));

    try {
      const response = await authService.resendOtp(data);
      set(() => ({ isLoading: false }));
      return response;
    } catch (error) {
      set(() => ({ isLoading: false }));
      throw error;
    }
  },
  resetPassword: async (data) => {
    set(() => ({ isLoading: true }));

    try {
      const response = await authService.resetPassword(data);
      set(() => ({ isLoading: false }));
      return response;
    } catch (error) {
      set(() => ({ isLoading: false }));
      throw error;
    }
  },
}));

// Selectors for specific state slices
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useIsLoading = () => useAuthStore((state) => state.isLoading);

// Individual action selectors - more stable than returning an object
export const useLogin = () => useAuthStore((state) => state.login);
export const useSignup = () => useAuthStore((state) => state.signup);
export const useLogout = () => useAuthStore((state) => state.logout);
export const useRefreshUser = () => useAuthStore((state) => state.refreshUser);
export const useRefreshTokens = () =>
  useAuthStore((state) => state.refreshTokens);
export const useClearAuth = () => useAuthStore((state) => state.clearAuth);

export const useForgotPassword = () =>
  useAuthStore((state) => state.forgotPassword);

export const useVerifyAccount = () =>
  useAuthStore((state) => state.verifyAccount);

export const useResnedOtp = () => useAuthStore((state) => state.resendOtp);
export const useResetPassword = () =>
  useAuthStore((state) => state.resetPassword);
