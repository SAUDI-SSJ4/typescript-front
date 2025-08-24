import React from "react";
import { Eye, MessageSquare, Calendar, TrendingUp, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Blog } from "@/types/blog";

interface BlogComment {
  id: number;
  author: string;
  comment: string;
  rating: number;
  date: string;
  avatar?: string;
}

interface BlogStatistics {
  totalViews: number;
  todayViews: number;
  monthViews: number;
  yearViews: number;
  comments: BlogComment[];
}

interface BlogStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog: Blog | null;
}

// Mock data for blog statistics
const mockBlogStats: Record<number, BlogStatistics> = {
  1: {
    totalViews: 1250,
    todayViews: 45,
    monthViews: 320,
    yearViews: 1250,
    comments: [
      {
        id: 1,
        author: "أحمد محمد",
        comment: "مقالة رائعة وشاملة، استفدت منها كثيراً في فهم الذكاء الاصطناعي",
        rating: 5,
        date: "2024-08-20",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      {
        id: 2,
        author: "فاطمة علي",
        comment: "معلومات قيمة ومفيدة، أتطلع لمقالات أخرى في هذا الموضوع",
        rating: 4,
        date: "2024-08-19",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face"
      },
      {
        id: 3,
        author: "خالد السعيد",
        comment: "شرح ممتاز ومبسط، يساعد المبتدئين على فهم الموضوع",
        rating: 5,
        date: "2024-08-18"
      }
    ]
  },
  2: {
    totalViews: 890,
    todayViews: 23,
    monthViews: 210,
    yearViews: 890,
    comments: [
      {
        id: 4,
        author: "سارة أحمد",
        comment: "نصائح عملية جداً في تصميم واجهات المستخدم",
        rating: 5,
        date: "2024-08-15",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      {
        id: 5,
        author: "محمد عبدالله",
        comment: "أحب أسلوب الكتابة والأمثلة المستخدمة",
        rating: 4,
        date: "2024-08-14"
      }
    ]
  }
};

// StatCard Component for the modal
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "positive" | "negative";
}

const StatCard = ({ title, value, icon, change, changeType }: StatCardProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p
              className={`text-xs mt-1 flex items-center gap-1 ${
                changeType === "positive" ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendingUp className="w-3 h-3" />
              {change}
            </p>
          )}
        </div>
        <div className="text-blue-600">{icon}</div>
      </div>
    </div>
  );
};

function BlogStatsModal({ isOpen, onClose, blog }: BlogStatsModalProps) {
  if (!blog) return null;

  const stats = mockBlogStats[blog.id] || {
    totalViews: 0,
    todayViews: 0,
    monthViews: 0,
    yearViews: 0,
    comments: []
  };

  const avgRating = stats.comments.length > 0 
    ? stats.comments.reduce((sum, comment) => sum + comment.rating, 0) / stats.comments.length
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-right flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            إحصائيات المقالة
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              title="إجمالي المشاهدات"
              value={stats.totalViews.toLocaleString()}
              icon={<Eye className="w-5 h-5" />}
              change="+12%"
              changeType="positive"
            />
            <StatCard
              title="مشاهدات اليوم"
              value={stats.todayViews.toLocaleString()}
              icon={<Calendar className="w-5 h-5" />}
              change="+5%"
              changeType="positive"
            />
            <StatCard
              title="مشاهدات الشهر"
              value={stats.monthViews.toLocaleString()}
              icon={<Calendar className="w-5 h-5" />}
              change="+18%"
              changeType="positive"
            />
            <StatCard
              title="مشاهدات السنة"
              value={stats.yearViews.toLocaleString()}
              icon={<Calendar className="w-5 h-5" />}
              change="+25%"
              changeType="positive"
            />
            </div>

            {/* Comments Section */}
            <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                التعليقات ({stats.comments.length})
              </h4>
              {avgRating > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{avgRating.toFixed(1)}</span>
                </div>
              )}
            </div>
            
            {stats.comments.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">لا توجد تعليقات على هذه المقالة بعد</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {stats.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      {comment.avatar ? (
                        <img
                          src={comment.avatar}
                          alt={comment.author}
                          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 font-semibold text-sm">
                            {comment.author.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium text-gray-900 text-sm">
                            {comment.author}
                          </h5>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < comment.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(comment.date).toLocaleDateString("ar-SA")}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {comment.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BlogStatsModal;