import { useQuery } from "@tanstack/react-query";
import { walletApi } from "../services/walletApi";
import type { TransactionFilter, DateRange } from "@/types/wallet";

// Hook for fetching wallet transactions
export const useWalletTransactions = (
  filter?: TransactionFilter,
  dateRange?: DateRange,
  searchQuery?: string,
  enabled = true
) => {
  return useQuery({
    queryKey: ["walletTransactions", filter, dateRange, searchQuery],
    queryFn: () => walletApi.getTransactions(filter, dateRange, searchQuery),
    enabled,
    select: (data) => {
      // console.log('Raw API response in select:', data);
      
      // Handle different API response formats
      if (data.data && Array.isArray(data.data)) {
        // console.log('Data is directly an array');
        return data.data;
      } else if (data.data && data.data.transactions && Array.isArray(data.data.transactions)) {
        // console.log('Data is in data.transactions');
        return data.data.transactions;
      } else if (Array.isArray(data)) {
        // console.log('Data is directly the response');
        return data;
      } else {
        // console.log('Unknown data format, returning empty array');
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for fetching wallet balance
export const useWalletBalance = (enabled = true) => {
  return useQuery({
    queryKey: ["walletBalance"],
    queryFn: () => walletApi.getWalletBalance(),
    enabled,
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for fetching withdrawal requests
export const useWithdrawalRequests = (enabled = true) => {
  return useQuery({
    queryKey: ["withdrawalRequests"],
    queryFn: () => walletApi.getWithdrawalRequests(),
    enabled,
    select: (data) => data.data.requests,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};