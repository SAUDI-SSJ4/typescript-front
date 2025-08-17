import { useQuery } from "@tanstack/react-query";
import {
  coursesApi,
  type CategoriesListResponse,
  type CoursesListResponse,
} from "../services/coursesApi";
import { queryKeys } from "@/lib/query-keys";

// Hook for fetching courses by academy ID
export const useAcademyCourses = (academy_id: number) => {
  return useQuery<CoursesListResponse>({
    queryKey: queryKeys.courses.list(String(academy_id)),
    queryFn: () => coursesApi.getCourses(),
    enabled: !!academy_id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for fetching a single course by ID
export const useCourse = (id: string) => {
  return useQuery({
    queryKey: queryKeys.courses.detail(id),
    queryFn: () => coursesApi.getCourse(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCategories = () => {
  return useQuery<CategoriesListResponse>({
    queryKey: queryKeys.categories.lists(),
    queryFn: () => coursesApi.getCategories(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
