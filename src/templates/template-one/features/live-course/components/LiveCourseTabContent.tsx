import { Star, CheckCircle, ChevronRight, Calendar, Clock, Users } from "lucide-react";

type TabId = "overview" | "sessions" | "instructor";

interface LiveCourse {
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
  deliveryType: "live-online";
  totalSeats: number;
  remainingSeats: number;
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

interface LiveCourseTabContentProps {
  courseData: LiveCourse;
  activeTab: TabId;
}

export default function LiveCourseTabContent({ courseData, activeTab }: LiveCourseTabContentProps) {
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
              "مشاريع عملية تطبيقية"
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
              <span className="text-gray-700">جهاز كمبيوتر مع اتصال إنترنت مستقر</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-4 h-4 text-blue-600 mt-1" />
              <span className="text-gray-700">الالتزام بحضور الجلسات المباشرة</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-4 h-4 text-blue-600 mt-1" />
              <span className="text-gray-700">الرغبة في التعلم والمشاركة الفعالة</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  if (activeTab === "sessions") {
    return (
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-900">جلسات الدورة</h3>
        <div className="space-y-3">
          {[
            {
              name: "الجلسة الأولى: أساسيات تطوير الويب",
              date: "2024-02-15",
              time: "19:00 - 21:00"
            },
            {
              name: "الجلسة الثانية: HTML و CSS",
              date: "2024-02-17",
              time: "19:00 - 21:00"
            },
            {
              name: "الجلسة الثالثة: JavaScript الأساسيات",
              date: "2024-02-19",
              time: "19:00 - 21:00"
            },
            {
              name: "الجلسة الرابعة: React.js مقدمة",
              date: "2024-02-22",
              time: "19:00 - 21:00"
            },
            {
              name: "الجلسة الخامسة: إدارة الحالة",
              date: "2024-02-24",
              time: "19:00 - 21:00"
            },
            {
              name: "الجلسة السادسة: التفاعل مع APIs",
              date: "2024-02-26",
              time: "19:00 - 21:00"
            },
            {
              name: "الجلسة السابعة: التوجيه والملاحة",
              date: "2024-03-01",
              time: "19:00 - 21:00"
            },
            {
              name: "الجلسة الثامنة: تخطيط المشروع",
              date: "2024-03-03",
              time: "19:00 - 21:00"
            },
            {
              name: "الجلسة التاسعة: بناء الواجهات",
              date: "2024-03-05",
              time: "19:00 - 21:00"
            },
            {
              name: "الجلسة العاشرة: ربط قاعدة البيانات",
              date: "2024-03-08",
              time: "19:00 - 21:00"
            },
            {
              name: "الجلسة الحادية عشر: الاختبار والتحسين",
              date: "2024-03-10",
              time: "19:00 - 21:00"
            },
            {
              name: "الجلسة الثانية عشر: النشر والاستضافة",
              date: "2024-03-12",
              time: "19:00 - 21:00"
            }
          ].map((session, index) => {
            const formatDate = (dateString: string) => {
              const date = new Date(dateString);
              return date.toLocaleDateString('ar-SA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
              });
            };

            return (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">{session.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(session.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{session.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (activeTab === "instructor") {
    return (
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-900">ماذا سوف تتعلم</h3>
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

  return null;
}