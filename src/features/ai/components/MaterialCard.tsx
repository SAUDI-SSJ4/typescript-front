import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  MessageSquare,
  Trash2,
  Clock,
  Sparkles,
  CheckCircle,
  Brain,
  Bot,
  Send,
  Calendar,
  FileText,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";

export interface LearningMaterial {
  id: string;
  title: string;
  originalFileName: string;
  fileType: 'pdf' | 'docx';
  uploadDate: string;
  processingStatus: 'processing' | 'completed' | 'failed';
  progress: number;
  summary: string;
  flashcardsCount: number;
  quizzesCount: number;
  chatMessages: number;
  thumbnail: string;
  fileSize: string;
  aiInsights: string[];
}

interface MaterialCardProps {
  material: LearningMaterial;
  onDelete: (id: string) => void;
  onSendMessage: (materialId: string, message: string) => void;
}

export function MaterialCard({ material, onDelete, onSendMessage }: MaterialCardProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'مكتمل';
      case 'processing':
        return 'قيد المعالجة';
      case 'failed':
        return 'فشل';
      default:
        return 'غير معروف';
    }
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      onSendMessage(material.id, chatMessage);
      setChatMessage("");
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg">
      {/* صورة الغلاف */}
      <div className="relative h-48 bg-gradient-to-br from-purple-100 to-blue-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* شارات الحالة */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Badge className={`${getStatusColor(material.processingStatus)} border`}>
            {getStatusLabel(material.processingStatus)}
          </Badge>
          <Badge variant="secondary" className="bg-white/90 text-gray-700">
            {material.fileType.toUpperCase()}
          </Badge>
        </div>

        {/* أيقونة نوع الملف */}
        <div className="absolute bottom-4 right-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* عنوان المادة */}
        <div className="absolute bottom-4 left-4 right-20">
          <h3 className="text-white font-bold text-lg line-clamp-2">
            {material.title}
          </h3>
        </div>
      </div>

      <CardContent className="p-6">
        {/* معلومات الملف */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FileText className="w-4 h-4" />
            <span className="font-medium">الملف:</span>
            <span className="flex-1 truncate">{material.originalFileName}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{material.uploadDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{material.fileSize}</span>
            </div>
          </div>
        </div>

        {/* حالة المعالجة */}
        {material.processingStatus === 'processing' && (
          <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="font-medium text-blue-900">معالجة المحتوى بالذكاء الاصطناعي...</span>
              <span className="text-blue-700 font-bold">{Math.round(material.progress)}%</span>
            </div>
            <Progress value={material.progress} className="h-2 bg-blue-100" />
          </div>
        )}

        {/* المحتوى المكتمل */}
        {material.processingStatus === 'completed' && (
          <>
            {/* الملخص */}
            <div className="mb-4">
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                {material.summary}
              </p>
            </div>

            {/* الإحصائيات */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl text-center border border-blue-200">
                <Sparkles className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-blue-900">{material.flashcardsCount}</div>
                <div className="text-xs text-blue-700 font-medium">بطاقة تفاعلية</div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl text-center border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-green-900">{material.quizzesCount}</div>
                <div className="text-xs text-green-700 font-medium">اختبار ذكي</div>
              </div>
            </div>

            {/* التحليل الذكي */}
            {material.aiInsights.length > 0 && (
              <div className="mb-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
                <h4 className="text-sm font-bold text-purple-900 mb-3 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  تحليل ذكي
                </h4>
                <div className="space-y-2">
                  {material.aiInsights.slice(0, 2).map((insight, index) => (
                    <div key={index} className="text-xs bg-white/50 text-purple-800 px-3 py-2 rounded-lg font-medium">
                      • {insight}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* الأزرار */}
        <div className="flex items-center gap-3">
          {material.processingStatus === 'completed' ? (
            <>
              <Link to={`/dashboard/ai-learning-materials/${material.id}/study`} className="flex-1">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg">
                  <BookOpen className="w-4 h-4 mr-2" />
                  بدء الدراسة
                </Button>
              </Link>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setChatOpen(!chatOpen)}
                className={`border-purple-200 hover:bg-purple-50 ${chatOpen ? 'bg-purple-50 text-purple-700' : ''}`}
              >
                <MessageSquare className="w-4 h-4" />
              </Button>
            </>
          ) : material.processingStatus === 'processing' ? (
            <Button disabled className="w-full bg-gray-100 text-gray-500">
              <Clock className="w-4 h-4 mr-2" />
              معالجة جارية...
            </Button>
          ) : (
            <Button disabled variant="destructive" className="w-full">
              فشل في المعالجة
            </Button>
          )}
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDelete(material.id)}
            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* واجهة الدردشة */}
        {chatOpen && material.processingStatus === 'completed' && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-600" />
              اسأل المساعد الذكي
            </h4>
            <div className="flex gap-3">
              <Input
                placeholder="اسأل أي سؤال عن هذه المادة..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 border-gray-300 focus:border-purple-500"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!chatMessage.trim()}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            {material.chatMessages > 0 && (
              <div className="mt-3 text-xs text-gray-500 flex items-center gap-2">
                <Eye className="w-3 h-3" />
                {material.chatMessages} رسالة سابقة
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
