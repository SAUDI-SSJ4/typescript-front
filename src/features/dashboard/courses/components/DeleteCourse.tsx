import { Button } from "@/components/ui/button";
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
import { useDeleteCourse } from "../hooks/useCoursesMutations";
import { Trash2 } from "lucide-react";
import { Loader } from "@/components/shared";
import type { Course } from "@/types/couse";
import { useEffect, useState } from "react";

export default function DeleteCourse({ course }: { course: Course }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { mutateAsync, isPending, isSuccess } = useDeleteCourse();
  useEffect(() => {
    if (isSuccess) {
      setMenuOpen(false); // Close the dialog on successful deletion
    }
  }, [isSuccess]);
  return (
    <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="!text-right">
          <DialogTitle>حذف المادة التعليمية</DialogTitle>
          <DialogDescription>
            هل أنت متأكد أنك تريد حذف هذه المادة التعليمية؟ هذا الإجراء لا يمكن
            التراجع عنه.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            disabled={isPending}
            onClick={async () => await mutateAsync(course)}
          >
            {isPending && <Loader />}
            حذف
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              إلغاء
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
