import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { academyApi } from "../services/academy";
import type { AboutResponse } from "@/types/academy/about";

export const useAcademyAbout = () => {
  return useQuery<AboutResponse>({
    queryKey: queryKeys.academy.about(),
    queryFn: () => academyApi.getAbout(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
