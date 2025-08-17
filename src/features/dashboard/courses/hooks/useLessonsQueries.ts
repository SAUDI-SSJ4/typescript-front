import { useQuery } from "@tanstack/react-query";
import {
  lessonsApi,
  type LessonsListResponse,
  type LessonResponse,
} from "../services/lessonsApi";
import { queryKeys } from "@/lib/query-keys";

// Hook for fetching lessons by section ID
export const useLessonsBySection = (sectionId: string) => {
  return useQuery<LessonsListResponse>({
    queryKey: queryKeys.lessons.bySection(sectionId),
    queryFn: () => lessonsApi.getLessonsBySection(sectionId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!sectionId, // Only run query if sectionId is provided
  });
};

// Hook for fetching lessons by course ID
export const useLessonsByCourse = (courseId: string) => {
  return useQuery<LessonsListResponse>({
    queryKey: queryKeys.lessons.byCourse(courseId),
    queryFn: () => lessonsApi.getLessonsByCourse(courseId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!courseId, // Only run query if courseId is provided
  });
};

// Hook for fetching a single lesson by ID
export const useLesson = (lessonId: string) => {
  return useQuery<LessonResponse>({
    queryKey: queryKeys.lessons.detail(lessonId),
    queryFn: () => lessonsApi.getLesson(lessonId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!lessonId, // Only run query if lessonId is provided
  });
};

// Hook for fetching lessons with custom filters
export const useLessons = (filters?: string) => {
  return useQuery<LessonsListResponse>({
    queryKey: queryKeys.lessons.list(filters || "all"),
    queryFn: () => {
      // This would need to be implemented in the API if you want general lesson fetching
      throw new Error(
        "General lessons fetching not implemented. Use useLessonsBySection or useLessonsByCourse instead."
      );
    },
    enabled: false, // Disabled by default since the API endpoint might not exist
  });
};

export const useGetVideoLesson = (vide_id?: string) => {
  return useQuery<Blob>({
    queryKey: queryKeys.lessons.video(vide_id!),
    queryFn: () => lessonsApi.getVideoLesson(vide_id!),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!vide_id, // Only run query if lessonId is provided
  });
};
