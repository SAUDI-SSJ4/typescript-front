import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Package } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import { ProductPackageTable, ProductPackageFilters, ProductPackageStats } from "@/features/product-packages/components";
import type { ProductPackage } from "@/types/product-package";

// Sample data for product packages based on real products
const samplePackages: ProductPackage[] = [
  {
    id: 1,
    title: "باقة المطور الشامل",
    description: "جميع الأدوات والموارد اللازمة لمطوري التطبيقات والمواقع",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
    price: 899.99,
    discountedPrice: 699.99,
    products: [
      {
        id: 1,
        title: "منهج إدارة الأعمال المتقدم",
        type: "digital-product",
        price: 299.99
      },
      {
        id: 6,
        title: "دورة تطوير تطبيقات باستخدام Flutter - بناء واجهات احترافية لأنظمة iOS و Android",
        type: "course",
        price: 299.00
      },
      {
        id: 7,
        title: "دورة تطوير مواقع الويب باستخدام React و Next.js - من المبتدئ إلى المحترف",
        type: "course",
        price: 450.00
      }
    ],
    status: "published",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20"
  },
  {
    id: 2,
    title: "باقة المصمم المحترف",
    description: "جميع الأدوات والموارد اللازمة للمصممين المحترفين",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400",
    price: 599.99,
    products: [
      {
        id: 5,
        title: "مكتبة الموارد الأكاديمية",
        type: "digital-product",
        price: 149.99
      },
      {
        id: 8,
        title: "دورة تصميم واجهات المستخدم UX/UI - إنشاء تجارب مستخدم مميزة",
        type: "course",
        price: 199.00
      }
    ],
    status: "published",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18"
  },
  {
    id: 3,
    title: "باقة المدير التنفيذي",
    description: "جميع الأدوات والموارد اللازمة للإدارة والاستراتيجية",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
    price: 799.99,
    discountedPrice: 599.99,
    products: [
      {
        id: 2,
        title: "برنامج التدريب التنفيذي",
        type: "digital-product",
        price: 499.99
      },
      {
        id: 3,
        title: "نظام إدارة الجودة الأكاديمية",
        type: "digital-product",
        price: 199.99
      },
      {
        id: 4,
        title: "شهادة الإدارة الاستراتيجية",
        type: "digital-product",
        price: 799.99
      }
    ],
    status: "draft",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-22"
  }
];

function ProductPackages() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("الكل");
  const [table, setTable] = useState<any>(null);

  const filteredPackages = useMemo(() => {
    return samplePackages.filter((pkg) => {
      const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === "الكل" || 
                           (selectedStatus === "منشور" && pkg.status === "published") ||
                           (selectedStatus === "مسودة" && pkg.status === "draft");
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedStatus("الكل");
  };

  const handleEdit = (pkg: ProductPackage) => {
    console.log("Edit package:", pkg);
    navigate(`/dashboard/product-packages/edit/${pkg.id}`);
  };

  const handleDelete = (pkg: ProductPackage) => {
    const confirmed = window.confirm(`هل أنت متأكد من حذف الباقة "${pkg.title}"؟`);
    if (confirmed) {
      console.log("Delete package:", pkg.id);
      // Here you would call your delete API
    }
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={Package}
        title="إدارة حزم المنتجات"
        actions={
          <Link
            to="/dashboard/product-packages/add"
            className={buttonVariants()}
          >
            <Plus className="w-4 h-4 mr-2" />
            إضافة باقة جديدة
          </Link>
        }
      />
      
      <ProductPackageStats packages={filteredPackages} />
      
      <ProductPackageFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onClearFilters={handleClearFilters}
        table={table}
      />
      
      <ProductPackageTable
        packages={filteredPackages}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onTableReady={setTable}
      />
    </div>
  );
}

export default ProductPackages;