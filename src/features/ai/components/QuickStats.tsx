import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Clock, 
  Target,
  Zap 
} from "lucide-react";
import type { LearningMaterial } from "./MaterialCard";

interface QuickStatsProps {
  materials: LearningMaterial[];
}

export function QuickStats({ materials }: QuickStatsProps) {
  const completedToday = materials.filter(m => 
    m.processingStatus === 'completed' && 
    m.uploadDate === new Date().toISOString().split('T')[0]
  ).length;

  const processingCount = materials.filter(m => m.processingStatus === 'processing').length;
  
  const avgProcessingTime = "~3 دقائق"; // يمكن حسابها من البيانات الفعلية
  
  const totalInsights = materials.reduce((sum, m) => sum + m.aiInsights.length, 0);

  const stats = [
    {
      label: "مكتملة اليوم",
      value: completedToday,
      icon: <TrendingUp className="w-4 h-4" />,
      color: "text-green-600 bg-green-50"
    },
    {
      label: "قيد المعالجة", 
      value: processingCount,
      icon: <Clock className="w-4 h-4" />,
      color: "text-blue-600 bg-blue-50"
    },
    {
      label: "متوسط الوقت",
      value: avgProcessingTime,
      icon: <Target className="w-4 h-4" />,
      color: "text-purple-600 bg-purple-50"
    },
    {
      label: "إجمالي الرؤى",
      value: totalInsights,
      icon: <Zap className="w-4 h-4" />,
      color: "text-orange-600 bg-orange-50"
    }
  ];

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-600">إحصائيات سريعة</h3>
          <Badge variant="outline" className="text-xs">
            آخر تحديث: الآن
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                {stat.icon}
              </div>
              <div className="text-lg font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
