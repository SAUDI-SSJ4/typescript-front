import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FormFields from "@/components/shared/formFields/form-fields";
import { courseSchema, type ICourseForm } from "@/validations/course";
import { enhancedToast } from "@/components/ui/enhanced-toast";
import { ArrowRight, Save, Trash2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface AddCourseFormProps {
  onSubmit?: (data: ICourseForm) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

// Local storage key for persisting form data
const FORM_DATA_KEY = "addCourseForm_draft";
const FORM_STEP_KEY = "addCourseForm_step";

// Helper functions for local storage
const saveToLocalStorage = (
  key: string,
  data: Partial<ICourseForm> | number
) => {
  try {
    // Don't save File objects to localStorage as they can't be serialized
    if (key === FORM_DATA_KEY && typeof data === "object") {
      const dataToSave = { ...data };
      // Remove file objects before saving
      delete dataToSave.image;
      delete dataToSave.video;
      localStorage.setItem(key, JSON.stringify(dataToSave));
    } else {
      localStorage.setItem(key, JSON.stringify(data));
    }
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

const removeFromLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn("Failed to remove from localStorage:", error);
  }
};

const AddCourseForm = ({
  onSubmit,
  onCancel,
  isLoading = false,
}: AddCourseFormProps) => {
  // Get saved form data from localStorage
  const getSavedFormData = useCallback(() => {
    const savedData = getFromLocalStorage(FORM_DATA_KEY);
    return (
      savedData || {
        title: "",
        category: "",
        type: "تفاعلية", // Default value
        instructor: "",
        level: "",
        price: 0,
        description: "",
        shortContent: "",
        skills: "",
        requirements: "",
      }
    );
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<ICourseForm>({
    resolver: zodResolver(courseSchema),
    mode: "onChange",
    defaultValues: getSavedFormData(),
  });

  const formLoading = isSubmitting || isLoading;

  // Watch all form values for auto-save
  const watchedValues = watch();

  // Auto-save form data to localStorage whenever values change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveToLocalStorage(FORM_DATA_KEY, watchedValues);
      // Show subtle save notification
      if (Object.values(watchedValues).some(value => value !== "" && value !== 0)) {
        enhancedToast.draftSaved();
      }
    }, 2000); // Increased debounce time

    return () => clearTimeout(timeoutId);
  }, [watchedValues]);

  // Save current step to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage(FORM_STEP_KEY, 1); // Always step 1 since we removed steps
  }, []);

  // Check for saved draft on component mount
  useEffect(() => {
    const savedData = getFromLocalStorage(FORM_DATA_KEY);
    if (
      savedData &&
      Object.keys(savedData).some(
        (key) => savedData[key] !== "" && savedData[key] !== 0
      )
    ) {
      enhancedToast.info("تم استعادة المسودة المحفوظة مسبقاً", {
        description: "يمكنك المتابعة من حيث توقفت",
        duration: 6000,
        action: {
          label: "بدء من جديد",
          onClick: handleClearDraft,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearDraftData = useCallback(() => {
    removeFromLocalStorage(FORM_DATA_KEY);
    removeFromLocalStorage(FORM_STEP_KEY);
  }, []);

  const handleFormSubmit = async (data: ICourseForm) => {
    try {
      console.log("Course Form Data:", data);
      enhancedToast.courseAdded(data.title);

      // Clear draft data after successful submission
      clearDraftData();

      onSubmit?.(data);
    } catch (error) {
      console.error("Error creating course:", error);
      enhancedToast.error("حدث خطأ أثناء إنشاء المادة التعليمية", {
        description: "تحقق من البيانات المدخلة وحاول مرة أخرى",
        action: {
          label: "إعادة المحاولة",
          onClick: () => handleFormSubmit(data)
        }
      });
    }
  };

  const handleCancel = () => {
    // Show confirmation before clearing draft
    if (
      confirm(
        "هل تريد حقاً إلغاء إنشاء المادة؟ سيتم حذف جميع البيانات المحفوظة."
      )
    ) {
      clearDraftData();
      reset();
      enhancedToast.info("تم إلغاء إنشاء المادة", {
        description: "تم حذف جميع البيانات المحفوظة"
      });
      onCancel?.();
    }
  };

  const handleClearDraft = () => {
    if (confirm("هل تريد حذف المسودة المحفوظة وبدء من جديد؟")) {
      clearDraftData();
      reset(getSavedFormData());
      enhancedToast.success("تم حذف المسودة بنجاح", {
        description: "يمكنك الآن بدء إنشاء دورة جديدة"
      });
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Basic Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">المعلومات الأساسية</h3>
            <div className="space-y-6">
              {/* Course Image (Optional) */}
              <div>
                <FormFields 
                  name="image"
                  label="صورة الدورة (اختياري)"
                  type="file"
                  placeholder="اختر صورة للدورة (اختياري)"
                  fileType="image"
                  accept="image/*"
                  maxSize={5}
                  allowedTypes={["image/jpeg", "image/png", "image/jpg", "image/webp"]}
                  control={control} 
                  errors={errors} 
                />
              </div>

              {/* Course Title */}
              <div>
                <FormFields 
                  name="title"
                  label="عنوان الدورة *"
                  type="text"
                  placeholder="أدخل عنوان الدورة"
                  control={control} 
                  errors={errors} 
                />
              </div>

              {/* Category */}
              <div>
                <FormFields 
                  name="category"
                  label="الفئة *"
                  type="select"
                  placeholder="اختر فئة الدورة"
                  options={[
                    { label: "برمجة", value: "برمجة" },
                    { label: "تصميم", value: "تصميم" },
                    { label: "تسويق", value: "تسويق" },
                    { label: "أعمال", value: "أعمال" },
                    { label: "تطوير شخصي", value: "تطوير شخصي" },
                  ]}
                  control={control} 
                  errors={errors} 
                />
              </div>

              {/* Instructor and Level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormFields 
                    name="instructor"
                    label="المدرب *"
                    type="select"
                    placeholder="اختر المدرب"
                    options={[
                      { label: "أحمد محمد", value: "أحمد محمد" },
                      { label: "سارة أحمد", value: "سارة أحمد" },
                      { label: "محمد علي", value: "محمد علي" },
                      { label: "د. خالد إبراهيم", value: "د. خالد إبراهيم" },
                      { label: "عمر حسن", value: "عمر حسن" },
                      { label: "ليلى كمال", value: "ليلى كمال" },
                    ]}
                    control={control} 
                    errors={errors} 
                  />
                </div>
                <div>
                  <FormFields 
                    name="level"
                    label="مستوى الطالب المطلوب *"
                    type="select"
                    placeholder="اختر مستوى الطالب"
                    options={[
                      { label: "مبتدئ", value: "مبتدئ" },
                      { label: "متوسط", value: "متوسط" },
                      { label: "متقدم", value: "متقدم" },
                    ]}
                    control={control} 
                    errors={errors} 
                  />
                </div>
              </div>

              {/* Price */}
              <div>
                <FormFields 
                  name="price"
                  label="السعر (ريال سعودي) *"
                  type="number"
                  placeholder="0"
                  control={control} 
                  errors={errors} 
                />
              </div>
            </div>
          </div>

          {/* Right Column - Content and Media */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">محتوى الدورة</h3>
            <div className="space-y-6">
              {/* Video (Required) */}
              <div>
                <FormFields 
                  name="video"
                  label="فيديو تعريفي للدورة *"
                  type="file"
                  placeholder="اختر فيديو تعريفي للدورة"
                  fileType="video"
                  accept="video/*"
                  maxSize={100}
                  allowedTypes={["video/mp4", "video/avi", "video/mov", "video/wmv"]}
                  control={control} 
                  errors={errors} 
                />
              </div>

              {/* Description */}
              <div>
                <FormFields 
                  name="description"
                  label="الوصف التفصيلي للدورة *"
                  type="textarea"
                  placeholder="اكتب وصفاً شاملاً للدورة وما سيتعلمه الطلاب..."
                  control={control} 
                  errors={errors} 
                />
              </div>

              {/* Short Content */}
              <div>
                <FormFields 
                  name="shortContent"
                  label="المحتوى المختصر *"
                  type="textarea"
                  placeholder="ملخص قصير عن محتوى الدورة..."
                  control={control} 
                  errors={errors} 
                />
              </div>

              {/* Skills */}
              <div>
                <FormFields 
                  name="skills"
                  label="المهارات المكتسبة *"
                  type="textarea"
                  placeholder="اذكر المهارات التي سيكتسبها الطلاب من هذه الدورة..."
                  control={control} 
                  errors={errors} 
                />
              </div>

              {/* Requirements */}
              <div>
                <FormFields 
                  name="requirements"
                  label="المتطلبات الأساسية *"
                  type="textarea"
                  placeholder="اذكر المتطلبات والمعرفة المسبقة المطلوبة..."
                  control={control} 
                  errors={errors} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="flex gap-3">
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={formLoading}
                  className="gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  إلغاء
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={handleClearDraft}
                disabled={formLoading}
                className="gap-2 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
                مسح النموذج
              </Button>
            </div>
            
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={formLoading}
                className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {formLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                إنشاء الدورة
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCourseForm;
