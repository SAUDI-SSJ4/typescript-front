import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { opinionsApi } from "../services/opinionsApi";
import type { OpinionPayload, OpinionResponse } from "@/types/academy/opinion";
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

// Hook for creating a new opinion
export const useCreateOpinion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (opinionData: OpinionPayload) =>
      opinionsApi.createOpinion(opinionData),
    onSuccess: (response: OpinionResponse) => {
      // Invalidate all opinions-related queries to ensure freshness
      queryClient.invalidateQueries({
        queryKey: queryKeys.opinions.all,
      });

      toast.success(response.message || "تم إنشاء الرأي بنجاح!");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message || "حدث خطأ أثناء إنشاء الرأي";
      toast.error(errorMessage);
      console.error("Error creating opinion:", error);
    },
  });
};

// Hook for updating an existing opinion
export const useUpdateOpinion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: OpinionPayload }) =>
      opinionsApi.updateOpinion(id, data),
    onSuccess: (response: OpinionResponse) => {
      // Invalidate all opinions-related queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.opinions.all,
      });

      toast.success(response.message || "تم تحديث الرأي بنجاح!");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message || "حدث خطأ أثناء تحديث الرأي";
      toast.error(errorMessage);
      console.error("Error updating opinion:", error);
    },
  });
};

// Hook for deleting an opinion
export const useDeleteOpinion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => opinionsApi.deleteOpinion(id),
    onSuccess: (response: OpinionResponse) => {
      // Invalidate all opinions-related queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.opinions.all,
      });

      toast.success(response.message || "تم حذف الرأي بنجاح!");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message || "حدث خطأ أثناء حذف الرأي";
      toast.error(errorMessage);
      console.error("Error deleting opinion:", error);
    },
  });
};
