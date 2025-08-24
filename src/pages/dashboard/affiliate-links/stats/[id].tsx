import { useParams } from "react-router-dom";
import { useMemo } from "react";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  TrendingUp,
  MousePointer,
  DollarSign,
  Calendar,
  Link2,
  ArrowLeft,
  Percent,
  Target,
  Eye,
  Copy,
  Share2
} from "lucide-react";
import { Link } from "react-router-dom";
import type { AffiliateLink } from "@/types/affiliate-link";

// بيانات تجريبية لرابط التسويق
const affiliateLinkData: AffiliateLink = {
  id: 1,
  code: "WELCOME20",
  name: "رابط ترحيبي للعملاء الجدد",
  description: "رابط خاص للعملاء الجدد مع خصم 20%",
  url: "https://academy.example.com/ref/WELCOME20",
  commissionType: "percentage",
  commissionRate: 15,
  commissionValue: 15,
  status: "active",
  startDate: "2024-01-01T00:00:00Z",
  endDate: "2024-12-31T23:59:59Z",
  promotionType: "general",
  clickCount: 1250,
  conversionCount: 85,
  totalCommission: 12750,
  createdAt: "2024-01-01T10:00:00Z",
  updatedAt: "2024-08-21T14:30:00Z",
  createdBy: "مدير التسويق"
};

// بيانات تجريبية للإحصائيات اليومية
const dailyStats = [
  { date: "2024-08-15", clicks: 45, conversions: 3, commission: 450 },
  { date: "2024-08-16", clicks: 52, conversions: 4, commission: 600 },
  { date: "2024-08-17", clicks: 38, conversions: 2, commission: 300 },
  { date: "2024-08-18", clicks: 61, conversions: 5, commission: 750 },
  { date: "2024-08-19", clicks: 43, conversions: 3, commission: 450 },
  { date: "2024-08-20", clicks: 55, conversions: 4, commission: 600 },
  { date: "2024-08-21", clicks: 48, conversions: 3, commission: 450 },
];

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "positive" | "negative";
  description?: string;
}

