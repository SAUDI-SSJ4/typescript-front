import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  toolApi,
  type ToolPayload,
  type ToolResponse,
} from "../services/toolApi";
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

// Hook for creating a new tool
export const useCreateTool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (toolData: ToolPayload) => toolApi.createTool(toolData),
    onSuccess: (response: ToolResponse) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.sections.all,
      });

      toast.success(response.message || "تم إنشاء الدرس بنجاح");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "حدث خطأ أثناء إنشاء الدرس";
      toast.error(errorMessage);
      console.error("Error creating tool:", error);
    },
  });
};
