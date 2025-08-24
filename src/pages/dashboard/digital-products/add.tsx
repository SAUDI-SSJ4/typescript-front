import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddDigitalProductForm from "@/features/digital-products/components/AddDigitalProductForm";
import { enhancedToast } from "@/components/ui/enhanced-toast";
import type { IDigitalProductForm } from "@/types/digital-product";

const AddDigitalProduct: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: IDigitalProductForm) => {
    try {
      // Here you would typically send the data to your API
      console.log("Digital Product Data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      enhancedToast.success("تم إنشاء المنتج بنجاح", {
        description: "تم إضافة المنتج الرقمي الجديد بنجاح"
      });
      
      // Navigate back to products list
      navigate("/dashboard/digital-products");
    } catch (error) {
      enhancedToast.error("خطأ في إنشاء المنتج", {
        description: "حدث خطأ أثناء إنشاء المنتج. يرجى المحاولة مرة أخرى."
      });
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/digital-products");
  };

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
              العودة إلى المنتجات
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">إضافة منتج رقمي جديد</h1>
              <p className="text-sm text-gray-600">أضف منتج رقمي جديد إلى المتجر</p>
            </div>
          </div>
        </div>
      </div>

      <AddDigitalProductForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={false}
      />
    </div>
  );
};

export default AddDigitalProduct;