import { useMutation, useQueryClient } from "@tanstack/react-query";
import { certificatesApi } from "../services/certificatesApi";
import type {
  CertificateTemplatePayload,
} from "@/types/certificate";
import { queryKeys } from "@/lib/query-keys";

interface ApiError {
  response?: {
    data?: {
      message?: string;
      detail?: string;
    };
  };
  message?: string;
}

// Hook for downloading certificates
export const useDownloadCertificate = () => {
  return useMutation({
    mutationFn: async (certificateId: number) => {
      const blob = await certificatesApi.downloadCertificate(certificateId);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `certificate-${certificateId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return blob;
    },
    onError: (error: ApiError) => {
      console.error("خطأ في تحميل الشهادة:", error);
    },
  });
};

// Hook for revoking certificates
export const useRevokeCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (certificateId: number) =>
      certificatesApi.revokeCertificate(certificateId),
    onSuccess: () => {
      // Invalidate certificates list to refresh data
      queryClient.invalidateQueries({
        queryKey: queryKeys.certificates.lists(),
      });
    },
    onError: (error: ApiError) => {
      console.error("خطأ في إلغاء الشهادة:", error);
    },
  });
};

// Hook for creating certificate templates
export const useCreateCertificateTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CertificateTemplatePayload) =>
      certificatesApi.createTemplate(data),
    onSuccess: () => {
      // Invalidate templates list to refresh data
      queryClient.invalidateQueries({
        queryKey: queryKeys.certificates.templates(),
      });
    },
    onError: (error: ApiError) => {
      console.error("خطأ في إنشاء قالب الشهادة:", error);
    },
  });
};

// Hook for updating certificate templates
export const useUpdateCertificateTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<CertificateTemplatePayload>;
    }) => certificatesApi.updateTemplate(id, data),
    onSuccess: (_, variables) => {
      // Invalidate specific template and templates list
      queryClient.invalidateQueries({
        queryKey: queryKeys.certificates.template(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.certificates.templates(),
      });
    },
    onError: (error: ApiError) => {
      console.error("خطأ في تحديث قالب الشهادة:", error);
    },
  });
};

// Hook for deleting certificate templates
export const useDeleteCertificateTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => certificatesApi.deleteTemplate(id),
    onSuccess: () => {
      // Invalidate templates list to refresh data
      queryClient.invalidateQueries({
        queryKey: queryKeys.certificates.templates(),
      });
    },
    onError: (error: ApiError) => {
      console.error("خطأ في حذف قالب الشهادة:", error);
    },
  });
};

// Hook for updating template field positions
export const useUpdateTemplateFields = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      field_positions,
    }: {
      id: number;
      field_positions: Record<string, any>;
    }) => certificatesApi.updateTemplateFields(id, field_positions),
    onSuccess: (_, variables) => {
      // Invalidate specific template to refresh data
      queryClient.invalidateQueries({
        queryKey: queryKeys.certificates.template(variables.id),
      });
    },
    onError: (error: ApiError) => {
      console.error("خطأ في تحديث مواضع القالب:", error);
    },
  });
};
