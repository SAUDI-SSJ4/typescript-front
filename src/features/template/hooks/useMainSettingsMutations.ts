import { queryKeys } from "@/lib/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { academyApi } from "../services/academy";
import { toast } from "sonner";
import type {
  MainSettingsPayload,
  MainSettingsResponse,
} from "@/types/academy/main-settings";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const useAcademyMainSettingsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MainSettingsPayload) =>
      academyApi.updateMainSetting(data),
    onSuccess: (response: MainSettingsResponse) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.academy.mainSettings(),
      });
      toast.success(response.message || "تم تحديث الإعدادات بنجاح");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "حدث خطأ أثناء تحديث الإعدادات";
      toast.error(errorMessage);
      console.error("Error updating academy settings:", error);
    },
  });
};
