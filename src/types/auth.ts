// Authentication types for the frontend

export interface User {
  id: number;
  fname: string;
  lname: string;
  email: string;
  phone_number?: string;
  gender?: string;
  user_type: UserType;
  verified: boolean;
  avatar_url?: string;
  banner_url?: string;
}

export enum UserType {
  STUDENT = "student",
  ACADEMY = "academy",
  ADMIN = "admin"
}

export interface LoginCredentials {
  email: string;
  password: string;
  google_token?: string;
  user_type?: UserType;
}

export interface RegisterData {
  fname: string;
  lname: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone_number?: string;
  gender?: string;
  user_type: UserType;
  confirm_password?: string;
  google_token?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    access_token: string;
    token_type: string;
  };
  message: string;
  status_code?: number;
}

export interface OTPVerificationData {
  email: string;
  otp: string;
}

export interface PasswordResetData {
  email: string;
  otp: string;
  password: string;
  password_confirmation: string;
}

export interface UserProfileData {
  id: number;
  fname: string;
  lname: string;
  email: string;
  phone_number?: string;
  gender?: string;
  avatar_url?: string;
  banner_url?: string;
  user_type?: UserType;
  verified?: boolean;
  avatar?: string;
  banner?: string;
}

export interface OTPRequestData {
  email: string;
  purpose: string;
}

export interface TokenRefreshResponse {
  success: boolean;
  data: {
    access_token: string;
    token_type: string;
  };
  message: string;
}
