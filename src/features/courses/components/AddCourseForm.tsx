import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FormFields from "@/components/shared/formFields/form-fields";
import { courseSchema, type ICourseForm } from "@/validations/course";
import { toast } from "sonner";
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
  // Get saved step from localStorage or default to 1
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = getFromLocalStorage(FORM_STEP_KEY);
    return savedStep || 1;
  });
  const totalSteps = 2;

  // Get saved form data from localStorage
  const getSavedFormData = useCallback(() => {
    const savedData = getFromLocalStorage(FORM_DATA_KEY);
    return (
      savedData || {
        title: "",
        category: "",
        type: "",
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
    trigger,
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
    }, 500); // Debounce saves by 500ms

    return () => clearTimeout(timeoutId);
  }, [watchedValues]);

  // Save current step to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage(FORM_STEP_KEY, currentStep);
  }, [currentStep]);

  // Check for saved draft on component mount
  useEffect(() => {
    const savedData = getFromLocalStorage(FORM_DATA_KEY);
    if (
      savedData &&
      Object.keys(savedData).some(
        (key) => savedData[key] !== "" && savedData[key] !== 0
      )
    ) {
      toast.info("تم استعادة المسودة المحفوظة مسبقاً", {
        duration: 5000,
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
      toast.success("تم إنشاء المادة التعليمية بنجاح!");

      // Clear draft data after successful submission
      clearDraftData();

      onSubmit?.(data);
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("حدث خطأ أثناء إنشاء المادة التعليمية");
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
      onCancel?.();
    }
  };

  const handleClearDraft = () => {
    if (confirm("هل تريد حذف المسودة المحفوظة وبدء من جديد؟")) {
      clearDraftData();
      reset(getSavedFormData());
      setCurrentStep(1);
      toast.success("تم حذف المسودة بنجاح");
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);

    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getFieldsForStep = (step: number): (keyof ICourseForm)[] => {
    switch (step) {
      case 1:
        return ["image", "video", "title", "category", "type", "instructor", "level", "price"];
      case 2:
        return ["description", "shortContent", "skills", "requirements"];
      default:
        return [];
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "المعلومات الأساسية والوسائط";
      case 2:
        return "محتوى المادة";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "أضف الوسائط والمعلومات الأساسية للمادة التعليمية";
      case 2:
        return "أضف محتوى المادة والمعلومات التفصيلية";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index + 1} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= index + 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`w-16 h-1 mx-2 ${
                  currentStep > index + 1 ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Title */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">{getStepTitle()}</h2>
        <p className="text-muted-foreground">{getStepDescription()}</p>

        {/* Draft indicator */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>يتم حفظ البيانات تلقائياً</span>
        </div>
      </div>

      {/* Form */}
      <Card className="p-8 border-0 shadow-sm">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {currentStep === 1 ? (
            <div className="space-y-6">
              {/* الصف الأول: الوسائط */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormFields 
                    name="image"
                    label="صورة المادة التعليمية"
                    type="file"
                    placeholder="اختر صورة للمادة التعليمية"
                    fileType="image"
                    accept="image/*"
                    maxSize={5}
                    allowedTypes={["image/jpeg", "image/png", "image/jpg", "image/webp"]}
                    control={control} 
                    errors={errors} 
                  />
                </div>
                <div>
                  <FormFields 
                    name="video"
                    label="فيديو تعريفي للمادة"
                    type="file"
                    placeholder="اختر فيديو تعريفي للمادة"
                    fileType="video"
                    accept="video/*"
                    maxSize={100}
                    allowedTypes={["video/mp4", "video/avi", "video/mov", "video/wmv"]}
                    control={control} 
                    errors={errors} 
                  />
                </div>
              </div>
              
              {/* الصفوف التالية: المعلومات الأساسية */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormFields 
                    name="title"
                    label="عنوان المادة التعليمية"
                    type="text"
                    placeholder="أدخل عنوان المادة التعليمية"
                    control={control} 
                    errors={errors} 
                  />
                </div>
                <div>
                  <FormFields 
                    name="category"
                    label="الفئة"
                    type="select"
                    placeholder="اختر فئة المادة"
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
              </div>
              
              {/* صف نوع المادة والمدرب والمستوى */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <FormFields 
                    name="type"
                    label="نوع المادة"
                    type="select"
                    placeholder="اختر نوع المادة"
                    options={[
                      { label: "تفاعلية", value: "تفاعلية" },
                    ]}
                    control={control} 
                    errors={errors} 
                  />
                </div>
                <div>
                  <FormFields 
                    name="instructor"
                    label="المدرب"
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
                    label="مستوى الطالب المطلوب"
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
              
              {/* صف السعر */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormFields 
                    name="price"
                    label="السعر (ريال سعودي)"
                    type="number"
                    placeholder="0"
                    control={control} 
                    errors={errors} 
                  />
                </div>
              </div>
            </div>
          ) : currentStep === 2 ? (
            <div className="space-y-6">
              {/* الصف الأول: الوصف التفصيلي والمحتوى المختصر */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormFields 
                    name="description"
                    label="الوصف التفصيلي للمادة"
                    type="textarea"
                    placeholder="اكتب وصفاً شاملاً للمادة التعليمية وما سيتعلمه الطلاب..."
                    control={control} 
                    errors={errors} 
                  />
                </div>
                <div>
                  <FormFields 
                    name="shortContent"
                    label="المحتوى المختصر"
                    type="textarea"
                    placeholder="ملخص قصير عن محتوى المادة..."
                    control={control} 
                    errors={errors} 
                  />
                </div>
              </div>
              
              {/* الصف الثاني: المهارات المكتسبة والمتطلبات الأساسية */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormFields 
                    name="skills"
                    label="المهارات المكتسبة"
                    type="textarea"
                    placeholder="اذكر المهارات التي سيكتسبها الطلاب من هذه المادة..."
                    control={control} 
                    errors={errors} 
                  />
                </div>
                <div>
                  <FormFields 
                    name="requirements"
                    label="المتطلبات الأساسية"
                    type="textarea"
                    placeholder="اذكر المتطلبات والمعرفة المسبقة المطلوبة..."
                    control={control} 
                    errors={errors} 
                  />
                </div>
              </div>
            </div>
          ) : null}

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-6 border-t">
            <div className="flex gap-4">
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={formLoading}
                >
                  إلغاء
                </Button>
              )}

              {/* Clear draft button */}
              <Button
                type="button"
                variant="ghost"
                onClick={handleClearDraft}
                disabled={formLoading}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                حذف المسودة
              </Button>

              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={formLoading}
                >
                  السابق
                </Button>
              )}
            </div>

            <div className="flex space-x-4 rtl:space-x-reverse">
              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={formLoading}
                  className="flex items-center gap-2"
                >
                  التالي
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={formLoading}
                  className="flex items-center gap-2"
                >
                  {formLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  إنشاء المادة التعليمية
                </Button>
              )}
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddCourseForm;
