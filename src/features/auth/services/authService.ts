import { api } from "@/lib/axios";
// import { appendFormData } from "@/lib/formdata";
// import { authCookies } from "@/lib/cookies";
import { API_ENDPOINTS } from "@/lib/api-config";
import type {
  AuthResponse,
  User,
  LoginCredentials,
  RegisterData,
  OTPVerificationData,
  OTPRequestData,
  TokenRefreshResponse,
  PasswordResetData,
} from "@/types/auth";

export const authService = {
<<<<<<< HEAD
  // Login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(API_ENDPOINTS.LOGIN, credentials);
    return response.data;
  },

  // Register
  async register(formData: FormData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(API_ENDPOINTS.REGISTER, formData, {
=======
  // Login user
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  // Register user
  async signup(userData: SignupRequest): Promise<AuthResponse> {
    const formData = new FormData();

    // Append text fields
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("phone", userData.phone);
    formData.append("password", userData.password);
    formData.append("user_type", userData.user_type);

    // Append file if exists
    if (userData.profile_picture) {
      formData.append("profile_picture", userData.profile_picture);
    }

    const response = await api.post<AuthResponse>("/auth/register", formData, {
>>>>>>> sketch
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
<<<<<<< HEAD

  // Forgot password
  async forgotPassword(email: string): Promise<any> {
    const response = await api.post("/auth/password/forgot", {
      email,
      redirect_url: `${location.origin}/auth/reset-password`,
    });
    return response.data;
  },

  // Verify OTP
  async verifyOTP(data: OTPVerificationData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/otp/verify", data);
    return response.data;
  },

  // Request OTP
  async requestOTP(data: OTPRequestData): Promise<any> {
    const response = await api.post<AuthResponse>("/auth/otp/request", {
      email: data.email,
      purpose: data.purpose,
    });
    return response.data;
  },
=======
>>>>>>> sketch

  // Get current user
  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>(API_ENDPOINTS.ME);
    return response.data;
  },

  // Logout
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

<<<<<<< HEAD
  // Reset password with token
  async resetPasswordWithToken(data: PasswordResetData): Promise<any> {
    const response = await api.post("/auth/password/reset-with-token", data);
    return response.data;
=======
  // Request password reset
  async requestPasswordReset(email: string): Promise<void> {
    await api.post("/auth/forgot-password", { email });
  },

  // Reset password
  async resetPassword(token: string, newPassword: string): Promise<void> {
    await api.post("/auth/reset-password", { token, password: newPassword });
>>>>>>> sketch
  },

  // Sign up (alias for register)
  async signup(userData: RegisterData): Promise<AuthResponse> {
    const formData = new FormData();
    formData.append('fname', userData.fname);
    formData.append('lname', userData.lname);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('password_confirmation', userData.password_confirmation);
    formData.append('user_type', userData.user_type);
    if (userData.phone_number) formData.append('phone_number', userData.phone_number);
    if (userData.gender) formData.append('gender', userData.gender);
    
    return this.register(formData);
  },

  // Verify account
  async verifyAccount(data: OTPVerificationData): Promise<AuthResponse> {
    return this.verifyOTP(data);
  },

  // Resend OTP
  async resendOtp(data: { email: string }): Promise<any> {
    const response = await api.post("/auth/otp/resend", data);
    return response.data;
  },

  // Reset password
  async resetPassword(data: PasswordResetData): Promise<any> {
    return this.resetPasswordWithToken(data);
  },
};
