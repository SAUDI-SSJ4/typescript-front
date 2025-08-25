import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Percent, DollarSign, Info, Package, Search, X } from "lucide-react";
import React from "react";
import type { CreateCouponData } from "@/types/coupon";
import { mockProducts, type Product } from "@/data/mockProducts";

interface CreateCouponModalProps {
  onCreateCoupon?: (data: CreateCouponData) => void;
  trigger?: React.ReactNode;
}

export function CreateCouponModal({ onCreateCoupon, trigger }: CreateCouponModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CreateCouponData>({
    code: "",
    name: "",
    type: "percentage",
    value: 0,
    maxDiscount: undefined,
    usageLimit: undefined,
    startDate: "",
    endDate: "",
    applicationType: "general",
    applicableProducts: [],
  });
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [productSearchTerm, setProductSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // التحقق من اختيار منتج واحد على الأقل للكوبون الخاص
    if (formData.applicationType === 'specific' && (!formData.applicableProducts || formData.applicableProducts.length === 0)) {
      alert('يرجى اختيار منتج واحد على الأقل للكوبون الخاص');
      return;
    }
    
    const couponData: CreateCouponData = {
      ...formData,
      startDate,
      endDate,
    };

    if (onCreateCoupon) {
      onCreateCoupon(couponData);
    }
    
    // Reset form
    setFormData({
      code: "",
      name: "",
      type: "percentage",
      value: 0,
      maxDiscount: undefined,
      usageLimit: undefined,
      startDate: "",
      endDate: "",
      applicationType: "general",
      applicableProducts: [],
    });
    setStartDate("");
    setEndDate("");
    setAvailableProducts([]);
    setProductSearchTerm('');
    setOpen(false);
  };

  const generateCouponCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setFormData(prev => ({ ...prev, code: result }));
  };

  // تحميل جميع المنتجات عند فتح المودال
  React.useEffect(() => {
    if (formData.applicationType === 'specific') {
      setAvailableProducts(mockProducts);
    }
  }, [formData.applicationType]);

  const handleProductSelect = (product: Product) => {
    const isAlreadySelected = formData.applicableProducts?.some(p => p.id === product.id);
    if (isAlreadySelected) return;
    
    setFormData(prev => ({ 
      ...prev, 
      applicableProducts: [
        ...(prev.applicableProducts || []),
        {
          id: product.id,
          name: product.name,
          type: product.type,
          image: product.image,
        }
      ]
    }));
    setProductSearchTerm('');
  };

  const handleProductRemove = (productId: number) => {
    setFormData(prev => ({
      ...prev,
      applicableProducts: prev.applicableProducts?.filter(p => p.id !== productId) || []
    }));
  };

  const filteredProducts = availableProducts.filter(product =>
    product.name.toLowerCase().includes(productSearchTerm.toLowerCase()) &&
    !formData.applicableProducts?.some(p => p.id === product.id)
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            كوبون جديد
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[95vh] overflow-y-auto" dir="rtl">
        <DialogHeader className="border-b border-gray-100 pb-6">
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3 justify-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Percent className="w-5 h-5 text-blue-600" />
            </div>
            إنشاء كوبون خصم جديد
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-8 pt-6">
          {/* معلومات أساسية */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              المعلومات الأساسية
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-sm font-medium text-card-foreground text-right">
                  كود الكوبون *
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                    placeholder="SAVE20"
                    className="font-mono h-10 !bg-transparent text-right !border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                    dir="rtl"
                    required
                  />
                  <Button type="button" variant="outline" onClick={generateCouponCode}>
                    توليد
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-card-foreground text-right">
                  اسم الكوبون *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="خصم 20% على جميع الدورات"
                  className="h-10 !bg-transparent text-right !border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                  dir="rtl"
                  required
                />
              </div>
            </div>


          </div>

          {/* تفاصيل الخصم */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              تفاصيل الخصم
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">نوع الخصم *</Label>
                <Select value={formData.type} onValueChange={(value: 'percentage' | 'fixed') => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">
                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4" />
                        نسبة مئوية
                      </div>
                    </SelectItem>
                    <SelectItem value="fixed">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        مبلغ ثابت
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="value">
                  قيمة الخصم * {formData.type === 'percentage' ? '(%)' : '(ر.س)'}
                </Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, value: Number(e.target.value) }))}
                  placeholder={formData.type === 'percentage' ? "20" : "100"}
                  min="0"
                  max={formData.type === 'percentage' ? "100" : undefined}
                  required
                />
              </div>
            </div>

            {formData.type === 'percentage' && (
              <div className="space-y-2">
                <Label htmlFor="maxDiscount">الحد الأقصى للخصم (ر.س)</Label>
                <Input
                  id="maxDiscount"
                  type="number"
                  value={formData.maxDiscount || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxDiscount: e.target.value ? Number(e.target.value) : undefined }))}
                  placeholder="500"
                  min="0"
                />
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  الحد الأقصى لمبلغ الخصم للنسبة المئوية
                </p>
              </div>
            )}
          </div>

          {/* نطاق التطبيق */}
          <div className="bg-blue-50 rounded-xl p-6 space-y-4 border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              نطاق التطبيق
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="applicationType">نوع التطبيق *</Label>
                <Select 
                  value={formData.applicationType} 
                  onValueChange={(value: 'general' | 'specific') => {
                    setFormData(prev => ({ 
                      ...prev, 
                      applicationType: value,
                      applicableProducts: value === 'general' ? [] : prev.applicableProducts
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        كوبون عام - يطبق على جميع المنتجات
                      </div>
                    </SelectItem>
                    <SelectItem value="specific">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        كوبون خاص - يطبق على منتجات محددة
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.applicationType === 'specific' && (
                <div className="space-y-4 p-6 bg-white rounded-lg border border-blue-200 shadow-sm">
                  <div className="space-y-2">
                    <Label htmlFor="productSearch" className="text-sm font-medium text-card-foreground text-right">
                      البحث عن المنتجات وإضافتها
                    </Label>
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="productSearch"
                        value={productSearchTerm}
                        onChange={(e) => setProductSearchTerm(e.target.value)}
                        placeholder="ابحث عن المنتجات لإضافتها..."
                        className="h-10 !bg-transparent text-right pr-10 pl-3 !border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  {formData.applicableProducts && formData.applicableProducts.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-gray-900">المنتجات المختارة ({formData.applicableProducts.length})</h4>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {formData.applicableProducts.map((product) => (
                          <div key={product.id} className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image || "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png"}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-green-800">{product.name}</h4>
                                <p className="text-sm text-green-600">
                                  {product.type === 'course' ? 'دورة تدريبية' :
                                   product.type === 'session' ? 'جلسة حضورية' : 'منتج رقمي'}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleProductRemove(product.id)}
                                className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors"
                                title="حذف المنتج"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredProducts.length > 0 && (
                    <div className="max-h-48 overflow-y-auto space-y-2 border border-gray-200 rounded-lg p-2">
                      {filteredProducts.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleProductSelect(product)}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-blue-200 transition-all"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-xs text-gray-500">{product.price} ر.س</p>
                              <div className={`w-2 h-2 rounded-full ${
                                product.type === 'course' ? 'bg-green-500' :
                                product.type === 'session' ? 'bg-orange-500' : 'bg-purple-500'
                              }`}></div>
                              <span className="text-xs text-gray-400">
                                {product.type === 'course' ? 'دورة' :
                                 product.type === 'session' ? 'جلسة' : 'منتج رقمي'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-blue-600 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    سيتم تطبيق الكوبون على المنتجات المختارة فقط
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* قيود الاستخدام */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">قيود الاستخدام</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="usageLimit">حد الاستخدام</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  value={formData.usageLimit || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, usageLimit: e.target.value ? Number(e.target.value) : undefined }))}
                  placeholder="100"
                  min="1"
                />
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  اتركه فارغاً للاستخدام غير المحدود
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm font-medium text-card-foreground text-right">
                  تاريخ البداية *
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-10 !bg-transparent text-right !border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                  dir="rtl"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-sm font-medium text-card-foreground text-right">
                  تاريخ الانتهاء *
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  className="h-10 !bg-transparent text-right !border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                  dir="rtl"
                  required
                />
              </div>
            </div>
          </div>

          {/* أزرار التحكم */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              إلغاء
            </Button>
            <Button type="submit">
              إنشاء الكوبون
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
