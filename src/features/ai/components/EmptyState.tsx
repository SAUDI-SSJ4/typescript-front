import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Upload,
  FileText,
  Sparkles,
  Zap,
  BookOpen,
  MessageSquare
} from "lucide-react";

interface EmptyStateProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EmptyState({ onFileUpload }: EmptyStateProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-12 text-center">
        {/* أيقونة رئيسية */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-12 h-12 text-purple-600" />
          </div>
          <div className="absolute -top-2 -right-8 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-yellow-600" />
          </div>
          <div className="absolute -bottom-2 -left-8 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-blue-600" />
          </div>
        </div>

        {/* العنوان والوصف */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          ابدأ رحلتك التعليمية الذكية
        </h3>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          ارفع أول ملف PDF أو Word لتحويله إلى مادة تعليمية تفاعلية مع بطاقات ذكية واختبارات مخصصة بواسطة الذكاء الاصطناعي
        </p>

        {/* الميزات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <FileText className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">تحليل ذكي</h4>
            <p className="text-sm text-gray-600">
              استخراج المفاهيم الرئيسية والملخصات التلقائية
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">بطاقات تفاعلية</h4>
            <p className="text-sm text-gray-600">
              إنشاء بطاقات دراسة ذكية لتسهيل الحفظ والمراجعة
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <MessageSquare className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">مساعد ذكي</h4>
            <p className="text-sm text-gray-600">
              اسأل أي سؤال واحصل على إجابات فورية من المحتوى
            </p>
          </div>
        </div>

        {/* زر الرفع */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileUpload}
          accept=".pdf,.docx"
          className="hidden"
        />
        
        <Button
          onClick={() => fileInputRef.current?.click()}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 px-8 py-4 text-base"
        >
          <Upload className="w-5 h-5 mr-3" />
          ارفع أول ملف وابدأ التعلم
        </Button>

        {/* معلومات الدعم */}
        <div className="mt-6 text-sm text-gray-500">
          <p>الملفات المدعومة: PDF، Word (.docx) • حد أقصى: 10 MB</p>
        </div>
      </CardContent>
    </Card>
  );
}
