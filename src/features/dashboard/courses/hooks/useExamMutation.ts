import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "@/lib/query-keys";
import {
  examApi,
  type ExamPayload,
  type ExamResponse,
} from "../services/examApi";

// Type for API error response
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const useAddExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { lessonId: string; data: ExamPayload }) =>
      examApi.createExam(data),
    onSuccess: (response: ExamResponse) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.exam.all,
      });

      toast.success(response.message || "تم إنشاء الامتحان بنجاح");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "حدث خطأ أثناء إنشاء الامتحان";
      toast.error(errorMessage);
      console.error("Error creating exam:", error);
    },
  });
};
