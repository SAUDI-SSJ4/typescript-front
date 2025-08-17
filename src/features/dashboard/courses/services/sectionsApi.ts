import { api } from "@/lib/axios";
import type { Section } from "@/types/couse";
import type {
  SectionPayload,
  SectionUpdatePayload,
} from "../hooks/useSectionsMutations";

// Types for API responses
export interface SectionsListResponse {
  status: string;
  status_code: number;
  message: string;
  data: { items: Section[]; total: number };
}

export interface SectionResponse {
  status: string;
  status_code: number;
  error_type: string | null;
  message: string;
  data: Section;
}

// API service for sections
export const sectionsApi = {
  // Get all sections
  getSections: async (courseId: string): Promise<SectionsListResponse> => {
    const response = await api.get(`/academy/courses/${courseId}/chapters`);
    return response.data;
  },

  // Get sections by course ID
  getSectionsByCourse: async (
    courseId: string
  ): Promise<SectionsListResponse> => {
    const response = await api.get(`/academy/courses/${courseId}/sections`);
    return response.data;
  },

  // Get single section by ID
  getSection: async (id: string): Promise<SectionResponse> => {
    const response = await api.get(`/academy/sections/${id}`);
    return response.data;
  },

  // Create new section
  createSection: async ({
    courseId,
    data,
  }: SectionPayload): Promise<SectionResponse> => {
    const config =
      data instanceof FormData
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : {};

    const response = await api.post(
      `/academy/courses/${courseId}/chapters`,
      data,
      config
    );
    return response.data;
  },

  // Update existing section
  updateSection: async ({
    data,
    sectionId,
  }: SectionUpdatePayload): Promise<SectionResponse> => {
    const response = await api.put(`/chapters/${sectionId}`, data, {
      headers: {
        "Content-Type":
          typeof data === "object" ? "application/json" : "multipart/form-data",
      },
    });
    return response.data;
  },

  // Delete section
  deleteSection: async (id: string): Promise<void> => {
    await api.delete(`/chapters/${id}`);
  },

  // Toggle section publish status
  toggleSectionStatus: async (
    id: string,
    isPublished: boolean
  ): Promise<SectionResponse> => {
    const response = await api.patch(`/academy/sections/${id}/status`, {
      is_published: isPublished,
    });
    return response.data;
  },
};
