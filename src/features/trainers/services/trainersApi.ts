import { api } from "@/lib/axios";
import { appendFormData } from "@/lib/formdata";
import { authCookies } from "@/lib/cookies";
import type { Trainer } from "@/types/trainer";

// Types for API requests
export interface TrainerPayload {
  fname: string;
  lname: string;
  email: string;
  phone_number: string;
  image: File | null;
  bio?: string;
}

// Types for API responses
export interface TrainersListResponse {
  status: string;
  status_code: number;
  message: string;
  data: {
    trainers: Trainer[];
  };
}

export interface TrainerResponse {
  status: string;
  status_code: number;
  error_type: string | null;
  message: string;
  data: Trainer;
}

// API service for trainers
export const trainersApi = {
  getTrainers: async (): Promise<TrainersListResponse> => {
    // Get tokens for academy
    const tokens = authCookies.getTokens();
    
    const response = await api.get("/trainers", {
      headers: {
        "X-Academy-Access-Token": tokens.accessToken || "",
        "X-Academy-Refresh-Token": tokens.refreshToken || "",
      },
    });
    return response.data;
  },

  // Get single trainer by ID
  getTrainer: async (id: string): Promise<TrainerResponse> => {
    // Get tokens for academy
    const tokens = authCookies.getTokens();
    
    const response = await api.get(`/trainers/${id}`, {
      headers: {
        "X-Academy-Access-Token": tokens.accessToken || "",
        "X-Academy-Refresh-Token": tokens.refreshToken || "",
      },
    });
    return response.data;
  },

  // Create new trainer
  createTrainer: async (trainerData: TrainerPayload): Promise<TrainerResponse> => {
    // Create FormData for file uploads
    const formData = new FormData();
    appendFormData(formData, {
      ...trainerData,
    });
    
    // Get tokens for academy
    const tokens = authCookies.getTokens();
    
    // Add academy tokens to request
    const response = await api.post("/trainers", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Academy-Access-Token": tokens.accessToken || "",
        "X-Academy-Refresh-Token": tokens.refreshToken || "",
      },
    });

    return response.data;
  },

  // Update existing trainer
  updateTrainer: async (
    id: string,
    trainerData: Partial<TrainerPayload>
  ): Promise<TrainerResponse> => {
    // Create FormData for file uploads if needed
    const formData = new FormData();
    appendFormData(formData, trainerData);
    
    // Get tokens for academy
    const tokens = authCookies.getTokens();

    const response = await api.put(`/trainers/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Academy-Access-Token": tokens.accessToken || "",
        "X-Academy-Refresh-Token": tokens.refreshToken || "",
      },
    });

    return response.data;
  },

  // Delete trainer
  deleteTrainer: async (id: string): Promise<void> => {
    // Get tokens for academy
    const tokens = authCookies.getTokens();
    
    await api.delete(`/trainers/${id}`, {
      headers: {
        "X-Academy-Access-Token": tokens.accessToken || "",
        "X-Academy-Refresh-Token": tokens.refreshToken || "",
      },
    });
  },

  // Activate/Deactivate trainer
  toggleTrainerStatus: async (
    id: string,
    isActive: boolean
  ): Promise<Trainer> => {
    // Get tokens for academy
    const tokens = authCookies.getTokens();
    
    const response = await api.patch(`/trainers/${id}/status`, 
      { isActive },
      {
        headers: {
          "X-Academy-Access-Token": tokens.accessToken || "",
          "X-Academy-Refresh-Token": tokens.refreshToken || "",
        },
      }
    );
    return response.data.trainer;
  },
};