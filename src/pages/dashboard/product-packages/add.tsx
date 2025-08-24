import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Plus, Package, Tag, FileText, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { enhancedToast } from "@/components/ui/enhanced-toast";
import type { ProductPackage } from "@/types/product-package";

// Sample data for products and courses based on existing data
const sampleProducts = [
  { id: 1, title: "منهج إدارة الأعمال المتقدم", type: "digital-product" as const, price: 299.99 },
  { id: 2, title: "برنامج التدريب التنفيذي", type: "digital-product" as const, price: 499.99 },
  { id: 3, title: "نظام إدارة الجودة الأكاديمية", type: "digital-product" as const, price: 199.99 },
  { id: 4, title: "شهادة الإدارة الاستراتيجية", type: "digital-product" as const, price: 799.99 },
  { id: 5, title: "مكتبة الموارد الأكاديمية", type: "digital-product" as const, price: 149.99 },
  { id: 6, title: "دورة تطوير تطبيقات باستخدام Flutter - بناء واجهات احترافية لأنظمة iOS و Android", type: "course" as const, price: 299.00 },
  { id: 7, title: "دورة تطوير مواقع الويب باستخدام React و Next.js - من المبتدئ إلى المحترف", type: "course" as const, price: 450.00 },
  { id: 8, title: "دورة تصميم واجهات المستخدم UX/UI - إنشاء تجارب مستخدم مميزة", type: "course" as const, price: 199.00 },
];

function AddProductPackage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Array<{id: number, title: string, type: 'digital-product' | 'course', price: number}>>([]);
  const [imagePreview, setImagePreview] = useState<string>("https://images.unsplash.com/photo-1552664730-d307ca884978?w=400");

  const handleAddProduct = (product: {id: number, title: string, type: 'digital-product' | 'course', price: number}) => {
    if (!selectedProducts.some(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleRemoveProduct = (productId: number) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !price || selectedProducts.length === 0) {
      enhancedToast.error("خطأ في النموذج", {
        description: "يرجى ملء جميع الحقول المطلوبة وإضافة منتجات للباقة"
      });
      return;
    }

    try {
      // Here you would typically send the data to your API
      console.log("Product Package Data:", {
        title,
        description,
        price: parseFloat(price),
        discountedPrice: discountedPrice ? parseFloat(discountedPrice) : undefined,
        products: selectedProducts,
        image: imagePreview
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      enhancedToast.success("تم إنشاء الباقة بنجاح", {
        description: "تم إضافة الباقة الجديدة بنجاح"
      });
      
      // Navigate back to packages list
      navigate("/dashboard/product-packages");
    } catch (error) {
      enhancedToast.error("خطأ في إنشاء الباقة", {
        description: "حدث خطأ أثناء إنشاء الباقة. يرجى المحاولة مرة أخرى."
      });
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/product-packages");
  };

  const totalPrice = selectedProducts.reduce((sum, product) => sum + product.price, 0);
  const packagePrice = discountedPrice ? parseFloat(discountedPrice) : (price ? parseFloat(price) : 0);
  const savings = totalPrice - packagePrice;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={handleCancel}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowRight className="w-4 h-4" />
              العودة إلى الحزم
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">إضافة باقة منتجات جديدة</h1>
              <p className="text-sm text-gray-600">أنشئ باقة تحتوي على منتجات رقمية ودورات تدريبية بسعر موحد</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Package Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border-0">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">تفاصيل الباقة</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                    <Package className="w-4 h-4 text-blue-600" />
                    عنوان الباقة *
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="أدخل عنوان الباقة"
                    className="focus:outline-none focus:ring-0 focus:border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4 text-green-600" />
                    وصف الباقة *
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="أدخل وصف الباقة"
                    rows={4}
                    className="focus:outline-none focus:ring-0 focus:border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Product Selection */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-0">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">اختيار المنتجات والدورات</h2>
              <p className="text-sm text-gray-600 mb-4">اختر المنتجات الرقمية والدورات التدريبية التي تريد تضمينها في الباقة</p>
              
              {/* Selected Products */}
              {selectedProducts.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-800 mb-3">المنتجات المختارة ({selectedProducts.length})</h3>
                  <div className="space-y-2">
                    {selectedProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {product.type === 'course' ? (
                            <Play className="w-5 h-5 text-blue-600" />
                          ) : (
                            <FileText className="w-5 h-5 text-green-600" />
                          )}
                          <div>
                            <p className="font-medium text-gray-900">{product.title}</p>
                            <p className="text-sm text-gray-600">${product.price}</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveProduct(product.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          إزالة
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Products */}
              <div>
                <h3 className="text-md font-medium text-gray-800 mb-3">المنتجات والدورات المتاحة</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sampleProducts
                    .filter(product => !selectedProducts.some(p => p.id === product.id))
                    .map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          {product.type === 'course' ? (
                            <Play className="w-5 h-5 text-blue-600" />
                          ) : (
                            <FileText className="w-5 h-5 text-green-600" />
                          )}
                          <div>
                            <p className="font-medium text-gray-900">{product.title}</p>
                            <p className="text-sm text-gray-600">${product.price}</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddProduct(product)}
                          className="gap-1"
                        >
                          <Plus className="w-4 h-4" />
                          إضافة
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-0">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">الأسعار</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-medium">
                    السعر الإجمالي للمنتجات (${totalPrice.toFixed(2)})
                  </Label>
                  <div className="text-2xl font-bold text-gray-900">${totalPrice.toFixed(2)}</div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="packagePrice" className="text-sm font-medium">
                    سعر الباقة *
                  </Label>
                  <Input
                    id="packagePrice"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="focus:outline-none focus:ring-0 focus:border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discountedPrice" className="text-sm font-medium">
                    السعر بعد الخصم (اختياري)
                  </Label>
                  <Input
                    id="discountedPrice"
                    type="number"
                    value={discountedPrice}
                    onChange={(e) => setDiscountedPrice(e.target.value)}
                    placeholder="0.00"
                    className="focus:outline-none focus:ring-0 focus:border-gray-300"
                  />
                </div>

                {savings > 0 && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-sm text-green-800">
                      التوفير: <span className="font-semibold">${savings.toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      ({((savings / totalPrice) * 100).toFixed(1)}% خصم)
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Image Preview */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-0">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">صورة الباقة</h2>
              
              <div className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={imagePreview} 
                    alt="Package preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <Button type="button" variant="outline" className="w-full">
                  تغيير الصورة
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-0">
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  <Plus className="w-4 h-4 ml-2" />
                  إنشاء الباقة
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel} className="w-full">
                  إلغاء
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProductPackage;