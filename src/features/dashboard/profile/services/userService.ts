import { api } from "@/lib/axios";
import { authCookies } from "@/lib/cookies";
import { API_ENDPOINTS } from "@/lib/api-config";

export interface UserProfile {
  status: string;
  status_code: number;
  data: UserProfileData;
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
}

export interface UpdateUserProfileRequest {
  fname?: string;
  lname?: string;
  email?: string;
  phone_number?: string;
  gender?: string;
  avatar?: File | null;
  banner?: File | null;
}

export interface UpdateProfilePictureRequest {
  profile_picture: File;
}

export const userService = {
  // Get current user profile from /me endpoint
  async getCurrentUserProfile(): Promise<UserProfileData> {
    // Get tokens for academy
    const tokens = authCookies.getTokens();
    
    try {
      const response = await api.get<UserProfile>(API_ENDPOINTS.ME, {
        headers: {
          "X-Academy-Access-Token": tokens.accessToken || "",
          "X-Academy-Refresh-Token": tokens.refreshToken || "",
        },
      });
      
      // Ensure we have valid data
      if (!response.data || !response.data.data) {
        throw new Error("Invalid response format from server");
      }
      
      return response.data.data;
    } catch (error) {
      console.error("Error fetching current user profile:", error);
      // Return a default user profile instead of throwing
      return {
        id: 0,
        fname: "Unknown",
        lname: "User",
        email: "unknown@example.com",
        phone_number: "",
        gender: "",
        avatar_url: "",
        banner_url: ""
      };
    }
  },

  // Update user profile
  async updateUserProfile(data: UpdateUserProfileRequest): Promise<UserProfileData> {
    // Get tokens for academy
    const tokens = authCookies.getTokens();
    
    try {
      // Create FormData for file uploads if needed
      const formData = new FormData();
      
      // Add text fields
      if (data.fname) formData.append("fname", data.fname);
      if (data.lname) formData.append("lname", data.lname);
      if (data.email) formData.append("email", data.email);
      if (data.phone_number) formData.append("phone_number", data.phone_number);
      if (data.gender) formData.append("gender", data.gender);
      
      // Add file fields
      if (data.avatar) formData.append("avatar", data.avatar);
      if (data.banner) formData.append("banner", data.banner);

      const response = await api.put<UserProfile>(API_ENDPOINTS.ME, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Academy-Access-Token": tokens.accessToken || "",
          "X-Academy-Refresh-Token": tokens.refreshToken || "",
        },
      });
      
      // Ensure we have valid data
      if (!response.data || !response.data.data) {
        throw new Error("Invalid response format from server");
      }
      
      return response.data.data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      // Return a default user profile instead of throwing
      return {
        id: 0,
        fname: "Unknown",
        lname: "User",
        email: "unknown@example.com",
        phone_number: "",
        gender: "",
        avatar_url: "",
        banner_url: ""
      };
    }
  },

  // Legacy methods for backward compatibility
  // Get user profile by ID
  async getUserProfile(userId: string): Promise<UserProfileData> {
    const tokens = authCookies.getTokens();
    
    try {
      const response = await api.get<UserProfile>(`/api/v1/user/profile/${userId}`, {
        headers: {
          "X-Academy-Access-Token": tokens.accessToken || "",
          "X-Academy-Refresh-Token": tokens.refreshToken || "",
        },
      });
      
      // Ensure we have valid data
      if (!response.data || !response.data.data) {
        throw new Error("Invalid response format from server");
      }
      
      return response.data.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Return a default user profile instead of throwing
      return {
        id: 0,
        fname: "Unknown",
        lname: "User",
        email: "unknown@example.com",
        phone_number: "",
        gender: "",
        avatar_url: "",
        banner_url: ""
      };
    }
  },

  // Update profile picture only
  async updateProfilePicture(data: UpdateProfilePictureRequest): Promise<UserProfileData> {
    const tokens = authCookies.getTokens();
    
    try {
      const formData = new FormData();
      formData.append("avatar", data.profile_picture);

      const response = await api.put<UserProfile>(API_ENDPOINTS.ME, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Academy-Access-Token": tokens.accessToken || "",
          "X-Academy-Refresh-Token": tokens.refreshToken || "",
        },
      });
      
      // Ensure we have valid data
      if (!response.data || !response.data.data) {
        throw new Error("Invalid response format from server");
      }
      
      return response.data.data;
    } catch (error) {
      console.error("Error updating profile picture:", error);
      // Return a default user profile instead of throwing
      return {
        id: 0,
        fname: "Unknown",
        lname: "User",
        email: "unknown@example.com",
        phone_number: "",
        gender: "",
        avatar_url: "",
        banner_url: ""
      };
    }
  },

  // Delete profile picture
  async deleteProfilePicture(): Promise<UserProfileData> {
    const tokens = authCookies.getTokens();
    
    try {
      const response = await api.delete<UserProfile>("/api/v1/user/profile/picture", {
        headers: {
          "X-Academy-Access-Token": tokens.accessToken || "",
          "X-Academy-Refresh-Token": tokens.refreshToken || "",
        },
      });
      
      // Ensure we have valid data
      if (!response.data || !response.data.data) {
        throw new Error("Invalid response format from server");
      }
      
      return response.data.data;
    } catch (error) {
      console.error("Error deleting profile picture:", error);
      // Return a default user profile instead of throwing
      return {
        id: 0,
        fname: "Unknown",
        lname: "User",
        email: "unknown@example.com",
        phone_number: "",
        gender: "",
        avatar_url: "",
        banner_url: ""
      };
    }
  },
};
