import React, { useState, useCallback, useRef } from "react";
import { X, Save, RefreshCw, Move, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface FieldPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  font_size: number;
  font_weight?: string;
  text_align?: string;
  color?: string;
  font_family?: string;
}

interface CertificateFieldPositions {
  student_name: FieldPosition;
  course_title: FieldPosition;
  academy_name: FieldPosition;
  completion_date: FieldPosition;
  issue_date: FieldPosition;
  certificate_number: FieldPosition;
}

interface TemplateCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  courseTitle: string;
  currentTemplate?: any;
  onSave: (templateData: any) => void;
}

const FIELD_LABELS = {
  student_name: "اسم الطالب",
  course_title: "عنوان الدورة", 
  academy_name: "اسم الأكاديمية",
  completion_date: "تاريخ الإكمال",
  issue_date: "تاريخ الإصدار",
  certificate_number: "رقم الشهادة"
};

const DEFAULT_POSITIONS: CertificateFieldPositions = {
  student_name: { x: 400, y: 350, width: 400, height: 60, font_size: 32, font_weight: "bold", text_align: "center", color: "#1a472a" },
  course_title: { x: 300, y: 450, width: 600, height: 50, font_size: 24, text_align: "center", color: "#2d5aa0" },
  academy_name: { x: 100, y: 100, width: 350, height: 40, font_size: 20, font_weight: "bold", text_align: "left", color: "#1a472a" },
  completion_date: { x: 720, y: 580, width: 200, height: 30, font_size: 16, text_align: "center", color: "#666666" },
  issue_date: { x: 720, y: 620, width: 200, height: 30, font_size: 16, text_align: "center", color: "#666666" },
  certificate_number: { x: 100, y: 650, width: 300, height: 25, font_size: 14, text_align: "left", color: "#666666" }
};

