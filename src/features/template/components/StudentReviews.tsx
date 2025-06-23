import { Star } from "lucide-react";
import StudentReviewForm from "./StudentReviewForm";
import StudentReviewsTable from "./StudentReviewsTable";

function StudentReviews() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <h1 className="text-2xl font-bold flex gap-4 items-center text-foreground">
          <Star className="text-primary" />
          اراء الطلبة
        </h1>
        <StudentReviewForm />
      </div>
      <StudentReviewsTable
        reviews={[
          {
            student_name: "أحمد محمد",
            comment: "دورة رائعة! تعلمت الكثير.",
            rating: 5,
            image: "https://avatars.githubusercontent.com/u/87553297?v=4",
          },
          {
            student_name: "سارة علي",
            comment: "المحتوى كان مفيدًا جدًا.",
            rating: 4,
            image: "https://avatars.githubusercontent.com/u/87553297?v=4",
          },
          {
            student_name: "محمد حسن",
            comment: "تجربة تعليمية ممتازة.",
            rating: 5,
            image: "https://avatars.githubusercontent.com/u/87553297?v=4",
          },
        ]}
      />
    </div>
  );
}

export default StudentReviews;
