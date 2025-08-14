import { api } from "@/lib/axios";
import { appendFormData } from "@/lib/formdata";
import type {
  CertificatesListResponse,
  CertificateTemplatesListResponse,
  CertificateResponse,
  CertificateTemplateResponse,
  CertificateTemplatePayload,
  CertificateVerificationResponse,
} from "@/types/certificate";

// API service for certificates
export const certificatesApi = {
  // Get certificates list with optional filters
  getCertificates: async (
    course_id?: string,
    student_id?: number,
    page = 1,
    page_size = 20
  ): Promise<CertificatesListResponse> => {
    const params = new URLSearchParams();
    
    if (course_id) params.append("course_id", course_id);
    if (student_id) params.append("student_id", student_id.toString());
    params.append("page", page.toString());
    params.append("page_size", page_size.toString());

    const response = await api.get(`/certificates/list?${params.toString()}`);
    return response.data;
  },

  // Get single certificate by ID
  getCertificate: async (id: number): Promise<CertificateResponse> => {
    const response = await api.get(`/certificates/${id}`);
    return response.data;
  },



  // Download certificate as PDF
  downloadCertificate: async (certificateId: number): Promise<Blob> => {
    const response = await api.get(`/certificates/${certificateId}/download`, {
      responseType: "blob",
    });
    return response.data;
  },

  // Verify certificate by number or token
  verifyCertificate: async (
    verification_token: string
  ): Promise<CertificateVerificationResponse> => {
    const response = await api.get(`/certificates/verify/${verification_token}`);
    return response.data;
  },

  // Revoke certificate
  revokeCertificate: async (certificateId: number): Promise<void> => {
    await api.delete(`/certificates/${certificateId}`);
  },

  // Get certificate templates
  getTemplates: async (): Promise<CertificateTemplatesListResponse> => {
    const response = await api.get("/certificates/templates");
    return response.data;
  },

  // Get single template by ID
  getTemplate: async (id: number): Promise<CertificateTemplateResponse> => {
    const response = await api.get(`/certificates/templates/${id}`);
    return response.data;
  },

  // Create new certificate template
  createTemplate: async (
    templateData: CertificateTemplatePayload
  ): Promise<CertificateTemplateResponse> => {
    // Create FormData for file uploads
    const formData = new FormData();
    appendFormData(formData, templateData);

    const response = await api.post("/certificates/templates", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  // Update certificate template
  updateTemplate: async (
    id: number,
    templateData: Partial<CertificateTemplatePayload>
  ): Promise<CertificateTemplateResponse> => {
    const formData = new FormData();
    appendFormData(formData, templateData);

    const response = await api.put(`/certificates/templates/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  // Delete certificate template
  deleteTemplate: async (id: number): Promise<void> => {
    await api.delete(`/certificates/templates/${id}`);
  },

  // Update template field positions
  updateTemplateFields: async (
    id: number,
    field_positions: Record<string, any>
  ): Promise<CertificateTemplateResponse> => {
    const response = await api.put(`/certificates/templates/${id}/fields`, {
      field_positions,
    });
    return response.data;
  },

  // Get certificate preview
  getCertificatePreview: async (
    certificateId: number
  ): Promise<string> => {
    const response = await api.get(`/certificates/${certificateId}/preview`, {
      responseType: "blob",
    });
    return URL.createObjectURL(response.data);
  },

  // Get template preview
  getTemplatePreview: async (
    templateId: number
  ): Promise<string> => {
    const response = await api.get(`/certificates/templates/${templateId}/preview`, {
      responseType: "blob",
    });
    return URL.createObjectURL(response.data);
  },

  // Course Template Management
  createCourseTemplate: async (courseId: string, templateData: any): Promise<any> => {
    const response = await api.post(`/certificates/course-template/${courseId}`, templateData);
    return response.data;
  },

  getCourseTemplate: async (courseId: string): Promise<any> => {
    const response = await api.get(`/certificates/course-template/${courseId}`);
    return response.data;
  },

  // Get certificate statistics
  getCertificateStatistics: async (course_id?: string): Promise<any> => {
    const params = new URLSearchParams();
    if (course_id) params.append("course_id", course_id);
    
    const response = await api.get(`/certificates/statistics?${params.toString()}`);
    return response.data;
  },
};
