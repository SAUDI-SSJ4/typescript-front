import type { IFormField } from "@/types/app";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props extends IFormField {
  errors: FieldErrors;
  control: Control<Record<string, unknown>>;
}

const TextField = ({
  label,
  name,
  type,
  placeholder,
  disabled,
  autoFocus,
  control,
  errors,
}: Props) => {
  return (
    <div className="flex flex-col gap-2 text-right" dir="rtl">
      {label && (
        <Label
          htmlFor={name}
          className="text-sm font-medium text-card-foreground text-right"
        >
          {label}
        </Label>
      )}
      <div className="relative">
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              className={`${
                errors[name]
                  ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                  : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
              } h-10 !bg-transparent text-right pr-3 pl-8 dir-rtl`}
              type={type}
              onChange={onChange}
              onBlur={onBlur}
              value={String(value || "")}
              ref={ref}
              placeholder={placeholder || ""}
              disabled={disabled || false}
              autoFocus={autoFocus || false}
              id={name}
              aria-invalid={errors[name] ? "true" : "false"}
              dir="rtl"
            />
          )}
        />
        {type === "email" && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
        )}
      </div>
      {errors[name] && (
        <p className="text-sm text-destructive text-right">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default TextField;
