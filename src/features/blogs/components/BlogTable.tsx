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
import { Edit, Trash2, Eye, BarChart3 } from "lucide-react";
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

import type { Blog } from "@/types/blog";
import BlogStatsModal from "./BlogStatsModal";

interface BlogTableProps {
  blogs: Blog[];
  onTableReady?: (table: any) => void;
  onEdit?: (blog: Blog) => void;
  onDelete?: (blog: Blog) => void;
  onStatusChange?: (blog: Blog, status: 'published' | 'draft') => void;
}

function BlogTable({ blogs, onTableReady }: BlogTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isStatsModalOpen, setIsStatsModalOpen] = React.useState(false);
  const [selectedBlog, setSelectedBlog] = React.useState<Blog | null>(null);

  const handleViewStats = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsStatsModalOpen(true);
  };

  const columns: ColumnDef<Blog>[] = [
    {
      accessorKey: "title",
      header: "العنوان",
      cell: ({ row }) => {
        const blog = row.original;
        return (
          <div className="flex items-center gap-3">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex flex-col">
              <span className="font-medium text-gray-900 line-clamp-2">
                {blog.title}
              </span>
              <span className="text-sm text-gray-500">
                {blog.excerpt.substring(0, 60)}...
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "التصنيف",
      cell: ({ row }) => {
        const category = row.getValue("category") as string;
        const categoryColors = {
          "تقنية": "bg-blue-100 text-blue-800 border-blue-200",
          "تعليم": "bg-green-100 text-green-800 border-green-200",
          "أعمال": "bg-purple-100 text-purple-800 border-purple-200",
          "صحة": "bg-red-100 text-red-800 border-red-200",
          "رياضة": "bg-orange-100 text-orange-800 border-orange-200",
          "سفر": "bg-cyan-100 text-cyan-800 border-cyan-200",
          "طبخ": "bg-yellow-100 text-yellow-800 border-yellow-200",
          "فن": "bg-pink-100 text-pink-800 border-pink-200",
        };
        return (
          <Badge
            className={`${
              categoryColors[category as keyof typeof categoryColors] ||
              "bg-gray-100 text-gray-800 border-gray-200"
            }`}
          >
            {category}
          </Badge>
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
      accessorKey: "author",
      header: "الكاتب",
      cell: ({ row }) => {
        const author = row.getValue("author") as string;
        return <div className="font-medium">{author}</div>;
      },
    },
    {
      accessorKey: "views",
      header: "المشاهدات",
      cell: ({ row }) => {
        const views = row.getValue("views") as number;
        return (
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4 text-gray-500" />
            <span>{views?.toLocaleString() || 0}</span>
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
          <div className="text-sm text-gray-600">
            {date.toLocaleDateString("ar-SA")}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "الإجراءات",
      enableHiding: false,
      cell: ({ row }) => {
        const blog = row.original;

        return (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-green-600 hover:text-green-800 hover:bg-green-50"
              onClick={() => handleViewStats(blog)}
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
              asChild
            >
              <Link to={`/dashboard/blogs/edit/${blog.id}`}>
                <Edit className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
              onClick={() => console.log(`حذف المقال ${blog.id}`)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: blogs,
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
            const blog = row.original;
            return (
              <div
                key={row.id}
                className="bg-white rounded-lg border-0 shadow-sm p-4 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm leading-5 line-clamp-2 text-right">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 text-right">
                      {blog.author}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 text-right">
                      {blog.excerpt.substring(0, 60)}...
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-green-600"
                      onClick={() => handleViewStats(blog)}
                    >
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-blue-600"
                      asChild
                    >
                      <Link to={`/dashboard/blogs/edit/${blog.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-600"
                      onClick={() => console.log(`حذف المقال ${blog.id}`)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-end">
                  <Badge
                    className={`text-xs ${
                      blog.category === "تقنية"
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : blog.category === "تعليم"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : blog.category === "أعمال"
                        ? "bg-purple-100 text-purple-800 border-purple-200"
                        : "bg-gray-100 text-gray-800 border-gray-200"
                    }`}
                  >
                    {blog.category}
                  </Badge>
                  <Badge
                    className={`text-xs ${
                      blog.status === "published"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-yellow-100 text-yellow-800 border-yellow-200"
                    }`}
                  >
                    {blog.status === "published" ? "منشور" : "مسودة"}
                  </Badge>
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Eye className="w-4 h-4" />
                    <span>{blog.views?.toLocaleString() || 0}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(blog.createdAt).toLocaleDateString("ar-SA")}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد مقالات.
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
                  لا توجد مقالات.
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

      {/* Blog Statistics Modal */}
      {selectedBlog && (
        <BlogStatsModal
          isOpen={isStatsModalOpen}
          onClose={() => {
            setIsStatsModalOpen(false);
            setSelectedBlog(null);
          }}
          blog={selectedBlog}
        />
      )}
    </div>
  );
}

export default BlogTable;