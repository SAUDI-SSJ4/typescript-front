import type { IFormField } from "@/types/app";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Props extends IFormField {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  errors: FieldErrors;
  rows?: number;
  maxLength?: number;
}

const TextareaField = ({
  label,
  name,
  placeholder,
  disabled,
  control,
  errors,
  rows = 4,
  maxLength,
}: Props) => {
  const hasError = Boolean(errors[name]);

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
          <>
            <Textarea
              className={cn(
                hasError
                  ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                  : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border",
                "!bg-transparent resize-none"
              )}
              onChange={onChange}
              onBlur={onBlur}
              value={String(value || "")}
              ref={ref}
              placeholder={placeholder || ""}
              disabled={disabled || false}
              id={name}
              rows={rows}
              maxLength={maxLength}
              aria-invalid={errors[name] ? "true" : "false"}
            />
            {maxLength && (
              <p className="text-xs text-muted-foreground text-left">
                {String(value || "").length} / {maxLength}
              </p>
            )}
          </>
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

export default TextareaField;
