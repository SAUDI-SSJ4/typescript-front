import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { academyApi } from "../services/academy";

export function useAcademyMainSettings(subdomain?: string) {
  return useQuery({
    queryKey: subdomain
      ? queryKeys.academy.mainSettingsDetail(subdomain)
      : queryKeys.academy.mainSettings(),
    queryFn: () => academyApi.getMainSettings(),
    retry: false,
  });
}

export function useCheckSubdomain(subdomain: string, enabled = false) {
  return useQuery({
    queryKey: ["check-subdomain", subdomain],
    queryFn: () => academyApi.checkSubdomain(subdomain),
    enabled: enabled && !!subdomain,
    retry: false,
  });
}
