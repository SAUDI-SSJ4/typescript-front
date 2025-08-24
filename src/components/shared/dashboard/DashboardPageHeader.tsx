import React from "react";
import { LucideIcon } from "lucide-react";

interface DashboardPageHeaderProps {
  icon: LucideIcon;
  title: string;
  actions?: React.ReactNode;
  className?: string;
  variant?: "default" | "bordered";
}

export default function DashboardPageHeader({
  icon: Icon,
  title,
  actions,
  className = "",
  variant = "default"
}: DashboardPageHeaderProps) {
  const borderClass = variant === "bordered" ? "border border-gray-100" : "border-0";
  
  return (
    <div className={`flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm ${borderClass} ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Icon className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            {title}
          </span>
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-4">
          {actions}
        </div>
      )}
    </div>
  );
}