import React from "react";
import { Chart } from "@/components/ui/chart";
import { useEnrolledCourses } from "@/features/dashboard/educational-materials/hooks/useEducationalMaterials";

export function EducationalMaterialsChart(): React.ReactElement {
  const { data: coursesData, isLoading } = useEnrolledCourses();

  // Transform data for chart
  const chartData = React.useMemo(() => {
    if (!coursesData?.courses || coursesData.courses.length === 0) {
      return null;
    }

    // Group courses by academy
    const academyStats = coursesData.courses.reduce((acc, course) => {
      const academyName = course.academy_name;
      if (!acc[academyName]) {
        acc[academyName] = {
          count: 0,
          totalProgress: 0,
          totalSpent: 0
        };
      }
      acc[academyName].count++;
      acc[academyName].totalProgress += course.progress;
      acc[academyName].totalSpent += course.price_paid;
      return acc;
    }, {} as Record<string, { count: number; totalProgress: number; totalSpent: number }>);

    const labels = Object.keys(academyStats);
    const courseCounts = labels.map(academy => academyStats[academy].count);
    const averageProgress = labels.map(academy => 
      Math.round(academyStats[academy].totalProgress / academyStats[academy].count)
    );

    return {
      labels,
      datasets: [
        {
          label: "عدد الدورات",
          data: courseCounts,
          backgroundColor: "rgba(59, 130, 246, 0.8)",
          borderColor: "rgba(59, 130, 246, 1)",
          borderWidth: 2,
        },
        {
          label: "متوسط التقدم %",
          data: averageProgress,
          backgroundColor: "rgba(34, 197, 94, 0.8)",
          borderColor: "rgba(34, 197, 94, 1)",
          borderWidth: 2,
        }
      ]
    };
  }, [coursesData]);

  // Only show chart if data is provided and has actual values
  const hasData = chartData && chartData.datasets.some((dataset) =>
    dataset.data.some((value) => value > 0)
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "rect",
          color: "#6b7280",
          font: {
            size: 14,
            family: "Cairo, sans-serif",
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(139, 92, 246, 1)",
        borderWidth: 1,
        titleFont: {
          family: "Cairo, sans-serif",
        },
        bodyFont: {
          family: "Cairo, sans-serif",
        },
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
            family: "Cairo, sans-serif",
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
            family: "Cairo, sans-serif",
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
    layout: {
      padding: {
        top: 20,
        bottom: 10,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-500 font-medium">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-purple-600 text-2xl">📊</span>
          </div>
          <p className="text-gray-500 font-medium">لا توجد مواد تعليمية مسجلة</p>
          <p className="text-gray-400 text-sm mt-1">ابدأ بالتسجيل في مادة لرؤية الإحصائيات</p>
        </div>
      </div>
    );
  }

  return (
    <Chart
      type="bar"
      data={chartData!}
      options={chartOptions}
      height={400}
      className="w-full"
    />
  );
}
