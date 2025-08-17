import { api } from "@/lib/axios";
import { appendFormData } from "@/lib/formdata";
import { API_ENDPOINTS } from "@/lib/api-config";
import type {
  AuthResponse,
  User,
  LoginRequest,
  SignupRequest,
  TokenRefreshResponse,
} from "@/types/user";

export const authService = {
  // Login user
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(API_ENDPOINTS.LOGIN, credentials);
    console.log(response);
    return response.data;
  },

  // Register user
  async signup(userData: SignupRequest): Promise<AuthResponse> {
    const formData = new FormData();
    appendFormData(formData, userData);

    const response = await api.post<AuthResponse>(API_ENDPOINTS.REGISTER, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Get current user
  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>(API_ENDPOINTS.ME);
    return response.data;
  },

  // Logout user
  async logout(): Promise<void> {
    await api.post(API_ENDPOINTS.LOGOUT);
  },

  // Refresh token
  async refreshToken(refreshToken: string): Promise<TokenRefreshResponse> {
    const response = await api.post<TokenRefreshResponse>(API_ENDPOINTS.REFRESH, {
      refresh_token: refreshToken,
    });
    return response.data;
  },

  // Forgot password
  async forgotPassword(email: string): Promise<any> {
    await api.post("/api/v1/auth/forgot-password", { email });
  },

  // Reset password
  async resetPassword(token: string, newPassword: string): Promise<any> {
    await api.post("/api/v1/auth/reset-password", { token, password: newPassword });
  },
};
