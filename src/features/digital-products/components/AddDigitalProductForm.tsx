import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Save, Trash2, Upload, Package, DollarSign, FileText, Image, Download } from "lucide-react";
import { enhancedToast } from "@/components/ui/enhanced-toast";
import type { IDigitalProductForm } from "@/types/digital-product";

interface AddDigitalProductFormProps {
  onSubmit?: (data: IDigitalProductForm) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  initialData?: Partial<IDigitalProductForm>;
  defaultValues?: Partial<IDigitalProductForm>;
  isEditing?: boolean;
}

const AddDigitalProductForm: React.FC<AddDigitalProductFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
  initialData,
  defaultValues,
  isEditing = false,
}) => {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [downloadFileName, setDownloadFileName] = useState<string>("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<IDigitalProductForm>({
    defaultValues: {
      title: "",
      description: "",
      image: "",
      price: 0,
      discountPrice: undefined,
      downloadFile: "",
      category: "",
      status: "draft",
      ...initialData,
      ...defaultValues,
    },
  });

  const watchedFields = watch();

  useEffect(() => {
    const dataToUse = defaultValues || initialData;
    if (dataToUse) {
      Object.entries(dataToUse).forEach(([key, value]) => {
        setValue(key as keyof IDigitalProductForm, value);
      });
      if (dataToUse.image) {
        setImagePreview(dataToUse.image);
      }
    }
  }, [initialData, defaultValues, setValue]);

  const onSubmitForm = (data: IDigitalProductForm) => {
    if (!data.image) {
      enhancedToast.error("خطأ في النموذج", {
        description: "يرجى إضافة صورة للمنتج"
      });
      return;
    }

    if (!data.downloadFile) {
      enhancedToast.error("خطأ في النموذج", {
        description: "يرجى إضافة ملف التحميل"
      });
      return;
    }

    onSubmit?.(data);
    enhancedToast.success(
      isEditing ? "تم تحديث المنتج" : "تم إنشاء المنتج",
      {
        description: isEditing
          ? "تم تحديث المنتج الرقمي بنجاح"
          : "تم إنشاء المنتج الرقمي الجديد بنجاح",
      }
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        enhancedToast.error("حجم الملف كبير جداً", {
          description: "يجب أن يكون حجم الصورة أقل من 5 ميجابايت"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setValue("image", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        enhancedToast.error("حجم الملف كبير جداً", {
          description: "يجب أن يكون حجم الملف أقل من 100 ميجابايت"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setValue("downloadFile", result);
        setDownloadFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview("");
    setValue("image", "");
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const removeFile = () => {
    setValue("downloadFile", "");
    setDownloadFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const clearForm = () => {
    reset();
    setImagePreview("");
    setDownloadFileName("");
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (fileInputRef.current) fileInputRef.current.value = "";
    enhancedToast.info("تم مسح النموذج", {
      description: "تم مسح جميع البيانات"
    });
  };

  const categories = ["كتب إلكترونية", "قوالب", "أدوات", "دورات", "برمجيات", "تصاميم", "أخرى"];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit(onSubmitForm)} className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue-600" />
                  عنوان المنتج *
                </Label>
                <Input
                  id="title"
                  {...register("title", { required: "عنوان المنتج مطلوب" })}
                  placeholder="أدخل عنوان المنتج"
                  className={`${errors.title ? "border-red-500" : ""} focus:outline-none focus:ring-0 focus:border-gray-300`}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium flex items-center gap-2">
                  <FileText className="w-4 h-4 text-green-600" />
                  التصنيف *
                </Label>
                <Select
                  value={watchedFields.category}
                  onValueChange={(value) => setValue("category", value)}
                >
                  <SelectTrigger className={`${errors.category ? "border-red-500" : ""} focus:outline-none focus:ring-0 focus:border-gray-300`}>
                    <SelectValue placeholder="اختر التصنيف" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500">{errors.category.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    السعر *
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    {...register("price", { 
                      required: "السعر مطلوب",
                      min: { value: 0, message: "السعر يجب أن يكون أكبر من 0" }
                    })}
                    placeholder="0.00"
                    className={`${errors.price ? "border-red-500" : ""} focus:outline-none focus:ring-0 focus:border-gray-300`}
                  />
                  {errors.price && (
                    <p className="text-sm text-red-500">{errors.price.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discountPrice" className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-orange-600" />
                    السعر بعد الخصم (اختياري)
                  </Label>
                  <Input
                    id="discountPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    {...register("discountPrice", {
                      min: { value: 0, message: "السعر يجب أن يكون أكبر من 0" }
                    })}
                    placeholder="0.00"
                    className="focus:outline-none focus:ring-0 focus:border-gray-300"
                  />
                  {errors.discountPrice && (
                    <p className="text-sm text-red-500">{errors.discountPrice.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  وصف المنتج *
                </Label>
                <Textarea
                  id="description"
                  {...register("description", { required: "وصف المنتج مطلوب" })}
                  placeholder="أدخل وصف مفصل للمنتج"
                  rows={6}
                  className={`${errors.description ? "border-red-500" : ""} focus:outline-none focus:ring-0 focus:border-gray-300`}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Image className="w-4 h-4 text-purple-600" />
                  صورة المنتج *
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="معاينة الصورة"
                        className="max-w-full h-48 object-cover rounded-lg mx-auto"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={removeImage}
                        className="absolute top-2 right-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                      <div className="text-gray-600">
                        <p className="font-medium">رفع صورة المنتج</p>
                        <p className="text-sm">PNG, JPG, GIF حتى 5MB</p>
                      </div>
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-4"
                    onClick={() => imageInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 ml-2" />
                    رفع صورة
                  </Button>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                {errors.image && (
                  <p className="text-sm text-red-500">صورة المنتج مطلوبة</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Download className="w-4 h-4 text-blue-600" />
                  ملف التحميل *
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  {downloadFileName ? (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Download className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">
                          {downloadFileName}
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={removeFile}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Download className="w-12 h-12 text-gray-400 mx-auto" />
                      <div className="text-gray-600">
                        <p className="font-medium">رفع ملف المنتج</p>
                        <p className="text-sm">جميع أنواع الملفات حتى 100MB</p>
                      </div>
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-4"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 ml-2" />
                    رفع ملف
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                {errors.downloadFile && (
                  <p className="text-sm text-red-500">ملف التحميل مطلوب</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-600" />
                  حالة النشر
                </Label>
                <Select
                  value={watchedFields.status}
                  onValueChange={(value: 'published' | 'draft') => setValue("status", value)}
                >
                  <SelectTrigger className="focus:outline-none focus:ring-0 focus:border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">مسودة</SelectItem>
                    <SelectItem value="published">نشر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                إلغاء
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={clearForm}
                className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
                مسح النموذج
              </Button>
            </div>
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Save className="w-4 h-4" />
                {isLoading
                  ? "جاري الحفظ..."
                  : isEditing
                  ? "تحديث المنتج"
                  : "حفظ المنتج"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDigitalProductForm;