import { queryKeys } from "@/lib/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { academyApi } from "../services/academy";
import type { HeroPayload, HeroResponse } from "@/types/academy/hero";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const useAcademyHeroMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: HeroPayload) => academyApi.updateHero(data),
    onSuccess: (response: HeroResponse) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.academy.hero(),
      });
      toast.success(response.message || "تم تحديث القسم الرئيسي بنجاح");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "حدث خطأ أثناء تحديث القسم الرئيسي";
      toast.error(errorMessage);
      console.error("Error updating Hero section:", error);
    },
  });
};
