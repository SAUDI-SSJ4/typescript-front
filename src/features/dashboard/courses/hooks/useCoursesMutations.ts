import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  coursesApi,
  type CoursePayload,
  type CourseResponse,
} from "../services/coursesApi";
import { queryKeys } from "@/lib/query-keys";
import type { Course } from "@/types/couse";

// Type for API error response
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

// Hook for creating a new course
export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseData: CoursePayload) =>
      coursesApi.createCourse(courseData),
    onSuccess: (response: CourseResponse) => {
      // Invalidate all courses-related queries to ensure freshness
      queryClient.invalidateQueries({
        queryKey: queryKeys.courses.all,
      });

      toast.success(response.message || "تم إنشاء المادة التعليمية بنجاح!");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message ||
        "حدث خطأ أثناء إنشاء المادة التعليمية";
      toast.error(errorMessage);
      console.error("Error creating course:", error);
    },
  });
};

// Hook for updating an existing course
export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      courseData,
    }: {
      id: string;
      courseData: Partial<CoursePayload>;
    }) => coursesApi.updateCourse(id, courseData),
    onSuccess: (response: CourseResponse) => {
      // Invalidate all courses-related queries to ensure freshness
      queryClient.invalidateQueries({
        queryKey: queryKeys.courses.all,
      });

      toast.success(response.message || "تم تحديث المادة التعليمية بنجاح!");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message ||
        "حدث خطأ أثناء تحديث المادة التعليمية";
      toast.error(errorMessage);
      console.error("Error updating course:", error);
    },
  });
};

// Hook for deleting a course
export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (course: Course) => coursesApi.deleteCourse(course.id),
    onMutate: async (course: Course) => {
      // Cancel any outgoing refetches to avoid optimistic update conflicts
      await queryClient.cancelQueries({
        queryKey: queryKeys.courses.all,
      });

      // Get the previous data for rollback
      const previousData = queryClient.getQueryData(queryKeys.courses.lists());

      return { previousData, course };
    },
    onSuccess: () => {
      // Invalidate all courses queries to ensure freshness
      queryClient.invalidateQueries({
        queryKey: queryKeys.courses.all,
      });

      toast.success("تم حذف المادة التعليمية بنجاح!");
    },
    onError: (error: ApiError) => {
      // Revert optimistic updates on error by invalidating queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.courses.all,
      });

      const errorMessage =
        error?.response?.data?.message || "حدث خطأ أثناء حذف المادة التعليمية";
      toast.error(errorMessage);
      console.error("Error deleting course:", error);
    },
  });
};

// Hook for publishing a course
export const usePublishCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId: string) => coursesApi.publishCourse(courseId),
    onSuccess: (response: CourseResponse) => {
      // Invalidate all courses-related queries to ensure freshness
      queryClient.invalidateQueries({
        queryKey: queryKeys.courses.all,
      });

      toast.success(response.message || "تم نشر الدورة بنجاح!");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message ||
        "حدث خطأ أثناء نشر الدورة";
      toast.error(errorMessage);
      console.error("Error publishing course:", error);
    },
  });
};

// Hook for unpublishing a course (back to draft)
export const useUnpublishCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId: string) => coursesApi.unpublishCourse(courseId),
    onSuccess: (response: CourseResponse) => {
      // Invalidate all courses-related queries to ensure freshness
      queryClient.invalidateQueries({
        queryKey: queryKeys.courses.all,
      });

      toast.success(response.message || "تم إرجاع الدورة إلى المسودة بنجاح!");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message ||
        "حدث خطأ أثناء إرجاع الدورة إلى المسودة";
      toast.error(errorMessage);
      console.error("Error unpublishing course:", error);
    },
  });
};