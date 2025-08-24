import React, { useState } from "react";
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
import { Edit, Trash2, Calendar, Users, Percent, Package, BarChart3 } from "lucide-react";

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

import type { Offer } from "@/types/offer";

interface OfferTableProps {
  offers: Offer[];
  onTableReady?: (table: any) => void;
  onUpdate?: (id: number, updates: Partial<Offer>) => void;
  onDelete?: (id: number) => void;
  onViewStats?: (offer: Offer) => void;
}

export default function OfferTable({ offers, onTableReady, onUpdate, onDelete, onViewStats }: OfferTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleDelete = (offer: Offer) => {
    if (window.confirm(`هل أنت متأكد من رغبتك في حذف العرض "${offer.title}"؟`)) {
      if (onDelete) {
        onDelete(offer.id);
      }
    }
  };

  const getStatusColor = (status: string, expiryDate: string) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    
    if (expiry <= now || status === 'expired') {
      return "bg-red-100 text-red-800 border-red-200";
    }
    
    if (status === 'active') {
      return "bg-green-100 text-green-800 border-green-200";
    }
    
    return "bg-yellow-100 text-yellow-800 border-yellow-200";
  };

  const getStatusText = (status: string, expiryDate: string) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    
    if (expiry <= now || status === 'expired') {
      return "منتهي";
    }
    
    if (status === 'active') {
      return "نشط";
    }
    
    return "غير نشط";
  };

  const columns: ColumnDef<Offer>[] = [
    {
      accessorKey: "title",
      header: "العرض",
      cell: ({ row }) => {
        const offer = row.original;
        return (
          <div className="flex items-center gap-3">
            <img
              src={offer.product.image}
              alt={offer.product.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex flex-col">
              <span className="font-medium text-gray-900 line-clamp-2">
                {offer.title}
              </span>
              <span className="text-sm text-gray-500">
                {offer.product.name}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "product.type",
      header: "نوع المنتج",
      cell: ({ row }) => {
        const type = row.original.product.type;
        const typeLabels = {
          "course": "دورة",
          "session": "جلسة",
          "digital-product": "منتج رقمي",
          "workshop": "ورشة عمل"
        };
        const typeColors = {
          "course": "bg-blue-100 text-blue-800 border-blue-200",
          "session": "bg-green-100 text-green-800 border-green-200",
          "digital-product": "bg-purple-100 text-purple-800 border-purple-200",
          "workshop": "bg-orange-100 text-orange-800 border-orange-200"
        };
        
        return (
          <Badge className={typeColors[type]}>
            {typeLabels[type]}
          </Badge>
        );
      },
    },
    {
      accessorKey: "pricing",
      header: "السعر",
      cell: ({ row }) => {
        const offer = row.original;
        return (
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium text-green-600">
                {offer.discountedPrice} ر.س
              </span>
              <Badge className="bg-green-50 text-green-700 border-green-200">
                <Percent className="w-3 h-3 ml-1" />
                {offer.discountPercentage}%
              </Badge>
            </div>
            <span className="text-sm text-gray-500 line-through">
              {offer.originalPrice} ر.س
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "purchases",
      header: "المشتريات",
      cell: ({ row }) => {
        const offer = row.original;
        const percentage = (offer.currentPurchases / offer.maxPurchases) * 100;
        
        return (
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-sm">
              <Users className="w-4 h-4 text-gray-500" />
              <span>{offer.currentPurchases} / {offer.maxPurchases}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 mt-1">
              {percentage.toFixed(0)}% مكتمل
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "expiryDate",
      header: "تاريخ الانتهاء",
      cell: ({ row }) => {
        const date = new Date(row.getValue("expiryDate"));
        const now = new Date();
        const isExpired = date <= now;
        
        return (
          <div className="flex flex-col">
            <div className={`flex items-center gap-1 text-sm ${isExpired ? 'text-red-600' : 'text-gray-600'}`}>
              <Calendar className="w-4 h-4" />
              <span>{date.toLocaleDateString("ar-SA")}</span>
            </div>
            {isExpired && (
              <span className="text-xs text-red-500 mt-1">منتهي الصلاحية</span>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "الإجراءات",
      enableHiding: false,
      cell: ({ row }) => {
        const offer = row.original;

        return (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-green-600 hover:text-green-800 hover:bg-green-50"
              onClick={() => onViewStats && onViewStats(offer)}
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
              onClick={() => console.log(`تعديل العرض ${offer.id}`)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
              onClick={() => handleDelete(offer)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: offers,
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
            const offer = row.original;
            return (
              <div
                key={row.id}
                className="bg-white rounded-lg border-0 shadow-sm p-4 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={offer.product.image}
                    alt={offer.product.name}
                    className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm leading-5 line-clamp-2 text-right">
                      {offer.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 text-right">
                      {offer.product.name}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-medium text-green-600 text-sm">
                        {offer.discountedPrice} ر.س
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        {offer.originalPrice} ر.س
                      </span>
                      <Badge className="bg-green-50 text-green-700 border-green-200 text-xs">
                        {offer.discountPercentage}%
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-green-600"
                      onClick={() => onViewStats && onViewStats(offer)}
                    >
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-blue-600"
                      onClick={() => console.log(`تعديل العرض ${offer.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-600"
                      onClick={() => handleDelete(offer)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-end">
                  <Badge className={getStatusColor(offer.status, offer.expiryDate)}>
                    {getStatusText(offer.status, offer.expiryDate)}
                  </Badge>
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{offer.currentPurchases}/{offer.maxPurchases}</span>
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(offer.expiryDate).toLocaleDateString("ar-SA")}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد عروض.
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
                  لا توجد عروض.
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