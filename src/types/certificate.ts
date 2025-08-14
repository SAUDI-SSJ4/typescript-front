// Certificate types for the frontend

export interface Certificate {
  id: number;
  student_id: number;
  course_id: string;
  certificate_number: string;
  issued_at: string;
  template_id?: number;
  status: 'active' | 'revoked';
  metadata?: Record<string, any>;
}

export interface StudentCertificate extends Certificate {
  course_title: string;
  course_thumbnail?: string;
  academy_name: string;
  verification_url: string;
}

export interface CertificateTemplate {
  id: number;
  name: string;
  academy_id: number;
  is_default: boolean;
  background_image?: string;
  layout_config: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface CertificateTemplatePayload {
  name: string;
  academy_id: number;
  is_default?: boolean;
  background_image?: string;
  layout_config: Record<string, any>;
}

export interface CertificateResponse {
  success: boolean;
  data: Certificate;
  message: string;
}

export interface CertificateTemplateResponse {
  success: boolean;
  data: CertificateTemplate;
  message: string;
}

export interface CertificatesListResponse {
  success: boolean;
  data: {
    certificates: StudentCertificate[];
    total: number;
  };
  message: string;
}

export interface CertificateTemplatesListResponse {
  success: boolean;
  data: {
    templates: CertificateTemplate[];
    total: number;
  };
  message: string;
}

export interface CertificateVerificationResponse {
  success: boolean;
  data: {
    certificate: Certificate;
    is_valid: boolean;
    course_title: string;
    student_name: string;
    academy_name: string;
  };
  message: string;
}
