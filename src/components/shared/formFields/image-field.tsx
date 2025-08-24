import type { IFormField } from "@/types/app";
import { useFormContext, Controller, Control, FieldValues } from "react-hook-form";
import type { FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

/**
 * واجهة خصائص مكون حقل الصورة
 * @interface Props
 * @extends IFormField
 */
interface Props extends IFormField {
  /** أخطاء التحقق من صحة النموذج */
  errors: FieldErrors;
  /** التحكم في النموذج (اختياري) - يستخدم عندما يكون المكون خارج FormProvider */
  control?: Control<any>;
}

/**
 * مكون حقل الصورة - يتيح للمستخدم اختيار صورة وعرض معاينة لها
 * @param {Props} props - خصائص المكون
 * @returns {JSX.Element} مكون حقل الصورة
 */
const ImageField = ({
  label,
  name,
  placeholder,
  disabled,
  errors,
  control: controlProp,
}: Props) => {
  // استخدام control من الخصائص إذا كان متاحًا، وإلا محاولة الحصول عليه من سياق النموذج
  const formContext = useFormContext();
  const control = controlProp || formContext?.control;
  
  if (!control) {
    console.error('خطأ: يجب توفير خاصية control أو استخدام المكون داخل FormProvider');
    return (
      <div className="p-4 border border-destructive rounded-lg">
        <p className="text-destructive">خطأ: لا يمكن استخدام حقل الصورة بدون سياق النموذج</p>
      </div>
    );
  }
  
  const hasError = Boolean(errors[name]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  // تنظيف عنوان URL عند إزالة المكون
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  /**
   * فتح مربع حوار اختيار الملف عند النقر على الزر
   */
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  /**
   * معالجة تغيير الملف المختار
   * @param {React.ChangeEvent<HTMLInputElement>} event - حدث تغيير الملف
   * @param {Function} onChange - دالة التغيير من react-hook-form
   */
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File | null) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // تنظيف عنوان URL السابق إن وجد
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      
      // إنشاء عنوان URL للمعاينة
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // تمرير الملف إلى النموذج
      onChange(file);
    }
  };

  /**
   * إزالة الصورة المختارة
   * @param {Function} onChange - دالة التغيير من react-hook-form
   */
  const removeImage = (onChange: (value: File | null) => void) => {
    // تنظيف عنوان URL إن وجد
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
    
    // إعادة تعيين قيمة النموذج
    onChange(null);
    
    // إعادة تعيين حقل الإدخال
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label htmlFor={name} className={cn("text-sm font-medium")}>
          {label}
        </Label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }: { field: { onChange: (value: File | null) => void } }) => (
          <div className="space-y-4">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, onChange)}
              className="hidden"
              disabled={disabled}
            />

            {/* Preview or upload area */}
            <div
              className={cn(
                "relative border border-dashed rounded-lg p-3 text-center transition-colors",
                hasError
                  ? "border-destructive"
                  : "border-border hover:border-primary",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {preview ? (
                <div className="flex items-center gap-3 p-2">
                  <div className="relative">
                    <div
                      className={cn(
                        "relative cursor-pointer group",
                        disabled && "cursor-not-allowed opacity-50"
                      )}
                      onClick={disabled ? undefined : handleFileSelect}
                    >
                      <img
                        src={preview}
                        alt="Preview"
                        loading="lazy"
                        className="h-8 w-8 rounded-full object-cover border border-border shadow-sm transition-opacity group-hover:opacity-75"
                      />
                      {/* Overlay icon on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black/50 rounded-full p-1">
                          <svg
                            className="h-3 w-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-xs"
                      onClick={() => removeImage(onChange)}
                      disabled={disabled}
                    >
                      ×
                    </Button>
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-sm font-medium text-foreground">
                      تم اختيار الصورة
                    </p>
                    <p className="text-xs text-muted-foreground">
                      اضغط على الصورة لتغييرها
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className={cn(
                    "flex items-center gap-3 cursor-pointer transition-colors hover:bg-muted/50 rounded-lg p-2",
                    disabled && "cursor-not-allowed opacity-50"
                  )}
                  onClick={disabled ? undefined : handleFileSelect}
                >
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <svg
                      className="h-4 w-4 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-sm font-medium text-foreground">
                      {placeholder || "اختر صورة"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG (حد أقصى 2MB)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      />
      {hasError && (
        <p
          id={`${name}-error`}
          className="text-sm text-destructive"
          role="alert"
        >
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default ImageField;
