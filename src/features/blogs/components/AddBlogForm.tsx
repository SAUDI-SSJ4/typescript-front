import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Save, Trash2, X, Plus, Type, Hash, FolderOpen, AlignLeft, FileText } from "lucide-react";
import FlowbiteTextEditor from '@/components/ui/FlowbiteTextEditor';
import { enhancedToast } from "@/components/ui/enhanced-toast";
import HeadingTextEditor from "../../../components/ui/HeadingTextEditor";
import ImageUploader from "@/components/ui/ImageUploader";

interface IBlogForm {
  title: string;
  content: string;
  excerpt: string;
  image: string;
  keywords: string[];
  category: string;
  status: 'published' | 'draft';
}

interface AddBlogFormProps {
  onSubmit?: (data: IBlogForm) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  initialData?: Partial<IBlogForm>;
  isEditing?: boolean;
}

const FORM_DATA_KEY = "addBlogForm_draft";

const saveToLocalStorage = (key: string, data: Partial<IBlogForm>) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn("Failed to save to localStorage:", error);
  }
};

const getFromLocalStorage = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.warn("Failed to read from localStorage:", error);
    return null;
  }
};

const clearLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn("Failed to clear localStorage:", error);
  }
};

function AddBlogForm({
  onSubmit,
  onCancel,
  isLoading = false,
  initialData,
  isEditing = false,
}: AddBlogFormProps) {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [editorContent, setEditorContent] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<IBlogForm>({
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      image: "",
      keywords: [],
      category: "",
      status: "draft",
      ...initialData,
    },
  });

  const watchedValues = watch();

  const autoSave = useCallback(() => {
    if (isDirty && !isEditing) {
      const dataToSave = { ...watchedValues, keywords };
      saveToLocalStorage(FORM_DATA_KEY, dataToSave);
    }
  }, [watchedValues, keywords, isDirty, isEditing]);

  useEffect(() => {
    const interval = setInterval(autoSave, 2000);
    return () => clearInterval(interval);
  }, [autoSave]);

  useEffect(() => {
    if (!initialData && !isEditing) {
      const savedData = getFromLocalStorage(FORM_DATA_KEY);
      if (savedData) {
        Object.keys(savedData).forEach((key) => {
          if (key === "keywords") {
            setKeywords(savedData[key] || []);
          } else {
            setValue(key as keyof IBlogForm, savedData[key]);
          }
        });
        enhancedToast.info("تم استرداد البيانات", {
          description: "تم استرداد البيانات المحفوظة مسبقاً"
        });
      }
    }
  }, [setValue, initialData, isEditing]);

  // Removed: handled by ImageUploader

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      const newKeywords = [...keywords, keywordInput.trim()];
      setKeywords(newKeywords);
      setValue("keywords", newKeywords);
      setKeywordInput("");
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    const newKeywords = keywords.filter(keyword => keyword !== keywordToRemove);
    setKeywords(newKeywords);
    setValue("keywords", newKeywords);
  };

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
  };

  const onSubmitForm = (data: IBlogForm) => {
    const finalData = { ...data, keywords };
    
    if (!isEditing) {
      clearLocalStorage(FORM_DATA_KEY);
    }
    onSubmit?.(finalData);
    
    enhancedToast.success(
      isEditing ? "تم تحديث المقال" : "تم حفظ المقال",
      {
        description: `تم ${data.status === 'published' ? 'نشر' : 'حفظ'} المقال بنجاح`
      }
    );
  };

  const handleCancel = () => {
    if (!isEditing) {
      clearLocalStorage(FORM_DATA_KEY);
    }
    onCancel?.();
  };

  const clearForm = () => {
    reset();
    setKeywords([]);
    setKeywordInput("");
    setImagePreview("");
    setEditorContent("");
    if (!isEditing) {
      clearLocalStorage(FORM_DATA_KEY);
    }
    enhancedToast.info("تم مسح النموذج", {
      description: "تم مسح جميع البيانات"
    });
  };

  
  useEffect(() => {
    if (initialData?.content) {
      setEditorContent(initialData.content);
    }
  }, [initialData?.content]);

  const categories = ["تقنية", "تعليم", "أعمال", "صحة", "رياضة", "سفر", "طبخ", "فن"];

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  صورة المقال *
                </Label>
                <ImageUploader
                  value={imagePreview}
                  onChange={(val) => {
                    setImagePreview(val || "");
                    setValue("image", val || "");
                  }}
                  placeholder="اضغط لرفع صورة المقال"
                  maxSizeMb={10}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                  <Type className="w-4 h-4 text-blue-600" />
                  عنوان المقال *
                </Label>
                {/* Hidden input to keep react-hook-form validation and value binding */}
                <input
                  type="hidden"
                  {...register("title", { required: "عنوان المقال مطلوب" })}
                  value={watchedValues.title}
                  readOnly
                />
                <HeadingTextEditor
                  tag="h1"
                  value={watchedValues.title}
                  onChange={(html: string) => setValue("title", html, { shouldValidate: true, shouldDirty: true })}
                  placeholder="اكتب عنوان المقال هنا..."
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-purple-600" />
                  التصنيف *
                </Label>
                <Select
                   onValueChange={(value) => setValue("category", value)}
                   defaultValue={watchedValues.category}
                 >
                   <SelectTrigger className="h-10 focus:outline-none focus:ring-0 focus:border-gray-300">
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
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Hash className="w-4 h-4 text-green-600" />
                  الكلمات المفتاحية
                </Label>
                <div className="flex gap-2">
                  <Input
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyPress={handleKeywordKeyPress}
                      placeholder="أدخل كلمة مفتاحية"
                      className="flex-1 focus:outline-none focus:ring-0 focus:border-gray-300"
                    />
                  <Button
                     type="button"
                     onClick={addKeyword}
                     variant="outline"
                     disabled={!keywordInput.trim()}
                   >
                     <Plus className="w-4 h-4" />
                   </Button>
                </div>
                {keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="gap-1"
                      >
                        {keyword}
                        <X
                          className="w-3 h-3 cursor-pointer hover:text-red-500"
                          onClick={() => removeKeyword(keyword)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt" className="text-sm font-medium flex items-center gap-2">
                  <AlignLeft className="w-4 h-4 text-indigo-600" />
                  ملخص المقال *
                </Label>
                <Textarea
                  id="excerpt"
                  {...register("excerpt", { required: "ملخص المقال مطلوب" })}
                  placeholder="أدخل ملخص قصير للمقال"
                  rows={4}
                  className={`${errors.excerpt ? "border-red-500" : ""} focus:outline-none focus:ring-0 focus:border-gray-300`}
                />
                {errors.excerpt && (
                  <p className="text-sm text-red-500">{errors.excerpt.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="space-y-4">
              <Label htmlFor="content" className="text-sm font-medium flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-600" />
                محتوى المقال *
              </Label>
              <FlowbiteTextEditor
                value={editorContent}
                onChange={(html) => {
                  setEditorContent(html);
                  setValue('content', html);
                }}
                label={undefined}
                placeholder="ابدأ في كتابة محتوى المقال هنا..."
                error={Boolean(errors.content)}
                className=""
                name="content"
              />
              
              {errors.content && (
                <p className="text-sm text-red-500">{errors.content.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                إلغاء
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={clearForm}
                className="gap-2 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
                مسح النموذج
              </Button>
            </div>
            
            <div className="flex gap-3">
              <Button
                type="submit"
                variant="outline"
                onClick={() => setValue("status", "draft")}
                disabled={isLoading}
                className="gap-2 text-amber-700 border-amber-200 hover:bg-amber-50"
              >
                <Save className="w-4 h-4" />
                حفظ كمسودة
              </Button>
              <Button
                type="submit"
                onClick={() => setValue("status", "published")}
                disabled={isLoading}
                className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Save className="w-4 h-4" />
                نشر المقال
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddBlogForm;