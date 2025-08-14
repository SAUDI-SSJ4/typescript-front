import { Chart } from "@/components/ui/chart";
import { Card } from "@/components/ui/card";
import type { Engagement } from "@/types/student-stats";

interface EngagementChartProps {
  data: Engagement;
}

export function EngagementChart({ data }: EngagementChartProps) {
  const chartData = {
    labels: [
      "أيام تسجيل الدخول",
      "معدل إكمال الفيديوهات",
      "معدل المشاركة في الاختبارات",
      "تكرار تدوين الملاحظات",
    ],
    datasets: [
      {
        label: "مستوى التفاعل",
        data: [
          (data.login_days / 30) * 100, // Convert to percentage
          data.video_completion_rate,
          data.quiz_participation_rate,
          (data.note_taking_frequency / 30) * 100, // Convert to percentage
        ],
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(139, 92, 246, 0.8)",
        ],
        borderColor: [
          "rgba(16, 185, 129, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(139, 92, 246, 1)",
        ],
        borderWidth: 2,
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
        borderColor: "#e5e7eb",
        borderWidth: 1,
        titleFont: {
          family: "Cairo, sans-serif",
        },
        bodyFont: {
          family: "Cairo, sans-serif",
        },
        callbacks: {
          label: function (context: any) {
            const value = context.parsed;
            if (context.dataIndex === 0) {
              return `${data.login_days} يوم من أصل 30`;
            } else if (context.dataIndex === 3) {
              return `${data.note_taking_frequency} ملاحظة هذا الشهر`;
            } else {
              return `${value.toFixed(1)}%`;
            }
          },
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          color: "#6b7280",
          font: {
            size: 10,
            family: "Cairo, sans-serif",
          },
          callback: function (value: any) {
            return `${value}%`;
          },
        },
        grid: {
          color: "rgba(229, 231, 235, 0.8)",
        },
        pointLabels: {
          color: "#374151",
          font: {
            size: 11,
            family: "Cairo, sans-serif",
          },
        },
      },
    },
    elements: {
      point: {
        borderWidth: 2,
        radius: 4,
        hoverRadius: 6,
      },
    },
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">مستوى التفاعل</h3>
        <div className="text-sm text-gray-500">نظرة عامة على أنشطتك</div>
      </div>
      <div className="h-80">
        <Chart type="doughnut" data={chartData} options={options} height={320} />
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-600">{data.login_days} يوم دخول</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-gray-600">{data.video_completion_rate}% إكمال فيديوهات</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <span className="text-sm text-gray-600">{data.quiz_participation_rate}% مشاركة اختبارات</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span className="text-sm text-gray-600">{data.note_taking_frequency} ملاحظة</span>
        </div>
      </div>
    </Card>
  );
}



