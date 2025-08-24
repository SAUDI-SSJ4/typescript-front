import { Star, CheckCircle, ChevronRight, Calendar, Clock, Users, MapPin, User } from "lucide-react";

type TabId = "overview" | "curriculum" | "instructor" | "schedule" | "reviews";

interface InPersonCourse {
  id: number;
  title: string;
  rating: number;
  totalReviews?: number;
  price: number;
  duration: string;
  sessionsCount: number;
  enrolledStudents: number;
  videoUrl: string;
  description: string;
  image: string;
  instructor: {
    name: string;
    image: string;
    bio?: string;
    rating?: number;
    students?: number;
    courses?: number;
  };
  type: string;
  category: string;
  slug: string;
  insteadOf?: number;
  level: string;
  deliveryType: "in-person";
  totalSeats: number;
  remainingSeats: number;
  location: string;
  schedule: {
    startDate: string;
    startTime: string;
    endTime: string;
    days: string[];
    timezone: string;
  };
  learningPoints?: string[];
  sessions?: {
    title: string;
    sessions: number;
    duration: string;
    content: string[];
  }[];
}

interface InPersonCourseTabContentProps {
  courseData: InPersonCourse;
  activeTab: TabId;
}

export default function InPersonCourseTabContent({ courseData, activeTab }: InPersonCourseTabContentProps) {
  if (activeTab === "overview") {
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900">ماذا ستتعلم في هذه الدورة</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {(courseData.learningPoints || [
              "أساسيات المجال والمفاهيم الأساسية",
              "التطبيق العملي للمهارات المكتسبة",
              "أفضل الممارسات والأساليب المتقدمة",
              "مشاريع عملية تطبيقية",
              "التفاعل المباشر مع المدرب والزملاء",
              "التطبيق العملي في بيئة تعليمية متخصصة"
            ]).map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900">متطلبات الدورة</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <ChevronRight className="w-4 h-4 text-blue-600 mt-1" />
              <span className="text-gray-700">لا توجد متطلبات مسبقة - مناسبة للمبتدئين</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-4 h-4 text-blue-600 mt-1" />
              <span className="text-gray-700">إحضار جهاز كمبيوتر محمول للتطبيق العملي</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-4 h-4 text-blue-600 mt-1" />
              <span className="text-gray-700">الالتزام بحضور الجلسات في المواعيد المحددة</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-4 h-4 text-blue-600 mt-1" />
              <span className="text-gray-700">الرغبة في التعلم والمشاركة الفعالة</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900">معلومات إضافية</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">موقع الدورة</h4>
                <p className="text-blue-800">{courseData.location}</p>
                <p className="text-sm text-blue-700 mt-1">سيتم إرسال تفاصيل الموقع والخريطة عبر البريد الإلكتروني</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "curriculum") {
    return (
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-900">المنهج التدريبي</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "أساسيات HTML و CSS",
              description: "تعلم بناء هيكل الصفحات وتنسيقها بشكل احترافي"
            },
            {
              title: "JavaScript المتقدم",
              description: "إتقان مفاهيم جافاسكريبت المتقدمة والتفاعل مع DOM"
            },
            {
              title: "React.js و Next.js",
              description: "بناء تطبيقات ويب تفاعلية باستخدام أحدث التقنيات"
            },
            {
              title: "إدارة قواعد البيانات",
              description: "ربط التطبيق بقواعد البيانات وإدارة المعلومات"
            },
            {
              title: "النشر والاستضافة",
              description: "نشر التطبيق على منصات الاستضافة المختلفة"
            },
            {
              title: "مشروع تطبيقي شامل",
              description: "بناء مشروع متكامل يجمع كل المهارات المكتسبة"
            }
          ].map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "instructor") {
    return (
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-900">المدرب</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              <img 
                src={courseData.instructor.image || "/assets/images/default-instructor.jpg"}
                alt={courseData.instructor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{courseData.instructor.name}</h4>
              <p className="text-gray-600 mb-4">
                {courseData.instructor.bio || "مدرب خبير في مجال التطوير والبرمجة مع سنوات من الخبرة في التدريب والتعليم."}
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                {courseData.instructor.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{courseData.instructor.rating}</span>
                  </div>
                )}
                {courseData.instructor.students && (
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{courseData.instructor.students} طالب</span>
                  </div>
                )}
                {courseData.instructor.courses && (
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{courseData.instructor.courses} دورة</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "schedule") {
    return (
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-900">الجدول الزمني</h3>
        <div className="space-y-6">
          {/* Schedule Overview */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">معلومات الجدول</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <span className="text-sm text-gray-600">تاريخ البداية:</span>
                  <p className="font-medium">{courseData.schedule.startDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <span className="text-sm text-gray-600">التوقيت:</span>
                  <p className="font-medium">{courseData.schedule.startTime} - {courseData.schedule.endTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <span className="text-sm text-gray-600">أيام التدريب:</span>
                  <p className="font-medium">{courseData.schedule.days.join(", ")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <span className="text-sm text-gray-600">الموقع:</span>
                  <p className="font-medium">{courseData.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sessions Schedule */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">جلسات الدورة</h4>
            {[
              "الجلسة الأولى: أساسيات المجال",
              "الجلسة الثانية: المفاهيم المتقدمة",
              "الجلسة الثالثة: التطبيق العملي",
              "الجلسة الرابعة: مشروع تطبيقي",
              "الجلسة الخامسة: المراجعة والاختبار"
            ].slice(0, courseData.sessionsCount).map((session, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-gray-900">{session}</h5>
                  <span className="text-sm text-gray-500">الجلسة {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "reviews") {
    return (
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-900">التقييمات</h3>
        <div className="space-y-6">
          {/* Overall Rating */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{courseData.rating}</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, index) => (
                  <Star 
                    key={index} 
                    className={`w-5 h-5 ${index < Math.floor(courseData.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <p className="text-gray-600">{courseData.totalReviews || 0} تقييم</p>
            </div>
          </div>

          {/* Sample Reviews */}
          <div className="space-y-4">
            {[
              {
                name: "أحمد محمد",
                rating: 5,
                comment: "دورة ممتازة والمدرب كان شرحه واضح جداً. التطبيق العملي كان مفيد جداً.",
                avatar: "/assets/images/avatars/avatar-1.jpg"
              },
              {
                name: "فاطمة أحمد",
                rating: 5,
                comment: "استفدت كثيراً من هذه الدورة. المحتوى شامل والأسلوب رائع.",
                avatar: "/assets/images/avatars/avatar-2.jpg"
              },
              {
                name: "محمد علي",
                rating: 4,
                comment: "دورة جيدة ومفيدة. أنصح بها لكل من يريد تعلم هذا المجال.",
                avatar: "/assets/images/avatars/avatar-3.jpg"
              }
            ].map((review, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden">
                    <img 
                      src={review.avatar}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{review.name}</h5>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, starIndex) => (
                          <Star 
                            key={starIndex} 
                            className={`w-4 h-4 ${starIndex < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}