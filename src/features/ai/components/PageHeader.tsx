import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Sparkles,
  Upload,
  Loader2,
  Plus,
  Zap,
  Stars
} from "lucide-react";
import { Link } from "react-router-dom";

interface PageHeaderProps {
  isUploading: boolean;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PageHeader({ isUploading, onFileUpload }: PageHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative overflow-hidden">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 opacity-5">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* العنوان والوصف */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Zap className="w-3 h-3 text-yellow-900" />
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-gray-900">
                    المواد التعليمية الذكية
                  </h1>
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-lg">
                    <Stars className="w-3 h-3 mr-1" />
                    AI Powered
                  </Badge>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                  ارفع ملفاتك واتركها للذكاء الاصطناعي ليحولها إلى تجربة تعليمية تفاعلية مع بطاقات ذكية واختبارات مخصصة
                </p>
              </div>
            </div>
          </div>

          {/* الأزرار */}
          <div className="flex flex-col sm:flex-row gap-3 lg:shrink-0">
            <input
              type="file"
              ref={fileInputRef}
              onChange={onFileUpload}
              accept=".pdf,.docx"
              className="hidden"
            />
            
            <Link to="/dashboard/ai-learning-materials/add">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5 mr-2" />
                إضافة مادة جديدة
              </Button>
            </Link>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full sm:w-auto border-gray-300 hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  جاري الرفع...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  رفع ملف سريع
                </>
              )}
            </Button>
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <p className="text-sm text-gray-700 font-medium">
              يدعم ملفات PDF و Word • معالجة فورية بالذكاء الاصطناعي • إنشاء تلقائي للبطاقات والاختبارات
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
