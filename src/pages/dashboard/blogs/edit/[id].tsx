import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import AddBlogForm from "@/features/blogs/components/AddBlogForm";
import type { IBlogForm } from "../new";

// Sample blog data for editing
const sampleBlog: IBlogForm = {
  title: "مقال تجريبي للتعديل",
  excerpt: "هذا مقال تجريبي لاختبار وظيفة التعديل",
  image: "",
  keywords: ["تجريبي", "تعديل", "مقال"],
  category: "تقنية",
  content: "محتوى المقال التجريبي...",
  status: "published" as const,
};

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<IBlogForm | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Simulate loading blog data
      setTimeout(() => {
        setBlog(sampleBlog);
        setLoading(false);
      }, 500);
    }
  }, [id]);

  const handleSubmit = async (data: IBlogForm) => {
    try {
      console.log("تحديث المقال:", data);
      // Here you would typically send the data to your API
      // await updateBlog(id, data);
      
      // Redirect to blogs list after successful update
      navigate("/dashboard/blogs");
    } catch (error) {
      console.error("خطأ في تحديث المقال:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">جاري التحميل...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">لم يتم العثور على المقال</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header blogId={id as string} />
      <AddBlogForm onSubmit={handleSubmit} initialData={blog} isEditing />
    </div>
  );
}

function Header({ blogId }: { blogId: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link
          to="/dashboard/blogs"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          العودة للمدونات
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            تعديل المقال #{blogId}
          </h1>
          <p className="text-gray-600 mt-1">
            قم بتعديل تفاصيل المقال من هنا
          </p>
        </div>
      </div>
    </div>
  );
}
