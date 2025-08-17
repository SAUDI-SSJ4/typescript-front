import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { faqsApi } from "../services/faqsApi";
import type { FAQPayload, FAQResponse } from "@/types/faq";
import { queryKeys } from "@/lib/query-keys";

// Type for API error response
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

// Hook for creating a new FAQ
export const useCreateFAQ = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (faqData: FAQPayload) => faqsApi.createFAQ(faqData),
    onSuccess: (response: FAQResponse) => {
      // Invalidate all FAQs-related queries to ensure freshness
      queryClient.invalidateQueries({
        queryKey: queryKeys.faqs.all,
      });

      toast.success(response.message || "تم إنشاء السؤال الشائع بنجاح!");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message || "حدث خطأ أثناء إنشاء السؤال الشائع";
      toast.error(errorMessage);
      console.error("Error creating FAQ:", error);
    },
  });
};

// Hook for updating an existing FAQ
export const useUpdateFAQ = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FAQPayload }) =>
      faqsApi.updateFAQ(id, data),
    onSuccess: (response: FAQResponse) => {
      // Invalidate all FAQs-related queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.faqs.all,
      });

      toast.success(response.message || "تم تحديث السؤال الشائع بنجاح!");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message || "حدث خطأ أثناء تحديث السؤال الشائع";
      toast.error(errorMessage);
      console.error("Error updating FAQ:", error);
    },
  });
};

// Hook for deleting a FAQ
export const useDeleteFAQ = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => faqsApi.deleteFAQ(id),
    onSuccess: (response: FAQResponse) => {
      // Invalidate all FAQs-related queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.faqs.all,
      });

      toast.success(response.message || "تم حذف السؤال الشائع بنجاح!");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message || "حدث خطأ أثناء حذف السؤال الشائع";
      toast.error(errorMessage);
      console.error("Error deleting FAQ:", error);
    },
  });
};
