export interface AffiliateApplication {
  id: number;
  studentCode: string; // كود خاص بكل طالب
  studentName: string;
  profileImage: string; // صورة الطالب
  email: string;
  phone: string;
  university: string;
  major: string;
  graduationYear: string;
  briefDescription: string; // نبذة عن الطالب
  
  // الشبكات الاجتماعية
  socialMediaAccounts: {
    instagram?: {
      username: string;
      followersCount: number;
      profileUrl: string;
    };
    twitter?: {
      username: string;
      followersCount: number;
      profileUrl: string;
    };
    tiktok?: {
      username: string;
      followersCount: number;
      profileUrl: string;
    };
    youtube?: {
      username: string;
      subscribersCount: number;
      profileUrl: string;
    };
    snapchat?: {
      username: string;
      followersCount: number;
      profileUrl: string;
    };
    linkedin?: {
      username: string;
      followersCount: number;
      profileUrl: string;
    };
  };
  
  // خبرة التسويق
  marketingExperience: "مبتدئ" | "متوسط" | "متقدم" | "خبير";
  previousAffiliateExperience: boolean;
  previousAffiliateDetails?: string;
  
  // الاهتمامات والتخصصات
  interestedCategories: string[]; // ['البرمجة', 'التصميم', 'التسويق', 'إدارة الأعمال']
  targetAudience: string;
  marketingStrategy: string;
  whyJoinAffiliate: string;
  
  // حالة الطلب
  status: "pending" | "approved" | "rejected";
  approvedAt?: string;
  rejectedAt?: string;
  approvedBy?: string;
  rejectedBy?: string;
  rejectionReason?: string;
  
  // إحصائيات الأداء (للمقبولين فقط)
  performanceStats?: {
    totalClicks: number;
    totalConversions: number;
    totalCommission: number;
    conversionRate: number;
    averageOrderValue: number;
    lastActivityDate: string;
  };
  
  // تواريخ
  createdAt: string;
  updatedAt: string;
}

export interface CreateAffiliateApplicationData {
  studentName: string;
  email: string;
  phone: string;
  university: string;
  major: string;
  graduationYear: string;
  socialMediaAccounts: AffiliateApplication['socialMediaAccounts'];
  marketingExperience: AffiliateApplication['marketingExperience'];
  previousAffiliateExperience: boolean;
  previousAffiliateDetails?: string;
  interestedCategories: string[];
  targetAudience: string;
  marketingStrategy: string;
  whyJoinAffiliate: string;
}

export interface AffiliateApplicationStats {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  approvalRate: number;
  averageProcessingTime: number; // بالأيام
  totalActiveAffiliates: number;
  totalCommissionPaid: number;
  averageMonthlyCommission: number;
}

// نموذج الطلب القابل للتخصيص
export interface ApplicationFormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'textarea' | 'number' | 'date' | 'checkbox' | 'radio';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // للحقول من نوع select, radio
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
  };
  order: number;
  category: 'personal' | 'social' | 'experience' | 'interests' | 'custom';
}

export interface ApplicationFormSettings {
  id: string;
  title: string;
  description: string;
  fields: ApplicationFormField[];
  isActive: boolean;
  requiresApproval: boolean;
  autoApprovalCriteria?: {
    minFollowers?: number;
    requiredExperience?: string;
    allowedUniversities?: string[];
  };
  emailNotifications: {
    sendToApplicant: boolean;
    sendToAdmin: boolean;
    customMessage?: string;
  };
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}