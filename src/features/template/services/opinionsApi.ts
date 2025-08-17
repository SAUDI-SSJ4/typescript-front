import { api } from "@/lib/axios";
import { appendFormData } from "@/lib/formdata";
import type {
  OpinionsListResponse,
  OpinionResponse,
  OpinionPayload,
} from "@/types/academy/opinion";

// API service for Opinions
export const opinionsApi = {
  // Get all opinions with pagination
  getOpinions: async (skip = 0, limit = 100): Promise<OpinionsListResponse> => {
    const response = await api.get(`opinions?skip=${skip}&limit=${limit}`);
    return response.data;
  },

  // Get single opinion by ID
  getOpinion: async (id: string): Promise<OpinionResponse> => {
    const response = await api.get(`opinions/${id}`);
    return response.data;
  },

  // Create new opinion
  createOpinion: async (
    opinionData: OpinionPayload
  ): Promise<OpinionResponse> => {
    // Add default values for required fields
    const payload = {
      ...opinionData,
      is_featured:
        opinionData.is_featured !== undefined ? opinionData.is_featured : false,
      is_approved:
        opinionData.is_approved !== undefined ? opinionData.is_approved : true,
    };
    const formData = new FormData();
    appendFormData(formData, payload);
    const response = await api.post("opinions", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Update existing opinion
  updateOpinion: async (
    id: string,
    opinionData: OpinionPayload
  ): Promise<OpinionResponse> => {
    // Add default values for required fields
    const payload = {
      ...opinionData,
      is_featured:
        opinionData.is_featured !== undefined ? opinionData.is_featured : false,
      is_approved:
        opinionData.is_approved !== undefined ? opinionData.is_approved : true,
    };

    const formData = new FormData();
    appendFormData(formData, payload);

    const response = await api.put(`opinions/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Delete opinion
  deleteOpinion: async (id: string): Promise<OpinionResponse> => {
    const response = await api.delete(`opinions/${id}`);
    return response.data;
  },
};
