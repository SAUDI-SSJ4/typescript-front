import Icon from "@/components/shared/Icon";
import { Heart } from "lucide-react";

function Favorites() {
  return (
    <div className="space-y-6">
      <Header />
      
      <div className="py-20">
        <div className="text-center">
          <Icon name="star" size="64px" className="text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">قائمة المفضلة فارغة</h2>
          <p className="text-muted-foreground">
            لم تقم بإضافة أي دورات أو محتوى إلى قائمة المفضلة بعد.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Favorites;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Heart className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            المفضلة
          </span>
        </div>
      </div>
    </div>
  );
}
