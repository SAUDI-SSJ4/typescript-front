import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  Plus,
  Play,
  FileQuestion,
  Code,
  CreditCard,
  FileText,
  List,
} from "lucide-react";
import { Loader } from "@/components/shared";
import { useCreateLesson } from "../../hooks/useLessonsMutations";
import { useCreateTool } from "../../hooks/useToolMutations";

type LessonData = {
  title: string;
  type: "video" | "exam" | "tool";
  toolType?: "colored_card" | "timeline" | "text";
  content?: string;
  // questions?: any[];
  // cards?: any[];
  // definitions?: any[];
};
function AddLesson({ sectionId }: { sectionId: number }) {
  const { mutateAsync, isPending } = useCreateLesson();
  const createToolMutation = useCreateTool();
  const [step, setStep] = useState(1);
  const [lessonData, setLessonData] = useState<LessonData>({
    title: "",
    type: "video",
    content: "",
    // questions: [],
    // cards: [],
    // definitions: [],
  });

  const [isOpen, setIsOpen] = useState(false);

  const resetForm = () => {
    setStep(1);
    setLessonData({
      title: "",
      type: "video",
      content: "",
      // questions: [],
      // cards: [],
      // definitions: [],
    });
  };

  const handleClose = () => {
    if (!isPending) {
      setIsOpen(false);
      resetForm();
    }
  };

  const handleNext = () => {
    if (isPending) return; // Prevent action during pending state

    if (step === 1 && lessonData.title.trim() && lessonData.type) {
      if (lessonData.type === "tool") {
        setStep(2);
      } else {
        // للفيديو والاختبار يتم الإنشاء مباشرة
        handleSubmit();
      }
    } else if (step === 2 && lessonData.toolType) {
      // للأدوات التفاعلية يتم الإنشاء مباشرة بعد اختيار النوع
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (isPending) return; // Prevent action during pending state

    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = async () => {
    const lessonFormData = new FormData();
    lessonFormData.append("title", lessonData.title);
    lessonFormData.append("type", lessonData.type);
    try {
      const { data } = await mutateAsync({
        sectionId: String(sectionId),
        data: lessonFormData,
      });
      if (data.lesson && lessonData.type === "tool" && lessonData.toolType) {
        await createToolMutation.mutateAsync({
          lessonId: data.lesson.id,
          data: {
            tool_type: lessonData.toolType,
          },
        });
      }
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const toolTools: {
    id: LessonData["toolType"];
    name: string;
    description: string;
    icon: React.ElementType;
  }[] = [
    {
      id: "colored_card",
      name: "أداة البطاقات",
      description: "بطاقات تفاعلية للأسئلة والأجوبة",
      icon: CreditCard,
    },
    {
      id: "text",
      name: "أداة الدرس النصي",
      description: "محتوى نصي تفاعلي",
      icon: FileText,
    },
    {
      id: "timeline",
      name: "أداة التعريفات المرتبة",
      description: "قائمة تعريفات منظمة",
      icon: List,
    },
  ];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="title">اسم الدرس</Label>
              <Input
                id="title"
                value={lessonData.title}
                onChange={(e) =>
                  setLessonData({ ...lessonData, title: e.target.value })
                }
                placeholder="أدخل اسم الدرس"
                className="mt-1"
                disabled={isPending}
              />
            </div>

            <div>
              <Label>اختر نوع الدرس</Label>
              <div className="grid grid-cols-1 gap-3 mt-2">
                <Card
                  className={`p-4 cursor-pointer transition-all ${
                    lessonData.type === "video"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  } ${isPending ? "opacity-50 pointer-events-none" : ""}`}
                  onClick={() =>
                    !isPending &&
                    setLessonData({ ...lessonData, type: "video" })
                  }
                >
                  <div className="flex items-center gap-3">
                    <Play className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium">درس فيديو</h4>
                      <p className="text-sm text-gray-600">درس بصيغة فيديو</p>
                    </div>
                  </div>
                </Card>

                <Card
                  className={`p-4 cursor-pointer transition-all ${
                    lessonData.type === "exam"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  } ${isPending ? "opacity-50 pointer-events-none" : ""}`}
                  onClick={() =>
                    !isPending && setLessonData({ ...lessonData, type: "exam" })
                  }
                >
                  <div className="flex items-center gap-3">
                    <FileQuestion className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-medium">اختبار</h4>
                      <p className="text-sm text-gray-600">اختبار تقييمي</p>
                    </div>
                  </div>
                </Card>

                <Card
                  className={`p-4 cursor-pointer transition-all ${
                    lessonData.type === "tool"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  } ${isPending ? "opacity-50 pointer-events-none" : ""}`}
                  onClick={() =>
                    !isPending && setLessonData({ ...lessonData, type: "tool" })
                  }
                >
                  <div className="flex items-center gap-3">
                    <Code className="w-5 h-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium">أداة تفاعلية</h4>
                      <p className="text-sm text-gray-600">
                        أداة تفاعلية للتعلم
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {toolTools.map((tool) => (
                <Card
                  key={tool.id}
                  className={`p-4 cursor-pointer transition-all ${
                    lessonData.toolType === tool.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  } ${isPending ? "opacity-50 pointer-events-none" : ""}`}
                  onClick={() =>
                    !isPending &&
                    setLessonData({ ...lessonData, toolType: tool.id })
                  }
                >
                  <div className="flex items-center gap-3">
                    <tool.icon className="w-5 h-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium">{tool.name}</h4>
                      <p className="text-sm text-gray-600">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "إنشاء درس جديد";
      case 2:
        return "اختر نوع الأداة التفاعلية";
      default:
        return "";
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return lessonData.title.trim() !== "";
      case 2:
        return lessonData.toolType;
      default:
        return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={isPending ? undefined : setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          إضافة درس
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{getStepTitle()}</DialogTitle>
          <DialogDescription>
            {step === 1 && "أدخل اسم الدرس واختر نوعه"}
            {step === 2 && "اختر نوع الأداة التفاعلية"}
          </DialogDescription>
        </DialogHeader>

        {renderStepContent()}

        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={isPending}
              >
                السابق
              </Button>
            )}
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              إلغاء
            </Button>
          </div>
          <div>
            {step === 1 &&
            (lessonData.type === "video" || lessonData.type === "exam") ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed() || isPending}
              >
                إنشاء الدرس
                {isPending && <Loader />}
              </Button>
            ) : step === 1 && lessonData.type === "tool" ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed() || isPending}
              >
                التالي
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceed() || isPending}
              >
                إنشاء الدرس
                {isPending && <Loader />}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddLesson;
