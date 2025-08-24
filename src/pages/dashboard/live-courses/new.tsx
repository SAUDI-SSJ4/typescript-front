import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, ArrowRight, Calendar, Clock, User, Plus, Trash2, Video } from "lucide-react";
import { Routes } from "@/constants/enums";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import FormFields from "@/components/shared/formFields/form-fields";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Validation schema for the live course form (without location field)
const liveCourseSchema = z.object({
  title: z.string().min(1, { message: "عنوان الدورة مطلوب" }),
  description: z.string().min(1, { message: "وصف الدورة مطلوب" }),
  skills: z.string().min(1, { message: "المهارات المكتسبة مطلوبة" }),
  requirements: z.string().min(1, { message: "المتطلبات الأساسية مطلوبة" }),
  instructor: z.string().min(1, { message: "المدرب مطلوب" }),
  category: z.string().min(1, { message: "الفئة مطلوبة" }),
  level: z.string().min(1, { message: "مستوى الطالب مطلوب" }),
  price: z.number().min(0, { message: "السعر يجب أن يكون 0 أو أكثر" }),
  availableSeats: z.number().min(1, { message: "يجب أن يكون هناك مقعد واحد على الأقل" }),
  status: z.enum(['draft', 'published']),
  image: z.any().optional(),
  video: z.any().optional(),
  sessions: z.array(z.object({
    id: z.string(),
    name: z.string().min(1, { message: "اسم الجلسة مطلوب" }),
    date: z.string().min(1, { message: "تاريخ الجلسة مطلوب" }),
    time: z.string().min(1, { message: "وقت الجلسة مطلوب" })
  })).min(1, { message: "يجب إضافة جلسة واحدة على الأقل" })
});

type LiveCourseFormData = z.infer<typeof liveCourseSchema>;

