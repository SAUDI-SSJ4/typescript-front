import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  User,
  Instagram,
  Twitter,
  Youtube,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink
} from "lucide-react";
import type { AffiliateApplication } from "@/types/affiliate-application";

// بيانات تجريبية - في التطبيق الحقيقي ستأتي من API
const mockApplication: AffiliateApplication = {
  id: 1,
  studentCode: "AFF001",
  studentName: "أحمد محمد علي",
  email: "ahmed.mohammed@example.com",
  phone: "+966501234567",
  university: "جامعة الملك سعود",
  major: "إدارة الأعمال",
  graduationYear: "2024",
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
    },
    youtube: {
      username: "ahmed_business_channel",
      subscribersCount: 5200,
      profileUrl: "https://youtube.com/@ahmed_business_channel"
    }
  },
  marketingExperience: "متوسط",
  previousAffiliateExperience: true,
  previousAffiliateDetails: "عملت مع شركة تسويق محلية لمدة 6 أشهر وحققت مبيعات بقيمة 50,000 ر.س. لديّ خبرة في استخدام منصات التواصل الاجتماعي للتسويق وإنشاء محتوى جذاب يستهدف الشباب المهتمين بريادة الأعمال.",
  interestedCategories: ["إدارة الأعمال", "التسويق", "ريادة الأعمال", "التطوير الشخصي"],
  targetAudience: "الشباب المهتمين بريادة الأعمال والتسويق الرقمي، خاصة طلاب الجامعات والخريجين الجدد الذين يسعون لتطوير مهاراتهم المهنية وبناء مشاريع ناجحة.",
  marketingStrategy: "سأقوم بإنشاء محتوى تعليمي قيم على منصات التواصل الاجتماعي يتضمن نصائح عملية، دراسات حالة، وقصص نجاح ملهمة. سأستخدم الستوريز والبوستات التفاعلية والفيديوهات القصيرة لجذب الجمهور وتوجيههم للدورات والمنتجات المناسبة لهم.",
  whyJoinAffiliate: "أرغب في الانضمام لبرنامج التسويق بالعمولة لأنني أؤمن بقيمة التعليم والتطوير المهني. أريد مشاركة خبراتي مع المجتمع ومساعدة الآخرين على تحقيق أهدافهم المهنية، بالإضافة إلى كسب دخل إضافي يساعدني على تطوير مشروعي الخاص.",
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
};

