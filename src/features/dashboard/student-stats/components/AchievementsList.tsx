import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Star, Target } from "lucide-react";
import type { Achievement } from "@/types/student-stats";

interface AchievementsListProps {
  achievements: Achievement[];
}

const achievementIcons: Record<string, any> = {
  trophy: Trophy,
  award: Award,
  star: Star,
  target: Target,
};

export function AchievementsList({ achievements }: AchievementsListProps) {
  const getAchievementIcon = (iconName: string) => {
    const IconComponent = achievementIcons[iconName] || Trophy;
    return IconComponent;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  if (achievements.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">الإنجازات</h3>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">لا توجد إنجازات بعد</p>
          <p className="text-sm text-gray-400 mt-1">
            استمر في التعلم لكسب إنجازات جديدة!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">الإنجازات</h3>
        <Badge variant="secondary" className="bg-amber-100 text-amber-800">
          {achievements.length} إنجاز
        </Badge>
      </div>
      
      <div className="space-y-4">
        {achievements.map((achievement) => {
          const IconComponent = getAchievementIcon(achievement.icon);
          
          return (
            <div
              key={achievement.id}
              className="flex items-start gap-4 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-200 hover:border-amber-300 transition-colors"
            >
              <div className="p-2 bg-amber-100 rounded-lg">
                <IconComponent className="w-5 h-5 text-amber-600" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 mb-1">
                  {achievement.title}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {achievement.description}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">
                    {formatDate(achievement.earned_at)}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}



