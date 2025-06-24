import { Star } from "lucide-react";
import StudentReviewForm from "./StudentReviewForm";
import StudentReviewsTable from "./StudentReviewsTable";

function StudentReviews() {
  return (
    <div className="space-y-6">
      <Header />
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

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Star className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            آراء الطلبة
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <StudentReviewForm />
      </div>
    </div>
  );
}
