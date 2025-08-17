import { useQuery } from "@tanstack/react-query";
import { transactionsApi } from "../services/transactionsApi";
import type { TransactionsListResponse } from "@/types/transaction";
import { queryKeys } from "@/lib/query-keys";

// Hook for fetching wallet transactions with pagination
export const useTransactions = (skip = 0, limit = 10) => {
  return useQuery<TransactionsListResponse>({
    queryKey: queryKeys.transactions.list(skip, limit),
    queryFn: () => transactionsApi.getTransactions(skip, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}; 