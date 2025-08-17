export interface Transaction {
  id: string;
  academy_id: number;
  type: 'withdrawal' | 'commission' | 'refund' | 'payment';
  amount: number;
  balance_before: number;
  balance_after: number;
  description: string;
  reference_id: string;
  status: 'completed' | 'pending' | 'failed';
  created_at: string;
}

export interface TransactionsListResponse {
  status?: string;
  status_code?: number;
  error_type?: string | null;
  message?: string;
  data: Transaction[];
  total: number;
  skip: number;
  limit: number;
  path?: string | null;
  timestamp?: string;
} 