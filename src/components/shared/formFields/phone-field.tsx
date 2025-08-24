import type { IFormField } from "@/types/app";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import { Label } from "@/components/ui/label";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Props extends IFormField {
  errors: FieldErrors;
  control: Control<Record<string, unknown>>;
}

const PhoneField = ({
  label,
  name,
  placeholder,
  disabled,
  autoFocus,
  control,
  errors,
}: Props) => {
  const hasError = Boolean(errors[name]);
  const [selectedCountry, setSelectedCountry] = useState<string>("SA");
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
        render={({ field: { onChange, value } }) => (
          <div className="relative" dir="rtl">
            <PhoneInput
              international
              country={selectedCountry as "SA"}
              value={(value as string) || ""}
              onChange={(newValue) => {
                // Handle phone number change
                onChange(newValue || "");
              }}
              onCountryChange={(country) => {
                // Update selected country state
                if (country) {
                  setSelectedCountry(country);
                }
                // Don't manipulate the value here to avoid infinite loops
                // The PhoneInput component will handle formatting automatically
              }}
              disabled={disabled || false}
              placeholder={placeholder || ""}
              dir="rtl"
              className={cn(
                "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                hasError && "border-destructive focus-visible:ring-destructive",
                // Custom styles for phone input with RTL support
                "[&_.PhoneInputCountry]:!border-none [&_.PhoneInputCountry]:!outline-none [&_.PhoneInputCountry]:!ring-0",
                "[&_.PhoneInputCountrySelect]:!bg-transparent [&_.PhoneInputCountrySelect]:!cursor-pointer",
                "[&_.PhoneInputInput]:!border-none [&_.PhoneInputInput]:!outline-none [&_.PhoneInputInput]:!ring-0 [&_.PhoneInputInput]:!bg-transparent [&_.PhoneInputInput]:text-right",
                // RTL specific styles - reorder elements for RTL layout
                "[&]:flex-row-reverse",
                "[&_.PhoneInputCountry]:ml-2 [&_.PhoneInputCountry]:mr-0"
              )}
              numberInputProps={{
                className:
                  "!border-none !outline-none !ring-0 !bg-transparent flex-1 text-sm pr-2 text-right",
                autoFocus: autoFocus,
                dir: "rtl",
              }}
              countrySelectProps={{
                className:
                  "!border-none !outline-none !ring-0 !bg-transparent !cursor-pointer z-10 hover:bg-gray-50 transition-colors ml-2",
                style: {
                  pointerEvents: "auto",
                  cursor: "pointer",
                  minWidth: "auto",
                },
                tabIndex: 0,
                "aria-label": "Select country",
              }}
            />
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

export default PhoneField;
