import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  DollarSign, 
  Star, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Download,
  Clock,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period: string;
  };
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'red' | 'indigo';
  progress?: {
    value: number;
    max: number;
    label?: string;
  };
  badge?: {
    text: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
  };
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  color, 
  progress,
  badge 
}) => {
  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-600 border-blue-200',
    green: 'bg-green-500/10 text-green-600 border-green-200',
    yellow: 'bg-yellow-500/10 text-yellow-600 border-yellow-200',
    purple: 'bg-purple-500/10 text-purple-600 border-purple-200',
    red: 'bg-red-500/10 text-red-600 border-red-200',
    indigo: 'bg-indigo-500/10 text-indigo-600 border-indigo-200',
  };

  const iconBgClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600',
    red: 'bg-red-100 text-red-600',
    indigo: 'bg-indigo-100 text-indigo-600',
  };

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105",
      colorClasses[color]
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
          {badge && (
            <Badge 
              variant={badge.variant} 
              className="ml-2 text-xs"
            >
              {badge.text}
            </Badge>
          )}
        </CardTitle>
        <div className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center",
          iconBgClasses[color]
        )}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">{value}</div>
        
        {change && (
          <div className="flex items-center text-xs text-muted-foreground">
            {change.type === 'increase' ? (
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
            )}
            <span className={cn(
              "font-medium",
              change.type === 'increase' ? 'text-green-600' : 'text-red-600'
            )}>
              {change.value > 0 ? '+' : ''}{change.value}%
            </span>
            <span className="mr-1"> من {change.period}</span>
          </div>
        )}

        {progress && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>{progress.label || 'التقدم'}</span>
              <span>{progress.value}/{progress.max}</span>
            </div>
            <Progress 
              value={(progress.value / progress.max) * 100} 
              className="h-2"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface EnhancedStatsProps {
  totalCourses: number;
  totalStudents: number;
  totalRevenue: number;
  averageRating: number;
  className?: string;
}

const EnhancedStats: React.FC<EnhancedStatsProps> = ({
  totalCourses,
  totalStudents,
  totalRevenue,
  averageRating,
  className
}) => {
  const stats: StatCardProps[] = [
    {
      title: 'إجمالي الدورات',
      value: totalCourses.toLocaleString('ar-SA'),
      change: {
        value: 12,
        type: 'increase',
        period: 'الشهر الماضي'
      },
      icon: <BookOpen className="h-4 w-4" />,
      color: 'blue',
      progress: {
        value: totalCourses,
        max: 100,
        label: 'الهدف الشهري'
      },
      badge: {
        text: 'نشط',
        variant: 'default'
      }
    },
    {
      title: 'إجمالي الطلاب',
      value: totalStudents.toLocaleString('ar-SA'),
      change: {
        value: 8,
        type: 'increase',
        period: 'الأسبوع الماضي'
      },
      icon: <Users className="h-4 w-4" />,
      color: 'green',
      progress: {
        value: totalStudents,
        max: 1000,
        label: 'الهدف السنوي'
      }
    },
    {
      title: 'إجمالي الإيرادات',
      value: `${totalRevenue.toLocaleString('ar-SA')} ر.س`,
      change: {
        value: 15,
        type: 'increase',
        period: 'الشهر الماضي'
      },
      icon: <DollarSign className="h-4 w-4" />,
      color: 'yellow',
      badge: {
        text: 'مرتفع',
        variant: 'secondary'
      }
    },
    {
      title: 'متوسط التقييم',
      value: `${averageRating.toFixed(1)} ⭐`,
      change: {
        value: 5,
        type: 'increase',
        period: 'الشهر الماضي'
      },
      icon: <Star className="h-4 w-4" />,
      color: 'purple',
      progress: {
        value: averageRating,
        max: 5,
        label: 'من 5 نجوم'
      }
    },
    {
      title: 'المشاهدات اليومية',
      value: '2,847',
      change: {
        value: 22,
        type: 'increase',
        period: 'أمس'
      },
      icon: <Eye className="h-4 w-4" />,
      color: 'indigo',
      badge: {
        text: 'جديد',
        variant: 'outline'
      }
    },
    {
      title: 'التحميلات الشهرية',
      value: '1,234',
      change: {
        value: -3,
        type: 'decrease',
        period: 'الشهر الماضي'
      },
      icon: <Download className="h-4 w-4" />,
      color: 'red',
      progress: {
        value: 1234,
        max: 2000,
        label: 'الهدف الشهري'
      }
    },
    {
      title: 'ساعات التعلم',
      value: '15,678',
      change: {
        value: 18,
        type: 'increase',
        period: 'هذا الأسبوع'
      },
      icon: <Clock className="h-4 w-4" />,
      color: 'green',
      badge: {
        text: 'ممتاز',
        variant: 'default'
      }
    },
    {
      title: 'الشهادات الممنوحة',
      value: '892',
      change: {
        value: 25,
        type: 'increase',
        period: 'الشهر الماضي'
      },
      icon: <Award className="h-4 w-4" />,
      color: 'yellow',
      progress: {
        value: 892,
        max: 1000,
        label: 'الهدف الشهري'
      }
    }
  ];

  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-4", className)}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default EnhancedStats;
export { StatCard };