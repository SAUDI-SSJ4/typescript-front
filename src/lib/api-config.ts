/**
 * API Configuration
 * Centralized configuration for API endpoints and URLs
 */

// API URL Configuration with proper CORS handling
export const getApiUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;
  
  // Default API URL for development
  const defaultUrl = "http://127.0.0.1:8000/api/v1";
  
  if (!envUrl) {
    console.log("VITE_API_URL not defined, using default:", defaultUrl);
    return defaultUrl;
  }
  
  try {
    // Validate URL format
    const url = new URL(envUrl);
    // Ensure it ends with /api/v1 if it's not already there
    if (!url.pathname.endsWith('/api/v1') && !url.pathname.endsWith('/api/v1/')) {
      url.pathname = url.pathname.endsWith('/') ? `${url.pathname}api/v1` : `${url.pathname}/api/v1`;
    }
    console.log("Using API URL from environment:", url.toString());
    return url.toString();
  } catch {
    console.warn("Invalid VITE_API_URL format, using default:", defaultUrl);
    return defaultUrl;
  }
};

// API Base URL
export const API_BASE_URL = getApiUrl();

// API Endpoints - Remove /api/v1 prefix since it's already in base URL
export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  REFRESH: "/auth/refresh",
  
  // User
  ME: "/me",
  UPDATE_PROFILE: "/me/update",
  
  // Courses
  COURSES: "/academy/courses",
  COURSE_DETAILS: (id: string) => `/academy/courses/${id}`,
  COURSE_CHAPTERS: (id: string) => `/academy/courses/${id}/chapters`,
  
  // Certificates
  CERTIFICATES: "/certificates/list",
  ISSUE_CERTIFICATE: (id: number) => `/certificates/issue-automatic/${id}`,
  MONITOR_COMPLETION: "/certificates/monitor-completion",
  
  // Academy
  ACADEMY_SETTINGS: "/academy/settings",
  ACADEMY_ABOUT: "/academy/about",
  ACADEMY_HERO: "/academy/hero",
  
  // Categories
  CATEGORIES: "/categories",
  
  // Cart
  CART: "/cart",
  CART_ADD: "/cart/add",
  CART_REMOVE: (cartId: string) => `/cart/delete/${cartId}`,
  CART_CLEAR: "/cart/clear",
  
  // Payment
  PAYMENT_METHODS: "/payment/methods",
  PAYMENT_CHECKOUT: "/checkout/process",
  PAYMENT_VERIFY: (transactionId: number) => `/payment/transaction/verify/${transactionId}`,
  PAYMENT_INVOICES: "/payment/invoices",
  PAYMENT_INVOICE_DETAILS: (invoiceId: number) => `/payment/invoices/${invoiceId}`,
  PAYMENT_ENROLLMENT_HISTORY: "/payment/student/enrollment-history",
  PAYMENT_HISTORY: "/payment/student/payment-history",
} as const;

// Helper function to create full URL
export const createApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};

// Helper function to create image URL
export const createImageUrl = (imagePath?: string): string | undefined => {
  if (!imagePath) return undefined;
  
  try {
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // If it's a relative path, prepend API base URL
    if (imagePath.startsWith('/')) {
      return `${API_BASE_URL}${imagePath}`;
    }
    
    // If it's a relative path without leading slash
    return `${API_BASE_URL}/${imagePath}`;
  } catch (error) {
    console.warn("Error creating image URL:", error);
    return undefined;
  }
};

// Helper function to create video URL
export const createVideoUrl = (videoPath?: string): string | undefined => {
  return createImageUrl(videoPath);
};

// Default API configuration
export const DEFAULT_API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
} as const;
