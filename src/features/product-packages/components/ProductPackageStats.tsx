import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Tag, ShoppingCart, DollarSign } from "lucide-react";
import type { ProductPackage } from "@/types/product-package";
import { formatCurrency } from "@/lib/formatters";

interface ProductPackageStatsProps {
  packages: ProductPackage[];
}

export const ProductPackageStats: React.FC<ProductPackageStatsProps> = ({ packages }) => {
  const totalPackages = packages.length;
  const publishedPackages = packages.filter(pkg => pkg.status === 'published').length;
  const draftPackages = packages.filter(pkg => pkg.status === 'draft').length;
  
  // Calculate total products across all packages
  const totalProducts = packages.reduce((sum, pkg) => sum + pkg.products.length, 0);
  
  // Calculate total revenue (using discounted price if available, otherwise regular price)
  const totalRevenue = packages.reduce((sum, pkg) => {
    const packagePrice = pkg.discountedPrice || pkg.price;
    return sum + packagePrice;
  }, 0);

  const stats = [
    {
      title: "إجمالي الحزم",
      value: totalPackages,
      icon: Package,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "الحزم المنشورة",
      value: publishedPackages,
      icon: Tag,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "إجمالي المنتجات",
      value: totalProducts,
      icon: ShoppingCart,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "الإيرادات الإجمالية",
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};