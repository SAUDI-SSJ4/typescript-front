import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, BarChart3 } from "lucide-react";
import type { ProductPackage } from "@/types/product-package";
import type { Table as TanStackTable } from "@tanstack/react-table";
import { formatCurrency } from "@/lib/formatters";

interface ProductPackageTableProps {
  packages: ProductPackage[];
  onEdit: (pkg: ProductPackage) => void;
  onDelete: (pkg: ProductPackage) => void;
  onTableReady?: (table: TanStackTable<ProductPackage>) => void;
}

const ProductPackageTable: React.FC<ProductPackageTableProps> = ({
  packages,
  onEdit,
  onDelete,
}) => {
  const getStatusBadge = (status: ProductPackage["status"]) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">منشور</Badge>;
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">مسودة</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">غير معروف</Badge>;
    }
  };

  const handleEdit = (pkg: ProductPackage) => {
    onEdit(pkg);
  };

  const handleDelete = (pkg: ProductPackage) => {
    onDelete(pkg);
  };

  return (
    <div className="w-full">
      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {packages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد حزم منتجات.
          </div>
        ) : (
          packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-lg border-0 shadow-sm p-4 space-y-3"
            >
              <div className="flex items-start gap-3">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm leading-5 line-clamp-2 text-right">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 text-right">
                    {pkg.description.substring(0, 60)}...
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-green-600"
                    onClick={() => console.log(`عرض الإحصائيات للباقة ${pkg.id}`)}
                  >
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-blue-600"
                    onClick={() => onEdit(pkg)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600"
                    onClick={() => onDelete(pkg)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-end">
                <Badge variant="secondary" className="text-xs">
                  {pkg.products.length} منتجات
                </Badge>
                <Badge
                  className={`text-xs ${
                    pkg.status === "published"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-yellow-100 text-yellow-800 border-yellow-200"
                  }`}
                >
                  {pkg.status === "published" ? "منشور" : "مسودة"}
                </Badge>
              </div>

              <div className="flex justify-between items-center pt-2 border-t">
                <div className="text-sm font-medium text-gray-900">
                  {pkg.discountedPrice ? (
                    <>
                      <span>{formatCurrency(pkg.discountedPrice)}</span>
                      <span className="text-xs text-gray-500 line-through mr-2">
                        {formatCurrency(pkg.price)}
                      </span>
                    </>
                  ) : (
                    <span>{formatCurrency(pkg.price)}</span>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {new Date(pkg.createdAt).toLocaleDateString('ar-SA')}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-lg border-0 shadow-sm bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="text-right font-semibold text-gray-700 py-4">
                الباقة
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">
                السعر
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">
                المنتجات
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">
                الحالة
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">
                تاريخ الإنشاء
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">
                الإجراءات
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  لا توجد حزم منتجات
                </TableCell>
              </TableRow>
            ) : (
              packages.map((pkg) => (
                <TableRow key={pkg.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={pkg.image} 
                        alt={pkg.title} 
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 line-clamp-2">
                          {pkg.title}
                        </span>
                        <span className="text-sm text-gray-500">
                          {pkg.description.substring(0, 60)}...
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-col">
                      {pkg.discountedPrice ? (
                        <>
                          <span className="font-medium text-gray-900">{formatCurrency(pkg.discountedPrice)}</span>
                          <span className="text-sm text-gray-500 line-through">{formatCurrency(pkg.price)}</span>
                        </>
                      ) : (
                        <span className="font-medium text-gray-900">{formatCurrency(pkg.price)}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge variant="secondary">
                      {pkg.products.length} منتجات
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge
                      className={`${
                        pkg.status === "published"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-yellow-100 text-yellow-800 border-yellow-200"
                      }`}
                    >
                      {pkg.status === "published" ? "منشور" : "مسودة"}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="text-sm text-gray-600">
                      {new Date(pkg.createdAt).toLocaleDateString('ar-SA')}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-green-600 hover:text-green-800 hover:bg-green-50"
                        onClick={() => console.log(`عرض الإحصائيات للباقة ${pkg.id}`)}
                      >
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        onClick={() => onEdit(pkg)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                        onClick={() => onDelete(pkg)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductPackageTable;