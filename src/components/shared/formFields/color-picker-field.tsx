import { HexColorPicker } from "react-colorful";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ColorPickerFieldProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const ColorPickerField = ({
  label,
  value,
  onChange,
  error,
  disabled = false,
  className,
}: ColorPickerFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleInputChange = (inputValue: string) => {
    // Allow partial hex values while typing
    if (/^#[0-9A-Fa-f]{0,6}$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-medium">{label}</Label>
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "w-full h-12 rounded-lg border-2 border-border hover:border-primary transition-colors relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-destructive",
            isOpen && "ring-2 ring-ring ring-offset-2"
          )}
          style={{ backgroundColor: value }}
        >
          <div className="absolute inset-0 bg-black/10 hover:bg-black/5 transition-colors" />
          <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium drop-shadow-lg">
            {value.toUpperCase()}
          </span>
        </button>

        {isOpen && (
          <div
            ref={pickerRef}
            className="absolute top-full left-0 z-50 mt-2 p-4 bg-white rounded-lg shadow-lg border min-w-max"
          >
            <div className="space-y-3">
              <HexColorPicker
                color={value}
                onChange={onChange}
                className="!w-48 !h-48"
              />

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="px-3 py-2 border rounded text-sm w-24 focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="#000000"
                  maxLength={7}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  تم
                </Button>
              </div>

              {/* Preset Colors */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">ألوان سريعة:</p>
                <div className="grid grid-cols-6 gap-1">
                  {[
                    "#3B82F6", // Blue
                    "#10B981", // Green
                    "#F59E0B", // Yellow
                    "#EF4444", // Red
                    "#8B5CF6", // Purple
                    "#06B6D4", // Cyan
                    "#84CC16", // Lime
                    "#F97316", // Orange
                    "#EC4899", // Pink
                    "#6B7280", // Gray
                    "#1F2937", // Dark
                    "#FFFFFF", // White
                  ].map((presetColor) => (
                    <button
                      key={presetColor}
                      type="button"
                      onClick={() => onChange(presetColor)}
                      className={cn(
                        "w-6 h-6 rounded border-2 hover:scale-110 transition-transform",
                        value === presetColor
                          ? "border-ring"
                          : "border-gray-300"
                      )}
                      style={{ backgroundColor: presetColor }}
                      title={presetColor}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default ColorPickerField;
