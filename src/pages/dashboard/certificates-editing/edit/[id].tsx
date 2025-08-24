import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import {
  Award,
  Save,
  ArrowRight,
  Image as ImageIcon,
  FileSignature,
  QrCode,
  Building2,
  User,
  BookOpen,
  Calendar,
  Move,
  Eye,
} from "lucide-react";

interface CertificatePosition {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

interface CertificateSettings {
  signature: string | null;
  template: string | null;
  positions: {
    signature: CertificatePosition;
    qrCode: CertificatePosition;
    academyName: CertificatePosition;
    studentName: CertificatePosition;
    courseName: CertificatePosition;
    academyLogo: CertificatePosition;
    syanLogo: CertificatePosition;
    date: CertificatePosition;
  };
}

export default function EditCertificate() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState<CertificateSettings>({
    signature: null,
    template: null,
    positions: {
      signature: { x: 500, y: 400, width: 100, height: 60 },
      qrCode: { x: 50, y: 450, width: 100, height: 100 },
      academyName: { x: 200, y: 100, width: 400, height: 50 },
      studentName: { x: 200, y: 200, width: 400, height: 60 },
      courseName: { x: 200, y: 280, width: 400, height: 40 },
      academyLogo: { x: 50, y: 50, width: 100, height: 100 },
      syanLogo: { x: 650, y: 50, width: 100, height: 100 },
      date: { x: 200, y: 350, width: 200, height: 30 },
    },
  });

  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showPreview, setShowPreview] = useState(false);
  const signatureRef = useRef<HTMLInputElement>(null);
  const templateRef = useRef<HTMLInputElement>(null);

  // بيانات افتراضية للمعاينة الحية
  const previewData = {
    studentName: "أحمد محمد العلي",
    courseName: "دورة تطوير تطبيقات الويب المتقدمة",
    academyName: "أكاديمية سيان للتعليم التقني",
    issueDate: "١٥ يناير ٢٠٢٤",
    qrCodeUrl: "https://verify.certificate.com/abc123",
  };

  const handleFileUpload = (type: 'signature' | 'template', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSettings(prev => ({
        ...prev,
        [type]: e.target?.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handlePositionChange = (element: string, position: Partial<CertificatePosition>) => {
    setSettings(prev => ({
      ...prev,
      positions: {
        ...prev.positions,
        [element]: {
          ...prev.positions[element as keyof typeof prev.positions],
          ...position
        }
      }
    }));
  };

  const handleMouseDown = (element: string, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = e.currentTarget.parentElement?.getBoundingClientRect();
    
    // حساب الإزاحة من مركز العنصر
    const elementCenterX = rect.left + rect.width / 2 - (containerRect?.left || 0);
    const elementCenterY = rect.top + rect.height / 2 - (containerRect?.top || 0);
    
    setDragOffset({
      x: e.clientX - (containerRect?.left || 0) - elementCenterX,
      y: e.clientY - (containerRect?.top || 0) - elementCenterY
    });
    
    setActiveElement(element);
    setIsDragging(true);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !activeElement) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;
    
    // تحويل إلى نسبة أساسها 800x600
    const containerWidth = 800;
    const containerHeight = 600;
    const elementWidth = settings.positions[activeElement as keyof typeof settings.positions].width || 100;
    const elementHeight = settings.positions[activeElement as keyof typeof settings.positions].height || 30;
    
    const pixelX = Math.max(0, Math.min((x / rect.width) * containerWidth, containerWidth - elementWidth));
    const pixelY = Math.max(0, Math.min((y / rect.height) * containerHeight, containerHeight - elementHeight));
    
    handlePositionChange(activeElement, { 
      x: Math.round(pixelX), 
      y: Math.round(pixelY) 
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setActiveElement(null);
  };

  const elements = [
    { key: 'signature', label: 'التوقيع', icon: FileSignature, color: 'text-purple-600' },
    { key: 'qrCode', label: 'الباركود', icon: QrCode, color: 'text-green-600' },
    { key: 'academyName', label: 'اسم الأكاديمية', icon: Building2, color: 'text-blue-600' },
    { key: 'studentName', label: 'اسم الطالب', icon: User, color: 'text-orange-600' },
    { key: 'courseName', label: 'اسم الدورة', icon: BookOpen, color: 'text-red-600' },
    { key: 'academyLogo', label: 'شعار الأكاديمية', icon: ImageIcon, color: 'text-indigo-600' },
    { key: 'syanLogo', label: 'شعار سيان', icon: ImageIcon, color: 'text-cyan-600' },
    { key: 'date', label: 'التاريخ', icon: Calendar, color: 'text-yellow-600' },
  ];

  const handleSave = () => {
    // هنا يتم حفظ الإعدادات
    console.log('Certificate settings saved:', settings);
    navigate('/dashboard/certificates-editing');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Award className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-sm lg:text-base">
              تعديل الشهادة - {id}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/dashboard/certificates-editing')}>
            <ArrowRight className="w-4 h-4 mr-2" />
            العودة
          </Button>
          
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogTrigger asChild>
              <Button variant="outline" disabled={!settings.template}>
                <Eye className="w-4 h-4 mr-2" />
                معاينة حية
              </Button>
            </DialogTrigger>
            <DialogContent 
              className="max-w-none max-h-[95vh] overflow-auto p-2 border-0 shadow-none" 
              style={{ width: '90vw', minWidth: '1200px' }}
              showCloseButton={false}
            >
              <div className="flex flex-col items-center">
                <div className="text-center mb-2">
                  <h2 className="text-base font-bold text-gray-900 mb-0">معاينة الشهادة مع البيانات الحقيقية</h2>
                  <p className="text-xs text-gray-600">هذه معاينة حية للشهادة كما ستظهر للطلاب عند الإصدار</p>
                </div>
                
                <div 
                  className="relative bg-white rounded-lg overflow-hidden shadow-lg w-full mx-auto"
                  style={{ 
                    aspectRatio: '4/3',
                    maxWidth: '800px',
                    maxHeight: '600px'
                  }}
                >
                  {/* قالب الشهادة */}
                  {settings.template && (
                    <img 
                      src={settings.template} 
                      alt="قالب الشهادة" 
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  )}

                  {/* اسم الأكاديمية */}
                  <div
                    className="absolute flex items-center justify-center text-center font-bold text-gray-800 leading-tight"
                    style={{
                      left: `${settings.positions.academyName.x}px`,
                      top: `${settings.positions.academyName.y}px`,
                      width: `${settings.positions.academyName.width || 400}px`,
                      height: `${settings.positions.academyName.height || 50}px`,
                      fontSize: '24px',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                    }}
                  >
                    {previewData.academyName}
                  </div>

                  {/* اسم الطالب */}
                  <div
                    className="absolute flex items-center justify-center text-center font-bold text-blue-800 leading-tight"
                    style={{
                      left: `${settings.positions.studentName.x}px`,
                      top: `${settings.positions.studentName.y}px`,
                      width: `${settings.positions.studentName.width || 400}px`,
                      height: `${settings.positions.studentName.height || 60}px`,
                      fontSize: '28px',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                    }}
                  >
                    {previewData.studentName}
                  </div>

                  {/* اسم الدورة */}
                  <div
                    className="absolute flex items-center justify-center text-center font-semibold text-gray-700 leading-tight"
                    style={{
                      left: `${settings.positions.courseName.x}px`,
                      top: `${settings.positions.courseName.y}px`,
                      width: `${settings.positions.courseName.width || 400}px`,
                      height: `${settings.positions.courseName.height || 40}px`,
                      fontSize: '20px',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                    }}
                  >
                    {previewData.courseName}
                  </div>

                  {/* التاريخ */}
                  <div
                    className="absolute flex items-center justify-center text-center font-medium text-gray-600"
                    style={{
                      left: `${settings.positions.date.x}px`,
                      top: `${settings.positions.date.y}px`,
                      width: `${settings.positions.date.width || 200}px`,
                      height: `${settings.positions.date.height || 30}px`,
                      fontSize: '16px',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                    }}
                  >
                    {previewData.issueDate}
                  </div>

                  {/* الباركود */}
                  <div
                    className="absolute flex items-center justify-center bg-white border border-gray-300 rounded shadow-sm"
                    style={{
                      left: `${settings.positions.qrCode.x}px`,
                      top: `${settings.positions.qrCode.y}px`,
                      width: `${settings.positions.qrCode.width || 100}px`,
                      height: `${settings.positions.qrCode.height || 100}px`,
                    }}
                  >
                    <QrCode className="w-full h-full p-3 text-gray-800" />
                  </div>

                  {/* شعار الأكاديمية */}
                  <div
                    className="absolute flex items-center justify-center bg-blue-50 border border-blue-200 rounded shadow-sm"
                    style={{
                      left: `${settings.positions.academyLogo.x}px`,
                      top: `${settings.positions.academyLogo.y}px`,
                      width: `${settings.positions.academyLogo.width || 100}px`,
                      height: `${settings.positions.academyLogo.height || 100}px`,
                    }}
                  >
                    <Building2 className="w-full h-full p-5 text-blue-600" />
                  </div>

                  {/* شعار سيان */}
                  <div
                    className="absolute flex items-center justify-center bg-cyan-50 border border-cyan-200 rounded shadow-sm"
                    style={{
                      left: `${settings.positions.syanLogo.x}px`,
                      top: `${settings.positions.syanLogo.y}px`,
                      width: `${settings.positions.syanLogo.width || 100}px`,
                      height: `${settings.positions.syanLogo.height || 100}px`,
                    }}
                  >
                    <Award className="w-full h-full p-5 text-cyan-600" />
                  </div>

                  {/* التوقيع */}
                  {settings.signature && (
                    <div
                      className="absolute"
                      style={{
                        left: `${settings.positions.signature.x}px`,
                        top: `${settings.positions.signature.y}px`,
                        width: `${settings.positions.signature.width || 100}px`,
                        height: `${settings.positions.signature.height || 60}px`,
                      }}
                    >
                      <img 
                        src={settings.signature} 
                        alt="التوقيع" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            حفظ التغييرات
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* لوحة التحكم */}
        <div className="lg:col-span-1 space-y-6">
          {/* رفع الملفات */}
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <FileSignature className="w-5 h-5 text-blue-600" />
                رفع الملفات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* رفع التوقيع */}
                <div className="space-y-2">
                  <Label htmlFor="signature" className="text-sm font-medium">التوقيع</Label>
                  <input
                    ref={signatureRef}
                    type="file"
                    id="signature"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload('signature', file);
                    }}
                  />
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => signatureRef.current?.click()}
                  >
                    <FileSignature className="w-4 h-4 mr-2" />
                    {settings.signature ? 'تغيير التوقيع' : 'رفع التوقيع'}
                  </Button>
                  {settings.signature && (
                    <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                      <img src={settings.signature} alt="التوقيع" className="max-h-12 mx-auto" />
                    </div>
                  )}
                </div>

                {/* رفع قالب الشهادة */}
                <div className="space-y-2">
                  <Label htmlFor="template" className="text-sm font-medium">قالب الشهادة</Label>
                  <input
                    ref={templateRef}
                    type="file"
                    id="template"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload('template', file);
                    }}
                  />
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => templateRef.current?.click()}
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    {settings.template ? 'تغيير القالب' : 'رفع القالب'}
                  </Button>
                  {settings.template && (
                    <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                      <img src={settings.template} alt="القالب" className="max-h-16 mx-auto" />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* التحكم في المواضع */}
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Move className="w-5 h-5 text-blue-600" />
                التحكم في المواضع
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {elements.map((element) => (
                  <div key={element.key} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <element.icon className={`w-4 h-4 ${element.color}`} />
                    <span className="font-medium text-xs">{element.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* معاينة الشهادة */}
        <div className="lg:col-span-2">
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium">معاينة الشهادة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full">
                <div 
                  className="relative bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden mx-auto"
                  style={{ 
                    width: '100%', 
                    aspectRatio: '4/3',
                    minHeight: '500px'
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  {/* قالب الشهادة */}
                  {settings.template ? (
                    <img 
                      src={settings.template} 
                      alt="قالب الشهادة" 
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <ImageIcon className="w-16 h-16 mx-auto mb-3 opacity-40" />
                        <p className="text-lg font-medium mb-1">ارفع قالب الشهادة</p>
                        <p className="text-sm opacity-70">لرؤية المعاينة مع العناصر</p>
                      </div>
                    </div>
                  )}

                  {/* العناصر القابلة للسحب */}
                  {settings.template && elements.map((element) => {
                    const position = settings.positions[element.key as keyof typeof settings.positions];
                    const containerRect = { width: 800, height: 600 };
                    const isSignature = element.key === 'signature';
                    
                    return (
                      <div
                        key={element.key}
                        className={`absolute border-2 border-dashed ${
                          activeElement === element.key ? 'border-blue-500 bg-blue-50' : 'border-gray-400'
                        } cursor-move flex items-center justify-center text-xs font-medium ${element.color} transition-colors ${
                          isSignature && settings.signature ? 'bg-transparent border-purple-500' : 'bg-white/80 hover:bg-white/90'
                        }`}
                        style={{
                          left: `${(position.x / containerRect.width) * 100}%`,
                          top: `${(position.y / containerRect.height) * 100}%`,
                          width: `${((position.width || 100) / containerRect.width) * 100}%`,
                          height: `${((position.height || 30) / containerRect.height) * 100}%`,
                          minWidth: '60px',
                          minHeight: '20px',
                          zIndex: activeElement === element.key ? 20 : 10,
                        }}
                        onMouseDown={(e) => handleMouseDown(element.key, e)}
                        title={`اسحب لتغيير موضع ${element.label}`}
                      >
                        {isSignature && settings.signature ? (
                          <img 
                            src={settings.signature} 
                            alt="التوقيع" 
                            className="w-full h-full object-contain pointer-events-none"
                          />
                        ) : (
                          <>
                            <element.icon className="w-3 h-3 mr-1" />
                            <span className="truncate">{element.label}</span>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 اسحب العناصر لتغيير مواضعها - التوقيع سيظهر كصورة حقيقية عند رفعه
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}