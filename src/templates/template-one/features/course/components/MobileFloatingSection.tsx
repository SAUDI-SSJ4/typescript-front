import { useState } from "react";
<<<<<<< HEAD
import {
  ShoppingCart,
  Heart,
  Share2,
  ChevronUp,
  BookOpen,
  Play,
  Clock,
  Award,
  MessageSquare,
} from "lucide-react";
=======
import { ShoppingCart, Heart, Share2, ChevronUp, BookOpen, Play, Clock, Award, MessageSquare, Calendar, MapPin, Users } from "lucide-react";
>>>>>>> sketch
import { Button } from "@/components/ui/button";

interface Course {
  price: number;
  insteadOf?: number;
<<<<<<< HEAD
=======
  sessionsCount?: number;
  level?: string;
  deliveryType?: "live-online" | "in-person" | "recorded-online";
  location?: string;
>>>>>>> sketch
}

interface MobileFloatingSectionProps {
  courseData: Course;
}

<<<<<<< HEAD
export default function MobileFloatingSection({
  courseData,
}: MobileFloatingSectionProps) {
=======
export default function MobileFloatingSection({ courseData }: MobileFloatingSectionProps) {
>>>>>>> sketch
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="lg:hidden">
      {/* Floating Bottom Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        {/* Expandable Content */}
        {isExpanded && (
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <div className="space-y-4">
              {/* Academy Card */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src="/assets/images/logo.svg"
                      alt="أكاديمية إبداع"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
<<<<<<< HEAD
                    <h4 className="font-semibold text-gray-900 text-sm">
                      أكاديمية إبداع
                    </h4>
                    <a
                      href="/academy/ebdaa-academy"
                      className="text-xs text-blue-600 hover:underline"
                    >
=======
                    <h4 className="font-semibold text-gray-900 text-sm">أكاديمية إبداع</h4>
                    <a href="/academy/ebdaa-academy" className="text-xs text-blue-600 hover:underline">
>>>>>>> sketch
                      زيارة الأكاديمية
                    </a>
                  </div>
                </div>
              </div>

              {/* Course Features */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
<<<<<<< HEAD
                <h3 className="font-bold text-sm mb-3 text-gray-900">
                  معلومات الدورة
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: BookOpen, label: "مستوى مبتدئ" },
                    { icon: Play, label: "3 دروس تعليمية" },
                    { icon: Clock, label: "مشاهدة في أي وقت" },
                    { icon: Award, label: "شهادة حضور" },
                    { icon: MessageSquare, label: "معززة بالذكاء الاصطناعي" },
                  ].map((feature, index) => (
=======
                <h3 className="font-bold text-sm mb-3 text-gray-900">معلومات الدورة</h3>
                <div className="grid grid-cols-1 gap-2">
                  {(() => {
                    if (courseData.deliveryType === "in-person") {
                      return [
                        { icon: MapPin, label: courseData.location || "مقر الأكاديمية" },
                        { icon: Calendar, label: "تاريخ البداية: 15 فبراير 2024" },
                        { icon: Users, label: "دورة حضورية في مقر الأكاديمية" },
                        { icon: MapPin, label: "8 مقعد متبقي" },
                        { icon: BookOpen, label: `مستوى ${courseData.level || 'متقدم'}` },
                        { icon: Calendar, label: `${courseData.sessionsCount || 12} جلسة تدريبية` },
                        { icon: Clock, label: "حضور مباشر مع التفاعل الكامل" },
                        { icon: Award, label: "شهادة حضور معتمدة" }
                      ];
                    } else {
                      // Live online course features
                      return [
                        { icon: Calendar, label: "تاريخ البداية: 15 فبراير 2024" },
                        { icon: Play, label: "مادة تعليمية مباشرة أون لاين" },
                        { icon: MapPin, label: "8 مقعد متبقي" },
                        { icon: BookOpen, label: `مستوى ${courseData.level || 'متقدم'}` },
                        { icon: Calendar, label: `${courseData.sessionsCount || 12} جلسة مباشرة` },
                        { icon: Clock, label: "تسجل لاحقا ويمكنك متابعتها في اي وقت" },
                        { icon: Award, label: "شهادة حضور" },
                        { icon: MessageSquare, label: "معززة بالذكاء الاصطناعي" }
                      ];
                    }
                  })().map((feature, index) => (
>>>>>>> sketch
                    <div key={index} className="flex items-center gap-2">
                      <div className="p-1 bg-blue-50 rounded">
                        <feature.icon className="w-3 h-3 text-blue-600" />
                      </div>
<<<<<<< HEAD
                      <span className="text-xs text-gray-700">
                        {feature.label}
                      </span>
=======
                      <span className="text-xs text-gray-700">{feature.label}</span>
>>>>>>> sketch
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Floating Bar */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            {/* Price Section */}
            <div className="flex items-center gap-2">
              {courseData.insteadOf && (
                <span className="text-sm text-gray-400 line-through">
                  {courseData.insteadOf} ريال
                </span>
              )}
              <span className="text-xl font-bold text-blue-600">
                {courseData.price} ريال
              </span>
            </div>

            {/* Actions Section */}
            <div className="flex items-center gap-2">
              {/* Subscribe Button - Main Action */}
<<<<<<< HEAD
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 px-4 py-2 text-sm font-semibold"
              >
                <ShoppingCart className="w-4 h-4 ml-1" />
                اشترك الآن
              </Button>

              {/* Favorite Button */}
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 border-gray-200 hover:bg-gray-50 flex-shrink-0 p-0"
              >
=======
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 px-4 py-2 text-sm font-semibold">
                <ShoppingCart className="w-4 h-4 ml-1" />
                احجز مقعدك الآن
              </Button>

              {/* Favorite Button */}
              <Button variant="outline" size="sm" className="h-8 w-8 border-gray-200 hover:bg-gray-50 flex-shrink-0 p-0">
>>>>>>> sketch
                <Heart className="w-4 h-4" />
              </Button>

              {/* Share Button */}
<<<<<<< HEAD
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 border-gray-200 hover:bg-gray-50 flex-shrink-0 p-0"
              >
=======
              <Button variant="outline" size="sm" className="h-8 w-8 border-gray-200 hover:bg-gray-50 flex-shrink-0 p-0">
>>>>>>> sketch
                <Share2 className="w-4 h-4" />
              </Button>

              {/* Toggle Button */}
<<<<<<< HEAD
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-8 w-8 border-gray-200 hover:bg-gray-50 flex-shrink-0 p-0"
              >
                <ChevronUp
                  className={`w-4 h-4 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
=======
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-8 w-8 border-gray-200 hover:bg-gray-50 flex-shrink-0 p-0"
              >
                <ChevronUp className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
>>>>>>> sketch
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from being hidden behind the floating section */}
      <div className="h-20"></div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> sketch
