import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Link2, 
  Plus, 
  Percent, 
  DollarSign, 
  Package, 
  BookOpen, 
  Users, 
  Info, 
  Sparkles,
  Calendar,
  Target,
} from "lucide-react";
import type { CreateAffiliateLinkData } from "@/types/affiliate-link";

interface CreateAffiliateLinkModalProps {
  trigger: React.ReactNode;
  onCreateLink: (data: CreateAffiliateLinkData) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// بيانات تجريبية للمنتجات
const availableProducts = [
  {
    id: 1,
    name: "دورة تطوير المواقع الشاملة",
    type: "course" as const,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    price: 599,
    additionalDiscount: 0
  },
  {
    id: 2,
    name: "جلسة التصميم الإبداعي",
    type: "session" as const,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    price: 299,
    additionalDiscount: 0
  },
  {
    id: 3,
    name: "كتاب البرمجة المتقدمة",
    type: "digital-product" as const,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    price: 99,
    additionalDiscount: 0
  },
  {
    id: 4,
    name: "دورة تصميم الجرافيك",
    type: "course" as const,
    image: "https://i.ibb.co/X4p8fJ3/course-design.png",
    price: 449,
    additionalDiscount: 0
  },
  {
    id: 5,
    name: "ورشة التسويق الرقمي",
    type: "workshop" as const,
    image: "https://i.ibb.co/M6yQzBx/marketing-session.png",
    price: 199,
    additionalDiscount: 0
  },
  {
    id: 6,
    name: "استشارة فردية - تطوير الأعمال",
    type: "consultation" as const,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    price: 350,
    additionalDiscount: 0
  },
];

export function CreateAffiliateLinkModal({
  trigger,
  onCreateLink,
  open: externalOpen,
  onOpenChange,
}: CreateAffiliateLinkModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;
  const [formData, setFormData] = useState<CreateAffiliateLinkData>({
    code: "",
    name: "",
    description: "",
    commissionRate: 10,
    commissionType: "percentage",
    commissionValue: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: null,
    promotionType: "general",
    applicableProducts: [],
  });
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const handleInputChange = (field: keyof CreateAffiliateLinkData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateLinkCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setFormData(prev => ({ ...prev, code: result }));
  };

  const handleProductToggle = (productId: number) => {
    const product = availableProducts.find(p => p.id === productId);
    if (!product) return;

    setSelectedProducts((prev: number[]) => {
      const newSelected = prev.includes(productId)
        ? prev.filter((id: number) => id !== productId)
        : [...prev, productId];
      
      const applicableProducts = availableProducts
        .filter(p => newSelected.includes(p.id))
        .map(p => ({
          id: p.id,
          name: p.name,
          type: p.type,
          image: p.image,
          price: p.price,
          additionalDiscount: 0
        }));

      handleInputChange("applicableProducts", applicableProducts);
      return newSelected;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // تحقق من صحة البيانات
    if (!formData.code.trim()) {
      alert('يرجى إدخال رمز الرابط');
      return;
    }
    
    if (!formData.name.trim()) {
      alert('يرجى إدخال اسم الرابط');
      return;
    }
    
    if (formData.commissionType === 'percentage' && (formData.commissionRate < 0 || formData.commissionRate > 100)) {
      alert('يجب أن تكون نسبة العمولة بين 0 و 100');
      return;
    }
    
    if (formData.commissionType === 'fixed' && formData.commissionValue < 0) {
      alert('يجب أن تكون قيمة العمولة أكبر من 0');
      return;
    }
    
    if (formData.promotionType === 'specific' && (!formData.applicableProducts || formData.applicableProducts.length === 0)) {
      alert('يرجى اختيار منتج واحد على الأقل للرابط الخاص');
      return;
    }
    
    // تحديد قيمة العمولة بناءً على النوع
    const finalFormData: CreateAffiliateLinkData = {
      ...formData,
      commissionValue: formData.commissionType === "percentage" 
        ? formData.commissionRate 
        : formData.commissionValue,
      settings: {
        maxUsage: -1, // لا محدود افتراضياً
        currentUsage: 0,
        emailNotifications: true,
        geoTracking: false
      }
    };

    try {
      onCreateLink(finalFormData);
      setOpen(false);
      
      // إعادة تعيين النموذج
      setFormData({
        code: "",
        name: "",
        description: "",
        commissionRate: 10,
        commissionType: "percentage",
        commissionValue: 0,
        startDate: new Date().toISOString().split('T')[0],
        endDate: null,
        promotionType: "general",
        applicableProducts: [],
      });
      setSelectedProducts([]);
    } catch (error) {
      console.error('خطأ في إنشاء الرابط:', error);
      alert('حدث خطأ أثناء إنشاء الرابط. يرجى المحاولة مرة أخرى.');
    }
  };

  const getProductIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="w-4 h-4" />;
      case "session":
        return <Users className="w-4 h-4" />;
      case "digital-product":
        return <Package className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getProductTypeName = (type: string) => {
    switch (type) {
      case "course":
        return "دورة";
      case "session":
        return "جلسة";
      case "digital-product":
        return "منتج رقمي";
      case "workshop":
        return "ورشة عمل";
      case "consultation":
        return "استشارة";
      default:
        return "منتج";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[95vh] overflow-y-auto" dir="rtl">
        <DialogHeader className="border-b border-gray-100 pb-6">
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3 justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Link2 className="w-5 h-5 text-white" />
            </div>
            إنشاء رابط تسويق بالعمولة جديد
          </DialogTitle>
          <p className="text-sm text-gray-600 text-center mt-2">
            أنشئ رابط تسويق بالعمولة جديد لتتبع المبيعات والحصول على عمولات
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 pt-6">
          {/* معلومات أساسية */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              المعلومات الأساسية
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-sm font-medium text-card-foreground text-right">
                  رمز الرابط *
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => handleInputChange("code", e.target.value.toUpperCase())}
                    placeholder="مثال: WELCOME20"
                    className="font-mono h-10 !bg-transparent text-right !border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                    dir="rtl"
                    required
                  />
                  <Button type="button" variant="outline" onClick={generateLinkCode} className="px-3">
                    <Sparkles className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-card-foreground text-right">
                  اسم الرابط *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="مثال: رابط ترحيبي للعملاء الجدد"
                  className="h-10 !bg-transparent text-right !border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                  dir="rtl"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-card-foreground text-right">
                الوصف
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="وصف مختصر لرابط التسويق..."
                rows={3}
                className="!bg-transparent text-right !border-border !shadow-none focus-visible:ring-0 focus-visible:border-border resize-none"
                dir="rtl"
              />
            </div>
          </div>

          {/* إعدادات العمولة */}
          <div className="bg-green-50 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              إعدادات العمولة
            </h3>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700 font-medium">
                  حدد نوع العمولة وقيمتها
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-card-foreground text-right">
                    نوع العمولة
                  </Label>
                  <Select
                    value={formData.commissionType}
                    onValueChange={(value: "percentage" | "fixed") => 
                      handleInputChange("commissionType", value)
                    }
                  >
                    <SelectTrigger className="h-10 !bg-transparent !border-border !shadow-none focus:ring-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">
                        <div className="flex items-center gap-2">
                          <Percent className="w-4 h-4 text-green-600" />
                          نسبة مئوية
                        </div>
                      </SelectItem>
                      <SelectItem value="fixed">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-blue-600" />
                          مبلغ ثابت
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.commissionType === "percentage" ? (
                  <div className="space-y-2">
                    <Label htmlFor="commissionRate" className="text-sm font-medium text-card-foreground text-right">
                      نسبة العمولة (%) *
                    </Label>
                    <div className="relative">
                      <Input
                        id="commissionRate"
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={formData.commissionRate}
                        onChange={(e) => handleInputChange("commissionRate", parseFloat(e.target.value) || 0)}
                        className="h-10 !bg-transparent text-right !border-border !shadow-none focus-visible:ring-0 focus-visible:border-border pl-8"
                        dir="rtl"
                        required
                      />
                      <Percent className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="commissionValue" className="text-sm font-medium text-card-foreground text-right">
                      قيمة العمولة (ر.س) *
                    </Label>
                    <div className="relative">
                      <Input
                        id="commissionValue"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.commissionValue}
                        onChange={(e) => handleInputChange("commissionValue", parseFloat(e.target.value) || 0)}
                        className="h-10 !bg-transparent text-right !border-border !shadow-none focus-visible:ring-0 focus-visible:border-border pl-8"
                        dir="rtl"
                        required
                      />
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">ر.س</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* فترة صلاحية الرابط */}
          <div className="bg-purple-50 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              فترة الصلاحية
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm font-medium text-card-foreground text-right">
                  تاريخ البداية *
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  className="h-10 !bg-transparent text-right !border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-sm font-medium text-card-foreground text-right">
                  تاريخ النهاية
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate || ""}
                  onChange={(e) => handleInputChange("endDate", e.target.value || null)}
                  className="h-10 !bg-transparent text-right !border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-3 border border-purple-200">
              <div className="flex items-center gap-2 text-sm text-purple-700">
                <Info className="w-4 h-4" />
                <span>إذا لم تحدد تاريخ النهاية، سيكون الرابط ساري المفعول إلى أجل غير مسمى</span>
              </div>
            </div>
          </div>

          {/* نوع الترويج */}
          <div className="bg-blue-50 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              نوع الترويج
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-card-foreground text-right">
                  اختر نوع الترويج
                </Label>
                <Select
                  value={formData.promotionType}
                  onValueChange={(value: "general" | "specific") => 
                    handleInputChange("promotionType", value)
                  }
                >
                  <SelectTrigger className="h-10 !bg-transparent !border-border !shadow-none focus:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        رابط عام - يطبق على جميع المنتجات
                      </div>
                    </SelectItem>
                    <SelectItem value="specific">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        رابط خاص - يطبق على منتجات محددة
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.promotionType === "specific" && (
                <div className="space-y-4 p-6 bg-white rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Info className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      اختر المنتجات التي سيطبق عليها هذا الرابط
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableProducts.map((product) => (
                      <div
                        key={product.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedProducts.includes(product.id)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleProductToggle(product.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={selectedProducts.includes(product.id)}
                            onCheckedChange={() => handleProductToggle(product.id)}
                            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          />
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{product.name}</h4>
                            <div className="flex items-center gap-1 mt-1">
                              {getProductIcon(product.type)}
                              <span className="text-sm text-gray-500">
                                {getProductTypeName(product.type)}
                              </span>
                            </div>
                            <p className="text-sm text-blue-600 font-medium mt-1">
                              {product.price} ر.س
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {selectedProducts.length > 0 && (
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 text-green-700">
                        <span className="text-sm font-medium">
                          تم اختيار {selectedProducts.length} منتج(ات)
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* أزرار التحكم */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 h-11"
            >
              إلغاء
            </Button>
            <Button 
              type="submit" 
              className="flex-1 h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              إنشاء الرابط
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}