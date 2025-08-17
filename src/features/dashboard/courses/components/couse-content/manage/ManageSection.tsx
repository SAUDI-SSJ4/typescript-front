import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Section } from "@/types/couse";
import {
  useDeleteSection,
  useUpdateSection,
} from "../../../hooks/useSectionsMutations";
import { sectionSchema, type SectionFormData } from "@/validations/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FileText } from "lucide-react";
import SectionForm from "../SectionForm";
import DeleteItemDialog from "@/components/shared/DeleteItemDialog";

function ManageSection({ section }: { section: Section }) {
  const updateSectionMutation = useUpdateSection();
  const deleteSectionMutation = useDeleteSection();
  const {
    control,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<SectionFormData>({
    resolver: zodResolver(sectionSchema),
    mode: "onChange",
    values: {
      title: section.title || "",
    },
  });

  const onSubmit = async (data: SectionFormData) => {
    try {
      await updateSectionMutation.mutateAsync({
        sectionId: String(section.id),
        data,
      });
    } catch (error) {
      console.error("Error creating section:", error);
    }
  };

  const handleAddSection = async () => {
    const isValid = await trigger(); // Trigger validation
    if (!isValid) return;
    const data = getValues(); // Get form values

    await onSubmit(data);
  };

  const handleDeleteSection = async (id: string) => {
    try {
      await deleteSectionMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting section:", error);
    }
  };
  return (
    <Card className="p-6 shadow-sm border-0 h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
      </div>

      <SectionForm
        control={control}
        errors={errors}
        isPending={updateSectionMutation.isPending}
      />

      {/* Action Buttons */}
      <div className="pt-4 border-t">
        <div className="flex gap-3">
          <Button
            type="button"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleAddSection}
            disabled={
              updateSectionMutation.isPending || deleteSectionMutation.isPending
            }
          >
            حفظ التغييرات
            {/* {isUpdateSectionPending && <Loader />} */}
          </Button>
          <DeleteItemDialog
            id={String(section.id)}
            isPending={
              updateSectionMutation.isPending || deleteSectionMutation.isPending
            }
            onDelete={handleDeleteSection}
            heading="حذف القسم"
          />
        </div>
      </div>
    </Card>
  );
}

export default ManageSection;
