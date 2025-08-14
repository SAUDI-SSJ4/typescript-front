import { api } from "@/lib/axios";
import type {
  SlidersListResponse,
  SliderResponse,
  SliderPayload,
} from "@/types/slider";

// API service for Sliders (About Us section)
export const slidersApi = {
  // Get all sliders
  getSliders: async (): Promise<SlidersListResponse> => {
    const response = await api.get("sliders/");
    return response.data;
  },

  // Get single slider by ID
  getSlider: async (id: string): Promise<SliderResponse> => {
    const response = await api.get(`sliders/${id}`);
    return response.data;
  },

  // Create new slider
  createSlider: async (sliderData: SliderPayload): Promise<SliderResponse> => {
    const response = await api.post("sliders/", sliderData);
    return response.data;
  },

  // Update existing slider
  updateSlider: async (id: string, sliderData: SliderPayload): Promise<SliderResponse> => {
    const response = await api.put(`sliders/${id}`, sliderData);
    return response.data;
  },

  // Delete slider
  deleteSlider: async (id: string): Promise<SliderResponse> => {
    const response = await api.delete(`sliders/${id}`);
    return response.data;
  },
}; 