export default function AffiliateApplicationDetails() {
  const { } = useParams();
  const [rejectionDialog, setRejectionDialog] = useState({ isOpen: false, reason: "" });
  
  // في التطبيق الحقيقي، سيتم جلب البيانات بناءً على id
  const application = mockApplication;

  const handleApprove = () => {
    console.log(`الموافقة على طلب ${application.studentName}`);
    // منطق الموافقة
  };

  const handleReject = (reason: string) => {
    console.log(`رفض طلب ${application.studentName} بسبب: ${reason}`);
    setRejectionDialog({ isOpen: false, reason: "" });
    // منطق الرفض
  };

  const getStatusBadge = (status: AffiliateApplication['status']) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-4 h-4 mr-2" />
            قيد المراجعة
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-4 h-4 mr-2" />
            مقبول
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="w-4 h-4 mr-2" />
            مرفوض
          </Badge>
        );
    }
  };

  const getExperienceBadge = (experience: AffiliateApplication['marketingExperience']) => {
    const colors = {
      'مبتدئ': 'bg-blue-100 text-blue-800 border-blue-200',
      'متوسط': 'bg-green-100 text-green-800 border-green-200',
      'متقدم': 'bg-orange-100 text-orange-800 border-orange-200',
      'خبير': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    
    return (
      <Badge variant="secondary" className={colors[experience]}>
        {experience}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardPageHeader
        icon={User}
        title={`تفاصيل الطلب: ${application.studentName}`}
        actions={
          <div className="flex items-center gap-2">
            {application.status === 'pending' && (
              <>
                <Button 
                  onClick={handleApprove}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  قبول الطلب
                </Button>
                <Dialog open={rejectionDialog.isOpen} onOpenChange={(open) => setRejectionDialog({ isOpen: open, reason: "" })}>
                  <DialogTrigger asChild>
                    <Button variant="destructive">
                      <XCircle className="w-4 h-4 mr-2" />
                      رفض الطلب
                    </Button>
                  </DialogTrigger>
                  <DialogContent dir="rtl">
                    <DialogHeader>
                      <DialogTitle>رفض طلب التسويق بالعمولة</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p>سبب رفض طلب <strong>{application.studentName}</strong>:</p>
                      <div className="space-y-2">
                        <Label htmlFor="rejection-reason">سبب الرفض *</Label>
                        <Textarea
                          id="rejection-reason"
                          value={rejectionDialog.reason}
                          onChange={(e) => setRejectionDialog(prev => ({ ...prev, reason: e.target.value }))}
                          placeholder="اكتب سبب رفض الطلب..."
                          rows={4}
                          className="!bg-transparent text-right !border-border !shadow-none focus-visible:ring-0 focus-visible:border-border resize-none"
                          dir="rtl"
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleReject(rejectionDialog.reason)}
                          variant="destructive"
                          className="flex-1"
                          disabled={!rejectionDialog.reason.trim()}
                        >
                          رفض الطلب
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setRejectionDialog({ isOpen: false, reason: "" })}
                          className="flex-1"
                        >
                          إلغاء
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
            <Link to="/dashboard/affiliate-applications">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                العودة للقائمة
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* المعلومات الشخصية */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            المعلومات الشخصية
          </h2>
          <div className="space-y-4">
            <div className="text-right">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الاسم
              </label>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-900 font-medium">{application.studentName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* وسائل التواصل الاجتماعي */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            وسائل التواصل الاجتماعي
          </h2>
          <div className="space-y-4">
            {Object.entries(application.socialMediaAccounts).map(([platform, account]) => {
              const icons = {
                instagram: <Instagram className="w-4 h-4 text-pink-500" />,
                twitter: <Twitter className="w-4 h-4 text-blue-500" />,
                youtube: <Youtube className="w-4 h-4 text-red-500" />,
                tiktok: <Users className="w-4 h-4 text-gray-500" />,
                snapchat: <Users className="w-4 h-4 text-yellow-500" />
              };

              return (
                <div
                  key={platform}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {icons[platform as keyof typeof icons]}
                      <span className="font-medium capitalize text-gray-900">{platform}</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        @{(account as any).username}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(account as any).followersCount ? 
                          `${(account as any).followersCount.toLocaleString()} متابع` :
                          `${(account as any).subscribersCount.toLocaleString()} مشترك`
                        }
                      </p>
                    </div>
                  </div>
                  <a 
                    href={(account as any).profileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* الخبرة والتفاصيل */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            الخبرة والتفاصيل
          </h2>
          
          <div className="space-y-6">
            {/* مستوى الخبرة */}
            <div className="text-right">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                مستوى الخبرة
              </label>
              <div className="flex items-center gap-3">
                {getExperienceBadge(application.marketingExperience)}
                {application.previousAffiliateExperience && (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    لديه خبرة سابقة
                  </Badge>
                )}
              </div>
            </div>

            {/* تفاصيل الخبرة السابقة */}
            {application.previousAffiliateExperience && application.previousAffiliateDetails && (
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تفاصيل الخبرة السابقة
                </label>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-900 leading-relaxed">
                    {application.previousAffiliateDetails}
                  </p>
                </div>
              </div>
            )}

            {/* المجالات المهتم بها */}
            <div className="text-right">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المجالات المهتم بها
              </label>
              <div className="flex flex-wrap gap-2">
                {application.interestedCategories.map((category, index) => (
                  <Badge key={index} className="bg-gray-100 text-gray-800 border-gray-200">{category}</Badge>
                ))}
              </div>
            </div>

            {/* الجمهور المستهدف */}
            <div className="text-right">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الجمهور المستهدف
              </label>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-900 leading-relaxed">
                  {application.targetAudience}
                </p>
              </div>
            </div>

            {/* استراتيجية التسويق */}
            <div className="text-right">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                استراتيجية التسويق
              </label>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-900 leading-relaxed">
                  {application.marketingStrategy}
                </p>
              </div>
            </div>

            {/* سبب الانضمام */}
            <div className="text-right">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                سبب الانضمام للبرنامج
              </label>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-900 leading-relaxed">
                  {application.whyJoinAffiliate}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* معلومات الطلب */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            معلومات الطلب
          </h2>
          
          <div className="space-y-4">
            {/* الحالة */}
            <div className="text-right">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الحالة
              </label>
              <div className="flex justify-start">
                {getStatusBadge(application.status)}
              </div>
            </div>
            
            {/* الكود */}
            <div className="text-right">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                كود الطلب
              </label>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-900 font-mono">#{application.studentCode}</p>
              </div>
            </div>

            {/* تاريخ التقديم */}
            <div className="text-right">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تاريخ التقديم
              </label>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-900">{formatDate(application.createdAt)}</p>
              </div>
            </div>
              
            {/* تاريخ الموافقة */}
            {application.status === 'approved' && application.approvedAt && (
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تاريخ الموافقة
                </label>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-green-600 font-medium">{formatDate(application.approvedAt)}</p>
                </div>
              </div>
            )}
              
            {/* تاريخ الرفض */}
            {application.status === 'rejected' && application.rejectedAt && (
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تاريخ الرفض
                </label>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-red-600 font-medium">{formatDate(application.rejectedAt)}</p>
                </div>
              </div>
            )}

            {/* المراجع */}
            {(application.approvedBy || application.rejectedBy) && (
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تمت المراجعة بواسطة
                </label>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-900 font-medium">{application.approvedBy || application.rejectedBy}</p>
                </div>
              </div>
            )}

            {/* سبب الرفض */}
            {application.status === 'rejected' && application.rejectionReason && (
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  سبب الرفض
                </label>
                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <p className="text-red-800 leading-relaxed">{application.rejectionReason}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}