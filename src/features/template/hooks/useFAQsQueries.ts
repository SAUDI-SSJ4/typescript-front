import { useQuery } from "@tanstack/react-query";
import { faqsApi } from "../services/faqsApi";
import type { FAQsListResponse, FAQResponse } from "@/types/faq";
import { queryKeys } from "@/lib/query-keys";

// Hook for fetching all FAQs
export const useFAQs = () => {
  return useQuery<FAQsListResponse>({
    queryKey: queryKeys.faqs.lists(),
    queryFn: () => faqsApi.getFAQs(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for fetching a single FAQ by ID
export const useFAQ = (id: string) => {
  return useQuery<FAQResponse>({
    queryKey: queryKeys.faqs.detail(id),
    queryFn: () => faqsApi.getFAQ(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}; 