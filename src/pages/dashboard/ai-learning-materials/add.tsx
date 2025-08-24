import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Brain, 
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  User,
  GraduationCap,
  BookOpen,
  Sparkles,
  School,
  Edit,
  Save,
  X,
  Plus,
  Eye,
  Trash2,
  List
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Lesson {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  uploadedFile: File | null;
  fileName: string;
  fileSize: string;
  fileType: string;
  uploadDate: string;
  status: 'pending' | 'uploaded' | 'processing' | 'completed';
}

interface MaterialData {
  // معلومات المادة التعليمية
  materialName: string;
  materialDescription: string;
  universityName: string;
  studentName: string;
  
  // الدروس
  lessons: Lesson[];
}

const initialData: MaterialData = {
  materialName: "",
  materialDescription: "",
  universityName: "",
  studentName: "",
  lessons: []
};

const createNewLesson = (): Lesson => ({
  id: Date.now().toString(),
  title: "",
  description: "",
  objectives: [],
  uploadedFile: null,
  fileName: "",
  fileSize: "",
  fileType: "",
  uploadDate: "",
  status: 'pending'
});

const steps = [
  {
    id: 1,
    title: "معلومات المادة التعليمية",
    description: "أدخل البيانات الأساسية للمادة التعليمية",
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    id: 2,
    title: "إدارة الدروس",
    description: "أضف وأدر دروس المادة التعليمية",
    icon: <List className="w-5 h-5" />
  },
  {
    id: 3,
    title: "المراجعة والحفظ",
    description: "راجع جميع البيانات واحفظ المادة التعليمية",
    icon: <Save className="w-5 h-5" />
  }
];

