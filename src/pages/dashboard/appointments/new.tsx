import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, FileText, AlertCircle } from "lucide-react";
import { Routes, Pages } from "@/constants/enums";
import type { AppointmentFormData } from "@/types/session";

// Sample sessions data - في التطبيق الحقيقي سيتم جلب البيانات من API
const sampleSessions = [
  { id: 1, title: "دورة البرمجة الأساسية", type: "فردية", duration: 90 },
  { id: 2, title: "ورشة التصميم الجرافيكي", type: "جماعية", duration: 120 },
  { id: 3, title: "جلسة التسويق الرقمي", type: "ورشة عمل", duration: 60 },
  { id: 4, title: "دورة إدارة المشاريع", type: "فردية", duration: 75 },
  { id: 5, title: "ورشة الذكاء الاصطناعي", type: "جماعية", duration: 150 }
];

function NewAppointment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AppointmentFormData>({
    sessionId: 0,
    date: "",
    startTime: "",
    endTime: "",
    notes: ""
  });
  const [errors, setErrors] = useState<Partial<AppointmentFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedSession = sampleSessions.find(session => session.id === formData.sessionId);

  const handleInputChange = (field: keyof AppointmentFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const calculateEndTime = (startTime: string, duration: number) => {
    if (!startTime || !duration) return "";
    
    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);
    
    const endDate = new Date(startDate.getTime() + duration * 60000);
    return endDate.toTimeString().slice(0, 5);
  };

  const handleSessionChange = (sessionId: string) => {
    const id = parseInt(sessionId);
    const session = sampleSessions.find(s => s.id === id);
    
    setFormData(prev => ({
      ...prev,
      sessionId: id,
      endTime: session && prev.startTime ? calculateEndTime(prev.startTime, session.duration) : prev.endTime
    }));
  };

  const handleStartTimeChange = (startTime: string) => {
    setFormData(prev => ({
      ...prev,
      startTime,
      endTime: selectedSession ? calculateEndTime(startTime, selectedSession.duration) : prev.endTime
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<AppointmentFormData> = {};

    if (!formData.sessionId) {
      newErrors.sessionId = 0;
    }
    if (!formData.date) {
      newErrors.date = "التاريخ مطلوب";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "لا يمكن اختيار تاريخ في الماضي";
      }
    }
    if (!formData.startTime) {
      newErrors.startTime = "وقت البداية مطلوب";
    }
    if (!formData.endTime) {
      newErrors.endTime = "وقت النهاية مطلوب";
    }
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = "وقت النهاية يجب أن يكون بعد وقت البداية";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // هنا سيتم إرسال البيانات إلى API
      console.log("إضافة موعد جديد:", formData);
      
      // محاكاة تأخير API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // التوجه إلى صفحة المواعيد
      navigate(`${Routes.DASHBOARD}/${Pages.APPOINTMENTS}`);
    } catch (error) {
      console.error("خطأ في إضافة الموعد:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate(`${Routes.DASHBOARD}/${Pages.APPOINTMENTS}`)}
          className="flex items-center gap-2"
        >
          <ArrowRight className="h-4 w-4" />
          العودة للمواعيد
        </Button>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 font-noto">
          <Calendar className="h-6 w-6" />
          إضافة موعد جديد
        </h1>
        <p className="text-gray-600 mt-1 font-noto">
          أضف موعد جديد لإحدى الجلسات المتاحة
        </p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-noto">
            <FileText className="h-5 w-5" />
            تفاصيل الموعد
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Session Selection */}
            <div className="space-y-2">
              <Label htmlFor="session" className="font-noto">الجلسة *</Label>
              <Select
                value={formData.sessionId.toString()}
                onValueChange={handleSessionChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الجلسة" />
                </SelectTrigger>
                <SelectContent>
                  {sampleSessions.map((session) => (
                    <SelectItem key={session.id} value={session.id.toString()}>
                      <div className="flex flex-col">
                        <span>{session.title}</span>
                        <span className="text-sm text-gray-500">
                          {session.type} - {session.duration} دقيقة
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.sessionId && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  يجب اختيار جلسة
                </p>
              )}
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="font-noto">التاريخ *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.date && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.date}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="startTime" className="font-noto">وقت البداية *</Label>
                <div className="relative">
                  <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => handleStartTimeChange(e.target.value)}
                    className="pr-10"
                  />
                </div>
                {errors.startTime && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.startTime}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime" className="font-noto">وقت النهاية *</Label>
                <div className="relative">
                  <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange("endTime", e.target.value)}
                    className="pr-10"
                    readOnly={!!selectedSession}
                  />
                </div>
                {errors.endTime && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.endTime}
                  </p>
                )}
                {selectedSession && (
                  <p className="text-sm text-gray-500">
                    يتم حساب وقت النهاية تلقائياً ({selectedSession.duration} دقيقة)
                  </p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="font-noto">ملاحظات</Label>
              <Textarea
                id="notes"
                placeholder="أضف أي ملاحظات إضافية للموعد..."
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={3}
              />
            </div>

            {/* Session Info Display */}
            {selectedSession && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">معلومات الجلسة المختارة:</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-blue-700 font-medium">العنوان:</span>
                    <span className="text-blue-600 mr-2">{selectedSession.title}</span>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">النوع:</span>
                    <span className="text-blue-600 mr-2">{selectedSession.type}</span>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">المدة:</span>
                    <span className="text-blue-600 mr-2">{selectedSession.duration} دقيقة</span>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? "جاري الحفظ..." : "حفظ الموعد"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`${Routes.DASHBOARD}/${Pages.APPOINTMENTS}`)}
                disabled={isSubmitting}
              >
                إلغاء
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewAppointment;
