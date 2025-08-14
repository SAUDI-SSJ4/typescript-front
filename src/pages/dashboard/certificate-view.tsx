import { useParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
import { ArrowRight, Download, ExternalLink, Share2, Copy, Calendar, User, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCertificate, useCertificatePreview } from "@/features/dashboard/certificates/hooks/useCertificatesQueries";
import { useDownloadCertificate } from "@/features/dashboard/certificates/hooks/useCertificatesMutations";
import { toast } from "sonner";

function CertificateView() {
  const { certificateId } = useParams<{ certificateId: string }>();
  const navigate = useNavigate();
  // const [showQRCode, setShowQRCode] = useState(false);

  const { data: certificateData, isPending, isError } = useCertificate(
    certificateId ? parseInt(certificateId) : 0
  );
  
  const { data: previewUrl } = useCertificatePreview(
    certificateId ? parseInt(certificateId) : 0,
    !!certificateId
  );
  
  const downloadCertificate = useDownloadCertificate();

  const certificate = certificateData?.data;

  const handleDownload = async () => {
    if (!certificate) return;
    
    try {
      await downloadCertificate.mutateAsync(certificate.id);
      toast.success("تم تحميل الشهادة بنجاح");
    } catch (error) {
      toast.error("فشل في تحميل الشهادة");
    }
  };

  const handleShare = () => {
    if (!certificate) return;
    
    const shareUrl = certificate.verification_url;
    
    if (navigator.share) {
      navigator.share({
        title: `شهادة إنجاز: ${certificate.course_title}`,
        text: `شهادة إنجاز للطالب ${certificate.student_name} في دورة ${certificate.course_title}`,
        url: shareUrl,
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareUrl || "");
      toast.success("تم نسخ رابط الشهادة");
    }
  };

  const handleCopyLink = () => {
    if (!certificate) return;
    
    navigator.clipboard.writeText(certificate.verification_url || "");
    toast.success("تم نسخ رابط التحقق");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-gray-500">جارٍ تحميل الشهادة...</span>
      </div>
    );
  }

  if (isError || !certificate) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-red-500">الشهادة غير موجودة</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/dashboard/certificates")}
          className="flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4" />
          العودة للشهادات
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">عرض الشهادة</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Certificate Preview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                معاينة الشهادة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="معاينة الشهادة"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Award className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-500">جارٍ تحميل معاينة الشهادة...</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certificate Details */}
        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>تفاصيل الشهادة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">الحالة</span>
                <Badge className={getStatusColor(certificate.status)}>
                  {getStatusText(certificate.status)}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">اسم الطالب</p>
                    <p className="font-medium">{certificate.student_name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">الدورة التدريبية</p>
                    <p className="font-medium">{certificate.course_title}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">رقم الشهادة</p>
                    <p className="font-mono text-sm">{certificate.certificate_number}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">تاريخ الإصدار</p>
                    <p className="font-medium">{formatDate(certificate.issued_at)}</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">نسبة الإكمال</span>
                  <span className="font-semibold text-blue-600">
                    {certificate.completion_percentage}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>إحصائيات الاستخدام</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">عدد التحميلات</span>
                <span className="font-medium">{certificate.download_count}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">عدد المشاهدات</span>
                <span className="font-medium">{certificate.view_count}</span>
              </div>
              
              {certificate.last_downloaded_at && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">آخر تحميل</span>
                  <span className="text-sm">{formatDate(certificate.last_downloaded_at)}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>الإجراءات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={handleDownload}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={certificate.status === "revoked" || downloadCertificate.isPending}
              >
                <Download className="w-4 h-4 mr-2" />
                {downloadCertificate.isPending ? "جارٍ التحميل..." : "تحميل الشهادة"}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.open(certificate.verification_url, '_blank')}
                className="w-full"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                فتح رابط التحقق
              </Button>
              
              <Button
                variant="outline"
                onClick={handleShare}
                className="w-full"
              >
                <Share2 className="w-4 h-4 mr-2" />
                مشاركة الشهادة
              </Button>
              
              <Button
                variant="outline"
                onClick={handleCopyLink}
                className="w-full"
              >
                <Copy className="w-4 h-4 mr-2" />
                نسخ رابط التحقق
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CertificateView;











