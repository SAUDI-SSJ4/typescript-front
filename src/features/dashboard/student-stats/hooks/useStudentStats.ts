import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { studentStatsApi } from "../services/studentStatsApi";
import type { StudentAnalytics, AnalyticsPeriod } from "@/types/student-stats";

export const useStudentAnalytics = (
  period: AnalyticsPeriod = "month"
): UseQueryResult<StudentAnalytics, Error> => {
  return useQuery({
    queryKey: ["student-analytics", period],
    queryFn: () => studentStatsApi.getAnalytics(period),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2, // Retry failed requests up to 2 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    onError: (error) => {
      console.error('Student analytics query error:', error);
    },
  });
};



