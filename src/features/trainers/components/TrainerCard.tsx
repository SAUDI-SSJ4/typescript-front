import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Mail, Phone, BookOpen, Star, Users, Edit, Trash2 } from "lucide-react";
import type { Trainer } from "@/types/trainer";

interface TrainerCardProps {
  trainer: Trainer;
  onEdit?: (trainer: Trainer) => void;
  onDelete?: (trainerId: number) => void;
}

function TrainerCard({ trainer, onEdit, onDelete }: TrainerCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="text-center pb-4">
        <div className="relative mx-auto">
          <img
            src={trainer.image}
            alt={trainer.name}
            className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-blue-100"
          />
          {trainer.isActive !== false && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-gray-900">
            {trainer.name}
          </h3>
          {trainer.specialization && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {trainer.specialization}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="w-4 h-4 text-blue-600" />
            <span className="truncate">{trainer.email}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="w-4 h-4 text-green-600" />
            <span>{trainer.phone}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {trainer.coursesCount}
            </div>
            <div className="text-xs text-gray-500">دورة</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
              <Star className="w-4 h-4 fill-current" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {trainer.rating?.toFixed(1) || "0.0"}
            </div>
            <div className="text-xs text-gray-500">تقييم</div>
          </div>
        </div>

        {trainer.studentsCount && (
          <div className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg">
            <Users className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {trainer.studentsCount.toLocaleString()} طالب
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-4 border-t border-gray-100">
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50"
            onClick={() => onEdit?.(trainer)}
          >
            <Edit className="w-4 h-4 mr-1" />
            تعديل
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
            onClick={() => onDelete?.(trainer.id)}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            حذف
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default TrainerCard;
