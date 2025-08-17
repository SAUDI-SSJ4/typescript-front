import { useQuery } from "@tanstack/react-query";
import { coursesApi, type CoursesListResponse } from "../services/coursesApi";
import { queryKeys } from "@/lib/query-keys";

export const usePublicCourses = ({ filters = {} }) => {
  // Convert filters object to query string without encoding commas
  const filtersString = Object.entries(filters)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${key}=${String(value)}`)
    .join("&");

  return useQuery<CoursesListResponse>({
    queryKey: queryKeys.courses.list(JSON.stringify(filters)),
    queryFn: () => coursesApi.getCourses(filtersString),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