export function TemplateCustomizer({ 
  isOpen, 
  onClose, 
  courseId, 
  courseTitle, 
  currentTemplate,
  onSave 
}: TemplateCustomizerProps) {
  const [fieldPositions, setFieldPositions] = useState<CertificateFieldPositions>(
    currentTemplate?.field_positions || DEFAULT_POSITIONS
  );
  const [selectedField, setSelectedField] = useState<keyof CertificateFieldPositions | null>(null);
  const [templateName, setTemplateName] = useState(currentTemplate?.template_name || `قالب ${courseTitle}`);
  const [backgroundImage, setBackgroundImage] = useState(currentTemplate?.background_image || "/static/certificate_templates/default_bg.jpg");
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleFieldUpdate = useCallback((field: keyof CertificateFieldPositions, updates: Partial<FieldPosition>) => {
    setFieldPositions(prev => ({
      ...prev,
      [field]: { ...prev[field], ...updates }
    }));
  }, []);

  const handleDragStart = useCallback((e: React.MouseEvent, field: keyof CertificateFieldPositions) => {
    e.preventDefault();
    setSelectedField(field);
    setIsDragging(true);
    
    const rect = e.currentTarget.getBoundingClientRect();
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (canvasRect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, []);

  const handleDragMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !selectedField || !canvasRef.current) return;
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const newX = Math.max(0, Math.min(e.clientX - canvasRect.left - dragOffset.x, canvasRect.width - fieldPositions[selectedField].width));
    const newY = Math.max(0, Math.min(e.clientY - canvasRect.top - dragOffset.y, canvasRect.height - fieldPositions[selectedField].height));
    
    // Scale from canvas to actual certificate dimensions (assuming 1200x800 certificate)
    const scaleX = 1200 / canvasRect.width;
    const scaleY = 800 / canvasRect.height;
    
    handleFieldUpdate(selectedField, {
      x: Math.round(newX * scaleX),
      y: Math.round(newY * scaleY)
    });
  }, [isDragging, selectedField, dragOffset, fieldPositions, handleFieldUpdate]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  }, []);

  const resetToDefault = () => {
    setFieldPositions(DEFAULT_POSITIONS);
    setSelectedField(null);
    toast.success("تم إعادة تعيين القالب إلى الإعدادات الافتراضية");
  };

  const handleSave = () => {
    const templateData = {
      template_name: templateName,
      course_id: courseId,
      template_type: "COURSE_SPECIFIC",
      background_image: backgroundImage,
      field_positions: fieldPositions,
      is_active: true,
      is_default: false
    };
    
    onSave(templateData);
    toast.success("تم حفظ قالب الشهادة بنجاح");
  };

  const copyFromTemplate = (_templateId: string) => {
    // TODO: Implement copy from existing template
    toast.info("ميزة النسخ من قالب آخر ستكون متاحة قريباً");
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              تخصيص قالب الشهادة - {courseTitle}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Panel */}
          <div className="lg:col-span-1 space-y-4">
            <Tabs defaultValue="fields" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="fields">العناصر</TabsTrigger>
                <TabsTrigger value="design">التصميم</TabsTrigger>
              </TabsList>

              <TabsContent value="fields" className="space-y-4">
                <div className="space-y-2">
                  <Label>اسم القالب</Label>
                  <Input
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="اسم القالب"
                  />
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">مواقع العناصر</h4>
                    <Button variant="outline" size="sm" onClick={resetToDefault}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      إعادة تعيين
                    </Button>
                  </div>

                  {Object.entries(FIELD_LABELS).map(([field, label]) => (
                    <div
                      key={field}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedField === field ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedField(field as keyof CertificateFieldPositions)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{label}</span>
                        <Move className="w-4 h-4 text-gray-400" />
                      </div>
                      
                      {selectedField === field && (
                        <div className="space-y-2 mt-3">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label className="text-xs">X</Label>
                              <Input
                                type="number"
                                value={fieldPositions[field].x}
                                onChange={(e) => handleFieldUpdate(field as keyof CertificateFieldPositions, { x: parseInt(e.target.value) || 0 })}
                                className="h-8"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Y</Label>
                              <Input
                                type="number"
                                value={fieldPositions[field].y}
                                onChange={(e) => handleFieldUpdate(field as keyof CertificateFieldPositions, { y: parseInt(e.target.value) || 0 })}
                                className="h-8"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label className="text-xs">العرض</Label>
                              <Input
                                type="number"
                                value={fieldPositions[field].width}
                                onChange={(e) => handleFieldUpdate(field as keyof CertificateFieldPositions, { width: parseInt(e.target.value) || 0 })}
                                className="h-8"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">الارتفاع</Label>
                              <Input
                                type="number"
                                value={fieldPositions[field].height}
                                onChange={(e) => handleFieldUpdate(field as keyof CertificateFieldPositions, { height: parseInt(e.target.value) || 0 })}
                                className="h-8"
                              />
                            </div>
                          </div>

                          <div>
                            <Label className="text-xs">حجم الخط</Label>
                            <Input
                              type="number"
                              value={fieldPositions[field].font_size}
                              onChange={(e) => handleFieldUpdate(field as keyof CertificateFieldPositions, { font_size: parseInt(e.target.value) || 12 })}
                              className="h-8"
                            />
                          </div>

                          <div>
                            <Label className="text-xs">محاذاة النص</Label>
                            <Select
                              value={fieldPositions[field].text_align || "center"}
                              onValueChange={(value) => handleFieldUpdate(field as keyof CertificateFieldPositions, { text_align: value })}
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="right">يمين</SelectItem>
                                <SelectItem value="center">وسط</SelectItem>
                                <SelectItem value="left">يسار</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="design" className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium">إعدادات التصميم</h4>
                  
                  <div>
                    <Label>صورة الخلفية</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        value={backgroundImage}
                        onChange={(e) => setBackgroundImage(e.target.value)}
                        placeholder="رابط صورة الخلفية"
                        className="flex-1"
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-sm font-medium mb-3 block">نسخ من قالب موجود</Label>
                    <Select onValueChange={copyFromTemplate}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر قالب للنسخ منه" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">القالب الافتراضي</SelectItem>
                        <SelectItem value="academy">قالب الأكاديمية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Certificate Preview */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">معاينة الشهادة</h4>
                <div className="text-sm text-gray-500">
                  اسحب العناصر لتغيير مواقعها
                </div>
              </div>
              
              <div
                ref={canvasRef}
                className="relative w-full aspect-[3/2] bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden"
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                style={{
                  backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Certificate Fields */}
                {Object.entries(fieldPositions).map(([field, position]) => {
                  const label = FIELD_LABELS[field as keyof typeof FIELD_LABELS];
                  const isSelected = selectedField === field;
                  
                  // Scale positions for preview (assuming canvas is smaller than actual certificate)
                  const canvasRect = canvasRef.current?.getBoundingClientRect();
                  const scaleX = canvasRect ? canvasRect.width / 1200 : 0.5;
                  const scaleY = canvasRect ? canvasRect.height / 800 : 0.5;
                  
                  return (
                    <div
                      key={field}
                      className={`absolute cursor-move border-2 border-dashed transition-all ${
                        isSelected ? "border-blue-500 bg-blue-500/10" : "border-gray-400 bg-white/20"
                      } hover:border-blue-400 hover:bg-blue-400/10`}
                      style={{
                        left: position.x * scaleX,
                        top: position.y * scaleY,
                        width: position.width * scaleX,
                        height: position.height * scaleY,
                        fontSize: Math.max(10, position.font_size * scaleX),
                        fontWeight: position.font_weight,
                        textAlign: position.text_align as any,
                        color: position.color
                      }}
                      onMouseDown={(e) => handleDragStart(e, field as keyof CertificateFieldPositions)}
                      onClick={() => setSelectedField(field as keyof CertificateFieldPositions)}
                    >
                      <div className="flex items-center justify-center h-full p-1 text-xs font-medium">
                        {label}
                      </div>
                      
                      {isSelected && (
                        <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {label}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Grid lines for reference */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  {/* Vertical lines */}
                  {[...Array(13)].map((_, i) => (
                    <div
                      key={`v-${i}`}
                      className="absolute top-0 bottom-0 w-px bg-gray-400"
                      style={{ left: `${(i * 100) / 12}%` }}
                    />
                  ))}
                  {/* Horizontal lines */}
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={`h-${i}`}
                      className="absolute left-0 right-0 h-px bg-gray-400"
                      style={{ top: `${(i * 100) / 8}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
            <Save className="w-4 h-4 mr-2" />
            حفظ القالب
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}











