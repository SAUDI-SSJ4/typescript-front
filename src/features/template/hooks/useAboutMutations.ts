import { queryKeys } from "@/lib/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AboutPayload, AboutResponse } from "@/types/academy/about";
import { academyApi } from "../services/academy";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const useAcademyAboutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AboutPayload) => academyApi.updateAbout(data),
    onSuccess: (response: AboutResponse) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.academy.about(),
      });
      toast.success(response.message || "تم تحديث من نحن بنجاح");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "حدث خطأ أثناء تحديث من نحن";
      toast.error(errorMessage);
      console.error("Error updating about section:", error);
    },
  });
};
