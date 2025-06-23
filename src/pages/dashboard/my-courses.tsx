import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MyCourses() {
  const navigate = useNavigate();

  const handleSearchCourses = () => {
    // Navigate to home page where courses catalog is typically displayed
    // You can change this to a specific courses catalog route if needed
    navigate("/");
  };
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, rgb(240, 248, 255) 0%, rgb(230, 243, 255) 100%)",
      }}
      className="flex items-center justify-center p-14 border border-dashed rounded-2xl border-[rgb(135_206_235)]"
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Blue Circle with Plus Icon */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgb(74, 144, 226) 0%, rgb(53, 122, 189) 100%)",
          }}
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg relative"
        >
          {/* White inner circle */}
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            {/* Blue plus icon */}
            <Plus className="w-6 h-6 text-primary" strokeWidth={3} />
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-relaxed">
          📚 لا توجد مواد تعليمية مسجل بها حالياً
        </h1>

        {/* Description Text */}
        <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          استكشف المواد التعليمية المتاحة وابدأ رحلة تعلمك! يمكنك تصفح المواد
          والتسجيل في المواد التعليمية التي تناسب اهتماماتك وأهدافك التعليمية.
        </p>

        {/* Search Button */}
        <Button
          onClick={handleSearchCourses}
          style={{ backgroundColor: "rgba(74, 144, 226, 0.1)" }}
          className="hover:bg-primary text-[rgb(74_144_226)] rounded-[50px] text-sm font-semibold flex items-center gap-2 mx-auto shadow-lg transition-all duration-200 hover:shadow-xl"
        >
          <Search className="w-5 h-5" />
          ابحث عن المواد التعليمية المتاحة في المتجر
        </Button>

        {/* Decorative Border */}
      </div>
    </div>
  );
}

export default MyCourses;
