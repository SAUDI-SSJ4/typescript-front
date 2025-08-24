import AddBlogForm from "@/features/blogs/components/AddBlogForm";
import { FileText, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from 'react-router-dom';
import { buttonVariants } from "@/components/ui/button";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";

export interface IBlogForm {
  title: string;
  content: string;
  excerpt: string;
  image: string;
  keywords: string[];
  category: string;
  status: 'published' | 'draft';
}

function AddNewBlog() {
  const navigate = useNavigate();

  const handleSubmit = (data: IBlogForm) => {
    console.log("Blog created:", data);
    // Here you would typically send the data to your API
    // For now, we'll just navigate back to blogs
    navigate("/dashboard/blogs");
  };

  const handleCancel = () => {
    navigate("/dashboard/blogs");
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={FileText}
        title="إضافة مقال جديد"
        actions={
          <Link
            to="/dashboard/blogs"
            className={buttonVariants({ variant: "outline" })}
          >
            <ArrowLeft className="w-4 h-4 ml-2" />
            العودة للمقالات
          </Link>
        }
      />
      
      {/* Form */}
      <AddBlogForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}

export default AddNewBlog;

