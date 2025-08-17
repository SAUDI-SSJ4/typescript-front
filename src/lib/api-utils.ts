import { API_BASE_URL } from "./api-config";

// Helper function to get headers with authentication
const getHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  // Get authorization header if available
  const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Helper function to make API calls with proper error handling
export const makeApiCall = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    mode: 'cors', // Explicitly set CORS mode
    headers: {
      ...getHeaders(),
      ...options.headers,
    },
    credentials: 'include', // Re-enabled after fixing backend CORS
  });
  
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: `HTTP error! status: ${response.status}` };
    }
    
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};



