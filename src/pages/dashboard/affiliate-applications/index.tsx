import { buttonVariants } from "@/components/ui/button";
import { 
  AffiliateApplicationStats,
  AffiliateApplicationFilters,
  AffiliateApplicationTable,
  EditApplicationFormModal
} from "@/features/affiliate-applications/components";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import { useState, useMemo } from "react";
import type { Table } from "@tanstack/react-table";
import type { AffiliateApplication } from "@/types/affiliate-application";
import {Users, Settings } from "lucide-react";

// بيانات تجريبية لطلبات التسويق بالعمولة
const affiliateApplications: AffiliateApplication[] = [
  {
    id: 1,
    studentCode: "AFF001",
    studentName: "أحمد محمد علي",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    email: "ahmed.mohammed@example.com",
    phone: "+966501234567",
    university: "جامعة الملك سعود",
    major: "إدارة الأعمال",
    graduationYear: "2024",
    briefDescription: "طالب متميز في إدارة الأعمال مع شغف بالتسويق وريادة الأعمال",
    socialMediaAccounts: {
      instagram: {
        username: "ahmed_business",
        followersCount: 15000,
        profileUrl: "https://instagram.com/ahmed_business"
      },
      twitter: {
        username: "ahmed_biz",
        followersCount: 8500,
        profileUrl: "https://twitter.com/ahmed_biz"
      }
    },
    marketingExperience: "متوسط",
    previousAffiliateExperience: true,
    previousAffiliateDetails: "عملت مع شركة تسويق محلية لمدة 6 أشهر",
    interestedCategories: ["إدارة الأعمال", "التسويق", "ريادة الأعمال"],
    targetAudience: "الشباب المهتمين بريادة الأعمال والتسويق",
    marketingStrategy: "استخدام منصات التواصل الاجتماعي مع محتوى تعليمي قيم",
    whyJoinAffiliate: "أرغب في مشاركة خبراتي مع الآخرين وكسب دخل إضافي",
    status: "approved",
    approvedAt: "2024-01-15T10:30:00Z",
    approvedBy: "منسق التسويق",
    performanceStats: {
      totalClicks: 1250,
      totalConversions: 45,
      totalCommission: 4500,
      conversionRate: 3.6,
      averageOrderValue: 320,
      lastActivityDate: "2024-08-20T14:30:00Z"
    },
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-08-20T14:30:00Z"
  },
  {
    id: 2,
    studentCode: "AFF002",
    studentName: "فاطمة الزهراء أحمد",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    email: "fatima.ahmed@example.com",
    phone: "+966507654321",
    university: "جامعة الأميرة نورا",
    major: "تصميم جرافيكي",
    graduationYear: "2025",
    briefDescription: "مصممة مبدعة متخصصة في التصميم الرقمي والمحتوى البصري",
    socialMediaAccounts: {
      instagram: {
        username: "fatima_designs",
        followersCount: 22000,
        profileUrl: "https://instagram.com/fatima_designs"
      },
      tiktok: {
        username: "fatima_creative",
        followersCount: 18000,
        profileUrl: "https://tiktok.com/@fatima_creative"
      }
    },
    marketingExperience: "متقدم",
    previousAffiliateExperience: false,
    interestedCategories: ["التصميم", "الفنون", "التصوير"],
    targetAudience: "المصممين والفنانين الشباب",
    marketingStrategy: "إنشاء محتوى بصري جذاب ودروس تصميم مصغرة",
    whyJoinAffiliate: "أحب مشاركة شغفي بالتصميم ومساعدة الآخرين على التعلم",
    status: "pending",
    createdAt: "2024-08-18T11:20:00Z",
    updatedAt: "2024-08-18T11:20:00Z"
  },
  {
    id: 3,
    studentCode: "AFF003",
    studentName: "محمد عبدالله السعيد",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    email: "mohammed.abdullah@example.com",
    phone: "+966502345678",
    university: "جامعة الملك عبدالعزيز",
    major: "علوم الحاسب",
    graduationYear: "2023",
    briefDescription: "مطور تقني ومنشئ محتوى متخصص في البرمجة والتقنية",
    socialMediaAccounts: {
      youtube: {
        username: "mohammed_tech",
        subscribersCount: 35000,
        profileUrl: "https://youtube.com/@mohammed_tech"
      },
      twitter: {
        username: "mohammed_dev",
        followersCount: 12000,
        profileUrl: "https://twitter.com/mohammed_dev"
      },
      linkedin: {
        username: "mohammed-abdullah",
        followersCount: 5000,
        profileUrl: "https://linkedin.com/in/mohammed-abdullah"
      }
    },
    marketingExperience: "خبير",
    previousAffiliateExperience: true,
    previousAffiliateDetails: "أدير قناة تقنية ناجحة منذ 3 سنوات",
    interestedCategories: ["البرمجة", "التقنية", "الذكاء الاصطناعي"],
    targetAudience: "المبرمجين والمطورين والمهتمين بالتقنية",
    marketingStrategy: "مراجعات متخصصة للدورات التقنية ودروس مجانية",
    whyJoinAffiliate: "أريد توسيع نطاق المحتوى التعليمي الذي أقدمه",
    status: "approved",
    approvedAt: "2024-02-20T15:45:00Z",
    approvedBy: "مدير التسويق",
    performanceStats: {
      totalClicks: 2800,
      totalConversions: 120,
      totalCommission: 12000,
      conversionRate: 4.3,
      averageOrderValue: 450,
      lastActivityDate: "2024-08-21T09:15:00Z"
    },
    createdAt: "2024-02-15T13:30:00Z",
    updatedAt: "2024-08-21T09:15:00Z"
  },
  {
    id: 4,
    studentCode: "AFF004",
    studentName: "نورا سالم المطيري",
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    email: "nora.salem@example.com",
    phone: "+966509876543",
    university: "جامعة الدمام",
    major: "التسويق",
    graduationYear: "2024",
    briefDescription: "طالبة تسويق مهتمة بالتسويق الرقمي ووسائل التواصل",
    socialMediaAccounts: {
      instagram: {
        username: "nora_marketing",
        followersCount: 8500,
        profileUrl: "https://instagram.com/nora_marketing"
      },
      snapchat: {
        username: "nora_snap",
        followersCount: 12000,
        profileUrl: "https://snapchat.com/add/nora_snap"
      }
    },
    marketingExperience: "مبتدئ",
    previousAffiliateExperience: false,
    interestedCategories: ["التسويق", "إدارة الأعمال"],
    targetAudience: "طالبات الجامعة المهتمات بالتسويق",
    marketingStrategy: "مشاركة تجربتي الشخصية في التعلم والتطوير",
    whyJoinAffiliate: "أرغب في بناء مسيرة مهنية في التسويق",
    status: "rejected",
    rejectedAt: "2024-08-10T12:00:00Z",
    rejectedBy: "منسق التسويق",
    rejectionReason: "عدد المتابعين أقل من الحد المطلوب",
    createdAt: "2024-08-08T16:45:00Z",
    updatedAt: "2024-08-10T12:00:00Z"
  },
  {
    id: 5,
    studentCode: "AFF005",
    studentName: "خالد أحمد الغامدي",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    email: "khalid.ahmed@example.com",
    phone: "+966503456789",
    university: "جامعة أم القرى",
    major: "الهندسة",
    graduationYear: "2025",
    briefDescription: "طالب هندسة مهتم بالتعليم الهندسي والتقنية الحديثة",
    socialMediaAccounts: {
      instagram: {
        username: "khalid_engineer",
        followersCount: 19000,
        profileUrl: "https://instagram.com/khalid_engineer"
      },
      youtube: {
        username: "khalid_engineering",
        subscribersCount: 25000,
        profileUrl: "https://youtube.com/@khalid_engineering"
      }
    },
    marketingExperience: "متوسط",
    previousAffiliateExperience: true,
    previousAffiliateDetails: "شراكات مع شركات هندسية محلية",
    interestedCategories: ["الهندسة", "التقنية", "العلوم"],
    targetAudience: "طلاب الهندسة والمهندسين الشباب",
    marketingStrategy: "محتوى تعليمي هندسي ومراجعات للأدوات التقنية",
    whyJoinAffiliate: "أريد دعم التعليم الهندسي في المنطقة",
    status: "pending",
    createdAt: "2024-08-19T14:20:00Z",
    updatedAt: "2024-08-19T14:20:00Z"
  }
];

