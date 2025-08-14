import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  bgColor?: string;
  iconColor?: string;
  valueColor?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function StatCard({
  title,
  value,
  icon: Icon,
  subtitle,
  bgColor = "bg-blue-50",
  iconColor = "text-blue-600",
  valueColor = "text-gray-900",
  trend,
}: StatCardProps) {
  return (
    <Card className="p-6 transition-all duration-300 hover:shadow-lg hover:scale-105">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className={`text-2xl font-bold ${valueColor}`}>{value}</h3>
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
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </Card>
  );
}



