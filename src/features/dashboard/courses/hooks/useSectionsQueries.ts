import { useQuery } from "@tanstack/react-query";
import {
  sectionsApi,
  type SectionsListResponse,
} from "../services/sectionsApi";
import { queryKeys } from "@/lib/query-keys";

// Hook for fetching all sections
export const useSections = (courseId: string) => {
  return useQuery<SectionsListResponse>({
    queryKey: queryKeys.sections.list(courseId),
    queryFn: () => sectionsApi.getSections(courseId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
