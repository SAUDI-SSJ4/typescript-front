import { api } from "@/lib/axios";
import type { FAQsListResponse, FAQResponse, FAQPayload } from "@/types/faq";

// API service for FAQs
export const faqsApi = {
  // Get all FAQs
  getFAQs: async (): Promise<FAQsListResponse> => {
    const response = await api.get("/faqs/");
    return response.data;
  },

  // Get single FAQ by ID
  getFAQ: async (id: string): Promise<FAQResponse> => {
    const response = await api.get(`/faqs/${id}`);
    return response.data;
  },

  // Create new FAQ
  createFAQ: async (faqData: FAQPayload): Promise<FAQResponse> => {
    // Add default values for required fields
    const payload = {
      ...faqData,
      category: faqData.category || "عام",
      order: faqData.order || 1,
      is_active: faqData.is_active !== undefined ? faqData.is_active : true,
    };

    const response = await api.post("/faqs", payload);
    return response.data;
  },

  // Update existing FAQ
  updateFAQ: async (id: number, faqData: FAQPayload): Promise<FAQResponse> => {
    // Add default values for required fields
    const payload = {
      ...faqData,
      category: faqData.category || "عام",
      order: faqData.order || 1,
      is_active: faqData.is_active !== undefined ? faqData.is_active : true,
    };

    const response = await api.put(`/faqs/${id}`, payload);
    return response.data;
  },

  // Delete FAQ
  deleteFAQ: async (id: number): Promise<FAQResponse> => {
    const response = await api.delete(`/faqs/${id}`);
    return response.data;
  },
};
