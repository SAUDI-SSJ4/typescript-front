<<<<<<< HEAD
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
  verification_url?: string;
  course_title?: string;
  student_name?: string;
  completion_percentage?: number;
  download_count?: number;
  view_count?: number;
  last_downloaded_at?: string;
}

export interface StudentCertificate extends Certificate {
  course_title: string;
  course_thumbnail?: string;
  academy_name: string;
  verification_url: string;
  student_name?: string;
  completion_percentage?: number;
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
  template_name?: string;
  template_type?: string;
  is_active?: boolean;
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
    statistics?: {
      total_certificates: number;
      active_certificates: number;
      completed_courses: number;
    };
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
=======
// Course Certificate - شهادة مرتبطة بدورة
export interface CourseCertificate {
  id: string;
  courseName: string;
  courseId: string;
  certificateTemplate: string;
  issuedCount: number; // عدد الشهادات المصدرة
  totalStudents: number; // إجمالي الطلاب المسجلين
  completionRate: number; // نسبة الإنجاز
  averageGrade: number;
  createdDate: string;
  lastIssued?: string;
  status: "active" | "inactive" | "draft";
  certificateType: "completion" | "achievement" | "participation";
  validityPeriod: number; // بالأشهر
  requirements: {
    minGrade: number;
    attendanceRequired: number; // نسبة الحضور المطلوبة
    assignmentsCompleted: boolean;
  };
}

// Student Certificate - شهادة طالب محدد
export interface StudentCertificate {
  id: string;
  studentName: string;
  studentEmail: string;
  courseCertificateId: string;
  courseName: string;
  completionDate: string;
  issueDate: string;
  certificateNumber: string;
  grade: string;
  gradeValue: number;
  status: "issued" | "pending" | "revoked" | "expired";
  downloadCount: number;
  validUntil?: string;
  qrCodeUrl: string;
  pdfUrl: string;
  lastAccessed?: string;
  attendanceRate: number;
  assignmentsScore: number;
}

// Certificate Statistics
export interface CertificateStats {
  totalCourses: number; // إجمالي الدورات التي لها شهادات
  totalIssued: number; // إجمالي الشهادات المصدرة
  pendingApproval: number; // في انتظار الموافقة
  averageCompletionRate: number; // متوسط نسبة الإنجاز
}
>>>>>>> sketch
