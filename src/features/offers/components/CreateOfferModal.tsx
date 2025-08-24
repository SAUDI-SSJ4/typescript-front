import React, { useState } from "react";
import { CalendarIcon, Package, Percent, Users, DollarSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { CreateOfferData, Product } from "@/types/offer";

// Mock products data - this would typically come from an API
const mockProducts: Product[] = [
  {
    id: 1,
    name: "دورة React المتقدمة",
    type: "course",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    originalPrice: 599
  },
  {
    id: 2,
    name: "كتاب JavaScript المتقدم",
    type: "digital-product",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    originalPrice: 149
  },
  {
    id: 3,
    name: "ورشة التصميم الجرافيكي",
    type: "workshop",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    originalPrice: 299
  },
  {
    id: 4,
    name: "جلسة التسويق الرقمي",
    type: "session",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    originalPrice: 199
  }
];

interface FormData {
  productId: number;
  discountedPrice: number;
  maxPurchases: number;
  expiryDate: string;
}

interface FormErrors {
  productId?: string;
  discountedPrice?: string;
  maxPurchases?: string;
  expiryDate?: string;
}

interface CreateOfferModalProps {
  trigger: React.ReactNode;
  onCreateOffer: (offerData: CreateOfferData) => void;
}

export default function CreateOfferModal({ trigger, onCreateOffer }: CreateOfferModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<FormData>({
    productId: 0,
    discountedPrice: 0,
    maxPurchases: 1,
    expiryDate: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Update selected product when productId changes
  React.useEffect(() => {
    if (formData.productId) {
      const product = mockProducts.find(p => p.id === formData.productId);
      setSelectedProduct(product || null);
      
      // Reset discounted price when product changes
      if (product && formData.discountedPrice === 0) {
        setFormData(prev => ({ ...prev, discountedPrice: product.originalPrice }));
      }
    }
  }, [formData.productId]);

  const discountPercentage = selectedProduct && formData.discountedPrice > 0
    ? Math.round(((selectedProduct.originalPrice - formData.discountedPrice) / selectedProduct.originalPrice) * 100)
    : 0;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.productId) {
      newErrors.productId = "يرجى اختيار المنتج";
    }
    if (formData.discountedPrice <= 0) {
      newErrors.discountedPrice = "يجب أن يكون السعر أكبر من صفر";
    }
    if (formData.maxPurchases <= 0) {
      newErrors.maxPurchases = "يجب أن يكون العدد الأقصى أكبر من صفر";
    }
    if (!formData.expiryDate) {
      newErrors.expiryDate = "يرجى اختيار تاريخ الانتهاء";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Auto-generate title based on product and discount
    const product = mockProducts.find(p => p.id === formData.productId);
    if (!product) return;
    
    const discountPercentage = Math.round(((product.originalPrice - formData.discountedPrice) / product.originalPrice) * 100);
    const autoTitle = `عرض خاص على ${product.name}`;
    const autoDescription = `خصم ${discountPercentage}% على ${product.name} لفترة محدودة`;
    
    const offerData: CreateOfferData = {
      title: autoTitle,
      description: autoDescription,
      productId: formData.productId,
      discountedPrice: formData.discountedPrice,
      maxPurchases: formData.maxPurchases,
      expiryDate: new Date(formData.expiryDate).toISOString(),
    };
    
    onCreateOffer(offerData);
    setIsOpen(false);
    resetForm();
  }

  const resetForm = () => {
    setFormData({
      productId: 0,
      discountedPrice: 0,
      maxPurchases: 1,
      expiryDate: ""
    });
    setSelectedProduct(null);
    setErrors({});
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right">إنشاء عرض جديد</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Product Selection */}
          <div className="space-y-2">
            <Label className="text-right flex items-center gap-2">
              <Package className="w-4 h-4" />
              المنتج
            </Label>
            <Select onValueChange={(value) => updateFormData('productId', parseInt(value))} value={formData.productId.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="اختر المنتج" />
              </SelectTrigger>
              <SelectContent>
                {mockProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    <div className="flex items-center gap-2">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-8 h-8 rounded object-cover"
                      />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">
                          {product.originalPrice} ر.س
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.productId && <p className="text-sm text-red-600">{errors.productId}</p>}
          </div>

          {/* Selected Product Preview */}
          {selectedProduct && (
            <div className="bg-gray-50 rounded-lg p-4 border">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{selectedProduct.name}</h4>
                  <p className="text-sm text-gray-600">السعر الأصلي: {selectedProduct.originalPrice} ر.س</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Discounted Price */}
            <div className="space-y-2">
              <Label className="text-right flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                السعر بعد الخصم (ر.س)
              </Label>
              <Input 
                type="number" 
                min="1"
                max={selectedProduct?.originalPrice || undefined}
                placeholder="0"
                value={formData.discountedPrice}
                onChange={(e) => updateFormData('discountedPrice', parseFloat(e.target.value) || 0)}
              />
              {discountPercentage > 0 && (
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <Percent className="w-3 h-3" />
                  <span>خصم {discountPercentage}%</span>
                </div>
              )}
              {errors.discountedPrice && <p className="text-sm text-red-600">{errors.discountedPrice}</p>}
            </div>

            {/* Max Purchases */}
            <div className="space-y-2">
              <Label className="text-right flex items-center gap-2">
                <Users className="w-4 h-4" />
                العدد الأقصى للمشتريات
              </Label>
              <Input 
                type="number" 
                min="1"
                placeholder="1"
                value={formData.maxPurchases}
                onChange={(e) => updateFormData('maxPurchases', parseInt(e.target.value) || 1)}
              />
              {errors.maxPurchases && <p className="text-sm text-red-600">{errors.maxPurchases}</p>}
            </div>
          </div>

          {/* Expiry Date */}
          <div className="space-y-2">
            <Label className="text-right flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              تاريخ انتهاء العرض
            </Label>
            <Input
              type="date"
              value={formData.expiryDate}
              onChange={(e) => updateFormData('expiryDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.expiryDate && <p className="text-sm text-red-600">{errors.expiryDate}</p>}
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              إلغاء
            </Button>
            <Button type="submit">
              إنشاء العرض
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}