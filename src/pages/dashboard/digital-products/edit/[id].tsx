import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddDigitalProductForm from "@/features/digital-products/components/AddDigitalProductForm";
import { enhancedToast } from "@/components/ui/enhanced-toast";
import type { IDigitalProductForm, DigitalProduct } from "@/types/digital-product";

// Sample data for demonstration
const sampleProducts: DigitalProduct[] = [
  {
    id: 1,
    title: "منهج إدارة الأعمال المتقدم",
    description: "منهج شامل لإدارة الأعمال والقيادة الاستراتيجية للمؤسسات",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    price: 299.99,
    discountPrice: 249.99,
    downloadFile: "business-management-curriculum.pdf",
    category: "مناهج أكاديمية",
    status: "published",
    author: "د. أحمد الخبير",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    downloads: 145,
    rating: 4.9,
    reviews: 28
  },
  {
    id: 2,
    title: "برنامج التدريب التنفيذي",
    description: "برنامج تدريبي متكامل للقادة التنفيذيين في الشركات",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
    price: 499.99,
    downloadFile: "executive-training-program.zip",
    category: "برامج تدريبية",
    status: "published",
    author: "د. سارة المستشارة",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
    downloads: 89,
    rating: 4.8,
    reviews: 15
  },
];

const EditDigitalProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<DigitalProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch product details
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // Find product by ID (in real app, this would be an API call)
        const foundProduct = sampleProducts.find(p => p.id === parseInt(id || ''));
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          enhancedToast.error("المنتج غير موجود", {
            description: "لم يتم العثور على المنتج المطلوب"
          });
          navigate("/dashboard/digital-products");
        }
      } catch (error) {
        enhancedToast.error("خطأ في تحميل البيانات", {
          description: "حدث خطأ أثناء تحميل بيانات المنتج"
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);

  const handleSubmit = async (data: IDigitalProductForm) => {
    try {
      // Here you would typically send the data to your API
      console.log("Updated Digital Product Data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      enhancedToast.success("تم تحديث المنتج بنجاح", {
        description: "تم حفظ التغييرات على المنتج الرقمي"
      });
      
      // Navigate back to products list
      navigate("/dashboard/digital-products");
    } catch (error) {
      enhancedToast.error("خطأ في تحديث المنتج", {
        description: "حدث خطأ أثناء حفظ التغييرات. يرجى المحاولة مرة أخرى."
      });
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/digital-products");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل بيانات المنتج...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">المنتج غير موجود</p>
        </div>
      </div>
    );
  }

  // Convert DigitalProduct to IDigitalProductForm for the form
  const defaultValues: IDigitalProductForm = {
    title: product.title,
    description: product.description,
    image: product.image,
    price: product.price,
    discountPrice: product.discountPrice,
    downloadFile: product.downloadFile,
    category: product.category,
    status: product.status,
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
              <h1 className="text-xl font-semibold text-gray-900">تعديل المنتج الرقمي</h1>
              <p className="text-sm text-gray-600">تعديل بيانات المنتج الرقمي: {product.title}</p>
            </div>
          </div>
        </div>
      </div>

      <AddDigitalProductForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={false}
        isEditing={true}
        defaultValues={defaultValues}
      />
    </div>
  );
};

export default EditDigitalProduct;