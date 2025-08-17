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
import { ChevronDown, Edit, Trash2, Star } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import ImageField from "@/components/shared/formFields/image-field";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useUpdateOpinion,
  useDeleteOpinion,
} from "../hooks/useOpinionsMutations";
import RemoteImage from "@/components/shared/RemoteImage";
import type { OpinionPayload } from "@/types/academy/opinion";

interface StudentReview {
  id: string | number;
  name: string;
  title: string;
  content: string;
  rating: number;
  image?: string;
  is_featured?: boolean;
  is_approved?: boolean;
  created_at?: string;
  updated_at?: string;
}

interface StudentReviewsTableProps {
  reviews: StudentReview[];
}

function StudentReviewsTable({ reviews }: StudentReviewsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Edit Dialog States
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<StudentReview | null>(
    null
  );

  // Mutations
  const updateOpinionMutation = useUpdateOpinion();
  const deleteOpinionMutation = useDeleteOpinion();

  // Edit Form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      content: "",
      rating: 5,
    },
    mode: "onChange",
  });

  const columns: ColumnDef<StudentReview>[] = [
    {
      accessorKey: "image",
      header: "الصورة",
      cell: ({ row }) => {
        const image = row.getValue("image") as string;
        return (
          <RemoteImage
            src={image?.replace("static/", "") || ""}
            alt={`صورة ${row.getValue("name")}`}
            className="h-12 w-12 rounded-lg object-contain"
          />
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: "اسم الطالب",
      cell: ({ row }) => (
        <div className="max-w-[300px]">
          <div className="font-medium text-right truncate">
            {row.getValue("name")}
          </div>
        </div>
      ),
    },

    {
      accessorKey: "rating",
      header: "التقييم",
      cell: ({ row }) => (
        <div className="text-[#FFC107]">
          {"★".repeat(row.getValue("rating"))}
        </div>
      ),
    },
    {
      accessorKey: "content",
      header: "التعليق",
      cell: ({ row }) => (
        <Badge variant="outline" className="border-blue-200 text-blue-800">
          {row.getValue("content")}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "الإجراءات",
      enableHiding: false,
      cell: ({ row }) => {
        const review = row.original;
        return (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
              onClick={() => handleEditClick(review)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]" dir="rtl">
                <DialogHeader>
                  <DialogTitle className="text-right">
                    حذف تقييم الطالب
                  </DialogTitle>
                  <DialogDescription className="text-right">
                    هل أنت متأكد أنك تريد حذف هذا التقييم؟ هذه العملية لا يمكن
                    التراجع عنها.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2">
                  <Button type="button" variant="outline" className="flex-1">
                    إلغاء
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleDelete(review.id.toString())}
                    disabled={deleteOpinionMutation.isPending}
                    className="flex-1"
                  >
                    {deleteOpinionMutation.isPending ? "جاري الحذف..." : "حذف"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: reviews,
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
  });

  // Edit functions
  const handleEditClick = (review: StudentReview) => {
    setEditingReview(review);
    setValue("name", review.name);
    setValue("content", review.content);
    setValue("rating", review.rating);
    // Image is handled by the ImageField component
    setEditDialogOpen(true);
  };

  const onEditSubmit = async (data: OpinionPayload) => {
    if (!editingReview) return;

    try {
      await updateOpinionMutation.mutateAsync({
        id: editingReview.id.toString(),
        data,
      });

      setEditDialogOpen(false);
      setEditingReview(null);
      reset();
    } catch (error) {
      console.error("Error updating opinion:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteOpinionMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting opinion:", error);
    }
  };

  const renderStars = (
    rating: number,
    interactive = false,
    onStarClick?: (rating: number) => void
  ) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-300" : ""}`}
            onClick={() => interactive && onStarClick?.(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4">
        <Input
          placeholder="البحث في الاراء عن اسم الطالب..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="w-full sm:max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto sm:ml-auto">
              الأعمدة <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                const columnHeaders = {
                  image: "الصورة",
                  name: "اسم الطالب",
                  rating: "التقييم",
                  content: "التعليق",
                };
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {columnHeaders[column.id as keyof typeof columnHeaders] ||
                      column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className="bg-white rounded-lg border border-gray-200 p-4 space-y-3"
            >
              <div className="flex items-start gap-3">
                <img
                  src={
                    row.getValue("image") ||
                    "https://via.placeholder.com/64x64/e5e7eb/9ca3af?text=صورة"
                  }
                  alt={`صورة ${row.getValue("name")}`}
                  className="h-16 w-16 rounded-lg object-contain flex-shrink-0"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://via.placeholder.com/64x64/e5e7eb/9ca3af?text=صورة";
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm leading-5 line-clamp-2 text-right">
                    {row.getValue("name")}
                  </h3>
                  <div className="text-[#FFC107] mt-1">
                    {"★".repeat(row.getValue("rating"))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 text-right line-clamp-2">
                    {row.getValue("content")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-blue-600"
                    onClick={() => handleEditClick(row.original)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]" dir="rtl">
                      <DialogHeader>
                        <DialogTitle className="text-right">
                          حذف تقييم الطالب
                        </DialogTitle>
                        <DialogDescription className="text-right">
                          هل أنت متأكد أنك تريد حذف هذا التقييم؟ هذه العملية لا
                          يمكن التراجع عنها.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                        >
                          إلغاء
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() =>
                            handleDelete(row.original.id.toString())
                          }
                          disabled={deleteOpinionMutation.isPending}
                          className="flex-1"
                        >
                          {deleteOpinionMutation.isPending
                            ? "جاري الحذف..."
                            : "حذف"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {row.original.is_featured && (
                <div className="flex justify-end">
                  <Badge
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800 text-xs"
                  >
                    مميز
                  </Badge>
                </div>
              )}

              {row.original.is_approved !== undefined && (
                <div className="flex justify-end">
                  <Badge
                    variant={
                      row.original.is_approved ? "default" : "destructive"
                    }
                    className="text-xs"
                  >
                    {row.original.is_approved ? "معتمد" : "في انتظار الموافقة"}
                  </Badge>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد نتائج.
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-lg border border-gray-200 bg-white overflow-hidden">
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
                  لا توجد نتائج.
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

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right">تعديل تقييم الطالب</DialogTitle>
            <DialogDescription className="text-right">
              قم بتعديل بيانات التقييم
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onEditSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label
                  htmlFor="edit-student-name"
                  className="text-sm font-medium text-card-foreground"
                >
                  اسم الطالب
                </Label>
                <Controller
                  control={control}
                  name="name"
                  rules={{ required: "اسم الطالب مطلوب" }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      id="edit-student-name"
                      value={value || ""}
                      onChange={onChange}
                      placeholder="أدخل اسم الطالب"
                      className={`${
                        errors.name
                          ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                          : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                      } h-10 !bg-transparent`}
                      dir="rtl"
                    />
                  )}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-card-foreground">
                  التقييم
                </Label>
                <Controller
                  control={control}
                  name="rating"
                  rules={{
                    required: "التقييم مطلوب",
                    min: {
                      value: 1,
                      message: "يجب أن يكون التقييم على الأقل نجمة واحدة",
                    },
                  }}
                  render={({ field: { onChange, value } }) =>
                    renderStars(value, true, onChange)
                  }
                />
                {errors.rating && (
                  <p className="text-sm text-destructive">
                    {errors.rating.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="edit-content"
                  className="text-sm font-medium text-card-foreground"
                >
                  التعليق
                </Label>
                <Controller
                  control={control}
                  name="content"
                  rules={{ required: "التعليق مطلوب" }}
                  render={({ field: { onChange, value } }) => (
                    <Textarea
                      id="edit-content"
                      value={value || ""}
                      onChange={onChange}
                      placeholder="اكتب تعليق الطالب هنا..."
                      rows={4}
                      className={`${
                        errors.content
                          ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                          : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                      } !bg-transparent resize-none`}
                      dir="rtl"
                    />
                  )}
                />
                {errors.content && (
                  <p className="text-sm text-destructive">
                    {errors.content.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <ImageField
                  name="image"
                  type="image"
                  label="صورة الطالب"
                  placeholder="اختر صورة الطالب"
                  control={
                    control as unknown as Control<Record<string, unknown>>
                  }
                  errors={errors}
                />
                {editingReview?.image && (
                  <div className="text-sm text-muted-foreground mt-1">
                    * في حالة عدم اختيار صورة جديدة سيتم الاحتفاظ بالصورة
                    الحالية
                  </div>
                )}
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditDialogOpen(false);
                  setEditingReview(null);
                  reset();
                }}
                className="flex-1 shadow-sm"
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                disabled={updateOpinionMutation.isPending}
                className="flex-1 gap-2"
              >
                {updateOpinionMutation.isPending
                  ? "جاري الحفظ..."
                  : "حفظ التعديلات"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentReviewsTable;
