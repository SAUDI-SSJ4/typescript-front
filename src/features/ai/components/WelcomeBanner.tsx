import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Sparkles,
  Brain,
  Zap,
  BookOpen,
  MessageSquare,
  CheckCircle,
  ArrowRight
} from "lucide-react";

interface WelcomeBannerProps {
  onDismiss: () => void;
}

export function WelcomeBanner({ onDismiss }: WelcomeBannerProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "مرحباً بك في المواد التعليمية الذكية",
      description: "استخدم قوة الذكاء الاصطناعي لتحويل ملفاتك إلى تجربة تعليمية تفاعلية",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "رفع الملفات والمعالجة التلقائية",
      description: "ارفع ملفات PDF أو Word وسيقوم الذكاء الاصطناعي بتحليلها وإنشاء محتوى تفاعلي",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "بطاقات ذكية واختبارات مخصصة",
      description: "احصل على بطاقات تعليمية واختبارات تم إنشاؤها تلقائياً من محتوى ملفاتك",
      gradient: "from-cyan-500 to-green-500"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "مساعد ذكي للأسئلة",
      description: "اسأل أي سؤال عن محتوى مادتك واحصل على إجابات فورية ودقيقة",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const currentStepData = steps[currentStep];

  return (
    <Card className="relative overflow-hidden border-0 shadow-xl">
      <div className={`absolute inset-0 bg-gradient-to-r ${currentStepData.gradient} opacity-10`}></div>
      
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 bg-gradient-to-r ${currentStepData.gradient} rounded-xl flex items-center justify-center text-white shadow-lg`}>
              {currentStepData.icon}
            </div>
            <div>
              <Badge className={`bg-gradient-to-r ${currentStepData.gradient} text-white border-0 mb-2`}>
                <Zap className="w-3 h-3 mr-1" />
                جديد
              </Badge>
              <h3 className="text-lg font-bold text-gray-900">
                {currentStepData.title}
              </h3>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">
          {currentStepData.description}
        </p>

        <div className="flex items-center justify-between">
          {/* مؤشر الخطوات */}
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? `bg-gradient-to-r ${currentStepData.gradient}`
                    : index < currentStep
                    ? "bg-gray-400"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* أزرار التنقل */}
          <div className="flex gap-3">
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className={`bg-gradient-to-r ${currentStepData.gradient} hover:opacity-90 shadow-lg`}
              >
                التالي
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={onDismiss}
                className={`bg-gradient-to-r ${currentStepData.gradient} hover:opacity-90 shadow-lg`}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                فهمت، ابدأ الآن!
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
