import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  lessonsApi,
  type LessonResponse,
  type LessonPayload,
  type LessonUpdatePayload,
} from "../services/lessonsApi";
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

// Hook for creating a new lesson
export const useCreateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lessonData: LessonPayload) =>
      lessonsApi.createLesson(lessonData),
    onSuccess: (response: LessonResponse, variables: LessonPayload) => {
      // Invalidate all lessons-related queries to ensure freshness
      queryClient.invalidateQueries({
        queryKey: queryKeys.sections.all,
      });

      // Also invalidate section-specific lessons
      queryClient.invalidateQueries({
        queryKey: queryKeys.lessons.bySection(variables.sectionId),
      });

      // If we have course_id in the response, invalidate course-specific lessons
      if (response.data.lesson.section_id) {
        // You might need to get the course_id from the section
        queryClient.invalidateQueries({
          queryKey: queryKeys.sections.all,
        });
      }

      toast.success(response.message || "تم إنشاء الدرس بنجاح");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "حدث خطأ أثناء إنشاء الدرس";
      toast.error(errorMessage);
      console.error("Error creating lesson:", error);
    },
  });
};

// Hook for updating an existing lesson
export const useUpdateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lessonId, data }: LessonUpdatePayload) =>
      lessonsApi.updateLesson({ lessonId, data }),
    onSuccess: (response: LessonResponse) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.sections.all,
      });
      console.log("response", response);
      toast.success(response.message || "تم تحديث الدرس بنجاح");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "حدث خطأ أثناء تحديث الدرس";
      toast.error(errorMessage);
      console.error("Error updating lesson:", error);
    },
  });
};

// Hook for deleting a lesson
export const useDeleteLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => lessonsApi.deleteLesson(id),
    onSuccess: (response: LessonResponse) => {
      queryClient.removeQueries({
        queryKey: queryKeys.sections.all,
      });

      toast.success(response.message || "تم حذف الدرس بنجاح");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "حدث خطأ أثناء حذف الدرس";
      toast.error(errorMessage);
      console.error("Error deleting lesson:", error);
    },
  });
};
export const useUploadVideoLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lessonId, data }: LessonUpdatePayload) =>
      lessonsApi.uploadVideoLesson(lessonId, data),
    onSuccess: (response: LessonResponse) => {
      // Invalidate the specific lesson to refresh video data
      queryClient.invalidateQueries({
        queryKey: queryKeys.sections.all,
      });

      toast.success(response.message || "تم رفع الفيديو بنجاح");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "حدث خطأ أثناء رفع الفيديو";
      toast.error(errorMessage);
      console.error("Error uploading video:", error);
    },
  });
};
