import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { Edit, Trash2, Copy, BarChart3, Percent, DollarSign, Users, Calendar, Eye } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Coupon } from "@/types/coupon";
import { CouponProductsModal } from "./CouponProductsModal";

interface CouponTableProps {
  coupons: Coupon[];
  onTableReady?: (table: any) => void;
  onEdit?: (coupon: Coupon) => void;
  onDelete?: (coupon: Coupon) => void;
  onCopy?: (coupon: Coupon) => void;
  onStatusChange?: (coupon: Coupon, status: 'active' | 'inactive') => void;
}

const columns: ColumnDef<Coupon>[] = [
  {
    accessorKey: "code",
    header: "كود الكوبون",
    cell: ({ row }) => {
      const coupon = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="font-mono font-bold text-blue-600 text-lg">
              {coupon.code}
            </span>
            <span className="text-sm text-gray-500 font-medium">
              {coupon.name}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "النوع والقيمة",
    cell: ({ row }) => {
      const coupon = row.original;
      return (
        <div className="flex items-center gap-2">
          {coupon.type === "percentage" ? (
            <>
              <Percent className="w-4 h-4 text-green-600" />
              <span className="font-bold text-green-600">{coupon.value}%</span>
            </>
          ) : (
            <>
              <DollarSign className="w-4 h-4 text-blue-600" />
              <span className="font-bold text-blue-600">{coupon.value} ر.س</span>
            </>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "الحالة",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      
      return (
        <Badge
          className={`${
            status === "active"
              ? "bg-green-100 text-green-800 border-green-200"
              : status === "inactive"
              ? "bg-yellow-100 text-yellow-800 border-yellow-200"
              : "bg-red-100 text-red-800 border-red-200"
          }`}
        >
          {status === "active" ? "نشط" : status === "inactive" ? "غير نشط" : "منتهي"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "usedCount",
    header: "الاستخدام",
    cell: ({ row }) => {
      const coupon = row.original;
      const usagePercentage = coupon.usageLimit 
        ? (coupon.usedCount / coupon.usageLimit) * 100 
        : 0;
      
      return (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-500" />
          <div className="flex flex-col">
            <span className="font-medium">
              {coupon.usedCount} / {coupon.usageLimit || "∞"}
            </span>
            {coupon.usageLimit && (
              <div className="w-16 bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-blue-600 h-1 rounded-full" 
                  style={{ width: `${usagePercentage}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: "تاريخ الانتهاء",
    cell: ({ row }) => {
      const date = new Date(row.getValue("endDate"));
      const isExpired = date < new Date();
      
      return (
        <div className={`flex items-center gap-2 ${isExpired ? 'text-red-600' : 'text-gray-600'}`}>
          <Calendar className="w-4 h-4" />
          <span className="text-sm">
            {date.toLocaleDateString("ar-SA")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "applicableProducts",
    header: "المنتجات المطبقة",
    cell: ({ row }) => {
      const coupon = row.original;
      if (coupon.applicationType === "general") {
        return (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-600 font-medium">عام</span>
          </div>
        );
      } else {
        const products = coupon.applicableProducts || [];
        const productTypeMap = {
          course: "دورة",
          session: "جلسة",
          "digital-product": "منتج رقمي"
        };
        
        if (products.length === 0) {
          return (
            <div className="text-gray-400 text-sm">لا توجد منتجات</div>
          );
        }
        
        if (products.length === 1) {
          const product = products[0];
          return (
            <div className="flex items-center gap-3">
              <img
                src={product.image || "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png"}
                alt={product.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex flex-col">
                <span className="font-medium text-blue-600">
                  {product.name}
                </span>
                <span className="text-sm text-gray-500">
                  {productTypeMap[product.type as keyof typeof productTypeMap]}
                </span>
              </div>
            </div>
          );
        }
        
        // عرض منتجات متعددة - زر لفتح المودال
        return (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-blue-600 font-medium text-sm">
                {products.length} منتجات
              </span>
            </div>
            <CouponProductsModal
              products={products}
              couponCode={coupon.code}
              trigger={
                <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                  <Eye className="w-3 h-3 mr-1" />
                  عرض
                </Button>
              }
            />
          </div>
        );
      }
    },
  },
  {
    id: "actions",
    header: "الإجراءات",
    enableHiding: false,
    cell: ({ row }) => {
      const coupon = row.original;

      return (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-green-600 hover:text-green-800 hover:bg-green-50"
            asChild
          >
            <Link to={`/dashboard/coupons/stats/${coupon.id}`}>
              <BarChart3 className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            onClick={() => console.log(`نسخ كود الكوبون ${coupon.code}`)}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            onClick={() => console.log(`تعديل الكوبون ${coupon.id}`)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
            onClick={() => console.log(`حذف الكوبون ${coupon.id}`)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

function CouponTable({ coupons, onTableReady }: CouponTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: coupons,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  React.useEffect(() => {
    if (onTableReady) {
      onTableReady(table);
    }
  }, [table, onTableReady]);

  return (
    <div className="w-full">
      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => {
            const coupon = row.original;
            return (
              <div
                key={row.id}
                className="bg-white rounded-lg border-0 shadow-sm p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-mono font-bold text-blue-600 text-lg">
                      {coupon.code}
                    </h3>
                    <p className="text-sm text-gray-600">{coupon.name}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-green-600"
                      asChild
                    >
                      <Link to={`/dashboard/coupons/stats/${coupon.id}`}>
                        <BarChart3 className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-blue-600"
                      onClick={() => console.log(`نسخ كود الكوبون ${coupon.code}`)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-blue-600"
                      onClick={() => console.log(`تعديل الكوبون ${coupon.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-600"
                      onClick={() => console.log(`حذف الكوبون ${coupon.id}`)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {coupon.type === "percentage" ? (
                      <>
                        <Percent className="w-4 h-4 text-green-600" />
                        <span className="font-bold text-green-600">{coupon.value}%</span>
                      </>
                    ) : (
                      <>
                        <DollarSign className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-blue-600">{coupon.value} ر.س</span>
                      </>
                    )}
                  </div>
                  <Badge
                    className={`text-xs ${
                      coupon.status === "active"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : coupon.status === "inactive"
                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                        : "bg-red-100 text-red-800 border-red-200"
                    }`}
                  >
                    {coupon.status === "active" ? "نشط" : coupon.status === "inactive" ? "غير نشط" : "منتهي"}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {coupon.applicationType === "general" ? (
                      <>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-600 font-medium text-sm">كوبون عام</span>
                      </>
                    ) : (
                      <div className="space-y-2">
                        {coupon.applicableProducts && coupon.applicableProducts.length > 0 ? (
                          coupon.applicableProducts.length === 1 ? (
                            <div className="flex items-center gap-2">
                              <img
                                src={coupon.applicableProducts[0].image || "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png"}
                                alt={coupon.applicableProducts[0].name}
                                className="w-8 h-8 rounded object-cover"
                              />
                              <div className="flex flex-col">
                                <span className="font-medium text-blue-600 text-sm">
                                  {coupon.applicableProducts[0].name}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {coupon.applicableProducts[0].type === 'course' ? 'دورة' : 
                                   coupon.applicableProducts[0].type === 'session' ? 'جلسة' : 'منتج رقمي'}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-blue-600 font-medium text-sm">
                                  {coupon.applicableProducts.length} منتجات
                                </span>
                              </div>
                              <CouponProductsModal
                                products={coupon.applicableProducts}
                                couponCode={coupon.code}
                                trigger={
                                  <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                                    <Eye className="w-3 h-3 mr-1" />
                                    عرض
                                  </Button>
                                }
                              />
                            </div>
                          )
                        ) : (
                          <span className="text-gray-400 text-sm">لا توجد منتجات</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{coupon.usedCount} / {coupon.usageLimit || "∞"}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(coupon.endDate).toLocaleDateString("ar-SA")}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد كوبونات.
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-lg border-0 shadow-sm bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-gray-200"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-right font-semibold text-gray-700 py-4"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-right py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  لا توجد كوبونات.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} من{" "}
          {table.getFilteredRowModel().rows.length} صف محدد.
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            السابق
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            التالي
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CouponTable;
