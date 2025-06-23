import { useForm, Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ImageField from "@/components/shared/formFields/image-field";
import ColorPickerField from "@/components/shared/formFields/color-picker-field";
import {
  academyMainSettingsSchema,
  type AcademyMainSettingsFormData,
} from "@/validations/template";
import { Input } from "@/components/ui/input";

const AcademyMainSettingsForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting, isLoading },
    reset,
  } = useForm<AcademyMainSettingsFormData>({
    resolver: zodResolver(academyMainSettingsSchema),
    defaultValues: {
      academyName: "",
      primaryColor: "#3B82F6",
      secondaryColor: "#10B981",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: AcademyMainSettingsFormData) => {
    // Handle form submission logic here
    console.log("Form submitted with data:", data);
    // You can call your API or perform any other actions here
  };

  const formLoading = isSubmitting; //  isLoading;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        {/* Academy Name */}
        <div>
          <Label htmlFor="academyName" className="text-sm font-medium">
            اسم الأكاديمية
          </Label>
          <Controller
            control={control}
            name="academyName"
            render={({ field: { onChange, value } }) => (
              <Input
                id="academyName"
                type="text"
                value={value || ""}
                onChange={onChange}
                placeholder="أدخل اسم الأكاديمية"
                disabled={formLoading}
                className={errors.academyName ? "border-destructive" : ""}
              />
            )}
          />
          {errors.academyName && (
            <p className="text-sm text-destructive mt-1" role="alert">
              {errors.academyName.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            هذا الاسم سيظهر في أعلى الموقع وفي جميع الصفحات
          </p>
        </div>

        {/* Academy Logo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ImageField
              name="academyLogo"
              type="image"
              label="شعار الأكاديمية"
              placeholder="اختر شعار الأكاديمية (PNG, JPEG, WebP - حد أقصى 5MB)"
              control={control as unknown as Control<Record<string, unknown>>}
              errors={errors}
              disabled={formLoading}
            />
            <p className="text-xs text-muted-foreground mt-1">
              الأبعاد المثلى: 400×400 بكسل أو أكبر، نسبة 1:1
            </p>
          </div>

          {/* Academy Icon */}
          <div>
            <ImageField
              name="academyIcon"
              type="image"
              label="أيقونة الأكاديمية"
              placeholder="اختر أيقونة الأكاديمية (PNG, JPEG, WebP - حد أقصى 2MB)"
              control={control as unknown as Control<Record<string, unknown>>}
              errors={errors}
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground mt-1">
              الأبعاد المثلى: 64×64 بكسل أو 128×128 بكسل، نسبة 1:1
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary Color */}
          <Controller
            control={control}
            name="primaryColor"
            render={({ field: { onChange, value } }) => (
              <ColorPickerField
                label="اللون الأساسي"
                value={value}
                onChange={onChange}
                error={errors.primaryColor?.message}
                disabled={isLoading}
              />
            )}
          />

          {/* Secondary Color */}
          <Controller
            control={control}
            name="secondaryColor"
            render={({ field: { onChange, value } }) => (
              <ColorPickerField
                label="اللون الثانوي"
                value={value}
                onChange={onChange}
                error={errors.secondaryColor?.message}
                disabled={isLoading}
              />
            )}
          />
        </div>
      </div>

      {/* Form Actions - Only show when form has changes */}
      {isDirty && (
        <div className="flex gap-3">
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
            onClick={() => reset()}
          >
            إلغاء
          </Button>
        </div>
      )}
    </form>
  );
};

export default AcademyMainSettingsForm;
