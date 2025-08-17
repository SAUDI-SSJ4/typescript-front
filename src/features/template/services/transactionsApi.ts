import { api } from "@/lib/axios";
import type { TransactionsListResponse } from "@/types/transaction";

// API service for Wallet Transactions
export const transactionsApi = {
  // Get all transactions with pagination
  getTransactions: async (skip = 0, limit = 10): Promise<TransactionsListResponse> => {
    const response = await api.get(`wallet/transactions?skip=${skip}&limit=${limit}`);
    return response.data;
  },
}; 