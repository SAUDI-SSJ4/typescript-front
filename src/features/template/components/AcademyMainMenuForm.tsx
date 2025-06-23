import { useForm, Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ImageField from "@/components/shared/formFields/image-field";
import TextareaField from "@/components/shared/formFields/textarea-field";
import {
  academyMainMenuSchema,
  type AcademyMainMenuForm as AcademyMainMenuFormType,
} from "@/validations/template";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

const AcademyMainMenuForm = () => {
  const [hasUserChanges, setHasUserChanges] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
  } = useForm<AcademyMainMenuFormType>({
    resolver: zodResolver(academyMainMenuSchema),
    defaultValues: {
      mainTitle: "",
      subTitle: "",
      description: "",
      firstLinkTitle: "",
      firstLinkUrl: "",
      secondLinkTitle: "",
      secondLinkUrl: "",
    },
    mode: "onChange",
  });

  // Track when user actually makes changes (after initial render)
  useEffect(() => {
    if (isDirty) {
      setHasUserChanges(true);
    }
  }, [isDirty]);

  const onSubmit = async (data: AcademyMainMenuFormType) => {
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
        {/* Main Title */}
        <div>
          <Label htmlFor="mainTitle" className="text-sm font-medium">
            العنوان الرئيسي
          </Label>
          <Controller
            control={control}
            name="mainTitle"
            render={({ field: { onChange, value } }) => (
              <Input
                id="mainTitle"
                type="text"
                value={value || ""}
                onChange={onChange}
                placeholder="أدخل العنوان الرئيسي"
                disabled={formLoading}
                className={errors.mainTitle ? "border-destructive" : ""}
              />
            )}
          />
          {errors.mainTitle && (
            <p className="text-sm text-destructive mt-1" role="alert">
              {errors.mainTitle.message}
            </p>
          )}
        </div>

        {/* Sub Title */}
        <div>
          <Label htmlFor="subTitle" className="text-sm font-medium">
            العنوان الفرعي
          </Label>
          <Controller
            control={control}
            name="subTitle"
            render={({ field: { onChange, value } }) => (
              <Input
                id="subTitle"
                type="text"
                value={value || ""}
                onChange={onChange}
                placeholder="أدخل العنوان الفرعي"
                disabled={formLoading}
                className={errors.subTitle ? "border-destructive" : ""}
              />
            )}
          />
          {errors.subTitle && (
            <p className="text-sm text-destructive mt-1" role="alert">
              {errors.subTitle.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <TextareaField
            name="description"
            type="textarea"
            label="الوصف"
            placeholder="أدخل وصف تفصيلي"
            control={control}
            errors={errors}
            disabled={formLoading}
            rows={4}
            maxLength={500}
          />
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Link */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">الرابط الأول</h3>

            <div>
              <Label htmlFor="firstLinkTitle" className="text-sm font-medium">
                عنوان الرابط الأول
              </Label>
              <Controller
                control={control}
                name="firstLinkTitle"
                render={({ field: { onChange, value } }) => (
                  <Input
                    id="firstLinkTitle"
                    type="text"
                    value={value || ""}
                    onChange={onChange}
                    placeholder="مثال: مدونتي"
                    disabled={formLoading}
                    className={
                      errors.firstLinkTitle ? "border-destructive" : ""
                    }
                  />
                )}
              />
              {errors.firstLinkTitle && (
                <p className="text-sm text-destructive mt-1" role="alert">
                  {errors.firstLinkTitle.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="firstLinkUrl" className="text-sm font-medium">
                رابط الرابط الأول
              </Label>
              <Controller
                control={control}
                name="firstLinkUrl"
                render={({ field: { onChange, value } }) => (
                  <Input
                    id="firstLinkUrl"
                    type="url"
                    value={value || ""}
                    onChange={onChange}
                    placeholder="https://www.google.com"
                    disabled={formLoading}
                    className={errors.firstLinkUrl ? "border-destructive" : ""}
                  />
                )}
              />
              {errors.firstLinkUrl && (
                <p className="text-sm text-destructive mt-1" role="alert">
                  {errors.firstLinkUrl.message}
                </p>
              )}
            </div>
          </div>

          {/* Second Link */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">الرابط الثاني</h3>

            <div>
              <Label htmlFor="secondLinkTitle" className="text-sm font-medium">
                عنوان الرابط الثاني
              </Label>
              <Controller
                control={control}
                name="secondLinkTitle"
                render={({ field: { onChange, value } }) => (
                  <Input
                    id="secondLinkTitle"
                    type="text"
                    value={value || ""}
                    onChange={onChange}
                    placeholder="مثال: قناتي في اليوتيوب"
                    disabled={formLoading}
                    className={
                      errors.secondLinkTitle ? "border-destructive" : ""
                    }
                  />
                )}
              />
              {errors.secondLinkTitle && (
                <p className="text-sm text-destructive mt-1" role="alert">
                  {errors.secondLinkTitle.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="secondLinkUrl" className="text-sm font-medium">
                رابط الرابط الثاني
              </Label>
              <Controller
                control={control}
                name="secondLinkUrl"
                render={({ field: { onChange, value } }) => (
                  <Input
                    id="secondLinkUrl"
                    type="url"
                    value={value || ""}
                    onChange={onChange}
                    placeholder="https://www.google.com"
                    disabled={formLoading}
                    className={errors.secondLinkUrl ? "border-destructive" : ""}
                  />
                )}
              />
              {errors.secondLinkUrl && (
                <p className="text-sm text-destructive mt-1" role="alert">
                  {errors.secondLinkUrl.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <ImageField
            name="image"
            type="image"
            label="الصورة"
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

export default AcademyMainMenuForm;
