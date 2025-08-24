import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Trash2 } from "lucide-react";

interface ImageUploaderProps {
  label?: string;
  value?: string;
  onChange: (value: string | null) => void;
  disabled?: boolean;
  accept?: string;
  maxSizeMb?: number;
  className?: string;
  placeholder?: string;
  withUrlInput?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  accept = "image/*",
  maxSizeMb = 10,
  className = "",
  placeholder = "اضغط لل الصورة صورة",
  withUrlInput = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectClick = () => {
    if (!disabled) fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return;
    if (file.size > maxSizeMb * 1024 * 1024) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <Label className="text-sm font-medium">{label}</Label>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />

      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-blue-400"
        } ${value ? "" : ""}`}
        onClick={handleSelectClick}
      >
        {value ? (
          <div className="relative inline-block">
            <img
              src={value}
              alt="معاينة الصورة"
              className="max-w-full max-h-48 object-cover rounded-lg mx-auto"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 left-2"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              disabled={disabled}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="w-8 h-8 text-gray-400 mx-auto" />
            <div className="text-gray-600">
              <p className="font-medium">{placeholder}</p>
              <p className="text-xs">PNG, JPG, WEBP حتى {maxSizeMb}MB</p>
            </div>
            <div>
              <Button type="button" variant="default" size="sm">
                <Upload className="w-4 h-4 ml-2" />
                اختر صورة
              </Button>
            </div>
          </div>
        )}
      </div>

      {withUrlInput && (
        <div className="space-y-2">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">أو</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image-url">رابط الصورة</Label>
            <Input
              id="image-url"
              type="url"
              placeholder="https://example.com/image.jpg"
              dir="ltr"
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;


