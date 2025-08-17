import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { academyApi } from "../services/academy";
import type { HeroResponse } from "@/types/academy/hero";

export const useAcademyHero = () => {
  return useQuery<HeroResponse>({
    queryKey: queryKeys.academy.hero(),
    queryFn: () => academyApi.getHero(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
