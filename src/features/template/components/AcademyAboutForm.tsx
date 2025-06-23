import { useForm, Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ImageField from "@/components/shared/formFields/image-field";
import TextareaField from "@/components/shared/formFields/textarea-field";
import {
  academyAboutSchema,
  type AcademyAboutForm as AcademyAboutFormType,
} from "@/validations/template";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

const AcademyAboutForm = () => {
  const [hasUserChanges, setHasUserChanges] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
  } = useForm<AcademyAboutFormType>({
    resolver: zodResolver(academyAboutSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      featureOne: "",
      featureTwo: "",
    },
    mode: "onChange",
  });

  // Track when user actually makes changes (after initial render)
  useEffect(() => {
    if (isDirty) {
      setHasUserChanges(true);
    }
  }, [isDirty]);

  const onSubmit = async (data: AcademyAboutFormType) => {
    // Handle form submission logic here
    console.log("Form submitted with data:", data);
    // You can call your API or perform any other actions here

    // After successful submission, reset the user changes flag
    setHasUserChanges(false);
  };

  const handleReset = () => {
    reset();
    setHasUserChanges(false);
  };

  const formLoading = isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        {/* Title */}
        <div>
          <Label htmlFor="title" className="text-sm font-medium">
            العنوان
          </Label>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <Input
                id="title"
                type="text"
                value={value || ""}
                onChange={onChange}
                placeholder="أدخل العنوان"
                disabled={formLoading}
                className={errors.title ? "border-destructive" : ""}
              />
            )}
          />
          {errors.title && (
            <p className="text-sm text-destructive mt-1" role="alert">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Subtitle */}
        <div>
          <Label htmlFor="subtitle" className="text-sm font-medium">
            العنوان الفرعي
          </Label>
          <Controller
            control={control}
            name="subtitle"
            render={({ field: { onChange, value } }) => (
              <Input
                id="subtitle"
                type="text"
                value={value || ""}
                onChange={onChange}
                placeholder="أدخل العنوان الفرعي"
                disabled={formLoading}
                className={errors.subtitle ? "border-destructive" : ""}
              />
            )}
          />
          {errors.subtitle && (
            <p className="text-sm text-destructive mt-1" role="alert">
              {errors.subtitle.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <TextareaField
            name="description"
            type="textarea"
            label="الوصف"
            placeholder="أدخل وصف مفصل عن الأكاديمية والبرامج المقدمة"
            control={control}
            errors={errors}
            disabled={formLoading}
            rows={6}
            maxLength={1000}
          />
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Feature One */}
          <div>
            <Label htmlFor="featureOne" className="text-sm font-medium">
              السمة الأولى
            </Label>
            <Controller
              control={control}
              name="featureOne"
              render={({ field: { onChange, value } }) => (
                <Input
                  id="featureOne"
                  type="text"
                  value={value || ""}
                  onChange={onChange}
                  placeholder="مثال: 200 طالب"
                  disabled={formLoading}
                  className={errors.featureOne ? "border-destructive" : ""}
                />
              )}
            />
            {errors.featureOne && (
              <p className="text-sm text-destructive mt-1" role="alert">
                {errors.featureOne.message}
              </p>
            )}
          </div>

          {/* Feature Two */}
          <div>
            <Label htmlFor="featureTwo" className="text-sm font-medium">
              السمة الثانية
            </Label>
            <Controller
              control={control}
              name="featureTwo"
              render={({ field: { onChange, value } }) => (
                <Input
                  id="featureTwo"
                  type="text"
                  value={value || ""}
                  onChange={onChange}
                  placeholder="مثال: 200 طالب"
                  disabled={formLoading}
                  className={errors.featureTwo ? "border-destructive" : ""}
                />
              )}
            />
            {errors.featureTwo && (
              <p className="text-sm text-destructive mt-1" role="alert">
                {errors.featureTwo.message}
              </p>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <ImageField
            name="image"
            type="image"
            label="رفع الصورة"
            placeholder="اختر صورة (PNG, JPEG, WebP - حد أقصى 5MB)"
            control={control as unknown as Control<Record<string, unknown>>}
            errors={errors}
            disabled={formLoading}
          />
          <p className="text-xs text-muted-foreground mt-1">
            الأبعاد المثلى: 800×600 بكسل أو أكبر
          </p>
        </div>
      </div>

      {/* Form Actions - Only show when user has made changes */}
      {hasUserChanges && (
        <div className="flex gap-3 pt-6 border-t animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
          <Button
            type="submit"
            disabled={!isValid || formLoading}
            className="flex-1"
          >
            {formLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={formLoading}
            className="flex-1"
            onClick={handleReset}
          >
            إلغاء
          </Button>
        </div>
      )}
    </form>
  );
};

export default AcademyAboutForm;