export default function NewLiveCourse() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    getValues
  } = useForm<LiveCourseFormData>({
    resolver: zodResolver(liveCourseSchema),
    defaultValues: {
      title: "",
      description: "",
      skills: "",
      requirements: "",
      instructor: "",
      category: "",
      level: "",
      price: 0,
      availableSeats: 30,
      status: 'draft',
      sessions: [
        { id: crypto.randomUUID(), name: "", date: "", time: "" }
      ],
    }
  });

  const sessions = watch('sessions');

  const onSubmit = async (data: LiveCourseFormData, status: 'draft' | 'published' = 'published') => {
    setIsSubmitting(true);
    
    // Update status before submission
    const submissionData = { ...data, status };
    
    try {
      // TODO: استدعاء API لحفظ الدورة المباشرة عبر src/services/apiService.ts
      console.log("Live course data:", submissionData);
      await new Promise(resolve => setTimeout(resolve, 800));
      navigate(`${Routes.DASHBOARD}/courses`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addSession = () => {
    const currentSessions = getValues('sessions');
    setValue('sessions', [...currentSessions, { id: crypto.randomUUID(), name: "", date: "", time: "" }]);
  };

  const removeSession = (sessionId: string) => {
    const currentSessions = getValues('sessions');
    setValue('sessions', currentSessions.filter(session => session.id !== sessionId));
  };

  const updateSession = (sessionId: string, field: keyof typeof sessions[0], value: string) => {
    const currentSessions = getValues('sessions');
    setValue('sessions', currentSessions.map(session => 
      session.id === sessionId ? { ...session, [field]: value } : session
    ));
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={Video}
        title="إضافة دورة مباشرة جديدة"
        actions={
          <Button
            variant="outline"
            onClick={() => navigate(`${Routes.DASHBOARD}/courses`)}
            className="gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للدورات
          </Button>
        }
      />
      
      <div className="w-full">
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Basic Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">المعلومات الأساسية</h3>
            <div className="space-y-6">
              {/* Course Image and Video in same row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormFields 
                    name="image"
                    label="صورة الدورة *"
                    type="file"
                    placeholder="اختر صورة للدورة"
                    fileType="image"
                    accept="image/*"
                    maxSize={5}
                    allowedTypes={["image/jpeg", "image/png", "image/jpg", "image/webp"]}
                    control={control} 
                    errors={errors} 
                  />
                </div>
                <div>
                  <FormFields 
                    name="video"
                    label="فيديو تعريفي للدورة *"
                    type="file"
                    placeholder="اختر فيديو تعريفي للدورة"
                    fileType="video"
                    accept="video/*"
                    maxSize={100}
                    allowedTypes={["video/mp4", "video/avi", "video/mov", "video/wmv"]}
                    control={control} 
                    errors={errors} 
                  />
                </div>
              </div>

              {/* Course Title - Full Width */}
              <div>
                <FormFields 
                  name="title"
                  label="عنوان الدورة *"
                  type="text"
                  placeholder="مثال: ورشة الأمن السيبراني المباشرة"
                  control={control} 
                  errors={errors} 
                />
              </div>

              {/* Price and Available Seats in one row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormFields 
                    name="price"
                    label="السعر (ر.س) *"
                    type="number"
                    placeholder="199"
                    control={control} 
                    errors={errors} 
                  />
                </div>
                <div>
                  <FormFields 
                    name="availableSeats"
                    label="المقاعد المتاحة *"
                    type="number"
                    placeholder="30"
                    control={control} 
                    errors={errors} 
                  />
                </div>
              </div>

              {/* Category, Level, and Instructor in one row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <FormFields 
                    name="category"
                    label="الفئة *"
                    type="select"
                    placeholder="اختر فئة الدورة"
                    options={[
                      { label: "برمجة", value: "برمجة" },
                      { label: "تصميم", value: "تصميم" },
                      { label: "تسويق", value: "تسويق" },
                      { label: "أعمال", value: "أعمال" },
                      { label: "تطوير شخصي", value: "تطوير شخصي" },
                    ]}
                    control={control} 
                    errors={errors} 
                  />
                </div>
                <div>
                  <FormFields 
                    name="level"
                    label="مستوى الطالب *"
                    type="select"
                    placeholder="اختر مستوى الطالب"
                    options={[
                      { label: "مبتدئ", value: "مبتدئ" },
                      { label: "متوسط", value: "متوسط" },
                      { label: "متقدم", value: "متقدم" },
                    ]}
                    control={control} 
                    errors={errors} 
                  />
                </div>
                <div>
                  <FormFields 
                    name="instructor"
                    label="المدرب *"
                    type="select"
                    placeholder="اختر المدرب"
                    options={[
                      { label: "أحمد محمد", value: "أحمد محمد" },
                      { label: "سارة أحمد", value: "سارة أحمد" },
                      { label: "محمد علي", value: "محمد علي" },
                      { label: "د. خالد إبراهيم", value: "د. خالد إبراهيم" },
                      { label: "عمر حسن", value: "عمر حسن" },
                      { label: "ليلى كمال", value: "ليلى كمال" },
                    ]}
                    control={control} 
                    errors={errors} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content and Media */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">محتوى الدورة</h3>
            <div className="space-y-6">
              {/* Course Description */}
              <div>
                <FormFields 
                  name="description"
                  label="وصف الدورة *"
                  type="textarea"
                  placeholder="أدخل وصفاً شاملاً للدورة وما سيتعلمه الطلاب..."
                  control={control} 
                  errors={errors} 
                />
              </div>

              {/* Skills */}
              <div>
                <FormFields 
                  name="skills"
                  label="المهارات المكتسبة *"
                  type="textarea"
                  placeholder="اذكر المهارات التي سيكتسبها الطلاب من هذه الدورة..."
                  control={control} 
                  errors={errors} 
                />
              </div>

              {/* Requirements */}
              <div>
                <FormFields 
                  name="requirements"
                  label="المتطلبات الأساسية *"
                  type="textarea"
                  placeholder="اذكر المتطلبات والمعرفة المسبقة المطلوبة..."
                  control={control} 
                  errors={errors} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sessions Management - Beautiful Design */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Video className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">جلسات البث المباشر</h3>
                <p className="text-sm text-gray-500">أضف جلسات البث المباشر للدورة</p>
              </div>
            </div>
            <Button
              type="button"
              onClick={addSession}
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4" />
              إضافة جلسة جديدة
            </Button>
          </div>
          
          <div className="space-y-4">
            {sessions.map((session, index) => (
              <div key={session.id} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-5 transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium text-sm">
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-900">الجلسة {index + 1}</span>
                  </div>
                  {sessions.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSession(session.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-500" />
                      اسم الجلسة
                    </Label>
                    <Input
                      value={session.name}
                      onChange={(e) => updateSession(session.id, "name", e.target.value)}
                      placeholder="مثال: مقدمة في الأمن السيبراني"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-green-500" />
                      تاريخ الجلسة
                    </Label>
                    <Input
                      type="date"
                      value={session.date}
                      onChange={(e) => updateSession(session.id, "date", e.target.value)}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      وقت الجلسة
                    </Label>
                    <Input
                      type="time"
                      value={session.time}
                      onChange={(e) => updateSession(session.id, "time", e.target.value)}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {sessions.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Video className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">لا توجد جلسات بعد</p>
              <p className="text-sm">ابدأ بإضافة الجلسة الأولى للدورة</p>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`${Routes.DASHBOARD}/courses`)}
                className="gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                إلغاء
              </Button>
            </div>
            
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleSubmit((data) => onSubmit(data, 'draft'), (errors) => console.log('Validation errors:', errors))}
                disabled={isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {isSubmitting ? "جاري الحفظ..." : "حفظ كمسودة"}
              </Button>
              
              <Button
                type="button"
                onClick={handleSubmit((data) => onSubmit(data, 'published'), (errors) => console.log('Validation errors:', errors))}
                disabled={isSubmitting}
                className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Video className="w-4 h-4" />
                )}
                {isSubmitting ? "جاري النشر..." : "نشر الدورة"}
              </Button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}