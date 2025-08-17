import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FormFields from "@/components/shared/formFields/form-fields";
import { trainerSchema, type ITrainerForm } from "@/validations/trainer";
import { toast } from "sonner";
import { Save, Trash2 } from "lucide-react";
import { useEffect, useCallback } from "react";
import { trainersApi } from "../services/trainersApi";

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

const AddTrainerForm = () => {
  const getSavedFormData = useCallback(() => {
    const savedData = getFromLocalStorage(FORM_DATA_KEY);
    return (
      savedData || {
        fname: "",
        lname: "",
        email: "",
        phone: "",
        image: null,
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

  const formLoading = isSubmitting;
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

  const handleFormSubmit = async (data: ITrainerForm) => {
    try {
      // Create trainer payload
      const trainerPayload = {
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        phone_number: data.phone,
        image: data.image || null,
      };

      // Send API request
      await trainersApi.createTrainer(trainerPayload);

      toast.success("تم إضافة المدرب بنجاح!");
      clearDraftData();
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
          <div className="flex flex-row gap-4 items-start">
            <div className="w-1/5">
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

            <div className="w-1/5">
              <FormFields
                name="fname"
                label="الاسم الأول"
                type="text"
                placeholder="أدخل الاسم الأول"
                control={control}
                errors={errors}
                disabled={formLoading}
              />
            </div>

            <div className="w-1/5">
              <FormFields
                name="lname"
                label="اسم العائلة"
                type="text"
                placeholder="أدخل اسم العائلة"
                control={control}
                errors={errors}
                disabled={formLoading}
              />
            </div>

            <div className="w-1/5">
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

            <div className="w-1/5">
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
