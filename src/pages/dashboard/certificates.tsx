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

  const downloadMutation = useDownloadCertificate();
  const revokeMutation = useRevokeCertificate();

  const handleDownload = async (certificateId: string) => {
    try {
      await downloadMutation.mutateAsync(certificateId);
      toast.success("تم بدء تحميل الشهادة");
    } catch (error) {
      toast.error("فشل في تحميل الشهادة");
    }
  };

  const handleRevoke = async (certificateId: string) => {
    try {
      await revokeMutation.mutateAsync(certificateId);
      toast.success("تم إلغاء الشهادة بنجاح");
    } catch (error) {
      toast.error("فشل في إلغاء الشهادة");
    }
  };

  const handleView = (certificateId: string) => {
    navigate(`/dashboard/certificate-view/${certificateId}`);
  };

  const handleVerify = (verificationUrl: string) => {
    window.open(verificationUrl, '_blank');
  };

  const handleCustomizeTemplate = (courseId: string, courseTitle: string) => {
    setSelectedCourse({ id: courseId, title: courseTitle });
    setCustomizerOpen(true);
  };

  // Filter and sort certificates
  const filteredCertificates = certificatesData?.certificates?.filter(cert => 
    cert.course_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.student_name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const sortOptions = ["الأحدث", "الأقدم", "اسم الدورة", "اسم الطالب"];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل الشهادات...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <Award className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">خطأ في تحميل الشهادات</h3>
          <p className="text-gray-600 mb-4">حدث خطأ أثناء تحميل الشهادات. يرجى المحاولة مرة أخرى.</p>
          <Button onClick={() => window.location.reload()}>
            إعادة المحاولة
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Header statistics={certificatesData?.statistics} />

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="البحث في الشهادات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              ترتيب حسب: {sortBy}
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

      {/* Certificates Grid */}
      {filteredCertificates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCertificates.map((certificate) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              onDownload={handleDownload}
              onView={handleView}
              onVerify={handleVerify}
              onRevoke={handleRevoke}
              onCustomize={() => handleCustomizeTemplate(certificate.course_id, certificate.course_title)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد شهادات</h3>
          <p className="text-gray-600">
            {searchQuery ? "لم يتم العثور على شهادات تطابق البحث." : "لم يتم إصدار أي شهادات بعد."}
          </p>
        </div>
      )}

      {/* Template Customizer Modal */}
      <TemplateCustomizer
        open={customizerOpen}
        onOpenChange={setCustomizerOpen}
        courseId={selectedCourse?.id}
        courseTitle={selectedCourse?.title}
      />
    </div>
  );
}

function CertificateCard({ 
  certificate, 
  onDownload, 
  onView, 
  onVerify, 
  onRevoke,
  onCustomize 
}: { 
  certificate: StudentCertificate;
  onDownload: (id: string) => void;
  onView: (id: string) => void;
  onVerify: (url: string) => void;
  onRevoke: (id: string) => void;
  onCustomize: () => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* Certificate Header */}
      <div className="relative aspect-[10/6] overflow-hidden">
        <img
          src={certificate.certificate_image || "/assets/images/certificate-placeholder.jpg"}
          alt={certificate.course_title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <div className="text-white text-center">
            <Award className="w-12 h-12 mx-auto mb-2" />
            <p className="text-sm font-medium">شهادة إنجاز</p>
          </div>
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
          <span className="font-medium text-sm lg:text-base">الشهادات</span>
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

export default Certificates;
