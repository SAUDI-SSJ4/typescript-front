import { Chart } from "@/components/ui/chart";
import { Card } from "@/components/ui/card";
import type { StudyTime } from "@/types/student-stats";

interface StudyTimeChartProps {
  data: StudyTime;
}

export function StudyTimeChart({ data }: StudyTimeChartProps) {
  const chartData = {
    labels: data.weekly_data.map((item) => item.day),
    datasets: [
      {
        label: "وقت الدراسة (دقيقة)",
        data: data.weekly_data.map((item) => item.minutes),
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
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
            size: 12,
            family: "Cairo, sans-serif",
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
        titleFont: {
          family: "Cairo, sans-serif",
        },
        bodyFont: {
          family: "Cairo, sans-serif",
        },
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.parsed.y} دقيقة`;
          },
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
            size: 11,
            family: "Cairo, sans-serif",
          },
        },
        border: {
          color: "#e5e7eb",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(229, 231, 235, 0.8)",
          lineWidth: 1,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 11,
            family: "Cairo, sans-serif",
          },
          callback: function (value: any) {
            return `${value} د`;
          },
        },
        border: {
          color: "#e5e7eb",
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 6,
        borderSkipped: false,
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          وقت الدراسة الأسبوعي
        </h3>
        <div className="text-sm text-gray-500">
          المتوسط اليومي: {data.daily_average} دقيقة
        </div>
      </div>
      <div className="h-64">
        <Chart type="bar" data={chartData} options={options} height={256} />
      </div>
    </Card>
  );
}