function AcademyAffiliateApplications() {
  const [selectedStatus, setSelectedStatus] = useState("الكل");
  const [searchTerm, setSearchTerm] = useState("");
  const [table, setTable] = useState<Table<AffiliateApplication> | null>(null);

  const filteredApplications = useMemo(() => {
    return affiliateApplications.filter((application) => {
      const matchesStatus =
        selectedStatus === "الكل" || 
        (selectedStatus === "قيد المراجعة" && application.status === "pending") ||
        (selectedStatus === "مقبول" && application.status === "approved") ||
        (selectedStatus === "مرفوض" && application.status === "rejected");

      const matchesSearch =
        searchTerm === "" ||
        application.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.studentCode.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [selectedStatus, searchTerm]);

  const handleClearFilters = () => {
    setSelectedStatus("الكل");
    setSearchTerm("");
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={Users}
        title="إدارة طلبات التسويق بالعمولة"
        actions={
          <EditApplicationFormModal 
            trigger={
              <div className={buttonVariants()}>
                <Settings className="w-4 h-4 mr-2" />
                تعديل نموذج الطلب
              </div>
            }
          />
        }
      />
      <AffiliateApplicationStats applications={filteredApplications} />
      <AffiliateApplicationFilters
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClearFilters={handleClearFilters}
        table={table}
      />
      <AffiliateApplicationTable 
        applications={filteredApplications} 
        onTableReady={setTable} 
      />
    </div>
  );
}

export default AcademyAffiliateApplications;