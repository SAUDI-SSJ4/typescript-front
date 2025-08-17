import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { SectionFormData } from "@/validations/course";

function SectionForm({
  control,
  isPending,
  errors,
}: {
  control: Control<SectionFormData, unknown>;
  isPending: boolean;
  errors: FieldErrors<{
    title: string;
  }>;
}) {
  return (
    <div className="my-4">
      <Label htmlFor="section-title" className="text-gray-700">
        عنوان الفصل
      </Label>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="أدخل عنوان الفصل"
            disabled={isPending}
          />
        )}
      />
      {errors.title && (
        <span className="text-sm text-red-500">{errors.title.message}</span>
      )}
    </div>
  );
}

export default SectionForm;
