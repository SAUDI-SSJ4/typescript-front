import { useState } from "react";
import { TrendingUp, Users, DollarSign, Target, Plus, BarChart3, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";

interface AffiliateStats {
  totalAffiliates: number;
  totalCommissions: number;
  pendingPayouts: number;
  conversionRate: number;
}

interface AffiliatePartner {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  totalSales: number;
  totalCommission: number;
  status: 'active' | 'pending' | 'suspended';
  conversionRate: number;
}

const mockStats: AffiliateStats = {
  totalAffiliates: 147,
  totalCommissions: 25680,
  pendingPayouts: 8450,
  conversionRate: 3.8
};

const mockPartners: AffiliatePartner[] = [
  {
    id: "1",
    name: "أحمد محمد",
    email: "ahmed@example.com",
    joinDate: "2024-01-15",
    totalSales: 15,
    totalCommission: 2850,
    status: "active",
    conversionRate: 4.2
  },
  {
    id: "2",
    name: "سارة علي",
    email: "sara@example.com", 
    joinDate: "2024-02-01",
    totalSales: 8,
    totalCommission: 1650,
    status: "active",
    conversionRate: 3.1
  }
];

export default function AffiliateMarketingPage() {
  const [partners] = useState<AffiliatePartner[]>(mockPartners);
  const [stats] = useState<AffiliateStats>(mockStats);

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={TrendingUp}
        title="التسويق بالعمولة"
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline" className="font-noto">
              <BarChart3 className="w-4 h-4 mr-2" />
              التقارير
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 font-noto">
              <Plus className="w-4 h-4 mr-2" />
              دعوة شريك
            </Button>
          </div>
        }
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Users className="w-4 h-4" />
              إجمالي الشركاء
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.totalAffiliates}</div>
            <p className="text-xs text-gray-500 mt-1">+15% عن الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              إجمالي العمولات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalCommissions.toLocaleString()} ر.س
            </div>
            <p className="text-xs text-gray-500 mt-1">+8% عن الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              المدفوعات المعلقة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {stats.pendingPayouts.toLocaleString()} ر.س
            </div>
            <p className="text-xs text-gray-500 mt-1">يتم الدفع كل 15 يوم</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Target className="w-4 h-4" />
              معدل التحويل
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.conversionRate}%</div>
            <p className="text-xs text-gray-500 mt-1">متوسط الصناعة 2.8%</p>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon Notice */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            برنامج التسويق بالعمولة قيد التطوير
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            نحن نعمل على تطوير نظام متقدم للتسويق بالعمولة يتيح لك إدارة الشركاء ومتابعة الأرباح والمدفوعات بكل سهولة.
            سيتم إطلاقه قريباً مع ميزات رائعة.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">إدارة الشركاء</h4>
              <p className="text-sm text-gray-600">
                نظام شامل لإدارة الشركاء وتتبع أدائهم
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">تقارير مفصلة</h4>
              <p className="text-sm text-gray-600">
                تحليلات عميقة للمبيعات والعمولات
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">دفعات تلقائية</h4>
              <p className="text-sm text-gray-600">
                نظام دفع العمولات تلقائياً وفي الوقت المحدد
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <Button className="bg-blue-600 hover:bg-blue-700 font-noto">
              تواصل معنا للمزيد من المعلومات
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="font-noto flex items-center gap-2">
            <Eye className="w-5 h-5" />
            معاينة النظام (قريباً)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {partners.map((partner) => (
              <div 
                key={partner.id}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50 opacity-60"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-gray-900">{partner.name}</h3>
                      <Badge 
                        variant={
                          partner.status === 'active' ? 'default' : 
                          partner.status === 'pending' ? 'secondary' : 'destructive'
                        }
                        className="text-xs"
                      >
                        {partner.status === 'active' ? 'نشط' : 
                         partner.status === 'pending' ? 'قيد المراجعة' : 'معلق'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{partner.email}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>المبيعات: {partner.totalSales}</span>
                      <span>العمولة: {partner.totalCommission.toLocaleString()} ر.س</span>
                      <span>معدل التحويل: {partner.conversionRate}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-50">
                    <Button size="sm" variant="outline" disabled className="font-noto">
                      <Eye className="w-4 h-4 mr-1" />
                      عرض
                    </Button>
                    <Button size="sm" disabled className="bg-blue-600 hover:bg-blue-700 font-noto">
                      إدارة
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}