import { Button } from "@/components/ui/button";
import { Chart } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pages, Routes } from "@/constants/enums";
import { TrendingUp, Users, Clock, Calendar, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AcademyDashboard() {
  return (
    <div className="space-y-6">
      {/* Latest Activities and Recent Courses Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LatestActivities />
        <RecentCourses />
      </div>

      {/* Sales and Monthly Metrics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesTable />
        <MonthlyMetrics />
      </div>
    </div>
  );
}

function LatestActivities() {
  const navigate = useNavigate();
  const activities = [
    {
      id: 1,
      title: "تم إضافة دورة جديدة",
      description: "تم إضافة دورة البرمجة بلغة JavaScript",
      time: "منذ ساعتين",
      icon: <Calendar className="w-5 h-5" />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      title: "تسجيل طالب جديد",
      description: "انضم أحمد محمد إلى دورة تطوير الويب",
      time: "منذ 3 ساعات",
      icon: <Users className="w-5 h-5" />,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 3,
      title: "تحديث محتوى",
      description: "تم تحديث محتوى دورة التصميم الجرافيكي",
      time: "منذ 5 ساعات",
      icon: <Clock className="w-5 h-5" />,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 4,
      title: "إضافة شهادة",
      description: "تم إضافة شهادة جديدة لدورة التسويق الرقمي",
      time: "منذ يوم",
      icon: <TrendingUp className="w-5 h-5" />,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      id: 5,
      title: "تقييم جديد",
      description: "تقيم دورة إدارة المشاريع تقييم جديد 5 نجوم",
      time: "منذ يومين",
      icon: <TrendingUp className="w-5 h-5" />,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      id: 6,
      title: "اكتمال دورة",
      description: "تم اكتمال دورة تطوير تطبيقات Flutter",
      time: "منذ يومين",
      icon: <Clock className="w-5 h-5" />,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          النشاطات الأخيرة
        </h2>
        <Button onClick={() => navigate("/")}>عرض الكل</Button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div
              className={`w-10 h-10 ${activity.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}
            >
              <div className={activity.iconColor}>{activity.icon}</div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                {activity.title}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                {activity.description}
              </p>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentCourses() {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">أحدث الدورات</h2>
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <span className="text-blue-600 text-xl">📚</span>
        </div>
      </div>

      <Button
        className="mb-4"
        onClick={() => navigate(`${Routes.DASHBOARD}/${Pages.COURSES}`)}
      >
        عرض الكل
      </Button>

      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        {/* Course Image */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="text-white text-xs font-medium text-center leading-tight">
              <div>دورة تطوير تطبيقات</div>
              <div>باستخدام</div>
              <div className="text-lg font-bold">Flutter</div>
            </div>
            {/* Flutter logo overlay */}
            <div className="absolute bottom-1 right-1">
              <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                <span className="text-blue-600 text-xs">⚡</span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-gray-900 mb-1 text-right">
            دورة تطوير تطبيقات باستخدام Flutter
          </h3>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />0 طالب
            </span>
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
              intermediate
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SalesTable() {
  const salesData = [
    {
      id: 1,
      date: "2024-01-15",
      course: "دورة تطوير تطبيقات Flutter",
      student: "أحمد محمد علي",
      amount: "1,500",
    },
    {
      id: 2,
      date: "2024-01-14",
      course: "دورة تصميم واجهات المستخدم",
      student: "فاطمة أحمد",
      amount: "1,200",
    },
    {
      id: 3,
      date: "2024-01-13",
      course: "دورة التسويق الرقمي",
      student: "محمد سالم",
      amount: "900",
    },
    {
      id: 4,
      date: "2024-01-12",
      course: "دورة البرمجة بـ JavaScript",
      student: "نور الهدى",
      amount: "1,100",
    },
    {
      id: 5,
      date: "2024-01-11",
      course: "دورة إدارة المشاريع",
      student: "خالد عبدالله",
      amount: "800",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            المبيعات خلال الشهر
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">﷼ 5,500</span>
            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              15%+
            </span>
          </div>
        </div>
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <ShoppingCart className="w-5 h-5 text-green-600" />
        </div>
      </div>

      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-50">
              <TableHead className="text-right font-medium text-gray-600">التاريخ</TableHead>
              <TableHead className="text-right font-medium text-gray-600">المادة المبيعة</TableHead>
              <TableHead className="text-right font-medium text-gray-600">الطالب</TableHead>
              <TableHead className="text-right font-medium text-gray-600">المبلغ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesData.map((sale) => (
              <TableRow key={sale.id} className="border-gray-50 hover:bg-gray-50/50">
                <TableCell className="text-right text-sm text-gray-600">
                  {new Date(sale.date).toLocaleDateString('ar-SA')}
                </TableCell>
                <TableCell className="text-right">
                  <div className="font-medium text-gray-900 text-sm truncate max-w-[150px]">
                    {sale.course}
                  </div>
                </TableCell>
                <TableCell className="text-right text-sm text-gray-600">
                  {sale.student}
                </TableCell>
                <TableCell className="text-right">
                  <span className="font-semibold text-green-600">
                    ﷼ {sale.amount}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function MonthlyMetrics() {
  const data = {
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
    datasets: [
      {
        label: "الإيرادات الشهرية",
        data: [1, 2, 3, 4, 5, 6],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        maxBarThickness: 25,
      },
    ],
  };

  const options = {
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
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
          },
        },
        border: {
          color: "#e5e7eb",
        },
      },
      y: {
        grid: {
          color: "rgba(229, 231, 235, 0.8)",
          lineWidth: 1,
        },
        ticks: {
          color: "#6b7280",
          beginAtZero: true,
          stepSize: 1,
          font: {
            size: 12,
          },
        },
        border: {
          color: "#e5e7eb",
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 4,
        borderSkipped: false,
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            الإيرادات الشهرية
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-gray-900">﷼ 0</span>
          </div>
        </div>
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <span className="text-blue-600 text-xl">📊</span>
        </div>
      </div>

      <div className="h-64">
        <Chart type="bar" data={data} options={options} height={256} />
      </div>
    </div>
  );
}

export default AcademyDashboard;
