import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader } from "@/components/shared";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

function DeleteItemDialog({
  id,
  onDelete,
  isPending,
  heading,
}: {
  id: string;
  onDelete: (id: string) => void;
  isPending: boolean;
  heading?: string;
}) {
  const handleDelete = (id: string) => {
    onDelete(id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="flex-1">
          <Trash2 className="w-4 h-4 mr-2" />
          حذف
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-0 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-gray-800">
            {heading || "حذف العنصر"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            هل أنت متأكد أنك تريد حذف هذا العنصر؟ هذه العملية لا يمكن التراجع
            عنها.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="border-gray-200">
              إلغاء
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={() => handleDelete(id)}
              disabled={isPending}
            >
              حذف
              {isPending && <Loader />}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default DeleteItemDialog;
