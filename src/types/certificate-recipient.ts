export interface CertificateRecipient {
  id: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  issueDate: string;
  certificateId: string;
  certificateUrl: string;
  finalExamGrade: number;
  completionPercentage: number;
  completionDate: string;
}

export interface CertificateDetailStats {
  totalIssued: number;
  averageCompletion: number;
  averageFinalExamGrade: number;
  lastIssueDate: string;
  topPerformers: CertificateRecipient[];
}