import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FormFields from "@/components/shared/formFields/form-fields";
import { trainerSchema, type ITrainerForm } from "@/validations/trainer";
import { toast } from "sonner";
import { Save, Trash2 } from "lucide-react";
import { useEffect, useCallback } from "react";

interface AddTrainerFormProps {
  onSubmit?: (data: ITrainerForm) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const FORM_DATA_KEY = "addTrainerForm_draft";

const saveToLocalStorage = (key: string, data: Partial<ITrainerForm>) => {
  try {
    const dataToSave = { ...data };
    delete dataToSave.image;
    localStorage.setItem(key, JSON.stringify(dataToSave));
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

const AddTrainerForm = ({
  onSubmit,
  onCancel,
  isLoading = false,
}: AddTrainerFormProps) => {
  const getSavedFormData = useCallback(() => {
    const savedData = getFromLocalStorage(FORM_DATA_KEY);
    return (
      savedData || {
        name: "",
        email: "",
        phone: "",
      }
    );
  }, []);

  const clearDraftData = useCallback(() => {
    removeFromLocalStorage(FORM_DATA_KEY);
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<ITrainerForm>({
    resolver: zodResolver(trainerSchema),
    mode: "onChange",
    defaultValues: getSavedFormData(),
  });

  const formLoading = isSubmitting || isLoading;
  const watchedValues = watch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveToLocalStorage(FORM_DATA_KEY, watchedValues);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [watchedValues]);

  const handleClearDraft = useCallback(() => {
    if (confirm("هل تريد حذف المسودة المحفوظة وبدء من جديد؟")) {
      clearDraftData();
      reset(getSavedFormData());
      toast.success("تم حذف المسودة بنجاح");
    }
  }, [clearDraftData, getSavedFormData, reset]);

  useEffect(() => {
    const savedData = getFromLocalStorage(FORM_DATA_KEY);
    if (
      savedData &&
      Object.keys(savedData).some((key) => savedData[key] !== "")
    ) {
      toast.info("تم استعادة المسودة المحفوظة مسبقاً", {
        duration: 5000,
        action: {
          label: "بدء من جديد",
          onClick: () => handleClearDraft(),
        },
      });
    }
  }, [handleClearDraft]);

  const handleFormSubmit = async (data: ITrainerForm) => {
    try {
      console.log("Trainer Form Data:", data);
      toast.success("تم إضافة المدرب بنجاح!");
      clearDraftData();
      onSubmit?.(data);
    } catch (error) {
      console.error("Error creating trainer:", error);
      toast.error("حدث خطأ أثناء إضافة المدرب");
    }
  };

  const handleCancel = () => {
    if (
      confirm(
        "هل تريد حقاً إلغاء إضافة المدرب؟ سيتم حذف جميع البيانات المحفوظة."
      )
    ) {
      clearDraftData();
      reset();
      onCancel?.();
    }
  };

  return (
    <div>
      <Card className="p-8 border-0 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              يتم حفظ البيانات تلقائياً
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClearDraft}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
            حذف المسودة
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <FormFields
                name="image"
                label="الصورة الشخصية"
                type="file"
                placeholder="اختر صورة شخصية للمدرب"
                fileType="image"
                accept="image/*"
                maxSize={5}
                allowedTypes={[
                  "image/jpeg",
                  "image/png",
                  "image/jpg",
                  "image/webp",
                ]}
                control={control}
                errors={errors}
                disabled={formLoading}
              />
            </div>

            <div>
              <FormFields
                name="name"
                label="اسم المدرب"
                type="text"
                placeholder="أدخل اسم المدرب الكامل"
                control={control}
                errors={errors}
                disabled={formLoading}
              />
            </div>

            <div>
              <FormFields
                name="email"
                label="البريد الإلكتروني"
                type="email"
                placeholder="أدخل البريد الإلكتروني للمدرب"
                control={control}
                errors={errors}
                disabled={formLoading}
              />
            </div>

            <div className="md:col-span-2">
              <FormFields
                name="phone"
                label="رقم الهاتف"
                type="text"
                placeholder="أدخل رقم الهاتف للمدرب"
                control={control}
                errors={errors}
                disabled={formLoading}
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={formLoading}
              className="flex items-center gap-2"
            >
              إلغاء
            </Button>

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
              إضافة المدرب
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddTrainerForm;
