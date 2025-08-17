import React, { useState } from "react";
import { 
  Clock, 
  BookOpen, 
  CheckCircle, 
  Award, 
  Calendar,
  BarChart3,
  Target
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

import { useStudentAnalytics } from "../hooks/useStudentStats";
import { Chart } from "@/components/ui/chart";
import type { AnalyticsPeriod } from "@/types/student-stats";

export function UnifiedStudentStatsPage() {
  const [period, setPeriod] = useState<AnalyticsPeriod>("month");
  
  // Check if user is authenticated - more comprehensive check
  const isAuthenticated = !!localStorage.getItem('access_token') || 
    !!document.cookie.includes('access_token') || 
    !!sessionStorage.getItem('access_token') ||
    !!localStorage.getItem('refresh_token') ||
    !!sessionStorage.getItem('refresh_token') ||
    !!localStorage.getItem('user') ||
    !!sessionStorage.getItem('user') ||
    !!localStorage.getItem('auth') ||
    !!sessionStorage.getItem('auth') ||
    !!localStorage.getItem('token') ||
    !!sessionStorage.getItem('token') ||
    !!localStorage.getItem('isAuthenticated') ||
    !!sessionStorage.getItem('isAuthenticated') ||
    !!localStorage.getItem('loggedIn') ||
    !!sessionStorage.getItem('loggedIn') ||
    !!localStorage.getItem('loginStatus') ||
    !!sessionStorage.getItem('loginStatus') ||
    !!localStorage.getItem('authStatus') ||
    !!sessionStorage.getItem('authStatus') ||
    !!localStorage.getItem('userStatus') ||
    !!sessionStorage.getItem('userStatus') ||
    !!localStorage.getItem('session') ||
    !!sessionStorage.getItem('session') ||
    !!localStorage.getItem('login') ||
    !!sessionStorage.getItem('login') ||
    !!localStorage.getItem('authToken') ||
    !!sessionStorage.getItem('authToken') ||
    !!localStorage.getItem('userToken') ||
    !!sessionStorage.getItem('userToken') ||
    !!localStorage.getItem('studentToken') ||
    !!sessionStorage.getItem('studentToken') ||
    !!localStorage.getItem('academyToken') ||
    !!sessionStorage.getItem('academyToken') ||
    !!localStorage.getItem('jwt') ||
    !!sessionStorage.getItem('jwt') ||
    !!localStorage.getItem('bearer') ||
    !!sessionStorage.getItem('bearer') ||
    !!localStorage.getItem('authorization') ||
    !!sessionStorage.getItem('authorization') ||
    !!localStorage.getItem('userType') ||
    !!sessionStorage.getItem('userType') ||
    !!localStorage.getItem('role') ||
    !!sessionStorage.getItem('role') ||
    !!localStorage.getItem('student') ||
    !!sessionStorage.getItem('student') ||
    !!localStorage.getItem('academy') ||
    !!sessionStorage.getItem('academy');

  const { data: analyticsData, isLoading, error } = useStudentAnalytics(period);
  
  // Create a stable analytics object with fallbacks
  const analytics = React.useMemo(() => {
    if (!analyticsData) {
      return {
        period: period === "week" ? "أسبوعي" : period === "month" ? "شهري" : "سنوي",
        study_time: {
          total_minutes: 0,
          daily_average: 0,
          weekly_data: [
            { day: "الأحد", minutes: 0 },
            { day: "الاثنين", minutes: 0 },
            { day: "الثلاثاء", minutes: 0 },
            { day: "الأربعاء", minutes: 0 },
            { day: "الخميس", minutes: 0 },
            { day: "الجمعة", minutes: 0 },
            { day: "السبت", minutes: 0 }
          ]
        },
        progress: {
          lessons_completed: 0,
          quizzes_passed: 0,
          certificates_earned: 0,
          average_quiz_score: 0
        },
        engagement: {
          login_days: 0,
          video_completion_rate: 0,
          quiz_participation_rate: 0,
          note_taking_frequency: 0
        },
        achievements: []
      };
    }
    
    // Validate and merge with fallbacks if needed
    if (!analyticsData.study_time || !analyticsData.progress || !analyticsData.engagement) {
      return {
        period: analyticsData.period || (period === "week" ? "أسبوعي" : period === "month" ? "شهري" : "سنوي"),
        study_time: {
          total_minutes: analyticsData?.study_time?.total_minutes || 0,
          daily_average: analyticsData?.study_time?.daily_average || 0,
          weekly_data: analyticsData?.study_time?.weekly_data || [
            { day: "الأحد", minutes: 0 },
            { day: "الاثنين", minutes: 0 },
            { day: "الثلاثاء", minutes: 0 },
            { day: "الأربعاء", minutes: 0 },
            { day: "الخميس", minutes: 0 },
            { day: "الجمعة", minutes: 0 },
            { day: "السبت", minutes: 0 }
          ]
        },
        progress: {
          lessons_completed: analyticsData?.progress?.lessons_completed || 0,
          quizzes_passed: analyticsData?.progress?.quizzes_passed || 0,
          certificates_earned: analyticsData?.progress?.certificates_earned || 0,
          average_quiz_score: analyticsData?.progress?.average_quiz_score || 0
        },
        engagement: {
          login_days: analyticsData?.engagement?.login_days || 0,
          video_completion_rate: analyticsData?.engagement?.video_completion_rate || 0,
          quiz_participation_rate: analyticsData?.engagement?.quiz_participation_rate || 0,
          note_taking_frequency: analyticsData?.engagement?.note_taking_frequency || 0
        },
        achievements: Array.isArray(analyticsData?.achievements) ? analyticsData.achievements : []
      };
    }
    
    return analyticsData;
  }, [analyticsData, period]);

  // Debug logging
  console.log('Analytics data:', analytics);
  console.log('Analytics error:', error);
  console.log('Analytics loading:', isLoading);
  console.log('Is authenticated:', isAuthenticated);
  console.log('Period:', period);
  console.log('Analytics structure:', {
    hasStudyTime: !!analytics?.study_time,
    hasProgress: !!analytics?.progress,
    hasEngagement: !!analytics?.engagement,
    hasAchievements: !!analytics?.achievements,
    weeklyDataLength: analytics?.study_time?.weekly_data?.length
  });

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}س ${mins}د` : `${mins}د`;
  };

  if (!isAuthenticated) {
    return (
      <div key={`not-authenticated-${period}`} className="space-y-6">
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            مطلوب تسجيل الدخول
          </h3>
          <p className="text-gray-600">
            يرجى تسجيل الدخول لعرض الإحصائيات الخاصة بك.
          </p>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return <UnifiedStatsPageSkeleton key={`skeleton-${period}`} />;
  }

  if (error) {
    console.error('Student stats error:', error);
    
    // Check if it's an authentication error
    if (error.message?.includes('401') || error.message?.includes('unauthorized')) {
      return (
        <div key={`auth-error-${period}`} className="space-y-6">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              خطأ في المصادقة
            </h3>
            <p className="text-gray-600">
              يرجى إعادة تسجيل الدخول للوصول إلى الإحصائيات.
            </p>
          </Card>
        </div>
      );
    }
    
    // Check if it's a network error
    if (error.message?.includes('network') || error.message?.includes('fetch')) {
      return (
        <div key={`network-error-${period}`} className="space-y-6">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              خطأ في الاتصال
            </h3>
            <p className="text-gray-600">
              تأكد من اتصالك بالإنترنت وحاول مرة أخرى.
            </p>
          </Card>
        </div>
      );
    }
    
    // Generic error
    return (
      <div key={`generic-error-${period}`} className="space-y-6">
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            خطأ في تحميل الإحصائيات
          </h3>
          <p className="text-gray-600">
            حدث خطأ أثناء تحميل بياناتك. يرجى المحاولة مرة أخرى.
          </p>
          <details className="text-left bg-gray-50 p-3 rounded-lg mt-4">
            <summary className="cursor-pointer text-sm text-gray-700 font-medium">
              تفاصيل الخطأ
            </summary>
            <pre className="text-xs text-red-600 mt-2 whitespace-pre-wrap">
              {error.message}
            </pre>
          </details>
        </Card>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div key={`no-data-${period}`} className="space-y-6">
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            لا توجد بيانات إحصائية
          </h3>
          <p className="text-gray-600">
            لم يتم العثور على بيانات إحصائية لحسابك. تأكد من تسجيل الدخول وأن لديك نشاط تعليمي.
          </p>
        </Card>
      </div>
    );
  }

  // Data structure is now guaranteed to be valid due to useMemo above

  // Process study time data for chart
  const hasStudyTimeData = analytics.study_time.weekly_data.length > 0 &&
    analytics.study_time.weekly_data.some(item => item.minutes > 0);

  const studyTimeChartData = {
    labels: analytics.study_time.weekly_data.map(item => item.day),
    datasets: [
      {
        label: "وقت الدراسة (دقيقة)",
        data: analytics.study_time.weekly_data.map(item => item.minutes),
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
        callbacks: {
          label: function (context: { parsed: { y: number } }) {
            return `${context.parsed.y} دقيقة`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6b7280", font: { size: 11 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(229, 231, 235, 0.8)" },
        ticks: { 
          color: "#6b7280", 
          font: { size: 11 },
          callback: function (value: number) {
            return `${value} د`;
          },
        },
      },
    },
  };

  return (
    <div key={`stats-${period}`} className="space-y-6">
      {/* Header */}
      <div key={`header-${period}`} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 text-gray-600">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">إحصائيات الطالب الشاملة</span>
        </div>
        
        <Select key={period} value={period} onValueChange={(value) => setPeriod(value as AnalyticsPeriod)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">أسبوعي</SelectItem>
            <SelectItem value="month">شهري</SelectItem>
            <SelectItem value="year">سنوي</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Stats Cards */}
      <div key={`stats-cards-${period}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          key="study-time"
          title="إجمالي وقت الدراسة"
          value={formatTime(analytics?.study_time?.total_minutes || 0)}
          subtitle={`متوسط ${formatTime(analytics?.study_time?.daily_average || 0)} يومياً`}
          icon={Clock}
          bgColor="bg-blue-50"
          iconColor="text-blue-600"
          trend={{ value: "+12%", isPositive: true }}
        />
        
        <StatCard
          key="lessons-completed"
          title="الدروس المكتملة"
          value={(analytics?.progress?.lessons_completed || 0).toString()}
          subtitle="من إجمالي دروسك"
          icon={BookOpen}
          bgColor="bg-green-50"
          iconColor="text-green-600"
          trend={{ value: "+3 دروس", isPositive: true }}
        />
        
        <StatCard
          key="quizzes-passed"
          title="الاختبارات المجتازة"
          value={(analytics?.progress?.quizzes_passed || 0).toString()}
          subtitle={`متوسط ${analytics?.progress?.average_quiz_score || 0}%`}
          icon={CheckCircle}
          bgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        
        <StatCard
          key="certificates-earned"
          title="الشهادات المكتسبة"
          value={(analytics?.progress?.certificates_earned || 0).toString()}
          subtitle="شهادة إنجاز"
          icon={Award}
          bgColor="bg-amber-50"
          iconColor="text-amber-600"
        />
      </div>

      {/* Main Content Grid */}
      <div key={`content-${period}`} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Study Time Chart - Takes 8 columns */}
        <div key={`chart-container-${period}`} className="lg:col-span-8">
          <Card key={`chart-card-${period}`} className="p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                إحصائيات وقت الدراسة الأسبوعي
              </h3>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {period === "week" ? "أسبوعي" : period === "month" ? "شهري" : "سنوي"}
              </Badge>
            </div>
            
            <div className="h-80">
              {hasStudyTimeData ? (
                <div className="h-full">
                  <Chart
                    key={`chart-${period}`}
                    type="bar"
                    data={studyTimeChartData}
                    options={chartOptions}
                    height={320}
                    className="w-full"
                  />
                </div>
              ) : (
                <div className="h-full bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-gray-500 font-medium">
                      لا توجد بيانات وقت دراسة
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      ابدأ بالدراسة لرؤية الإحصائيات هنا
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Side Info Cards - Takes 4 columns */}
        <div key={`side-cards-${period}`} className="lg:col-span-4 space-y-6">
          
          {/* Progress Summary */}
          <Card key={`progress-summary-${period}`} className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900">ملخص التقدم</h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">إكمال الدروس</span>
                  <span className="text-sm font-medium">{analytics?.progress?.lessons_completed || 0}/20</span>
                </div>
                <Progress value={((analytics?.progress?.lessons_completed || 0) / 20) * 100} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">نجاح الاختبارات</span>
                  <span className="text-sm font-medium">{analytics?.progress?.average_quiz_score || 0}%</span>
                </div>
                <Progress value={analytics?.progress?.average_quiz_score || 0} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">إكمال الفيديوهات</span>
                  <span className="text-sm font-medium">{analytics?.engagement?.video_completion_rate || 0}%</span>
                </div>
                <Progress value={analytics?.engagement?.video_completion_rate || 0} className="h-2" />
              </div>
            </div>
          </Card>

          {/* Activity Summary */}
          <Card key={`activity-summary-${period}`} className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900">نشاط هذا الشهر</h4>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">أيام النشاط</span>
                <span className="font-medium">{analytics?.engagement?.login_days || 0}/30 يوم</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">المشاركة في الاختبارات</span>
                <span className="font-medium">{analytics?.engagement?.quiz_participation_rate || 0}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">الملاحظات المكتوبة</span>
                <span className="font-medium">{analytics?.engagement?.note_taking_frequency || 0} ملاحظة</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Achievements Section */}
      {analytics?.achievements && Array.isArray(analytics.achievements) && analytics.achievements.length > 0 && (
        <div key={`achievements-${period}`}>
        <Card key={`achievements-card-${period}`} className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">الإنجازات الحديثة</h3>
            <Badge variant="secondary" className="bg-amber-100 text-amber-800">
              {analytics.achievements.length} إنجاز
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analytics.achievements.slice(0, 3).map((achievement, index) => {
              if (!achievement || typeof achievement !== 'object') {
                return null;
              }
              
              return (
                <div
                  key={achievement.id || `achievement-${index}`}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-200"
                >
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Award className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{achievement.title || 'إنجاز'}</h4>
                    <p className="text-sm text-gray-600 truncate">{achievement.description || 'وصف الإنجاز'}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
        </div>
      )}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  bgColor: string;
  iconColor: string;
  trend?: { value: string; isPositive: boolean };
}

function StatCard({ title, value, subtitle, icon: Icon, bgColor, iconColor, trend }: StatCardProps) {
  return (
    <Card className="p-6 transition-all duration-300 hover:shadow-lg hover:scale-105">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            {trend && (
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  trend.isPositive
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {trend.value}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </Card>
  );
}

function UnifiedStatsPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-12 w-12 rounded-lg" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <Card className="p-6">
            <Skeleton className="h-6 w-32 mb-6" />
            <Skeleton className="h-80 w-full" />
          </Card>
        </div>
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6">
            <Skeleton className="h-6 w-24 mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-2 w-full" />
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <Skeleton className="h-6 w-24 mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
