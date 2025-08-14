import { useQuery } from "@tanstack/react-query";
import { certificatesApi } from "../services/certificatesApi";
import type {
  CertificatesListResponse,
  CertificateTemplatesListResponse,
} from "@/types/certificate";
import { queryKeys } from "@/lib/query-keys";

// Hook for fetching certificates list
export const useCertificates = (
  course_id?: string,
  student_id?: number,
  page = 1,
  page_size = 20,
  enabled = true
) => {
  return useQuery<CertificatesListResponse>({
    queryKey: queryKeys.certificates.list({ course_id, student_id, page, page_size }),
    queryFn: () => certificatesApi.getCertificates(course_id, student_id, page, page_size),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for fetching a single certificate
export const useCertificate = (id: number, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.certificates.detail(id),
    queryFn: () => certificatesApi.getCertificate(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for fetching certificate templates
export const useCertificateTemplates = (enabled = true) => {
  return useQuery<CertificateTemplatesListResponse>({
    queryKey: queryKeys.certificates.templates(),
    queryFn: () => certificatesApi.getTemplates(),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for fetching a single certificate template
export const useCertificateTemplate = (id: number, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.certificates.template(id),
    queryFn: () => certificatesApi.getTemplate(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for certificate verification
export const useCertificateVerification = (
  verification_token: string,
  enabled = true
) => {
  return useQuery({
    queryKey: queryKeys.certificates.verify(verification_token),
    queryFn: () => certificatesApi.verifyCertificate(verification_token),
    enabled: enabled && !!verification_token,
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for certificate preview
export const useCertificatePreview = (certificateId: number, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.certificates.preview(certificateId),
    queryFn: () => certificatesApi.getCertificatePreview(certificateId),
    enabled: enabled && !!certificateId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for template preview
export const useTemplatePreview = (templateId: number, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.certificates.templatePreview(templateId),
    queryFn: () => certificatesApi.getTemplatePreview(templateId),
    enabled: enabled && !!templateId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};


