import { buttonVariants } from "@/components/ui/button";
import BlogTable from "@/features/blogs/components/BlogTable";
import { BlogStats } from "@/features/blogs/components";
import BlogFilters from "@/features/blogs/components/BlogFilters";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import { Link } from "react-router-dom";
import { Pages, Routes } from "@/constants/enums";
import { useState, useMemo } from "react";
import type { Table } from "@tanstack/react-table";
import type { Blog } from "@/types/blog";
import { Plus, Edit3 } from "lucide-react";

// بيانات تجريبية للمدونات
const blogs: Blog[] = [
  {
    id: 1,
    title: "مستقبل الذكاء الاصطناعي في التعليم: كيف ستغير التقنية وجه التعلم؟",
    content: "محتوى المقال الكامل...",
    excerpt: "استكشاف كيفية تأثير الذكاء الاصطناعي على مستقبل التعليم والتعلم الرقمي",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    keywords: ["ذكاء اصطناعي", "تعليم", "تقنية"],
    category: "تقنية",
    status: "published",
    author: "أحمد محمد",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    views: 1250,
    likes: 89,
  },
  {
    id: 2,
    title: "أفضل الممارسات في تصميم واجهات المستخدم للتطبيقات التعليمية",
    content: "محتوى المقال الكامل...",
    excerpt: "دليل شامل لتصميم واجهات مستخدم فعالة وجذابة للمنصات التعليمية",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    keywords: ["تصميم", "واجهات المستخدم", "تطبيقات"],
    category: "تعليم",
    status: "published",
    author: "سارة أحمد",
    createdAt: "2024-01-14T14:30:00Z",
    updatedAt: "2024-01-14T14:30:00Z",
    views: 890,
    likes: 67,
  },
  {
    id: 3,
    title: "كيفية بناء استراتيجية تسويق رقمي ناجحة للأعمال الصغيرة",
    content: "محتوى المقال الكامل...",
    excerpt: "خطوات عملية لإنشاء استراتيجية تسويق رقمي فعالة تناسب الأعمال الناشئة",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    keywords: ["تسويق رقمي", "أعمال", "استراتيجية"],
    category: "أعمال",
    status: "draft",
    author: "محمد علي",
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-13T09:15:00Z",
    views: 0,
    likes: 0,
  },
  {
    id: 4,
    title: "أهمية الصحة النفسية في بيئة العمل الحديثة",
    content: "محتوى المقال الكامل...",
    excerpt: "نظرة على تأثير الصحة النفسية على الإنتاجية وكيفية تحسين بيئة العمل",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    keywords: ["صحة نفسية", "عمل", "إنتاجية"],
    category: "صحة",
    status: "published",
    author: "فاطمة الزهراء",
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-12T16:45:00Z",
    views: 2100,
    likes: 156,
  },
  {
    id: 5,
    title: "دليل المبتدئين لتعلم البرمجة: من أين تبدأ؟",
    content: "محتوى المقال الكامل...",
    excerpt: "خارطة طريق شاملة للمبتدئين الراغبين في دخول عالم البرمجة والتطوير",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    keywords: ["برمجة", "تعلم", "مبتدئين"],
    category: "تقنية",
    status: "draft",
    author: "عبدالله الأحمد",
    createdAt: "2024-01-11T11:20:00Z",
    updatedAt: "2024-01-11T11:20:00Z",
    views: 0,
    likes: 0,
  },
];

function AcademyBlogs() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedStatus, setSelectedStatus] = useState("الكل");
  const [searchTerm, setSearchTerm] = useState("");
  const [table, setTable] = useState<Table<Blog> | null>(null);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === "الكل" || blog.category === selectedCategory;

      const matchesStatus =
        selectedStatus === "الكل" || 
        (selectedStatus === "منشور" && blog.status === "published") ||
        (selectedStatus === "مسودة" && blog.status === "draft");

      const matchesSearch =
        searchTerm === "" ||
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [selectedCategory, selectedStatus, searchTerm]);

  const handleClearFilters = () => {
    setSelectedCategory("الكل");
    setSelectedStatus("الكل");
    setSearchTerm("");
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={Edit3}
        title="إدارة المدونات"
        actions={
          <Link
            to={`${Routes.DASHBOARD}/blogs/${Pages.NEW}`}
            className={buttonVariants()}
          >
            <Plus className="w-4 h-4 mr-2" />
            مدونة جديدة
          </Link>
        }
      />
      <BlogStats blogs={filteredBlogs} />
      <BlogFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClearFilters={handleClearFilters}
        table={table}
      />
      <BlogTable blogs={filteredBlogs} onTableReady={setTable} />
    </div>
  );
}

export default AcademyBlogs;

