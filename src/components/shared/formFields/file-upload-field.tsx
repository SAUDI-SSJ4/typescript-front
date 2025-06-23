import type { IFormField } from "@/types/app";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { Upload, X, File, Image as ImageIcon, Video } from "lucide-react";

interface Props extends IFormField {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  errors: FieldErrors;
  accept?: string;
  maxSize?: number; // in MB
  allowedTypes?: string[];
  fileType?: "image" | "video" | "any";
}

const FileUploadField = ({
  label,
  name,
  placeholder,
  disabled,
  control,
  errors,
  accept,
  maxSize = 5,
  allowedTypes = [],
  fileType = "any",
}: Props) => {
  const hasError = Boolean(errors[name]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileRemove = (onChange: (value: File | null) => void) => {
    onChange(null);
    setPreview(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File | null) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // File size validation
      if (file.size > maxSize * 1024 * 1024) {
        return;
      }

      // File type validation
      if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
        return;
      }

      onChange(file);
      setFileName(file.name);

      // Create preview for images and videos
      if (fileType === "image" && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else if (fileType === "video" && file.type.startsWith("video/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }
  };

  const getFileIcon = () => {
    switch (fileType) {
      case "image":
        return <ImageIcon className="w-8 h-8" />;
      case "video":
        return <Video className="w-8 h-8" />;
      default:
        return <File className="w-8 h-8" />;
    }
  };

  const getAcceptAttribute = () => {
    if (accept) return accept;
    switch (fileType) {
      case "image":
        return "image/*";
      case "video":
        return "video/*";
      default:
        return "*/*";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label
          htmlFor={name}
          className="text-sm font-medium text-card-foreground"
        >
          {label}
        </Label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <div className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept={getAcceptAttribute()}
              onChange={(e) => handleFileChange(e, onChange)}
              className="hidden"
              disabled={disabled}
            />

            {value ? (
              <div className="relative">
                {preview && fileType === "image" ? (
                  // Image preview
                  <div className="relative inline-block">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full max-w-xs h-48 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={() => handleFileRemove(onChange)}
                      disabled={disabled}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : preview && fileType === "video" ? (
                  // Video preview
                  <div className="relative inline-block w-full">
                    <video
                      src={preview}
                      className="w-full max-w-md h-48 object-cover rounded-lg border"
                      controls
                      preload="metadata"
                    >
                      متصفحك لا يدعم تشغيل الفيديو.
                    </video>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={() => handleFileRemove(onChange)}
                      disabled={disabled}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p className="font-medium truncate">{fileName}</p>
                    </div>
                  </div>
                ) : (
                  // File name display
                  <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/50">
                    {getFileIcon()}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{fileName}</p>
                      <p className="text-xs text-muted-foreground">
                        {fileType === "image"
                          ? "صورة"
                          : fileType === "video"
                          ? "فيديو"
                          : "ملف"}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFileRemove(onChange)}
                      disabled={disabled}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              // Upload area
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors hover:bg-muted/50",
                  hasError
                    ? "border-destructive"
                    : "border-muted-foreground/25",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
                onClick={!disabled ? handleFileSelect : undefined}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="text-muted-foreground">{getFileIcon()}</div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      {placeholder || "اضغط لاختيار ملف"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      الحد الأقصى: {maxSize} ميجابايت
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={disabled}
                    className="pointer-events-none"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    اختيار ملف
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      />

      {errors[name] && (
        <p className="text-sm text-destructive">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default FileUploadField;
