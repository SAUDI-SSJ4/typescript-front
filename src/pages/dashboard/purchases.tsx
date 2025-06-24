import { ShoppingBag, Bookmark } from "lucide-react";

function Purchases() {
  return (
    <div className="space-y-6">
      <Header />

      {/* Empty State */}
      <div className="bg-white p-6 md:p-12 rounded-lg shadow-sm">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          {/* Icon */}
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
            <Bookmark className="w-10 h-10 text-gray-400" />
          </div>

          {/* Main Text */}
          <h3 className="text-xl font-semibold text-gray-800">
            لا توجد مشتريات لعرضها حاليًا
          </h3>

          {/* Description */}
          <p className="text-gray-500 max-w-md">
            ابدأ بتصفح المواد التعليمية وإضافتها إلى مشترياتك
          </p>
        </div>
      </div>
    </div>
  );
}

export default Purchases;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <ShoppingBag className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            المشتريات
          </span>
        </div>
      </div>
    </div>
  );
}
