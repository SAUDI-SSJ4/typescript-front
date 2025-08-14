import { GraduationCap, Download, Calendar, Award, Search, ChevronDown, Eye, Trash2, ExternalLink, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCertificates } from "@/features/dashboard/certificates/hooks/useCertificatesQueries";
import { 
  useDownloadCertificate, 
  useRevokeCertificate 
} from "@/features/dashboard/certificates/hooks/useCertificatesMutations";
// import { useCurrentUserProfile } from "@/features/dashboard/profile/hooks";
// import { getAcademyDetails } from "@/lib/academy";
// import type { User } from "@/types/user";
import type { StudentCertificate } from "@/types/certificate";
import { toast } from "sonner";
import { TemplateCustomizer } from "@/features/dashboard/certificates/components/TemplateCustomizer";

function Certificates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("الأحدث");
  const [selectedCourseId] = useState<string | undefined>();
  const [currentPage] = useState(1);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{id: string, title: string} | null>(null);
  
  const navigate = useNavigate();
  // const { data: user } = useCurrentUserProfile();
  // const academy = getAcademyDetails(user as User);
  
  const { data: certificatesData, isPending, isError } = useCertificates(
    selectedCourseId,
    undefined,
    currentPage,
    20
  );
  
  const downloadCertificate = useDownloadCertificate();
  const revokeCertificate = useRevokeCertificate();

  const sortOptions = ["الأحدث", "الأقدم"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "revoked":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "نشطة";
      case "revoked":
        return "ملغاة";
      default:
        return "غير معروف";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownload = async (certificateId: number) => {
    try {
      await downloadCertificate.mutateAsync(certificateId);
      toast.success("تم تحميل الشهادة بنجاح");
    } catch (error) {
      toast.error("فشل في تحميل الشهادة");
    }
  };

  const handleRevoke = async (certificateId: number) => {
    if (window.confirm("هل أنت متأكد من إلغاء هذه الشهادة؟")) {
      try {
        await revokeCertificate.mutateAsync(certificateId);
        toast.success("تم إلغاء الشهادة بنجاح");
      } catch (error) {
        toast.error("فشل في إلغاء الشهادة");
      }
    }
  };

  const handleVerify = (verificationUrl: string) => {
    window.open(verificationUrl, '_blank');
  };

  const handleViewCertificate = (certificateId: number) => {
    navigate(`/dashboard/certificates/${certificateId}`);
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-gray-500">جارٍ تحميل الشهادات...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-red-500">حدث خطأ في تحميل الشهادات</span>
      </div>
    );
  }

  const certificates = certificatesData?.data?.certificates || [];
  const statistics = certificatesData?.data?.statistics;

  // Group certificates by course
  const certificatesByCourse = certificates.reduce((acc: any, certificate: StudentCertificate) => {
    const courseId = certificate.course_id;
    if (!acc[courseId]) {
      acc[courseId] = {
        course_title: certificate.course_title,
        course_id: courseId,
        certificates: []
      };
    }
    acc[courseId].certificates.push(certificate);
    return acc;
  }, {});

  const courseGroups = Object.values(certificatesByCourse);

  const handleCustomizeTemplate = (courseId: string, courseTitle: string) => {
    setSelectedCourse({ id: courseId, title: courseTitle });
    setCustomizerOpen(true);
  };

  const handleSaveTemplate = async (templateData: any) => {
    try {
      if (!selectedCourse) return;
      
      // Import API function
      const { certificatesApi } = await import("@/features/dashboard/certificates/services/certificatesApi");
      
      await certificatesApi.createCourseTemplate(selectedCourse.id, templateData);
      setCustomizerOpen(false);
      setSelectedCourse(null);
      toast.success("تم حفظ قالب الشهادة بنجاح");
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error("فشل في حفظ القالب");
    }
  };

  return (
    <div className="space-y-6">
      <Header statistics={statistics} />

      {/* Search and Sort Controls */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="ابحث في الشهادات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 pl-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Sort Dropdown */}
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors min-w-[140px] justify-between"
            >
              <span className="text-gray-700">{sortBy}</span>
              <ChevronDown className="w-4 h-4 mr-2 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => setSortBy(option)}
                className={`cursor-pointer ${
                  sortBy === option ? "bg-blue-50 text-blue-700" : ""
                }`}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Empty State */}
      {certificates.length === 0 && (
        <div className="text-center py-16">
          <Award className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد شهادات بعد</h3>
          <p className="text-gray-500">ستظهر الشهادات هنا تلقائياً بعد إكمال الطلاب للدورات بنسبة 80% أو أكثر</p>
        </div>
      )}

      {/* Courses with Certificates */}
      {courseGroups.map((courseGroup: any) => (
        <div key={courseGroup.course_id} className="space-y-4">
          {/* Course Header */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{courseGroup.course_title}</h3>
                <p className="text-sm text-gray-600">{courseGroup.certificates.length} شهادة</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCustomizeTemplate(courseGroup.course_id, courseGroup.course_title)}
                className="text-purple-600 border-purple-200 hover:bg-purple-50"
              >
                <Palette className="w-4 h-4 mr-2" />
                تخصيص القالب
              </Button>
            </div>
          </div>

          {/* Certificates Grid for this Course */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mr-6">
            {courseGroup.certificates.map((certificate: StudentCertificate) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                onDownload={handleDownload}
                onRevoke={handleRevoke}
                onVerify={handleVerify}
                onView={handleViewCertificate}
                formatDate={formatDate}
                getStatusColor={getStatusColor}
                getStatusText={getStatusText}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Template Customizer Dialog */}
      {selectedCourse && (
        <TemplateCustomizer
          isOpen={customizerOpen}
          onClose={() => {
            setCustomizerOpen(false);
            setSelectedCourse(null);
          }}
          courseId={selectedCourse.id}
          courseTitle={selectedCourse.title}
          onSave={handleSaveTemplate}
        />
      )}
    </div>
  );
}

export default Certificates;

// Certificate Card Component
interface CertificateCardProps {
  certificate: StudentCertificate;
  onDownload: (id: number) => void;
  onRevoke: (id: number) => void;
  onVerify: (url: string) => void;
  onView: (id: number) => void;
  formatDate: (date: string) => string;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
}

function CertificateCard({
  certificate,
  onDownload,
  onRevoke,
  onVerify,
  onView,
  formatDate,
  getStatusColor,
  getStatusText,
}: CertificateCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* Certificate Header */}
      <div className="relative aspect-[10/6] overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Award className="w-16 h-16 mx-auto mb-2 text-blue-600" />
            <p className="text-sm font-medium text-blue-700">شهادة إنجاز</p>
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(certificate.status)}`}>
            {getStatusText(certificate.status)}
          </span>
        </div>
      </div>

      {/* Certificate Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {certificate.course_title}
        </h3>
        
        {/* Student Info */}
        <div className="flex items-center gap-2 mb-3">
          <GraduationCap className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">{certificate.student_name}</span>
        </div>

        {/* Certificate Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Calendar className="w-3 h-3" />
            <span>تاريخ الإصدار: {formatDate(certificate.issued_at)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Award className="w-3 h-3" />
            <span>رقم الشهادة: {certificate.certificate_number}</span>
          </div>
        </div>

        {/* Completion Percentage */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-gray-600">نسبة الإكمال</span>
          <span className="text-sm font-semibold text-blue-600">
            {certificate.completion_percentage}%
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            size="sm"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => onDownload(certificate.id)}
            disabled={certificate.status === "revoked"}
          >
            <Download className="w-4 h-4 mr-2" />
            تحميل
          </Button>
          <Button 
            size="sm"
            variant="outline"
            className="px-3"
            onClick={() => onView(certificate.id)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button 
            size="sm"
            variant="outline"
            className="px-3"
            onClick={() => onVerify(certificate.verification_url)}
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
          {certificate.status === "active" && (
            <Button 
              size="sm"
              variant="outline"
              className="px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => onRevoke(certificate.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Header({ statistics }: { statistics?: any }) {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            الشهادات
          </span>
        </div>
        {statistics && (
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>إجمالي الشهادات: {statistics.total_certificates || 0}</span>
            <span>الطلاب: {statistics.total_students || 0}</span>
            <span>متوسط الإكمال: {statistics.average_completion || 0}%</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-500 bg-blue-50 px-3 py-2 rounded-lg">
          <Award className="w-4 h-4 inline mr-1" />
          الشهادات تُنشأ تلقائياً عند الإكمال
        </div>
      </div>
    </div>
  );
}