export default function AddAILearningMaterial() {
  const [currentStep, setCurrentStep] = useState(1);
  const [materialData, setMaterialData] = useState<MaterialData>(initialData);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [newObjective, setNewObjective] = useState("");
  const [activeTab, setActiveTab] = useState<'add' | 'view'>('add');

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: keyof MaterialData, value: string) => {
    setMaterialData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLessonChange = (field: keyof Lesson, value: string) => {
    if (currentLesson) {
      setCurrentLesson(prev => prev ? ({
        ...prev,
        [field]: value
      }) : null);
    }
  };

  const addNewLesson = () => {
    const newLesson = createNewLesson();
    setCurrentLesson(newLesson);
    setActiveTab('add');
    setNewObjective("");
  };

  const saveLesson = () => {
    if (currentLesson && currentLesson.title && currentLesson.description && currentLesson.objectives.length > 0) {
      const existingIndex = materialData.lessons.findIndex(l => l.id === currentLesson.id);
      
      if (existingIndex >= 0) {
        // تحديث درس موجود
        setMaterialData(prev => ({
          ...prev,
          lessons: prev.lessons.map(l => l.id === currentLesson.id ? currentLesson : l)
        }));
      } else {
        // إضافة درس جديد
        setMaterialData(prev => ({
          ...prev,
          lessons: [...prev.lessons, currentLesson]
        }));
      }
      
      setCurrentLesson(null);
      setActiveTab('view');
    }
  };

  const editLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setActiveTab('add');
  };

  const deleteLesson = (lessonId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الدرس؟')) {
      setMaterialData(prev => ({
        ...prev,
        lessons: prev.lessons.filter(l => l.id !== lessonId)
      }));
      if (currentLesson?.id === lessonId) {
        setCurrentLesson(null);
        setActiveTab('view');
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && currentLesson) {
      setCurrentLesson(prev => prev ? ({
        ...prev,
        uploadedFile: file,
        fileName: file.name,
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        fileType: file.type.includes('pdf') ? 'PDF' : 'Word',
        uploadDate: new Date().toLocaleDateString('ar'),
        status: 'uploaded'
      }) : null);
    }
  };

  const addObjective = () => {
    if (newObjective.trim() && currentLesson) {
      setCurrentLesson(prev => prev ? ({
        ...prev,
        objectives: [...prev.objectives, newObjective.trim()]
      }) : null);
      setNewObjective("");
    }
  };

  const removeObjective = (index: number) => {
    if (currentLesson) {
      setCurrentLesson(prev => prev ? ({
        ...prev,
        objectives: prev.objectives.filter((_, i) => i !== index)
      }) : null);
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    // محاكاة معالجة البيانات
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    // إعادة توجيه للصفحة الرئيسية
    window.location.href = '/dashboard/ai-learning-materials';
  };

  const canProceedToNext = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!(materialData.materialName && materialData.materialDescription && 
               materialData.universityName && materialData.studentName);
      case 2:
        return materialData.lessons.length > 0 && materialData.lessons.every(l => l.status === 'uploaded');
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/ai-learning-materials">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              العودة
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">إضافة مادة تعليمية ذكية جديدة</h1>
            <p className="text-gray-600 mt-1">أضف مادة تعليمية جديدة ودع الذكاء الاصطناعي يحولها إلى محتوى تفاعلي</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-blue-600" />
          <Badge className="bg-blue-100 text-blue-700">AI مدعوم بـ</Badge>
        </div>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all",
                    currentStep === step.id 
                      ? "bg-blue-600 border-blue-600 text-white" 
                      : currentStep > step.id 
                        ? "bg-green-600 border-green-600 text-white"
                        : "bg-gray-100 border-gray-300 text-gray-400"
                  )}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={cn(
                      "text-sm font-medium",
                      currentStep >= step.id ? "text-gray-900" : "text-gray-400"
                    )}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500 max-w-[120px]">
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "flex-1 h-0.5 mx-4 -mt-6",
                    currentStep > step.id ? "bg-green-600" : "bg-gray-300"
                  )} />
                )}
              </div>
            ))}
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="h-2" />
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {steps[currentStep - 1].icon}
            {steps[currentStep - 1].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: معلومات المادة التعليمية */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    اسم المادة التعليمية *
                  </label>
                  <Input
                    placeholder="مثال: أساسيات البرمجة"
                    value={materialData.materialName}
                    onChange={(e) => handleInputChange('materialName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <School className="w-4 h-4" />
                    اسم الجامعة *
                  </label>
                  <Input
                    placeholder="مثال: جامعة الملك سعود"
                    value={materialData.universityName}
                    onChange={(e) => handleInputChange('universityName', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  اسم الطالب *
                </label>
                <Input
                  placeholder="مثال: أحمد محمد العلي"
                  value={materialData.studentName}
                  onChange={(e) => handleInputChange('studentName', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  وصف المادة التعليمية *
                </label>
                <Textarea
                  placeholder="اكتب وصفاً مختصراً عن المادة التعليمية وأهدافها..."
                  rows={4}
                  value={materialData.materialDescription}
                  onChange={(e) => handleInputChange('materialDescription', e.target.value)}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">نصيحة ذكية</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      كلما كانت المعلومات أكثر تفصيلاً، كان بإمكان الذكاء الاصطناعي إنشاء محتوى تعليمي أفضل وأكثر دقة.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: إدارة الدروس */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Tabs */}
              <div className="flex gap-4">
                <Button
                  variant={activeTab === 'add' ? 'default' : 'outline'}
                  onClick={() => setActiveTab('add')}
                  className="flex-1"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {currentLesson ? 'تعديل الدرس' : 'إضافة درس جديد'}
                </Button>
                <Button
                  variant={activeTab === 'view' ? 'default' : 'outline'}
                  onClick={() => setActiveTab('view')}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  استعراض الدروس ({materialData.lessons.length})
                </Button>
              </div>

              {/* Add/Edit Lesson Tab */}
              {activeTab === 'add' && (
                <div className="space-y-6">
                  {!currentLesson ? (
                    <div className="text-center py-12">
                      <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">إضافة درس جديد</h3>
                      <p className="text-gray-600 mb-4">ابدأ بإضافة درس جديد للمادة التعليمية</p>
                      <Button onClick={addNewLesson} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        إضافة درس جديد
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Lesson Basic Info */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">عنوان الدرس *</label>
                          <Input
                            placeholder="مثال: مقدمة في المتغيرات والثوابت"
                            value={currentLesson.title}
                            onChange={(e) => handleLessonChange('title', e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">وصف الدرس *</label>
                          <Textarea
                            placeholder="اكتب وصفاً تفصيلياً عن محتوى الدرس..."
                            rows={3}
                            value={currentLesson.description}
                            onChange={(e) => handleLessonChange('description', e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Learning Objectives */}
                      <div className="space-y-4">
                        <label className="text-sm font-medium text-gray-700">أهداف التعلم *</label>
                        
                        <div className="flex gap-2">
                          <Input
                            placeholder="أضف هدف تعليمي جديد..."
                            value={newObjective}
                            onChange={(e) => setNewObjective(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addObjective()}
                          />
                          <Button onClick={addObjective} disabled={!newObjective.trim()}>
                            إضافة
                          </Button>
                        </div>

                        {currentLesson.objectives.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600">الأهداف المضافة:</p>
                            {currentLesson.objectives.map((objective, index) => (
                              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                <span className="flex-1">{objective}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeObjective(index)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* File Upload */}
                      <div className="space-y-4">
                        <label className="text-sm font-medium text-gray-700">رفع ملف الدرس *</label>
                        
                        {!currentLesson.uploadedFile ? (
                          <div 
                            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                            onClick={() => document.getElementById('lesson-file-upload')?.click()}
                          >
                            <input
                              id="lesson-file-upload"
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-600 mb-2">اسحب الملف هنا أو انقر للاختيار</p>
                            <Button size="sm">
                              <Upload className="w-4 h-4 mr-2" />
                              اختيار ملف
                            </Button>
                            <p className="text-xs text-gray-500 mt-2">PDF، Word (.doc, .docx)</p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4 p-4 border border-green-200 bg-green-50 rounded-lg">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-green-900">{currentLesson.fileName}</h4>
                              <div className="flex items-center gap-4 text-sm text-green-700">
                                <span>حجم: {currentLesson.fileSize}</span>
                                <span>نوع: {currentLesson.fileType}</span>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentLesson(prev => prev ? ({
                                ...prev,
                                uploadedFile: null,
                                fileName: "",
                                fileSize: "",
                                fileType: "",
                                status: 'pending'
                              }) : null)}
                            >
                              <X className="w-4 h-4 mr-2" />
                              إزالة
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Save Lesson Button */}
                      <div className="flex gap-3">
                        <Button
                          onClick={saveLesson}
                          disabled={!currentLesson.title || !currentLesson.description || 
                                   currentLesson.objectives.length === 0 || !currentLesson.uploadedFile}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          حفظ الدرس
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setCurrentLesson(null);
                            setActiveTab('view');
                          }}
                        >
                          إلغاء
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* View Lessons Tab */}
              {activeTab === 'view' && (
                <div className="space-y-4">
                  {materialData.lessons.length === 0 ? (
                    <div className="text-center py-12">
                      <List className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد دروس</h3>
                      <p className="text-gray-600 mb-4">لم يتم إضافة أي دروس للمادة التعليمية بعد</p>
                      <Button onClick={() => setActiveTab('add')} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        إضافة أول درس
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          الدروس المضافة ({materialData.lessons.length})
                        </h3>
                        <Button onClick={addNewLesson} size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Plus className="w-4 h-4 mr-2" />
                          إضافة درس جديد
                        </Button>
                      </div>

                      <div className="grid gap-4">
                        {materialData.lessons.map((lesson, index) => (
                          <Card key={lesson.id} className="border-l-4 border-l-blue-500">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className="text-xs">
                                      الدرس {index + 1}
                                    </Badge>
                                    <Badge className={cn(
                                      "text-xs",
                                      lesson.status === 'uploaded' 
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    )}>
                                      {lesson.status === 'uploaded' ? 'جاهز' : 'غير مكتمل'}
                                    </Badge>
                                  </div>
                                  <h4 className="font-medium text-gray-900 mb-1">{lesson.title}</h4>
                                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{lesson.description}</p>
                                  <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span>{lesson.objectives.length} هدف تعليمي</span>
                                    {lesson.fileName && <span>{lesson.fileName}</span>}
                                    {lesson.fileSize && <span>{lesson.fileSize}</span>}
                                  </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => editLesson(lesson)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => deleteLesson(lesson.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">تنظيم الدروس</h4>
                    <p className="text-sm text-green-700 mt-1">
                      يمكنك إضافة عدة دروس للمادة الواحدة. كل درس يجب أن يحتوي على ملف منفصل وأهداف تعليمية واضحة.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: المراجعة والحفظ */}
          {currentStep === 3 && (
            <div className="space-y-6">
              {isProcessing ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-blue-600 animate-pulse" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    جاري المعالجة بالذكاء الاصطناعي...
                  </h3>
                  <p className="text-gray-600 mb-4">
                    يتم الآن تحليل المحتوى وإنشاء المواد التعليمية التفاعلية
                  </p>
                  <Progress value={75} className="max-w-md mx-auto" />
                </div>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">مراجعة البيانات</h3>
                  
                  <div className="grid gap-6">
                    {/* معلومات المادة */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          معلومات المادة التعليمية
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm text-gray-600">اسم المادة:</span>
                            <p className="font-medium">{materialData.materialName}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">الجامعة:</span>
                            <p className="font-medium">{materialData.universityName}</p>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">الطالب:</span>
                          <p className="font-medium">{materialData.studentName}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">الوصف:</span>
                          <p className="text-gray-800">{materialData.materialDescription}</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* الدروس */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <List className="w-4 h-4" />
                          الدروس ({materialData.lessons.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {materialData.lessons.map((lesson, index) => (
                          <div key={lesson.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-gray-900">
                                الدرس {index + 1}: {lesson.title}
                              </h4>
                              <Badge className="bg-green-100 text-green-700">
                                {lesson.status === 'uploaded' ? 'جاهز' : 'غير مكتمل'}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
                            <div className="text-xs text-gray-500 space-y-1">
                              <div>الأهداف: {lesson.objectives.length}</div>
                              <div>الملف: {lesson.fileName} ({lesson.fileSize})</div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      {!isProcessing && (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            السابق
          </Button>

          <div className="flex items-center gap-2">
            {currentStep < steps.length ? (
              <Button
                onClick={handleNext}
                disabled={!canProceedToNext()}
              >
                التالي
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceedToNext()}
                className="bg-green-600 hover:bg-green-700"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                إنشاء المادة التعليمية
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
