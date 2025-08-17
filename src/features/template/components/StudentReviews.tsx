import { Star } from "lucide-react";
import StudentReviewForm from "./StudentReviewForm";
import StudentReviewsTable from "./StudentReviewsTable";
import { useOpinions } from "../hooks/useOpinionsQueries";
import { Loader } from "@/components/shared";

function StudentReviews() {
  const { data: opinionsResponse, isLoading, error } = useOpinions(0, 100);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Header />
        <div className="flex justify-center py-10">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Header />
        <div className="text-center py-10 text-red-500">
          حدث خطأ أثناء جلب آراء الطلبة
        </div>
      </div>
    );
  }

  const opinions = opinionsResponse?.data.opinions || [];

  return (
    <div className="space-y-6">
      <Header />
      <StudentReviewsTable reviews={opinions} />
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
