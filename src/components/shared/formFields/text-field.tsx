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
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            className={`${
              errors[name]
                ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
            } h-10 !bg-transparent`}
            type={type}
            onChange={(e) => {
              const val = e.target.value;
              // For number inputs, convert to number or set to 0 if empty
              if (type === "number") {
                onChange(val === "" ? 0 : Number(val));
              } else {
                onChange(val);
              }
            }}
            onBlur={onBlur}
            value={
              type === "number" ? (value || 0).toString() : String(value || "")
            }
            ref={ref}
            placeholder={placeholder || ""}
            disabled={disabled || false}
            autoFocus={autoFocus || false}
            id={name}
            aria-invalid={errors[name] ? "true" : "false"}
          />
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

export default TextField;
