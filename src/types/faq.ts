export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category?: string;
  order?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface FAQsListResponse {
  status: string;
  status_code: number;
  error_type: string | null;
  message: string;
  data: {
    faqs: FAQ[];
    total: number;
  };
  path: string | null;
  timestamp: string;
}

export interface FAQResponse {
  status: string;
  status_code: number;
  error_type: string | null;
  message: string;
  data: FAQ;
  path: string | null;
  timestamp: string;
}

export interface FAQPayload {
  question: string;
  answer: string;
  category?: string;
  order?: number;
  is_active?: boolean;
}
