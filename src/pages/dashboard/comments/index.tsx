import React, { useMemo, useState } from "react";
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
import { 
  MessageSquare, 
  Search, 
  Star,
  User,
  TrendingUp
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import type { StudentComment } from "@/types/student-notification";

// StatCard Component - Same as BlogStats
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "positive" | "negative";
}

const StatCard = ({ title, value, icon, change, changeType }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg border-0 shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p
              className={`text-sm mt-2 flex items-center gap-1 ${
                changeType === "positive" ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              {change}
            </p>
          )}
        </div>
        <div className="text-blue-600">{icon}</div>
      </div>
    </div>
  );
}

// Mock data for all comments
const mockComments: (StudentComment & { studentName: string; studentImage: string })[] = [
  {
    id: 1,
    studentName: "أحمد محمد السعيد",
    studentImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    itemName: "دورة التسويق الرقمي",
    itemType: "course",
    comment: "دورة ممتازة ومفيدة جداً، أنصح الجميع بها",
    rating: 5,
    commentDate: "2024-07-25"
  },
  {
    id: 2,
    studentName: "أحمد محمد السعيد",
    studentImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    itemName: "كتاب البرمجة الشاملة",
    itemType: "product",
    comment: "محتوى رائع ولكن يحتاج لمزيد من الأمثلة العملية",
    rating: 4,
    commentDate: "2024-08-10"
  },
  {
    id: 3,
    studentName: "فاطمة علي أحمد",
    studentImage: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face",
    itemName: "دورة تطوير المواقع",
    itemType: "course",
    comment: "دورة شاملة وممتازة، تعلمت الكثير",
    rating: 5,
    commentDate: "2024-06-30"
  },
  {
    id: 4,
    studentName: "فاطمة علي أحمد",
    studentImage: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face",
    itemName: "مقالة أساسيات التصميم",
    itemType: "article",
    comment: "مقالة مفيدة ومبسطة",
    rating: 4,
    commentDate: "2024-07-10"
  }
];

function CommentsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("الكل");
  const [selectedRating, setSelectedRating] = useState("الكل");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const filteredComments = useMemo(() => {
    return mockComments.filter((comment) => {
      const matchesSearch =
        searchTerm === "" ||
        comment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.comment.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        selectedType === "الكل" || 
        (selectedType === "دورة" && comment.itemType === "course") ||
        (selectedType === "منتج" && comment.itemType === "product") ||
        (selectedType === "مقالة" && comment.itemType === "article");

      const matchesRating =
        selectedRating === "الكل" ||
        (selectedRating === "5 نجوم" && comment.rating === 5) ||
        (selectedRating === "4 نجوم" && comment.rating === 4) ||
        (selectedRating === "3 نجوم" && comment.rating === 3) ||
        (selectedRating === "2 نجمة" && comment.rating === 2) ||
        (selectedRating === "1 نجمة" && comment.rating === 1);

      return matchesSearch && matchesType && matchesRating;
    });
  }, [searchTerm, selectedType, selectedRating]);

  const columns: ColumnDef<typeof mockComments[0]>[] = [
    {
      accessorKey: "studentName",
      header: "الطالب",
      cell: ({ row }) => {
        const comment = row.original;
        return (
          <div className="flex items-center gap-3">
            <img
              src={comment.studentImage}
              alt={comment.studentName}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div className="font-medium text-gray-900">{comment.studentName}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "itemType",
      header: "نوع العنصر",
      cell: ({ row }) => {
        const comment = row.original;
        return (
          <Badge className={
            comment.itemType === "course" ? "bg-blue-100 text-blue-800" :
            comment.itemType === "product" ? "bg-green-100 text-green-800" :
            "bg-purple-100 text-purple-800"
          }>
            {comment.itemType === "course" ? "دورة" :
             comment.itemType === "product" ? "منتج" : "مقالة"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "itemName",
      header: "اسم العنصر",
      cell: ({ row }) => (
        <div className="font-medium text-gray-900">{row.getValue("itemName")}</div>
      ),
    },
    {
      accessorKey: "comment",
      header: "التعليق",
      cell: ({ row }) => (
        <div className="max-w-xs truncate text-gray-600" title={row.getValue("comment")}>
          {row.getValue("comment")}
        </div>
      ),
    },
    {
      accessorKey: "rating",
      header: "التقييم",
      cell: ({ row }) => {
        const rating = row.getValue("rating") as number;
        return (
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${
                  i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                }`} 
              />
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "commentDate",
      header: "تاريخ التعليق",
      cell: ({ row }) => {
        const date = new Date(row.getValue("commentDate"));
        return (
          <div className="text-sm text-gray-600">
            {date.toLocaleDateString("ar-SA")}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: filteredComments,
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

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={MessageSquare}
        title="التعليقات"
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="إجمالي التعليقات"
          value={mockComments.length}
          icon={<MessageSquare className="w-8 h-8" />}
          change="+18%"
          changeType="positive"
        />
        <StatCard
          title="تعليقات الدورات"
          value={mockComments.filter(c => c.itemType === "course").length}
          icon={<MessageSquare className="w-8 h-8" />}
          change="+12%"
          changeType="positive"
        />
        <StatCard
          title="تعليقات المنتجات"
          value={mockComments.filter(c => c.itemType === "product").length}
          icon={<MessageSquare className="w-8 h-8" />}
        />
        <StatCard
          title="تعليقات المقالات"
          value={mockComments.filter(c => c.itemType === "article").length}
          icon={<MessageSquare className="w-8 h-8" />}
        />
        <StatCard
          title="متوسط التقييم"
          value={(mockComments.reduce((sum, c) => sum + c.rating, 0) / mockComments.length).toFixed(1)}
          icon={<Star className="w-8 h-8" />}
          change="+5%"
          changeType="positive"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border-0">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="ابحث في التعليقات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>

            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="نوع العنصر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="الكل">جميع الأنواع</SelectItem>
                <SelectItem value="دورة">دورة</SelectItem>
                <SelectItem value="منتج">منتج</SelectItem>
                <SelectItem value="مقالة">مقالة</SelectItem>
              </SelectContent>
            </Select>

            {/* Rating Filter */}
            <Select value={selectedRating} onValueChange={setSelectedRating}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="التقييم" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="الكل">جميع التقييمات</SelectItem>
                <SelectItem value="5 نجوم">5 نجوم</SelectItem>
                <SelectItem value="4 نجوم">4 نجوم</SelectItem>
                <SelectItem value="3 نجوم">3 نجوم</SelectItem>
                <SelectItem value="2 نجمة">2 نجمة</SelectItem>
                <SelectItem value="1 نجمة">1 نجمة</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Comments Table */}
      <div className="rounded-lg border-0 shadow-sm bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-gray-200">
                {headerGroup.headers.map((header) => (
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
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
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
                  لا توجد تعليقات.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <div className="text-sm text-muted-foreground">
          عرض {table.getFilteredRowModel().rows.length} تعليق.
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

export default CommentsManagementPage;