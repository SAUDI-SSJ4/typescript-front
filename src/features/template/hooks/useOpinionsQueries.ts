import { useQuery } from "@tanstack/react-query";
import { opinionsApi } from "../services/opinionsApi";
import type {
  OpinionsListResponse,
  OpinionResponse,
} from "@/types/academy/opinion";
import { queryKeys } from "@/lib/query-keys";

// Hook for fetching all opinions with pagination
export const useOpinions = (skip = 0, limit = 100) => {
  return useQuery<OpinionsListResponse>({
    queryKey: queryKeys.opinions.list(skip, limit),
    queryFn: () => opinionsApi.getOpinions(skip, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for fetching a single opinion by ID
export const useOpinion = (id: string) => {
  return useQuery<OpinionResponse>({
    queryKey: queryKeys.opinions.detail(id),
    queryFn: () => opinionsApi.getOpinion(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
