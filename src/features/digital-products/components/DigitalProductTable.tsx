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
import { Edit, Trash2 } from "lucide-react";
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
import type { DigitalProduct } from "@/types/digital-product";

interface DigitalProductTableProps {
  products: DigitalProduct[];
  onTableReady?: (table: any) => void;
  onEdit?: (product: DigitalProduct) => void;
  onDelete?: (product: DigitalProduct) => void;
  onDownload?: (product: DigitalProduct) => void;
  onStatusChange?: (product: DigitalProduct, status: 'published' | 'draft') => void;
}

const columns: ColumnDef<DigitalProduct>[] = [
  {
    accessorKey: "title",
    header: "العنوان",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-3">
          <img
            src={product.image}
            alt={product.title}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex flex-col">
            <span className="font-medium text-gray-900 line-clamp-2">
              {product.title}
            </span>
            <span className="text-sm text-gray-500">
              {product.description.substring(0, 60)}...
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "التصنيف",
    cell: ({ row }) => (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        {row.getValue("category")}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "الحالة",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={status === "published" ? "default" : "secondary"}
          className={`${
            status === "published"
              ? "bg-green-100 text-green-800 border-green-200"
              : "bg-yellow-100 text-yellow-800 border-yellow-200"
          }`}
        >
          {status === "published" ? "منشور" : "مسودة"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "price",
    header: "السعر",
    cell: ({ row }) => {
      const product = row.original;
      const displayPrice = product.discountPrice || product.price;
      return (
        <div className="font-semibold text-gray-900">
          ${displayPrice}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "تاريخ الإنشاء",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <div className="text-gray-600">
          {date.toLocaleDateString("ar-SA", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "الإجراءات",
    enableHiding: false,
    cell: ({ row, table }) => {
      const product = row.original;
      const tableProps = (table.options.meta as any) || {};
      return (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            onClick={() => tableProps.onEdit?.(product)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
            onClick={() => tableProps.onDelete?.(product)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

function DigitalProductTable({ products, onTableReady, onEdit, onDelete, onDownload }: DigitalProductTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: products,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    meta: {
      onEdit,
      onDelete,
      onDownload,
    },
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

  // Mobile card view component
  const MobileProductCard = ({ product }: { product: DigitalProduct }) => {
    const displayPrice = product.discountPrice || product.price;
    
    return (
      <div className="bg-white rounded-lg border-0 shadow-sm p-4 space-y-3">
        <div className="flex items-start gap-3">
          <img
            src={product.image}
            alt={product.title}
            className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm leading-5 line-clamp-2 text-right">
              {product.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1 text-right">
              {product.description.substring(0, 60)}...
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-blue-600"
              onClick={() => onEdit?.(product)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-600"
              onClick={() => onDelete?.(product)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-end">
          <Badge
            className={`text-xs ${
              product.status === "published"
                ? "bg-green-100 text-green-800 border-green-200"
                : "bg-yellow-100 text-yellow-800 border-yellow-200"
            }`}
          >
            {product.status === "published" ? "منشور" : "مسودة"}
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
            {product.category}
          </Badge>
        </div>

        <div className="flex justify-between items-center pt-2 border-t">
          <div className="text-sm font-medium text-gray-900">
            ${displayPrice}
          </div>
          <div className="text-sm text-gray-600">
            {new Date(product.createdAt).toLocaleDateString("ar-SA")}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => {
            const product = row.original;
            return <MobileProductCard key={row.id} product={product} />;
          })
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد منتجات.
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-lg border-0 shadow-sm bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
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
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4 text-right">
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
                  لا توجد منتجات.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        <div className="flex items-center justify-between space-x-2 py-4 px-6">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} من{" "}
            {table.getFilteredRowModel().rows.length} صف محدد.
          </div>
          <div className="space-x-2">
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
    </div>
  );
}

export default DigitalProductTable;