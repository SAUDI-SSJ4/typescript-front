import {
  useUser,
  useIsAuthenticated,
  useIsLoading,
  useAccessToken,
  useRefreshToken,
  useLogin,
  useSignup,
  useLogout,
  useRefreshUser,
  useRefreshTokens,
  useClearAuth,
} from "@/features/auth/store";

// Main authentication hook that combines all the functionality
export function useAuth() {
  const user = useUser();
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useIsLoading();
  const accessToken = useAccessToken();
  const refreshToken = useRefreshToken();
  const login = useLogin();
  const signup = useSignup();
  const logout = useLogout();
  const refreshUser = useRefreshUser();
  const refreshTokens = useRefreshTokens();
  const clearAuth = useClearAuth();

  return {
    user,
    isAuthenticated,
    isLoading,
    accessToken,
    refreshToken,
    login,
    signup,
    logout,
    refreshUser,
    refreshTokens,
    clearAuth,
  };
}

// Individual hooks for specific functionality
export function useCurrentUser() {
  return useUser();
}

export function useAuthState() {
  return {
    user: useUser(),
    isAuthenticated: useIsAuthenticated(),
    isLoading: useIsLoading(),
  };
}

// Hook for authentication actions only
export function useAuthMutations() {
  const login = useLogin();
  const signup = useSignup();
  const logout = useLogout();
  const refreshUser = useRefreshUser();
  const refreshTokens = useRefreshTokens();
  const clearAuth = useClearAuth();

  return {
    login,
    signup,
    logout,
    refreshUser,
    refreshTokens,
    clearAuth,
  };
}