const StatCard = ({ title, value, icon, change, changeType, description }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <p className={`text-sm flex items-center gap-1 ${
                changeType === "positive" ? "text-green-600" : "text-red-600"
              }`}>
                <TrendingUp className="w-4 h-4" />
                {change}
              </p>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          <div className="text-primary">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

function AffiliateLinkStatsPage() {
  const { } = useParams<{ id: string }>();

  // حساب معدل التحويل
  const conversionRate = useMemo(() => {
    if (affiliateLinkData.clickCount === 0) return 0;
    return (affiliateLinkData.conversionCount / affiliateLinkData.clickCount) * 100;
  }, []);

  // حساب متوسط العمولة لكل تحويل
  const avgCommissionPerConversion = useMemo(() => {
    if (affiliateLinkData.conversionCount === 0) return 0;
    return affiliateLinkData.totalCommission / affiliateLinkData.conversionCount;
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(affiliateLinkData.url);
    console.log("تم نسخ الرابط");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardPageHeader
        icon={BarChart3}
        title={`إحصائيات الرابط: ${affiliateLinkData.code}`}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={copyLink}>
              <Copy className="w-4 h-4 mr-2" />
              نسخ الرابط
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              مشاركة
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/affiliate-links">
                <ArrowLeft className="w-4 h-4 mr-2" />
                العودة للقائمة
              </Link>
            </Button>
          </div>
        }
      />

      {/* معلومات الرابط */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="w-5 h-5" />
            معلومات الرابط
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">اسم الرابط</p>
              <p className="font-medium">{affiliateLinkData.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">الحالة</p>
              <Badge 
                variant={affiliateLinkData.status === "active" ? "default" : "secondary"}
                className="mt-1"
              >
                {affiliateLinkData.status === "active" ? "نشط" : "غير نشط"}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">نوع العمولة</p>
              <div className="flex items-center gap-2 mt-1">
                {affiliateLinkData.commissionType === "percentage" ? (
                  <>
                    <Percent className="w-4 h-4 text-green-600" />
                    <span className="font-medium">{affiliateLinkData.commissionRate}%</span>
                  </>
                ) : (
                  <>
                    <DollarSign className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">{affiliateLinkData.commissionValue} ر.س</span>
                  </>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">نوع الترويج</p>
              <p className="font-medium mt-1">
                {affiliateLinkData.promotionType === "general" ? "عام" : "منتجات محددة"}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground">الوصف</p>
              <p className="font-medium mt-1">{affiliateLinkData.description}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground">رابط التسويق</p>
              <div className="flex items-center gap-2 mt-1">
                <code className="bg-muted px-2 py-1 rounded text-sm flex-1 truncate">
                  {affiliateLinkData.url}
                </code>
                <Button variant="outline" size="sm" onClick={copyLink}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* الإحصائيات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="إجمالي النقرات"
          value={affiliateLinkData.clickCount.toLocaleString()}
          icon={<MousePointer className="w-8 h-8" />}
          change="+15%"
          changeType="positive"
          description="من الشهر الماضي"
        />
        <StatCard
          title="إجمالي التحويلات"
          value={affiliateLinkData.conversionCount.toLocaleString()}
          icon={<Target className="w-8 h-8" />}
          change="+28%"
          changeType="positive"
          description="من الشهر الماضي"
        />
        <StatCard
          title="معدل التحويل"
          value={`${conversionRate.toFixed(1)}%`}
          icon={<TrendingUp className="w-8 h-8" />}
          change="+5%"
          changeType="positive"
          description="من الشهر الماضي"
        />
        <StatCard
          title="إجمالي الأرباح"
          value={`${affiliateLinkData.totalCommission.toLocaleString()} ر.س`}
          icon={<DollarSign className="w-8 h-8" />}
          change="+32%"
          changeType="positive"
          description="من الشهر الماضي"
        />
      </div>

      {/* إحصائيات إضافية */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>متوسط الأداء</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">متوسط النقرات اليومية</span>
              <span className="font-medium">{Math.round(affiliateLinkData.clickCount / 30)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">متوسط التحويلات اليومية</span>
              <span className="font-medium">{(affiliateLinkData.conversionCount / 30).toFixed(1)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">متوسط العمولة لكل تحويل</span>
              <span className="font-medium">{avgCommissionPerConversion.toFixed(0)} ر.س</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">العائد على النقرة</span>
              <span className="font-medium">
                {(affiliateLinkData.totalCommission / affiliateLinkData.clickCount).toFixed(2)} ر.س
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>تواريخ مهمة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">تاريخ الإنشاء</span>
              <span className="font-medium">
                {new Date(affiliateLinkData.createdAt).toLocaleDateString("ar-SA")}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">تاريخ البداية</span>
              <span className="font-medium">
                {new Date(affiliateLinkData.startDate).toLocaleDateString("ar-SA")}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">تاريخ النهاية</span>
              <span className="font-medium">
                {affiliateLinkData.endDate 
                  ? new Date(affiliateLinkData.endDate).toLocaleDateString("ar-SA")
                  : "لا نهائي"
                }
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">آخر تحديث</span>
              <span className="font-medium">
                {new Date(affiliateLinkData.updatedAt).toLocaleDateString("ar-SA")}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* الإحصائيات الأسبوعية */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            الأداء في آخر 7 أيام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dailyStats.map((stat) => {
              const conversionRate = stat.clicks > 0 ? (stat.conversions / stat.clicks) * 100 : 0;
              return (
                <div key={stat.date} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium min-w-[80px]">
                      {new Date(stat.date).toLocaleDateString("ar-SA", { 
                        weekday: "short", 
                        month: "short", 
                        day: "numeric" 
                      })}
                    </span>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{stat.clicks} نقرة</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{stat.conversions} تحويل</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm">{stat.commission} ر.س</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {conversionRate.toFixed(1)}%
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AffiliateLinkStatsPage;