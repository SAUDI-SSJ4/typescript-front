export interface SubDomainResponse {
  status: string;
  status_code: number;
  error_type: string | null;
  message: string;
  data: {
    available: boolean;
    subdomain: string;
    message?: string;
  };
}

export interface SubDomainPayload {
  subdomain: string;
}
