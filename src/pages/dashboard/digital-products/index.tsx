import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Package } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { enhancedToast } from "@/components/ui/enhanced-toast";
import DigitalProductTable from "@/features/digital-products/components/DigitalProductTable";
import { DigitalProductStats } from "@/features/digital-products/components/DigitalProductStats";
import DigitalProductFilters from "@/features/digital-products/components/DigitalProductFilters";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import type { DigitalProduct } from "@/types/digital-product";
import type { Table } from "@tanstack/react-table";

// Sample data for academy digital products
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
  {
    id: 3,
    title: "نظام إدارة الجودة الأكاديمية",
    description: "دليل شامل لتطبيق معايير الجودة في المؤسسات التعليمية",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
    price: 199.99,
    discountPrice: 159.99,
    downloadFile: "quality-management-system.pdf",
    category: "أنظمة إدارية",
    status: "draft",
    author: "د. محمد الأكاديمي",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-22",
    downloads: 67,
    rating: 4.7,
    reviews: 12
  },
  {
    id: 4,
    title: "شهادة الإدارة الاستراتيجية",
    description: "برنامج شهادة معتمد في الإدارة الاستراتيجية للمؤسسات",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400",
    price: 799.99,
    downloadFile: "strategic-management-certificate.zip",
    category: "شهادات مهنية",
    status: "published",
    author: "د. فاطمة الخبيرة",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-25",
    downloads: 234,
    rating: 4.9,
    reviews: 42
  },
  {
    id: 5,
    title: "مكتبة الموارد الأكاديمية",
    description: "مجموعة شاملة من الموارد والأدوات الأكاديمية للمؤسسات التعليمية",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    price: 149.99,
    downloadFile: "academic-resources-library.zip",
    category: "موارد تعليمية",
    status: "published",
    author: "د. عمر الباحث",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-19",
    downloads: 123,
    rating: 4.6,
    reviews: 19
  }
];

const AcademyDigitalProducts: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedStatus, setSelectedStatus] = useState("الكل");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [table, setTable] = useState<Table<DigitalProduct> | null>(null);

  const filteredProducts = useMemo(() => {
    return sampleProducts.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "الكل" || product.category === selectedCategory;
      
      const matchesStatus = selectedStatus === "الكل" || 
                           (selectedStatus === "منشور" && product.status === "published") ||
                           (selectedStatus === "مسودة" && product.status === "draft");
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, selectedCategory, selectedStatus]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Table configuration is now handled internally by the table component

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("الكل");
    setSelectedStatus("الكل");
    setCurrentPage(1);
  };

  const handleEdit = (product: DigitalProduct) => {
    console.log("Edit product:", product);
    // Navigate to edit page
    navigate(`/dashboard/digital-products/edit/${product.id}`);
  };

  const handleDelete = (product: DigitalProduct) => {
    const confirmed = window.confirm(`هل أنت متأكد من حذف المنتج "${product.title}"؟`);
    if (confirmed) {
      console.log("Delete product:", product.id);
      // Here you would call your delete API
      enhancedToast.success("تم حذف المنتج بنجاح", {
        description: `تم حذف المنتج "${product.title}" بنجاح`
      });
      // Implement delete functionality - remove from state/refetch data
    }
  };

  const handleDownload = (product: DigitalProduct) => {
    console.log("Download product:", product);
    // Implement download functionality
  };

  const Header: React.FC = () => (
    <DashboardPageHeader
      icon={Package}
      title="المنتجات الرقمية للأكاديمية"
      actions={
        <Link
          to="/dashboard/digital-products/add"
          className={buttonVariants()}
        >
          <Plus className="w-4 h-4 mr-2" />
          إضافة منتج أكاديمي جديد
        </Link>
      }
    />
  );

  return (
    <div className="space-y-6">
      <Header />
      
      <DigitalProductStats products={filteredProducts} />
      
      <DigitalProductFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onClearFilters={handleClearFilters}
        table={table}
      />
      
      <DigitalProductTable
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDownload={handleDownload}
        onTableReady={setTable}
      />
    </div>
  );
};

export default AcademyDigitalProducts;