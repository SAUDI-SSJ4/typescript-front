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
import { ArrowRight, Calendar, Clock, DollarSign, FileText } from "lucide-react";
import { Routes, Pages } from "@/constants/enums";
import ImageUploader from "@/components/ui/ImageUploader";

interface SessionFormData {
  title: string;
  description: string;
  instructor: string;
  duration: number;
  price: number;
  date: string;
  time: string;
  image: string;
}

function NewSession() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SessionFormData>({
    title: "",
    description: "",
    instructor: "",
    duration: 60,
    price: 0,
    date: "",
    time: "",
    image: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof SessionFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // هنا يمكن إضافة منطق حفظ الجلسة
      console.log("Session data:", formData);
      
      // محاكاة API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // العودة إلى صفحة الجلسات
      navigate(`${Routes.DASHBOARD}/${Pages.SESSIONS}`);
    } catch (error) {
      console.error("Error creating session:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border-0">
        <Button
          variant="ghost"
          onClick={() => navigate(`${Routes.DASHBOARD}/${Pages.SESSIONS}`)}
          className="flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4" />
          العودة إلى الجلسات
        </Button>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base font-noto">
            إضافة جلسة جديدة
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Right Column - Basic Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="space-y-6">
              {/* Session Image */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  صورة الجلسة
                </Label>
                <ImageUploader
                  value={formData.image}
                  onChange={(val) => handleInputChange("image", val || "")}
                  placeholder="اضغط لرفع صورة الجلسة"
                  maxSizeMb={10}
                />
              </div>

              {/* Session Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  عنوان الجلسة *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="أدخل عنوان الجلسة"
                  required
                />
              </div>

              {/* Instructor */}
              <div className="space-y-2">
                <Label htmlFor="instructor" className="text-sm font-medium">
                  المدرب *
                </Label>
                <Input
                  id="instructor"
                  value={formData.instructor}
                  onChange={(e) => handleInputChange("instructor", e.target.value)}
                  placeholder="أدخل اسم المدرب"
                  required
                />
              </div>
            </div>
          </div>

          {/* Left Column - Session Details */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="space-y-4">
              <Label className="text-sm font-medium flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-600" />
                وصف الجلسة
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="أدخل وصف مفصل للجلسة"
                rows={8}
                className="min-h-[200px]"
              />
            </div>
          </div>
        </div>

        {/* Basic Information Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              المعلومات الأساسية
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                المدة (بالدقائق) *
              </Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", parseInt(e.target.value) || 0)}
                placeholder="60"
                min="15"
                max="480"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                السعر (ر.س) *
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", parseInt(e.target.value) || 0)}
                placeholder="0"
                min="0"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`${Routes.DASHBOARD}/${Pages.SESSIONS}`)}
              className="gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              إلغاء
            </Button>
            
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              {isSubmitting ? "جاري الحفظ..." : "حفظ الجلسة"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewSession;