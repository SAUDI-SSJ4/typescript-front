import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useCreateSection,
  type SectionPayload,
} from "../../hooks/useSectionsMutations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Loader } from "@/components/shared";
import { sectionSchema, type SectionFormData } from "@/validations/course";
import SectionForm from "./SectionForm";

function AddSection() {
  const { courseId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: createSection, isPending } = useCreateSection();

  const {
    control,
    reset,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<SectionFormData>({
    resolver: zodResolver(sectionSchema),
    mode: "onChange", // This enables real-time validation
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (data: SectionFormData) => {
    try {
      if (!courseId) {
        toast.error("معرف الدورة غير موجود");
        return;
      }

      // Create FormData for the request
      const formData = new FormData();
      formData.append("title", data.title);

      const sectionPayload: SectionPayload = {
        courseId,
        data: formData,
      };

      await createSection(sectionPayload);
      reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating section:", error);
    }
  };

  const handleCreateSection = async () => {
    const isValid = await trigger(); // Trigger validation
    if (!isValid) return;

    const data = getValues(); // Get form values
    await onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="sm"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          إضافة فصل جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-0 shadow-xl">
        <div>
          <DialogHeader>
            <DialogTitle className="text-gray-800">إضافة فصل جديد</DialogTitle>
            <DialogDescription className="text-gray-600">
              يمكنك إضافة فصل جديد للدورة.
            </DialogDescription>
          </DialogHeader>
          <SectionForm
            control={control}
            errors={errors}
            isPending={isPending}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="border-gray-200"
                type="button"
                disabled={isPending}
              >
                إلغاء
              </Button>
            </DialogClose>
            <Button
              type="button"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isPending}
              onClick={handleCreateSection}
            >
              إضافة الفصل
              {isPending && <Loader />}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddSection;
