import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  Users, 
  Clock, 
  Play, 
  Heart, 
  Share2, 
  BookOpen,
  Award,
  TrendingUp,
  Eye,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  instructor: {
    name: string;
    avatar?: string;
    title?: string;
  };
  isNew?: boolean;
  isBestseller?: boolean;
  isFree?: boolean;
  hasDiscount?: boolean;
  completionRate?: number;
  lastUpdated?: string;
  language?: string;
  certificateIncluded?: boolean;
}

interface EnhancedCourseCardProps {
  course: Course;
  variant?: 'default' | 'compact' | 'detailed';
  showActions?: boolean;
  onEnroll?: (courseId: string) => void;
  onAddToWishlist?: (courseId: string) => void;
  onShare?: (courseId: string) => void;
  onPreview?: (courseId: string) => void;
  className?: string;
}

const EnhancedCourseCard: React.FC<EnhancedCourseCardProps> = ({
  course,
  variant = 'default',
  showActions = true,
  onEnroll,
  onAddToWishlist,
  onShare,
  onPreview,
  className
}) => {
  const levelColors = {
    beginner: 'bg-green-100 text-green-800 border-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    advanced: 'bg-red-100 text-red-800 border-red-200'
  };

  const levelLabels = {
    beginner: 'مبتدئ',
    intermediate: 'متوسط',
    advanced: 'متقدم'
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "h-3 w-3",
          i < Math.floor(rating) 
            ? "fill-yellow-400 text-yellow-400" 
            : "text-gray-300"
        )}
      />
    ));
  };

  const formatPrice = (price: number) => {
    return price === 0 ? 'مجاني' : `${price.toLocaleString('ar-SA')} ر.س`;
  };

  const getDiscountPercentage = () => {
    if (!course.originalPrice || !course.hasDiscount) return 0;
    return Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
  };

  if (variant === 'compact') {
    return (
      <Card className={cn(
        "group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-sm",
        className
      )}>
        <div className="flex gap-4 p-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover rounded-lg"
            />
            {course.isFree && (
              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1 py-0">
                مجاني
              </Badge>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm line-clamp-2 mb-1">{course.title}</h3>
            <p className="text-xs text-muted-foreground mb-2">{course.instructor.name}</p>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                {renderStars(course.rating)}
                <span>({course.reviewsCount})</span>
              </div>
              <span>•</span>
              <span>{course.studentsCount.toLocaleString('ar-SA')} طالب</span>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1">
                {course.hasDiscount && course.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(course.originalPrice)}
                  </span>
                )}
                <span className="font-bold text-sm">{formatPrice(course.price)}</span>
              </div>
              
              <Badge variant="outline" className={levelColors[course.level]}>
                {levelLabels[course.level]}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md overflow-hidden",
      className
    )}>
      {/* Image Section */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {course.isNew && (
            <Badge className="bg-blue-500 text-white">
              جديد
            </Badge>
          )}
          {course.isBestseller && (
            <Badge className="bg-orange-500 text-white">
              الأكثر مبيعاً
            </Badge>
          )}
          {course.isFree && (
            <Badge className="bg-green-500 text-white">
              مجاني
            </Badge>
          )}
          {course.hasDiscount && (
            <Badge className="bg-red-500 text-white">
              خصم {getDiscountPercentage()}%
            </Badge>
          )}
        </div>

        {/* Action Buttons Overlay */}
        {showActions && (
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                onAddToWishlist?.(course.id);
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                onShare?.(course.id);
              }}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Preview Button */}
        {onPreview && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
            <Button
              size="sm"
              className="bg-white text-black hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                onPreview(course.id);
              }}
            >
              <Play className="h-4 w-4 mr-2" />
              معاينة
            </Button>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Category and Level */}
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {course.category}
          </Badge>
          <Badge variant="outline" className={cn("text-xs", levelColors[course.level])}>
            {levelLabels[course.level]}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {course.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-3">
          {course.instructor.avatar && (
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <Image
                src={course.instructor.avatar}
                alt={course.instructor.name}
                width={24}
                height={24}
                className="object-cover"
              />
            </div>
          )}
          <div>
            <p className="text-sm font-medium">{course.instructor.name}</p>
            {course.instructor.title && (
              <p className="text-xs text-muted-foreground">{course.instructor.title}</p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            {renderStars(course.rating)}
            <span className="font-medium">{course.rating}</span>
            <span>({course.reviewsCount.toLocaleString('ar-SA')})</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{course.studentsCount.toLocaleString('ar-SA')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Additional Features */}
        {variant === 'detailed' && (
          <div className="flex flex-wrap gap-2 mb-3">
            {course.certificateIncluded && (
              <div className="flex items-center gap-1 text-xs text-green-600">
                <Award className="h-3 w-3" />
                <span>شهادة معتمدة</span>
              </div>
            )}
            {course.completionRate && (
              <div className="flex items-center gap-1 text-xs text-blue-600">
                <TrendingUp className="h-3 w-3" />
                <span>{course.completionRate}% معدل الإكمال</span>
              </div>
            )}
            {course.language && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>🌐 {course.language}</span>
              </div>
            )}
          </div>
        )}

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {course.hasDiscount && course.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(course.originalPrice)}
              </span>
            )}
            <span className="text-lg font-bold text-blue-600">
              {formatPrice(course.price)}
            </span>
          </div>
          
          {showActions && onEnroll && (
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEnroll(course.id);
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {course.isFree ? 'التسجيل المجاني' : 'اشترك الآن'}
            </Button>
          )}
        </div>

        {/* Last Updated */}
        {course.lastUpdated && (
          <p className="text-xs text-muted-foreground mt-2">
            آخر تحديث: {course.lastUpdated}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedCourseCard;