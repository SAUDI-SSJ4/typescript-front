import type { SelectedItem } from ".";

interface HeaderProps {
  selectedItem: SelectedItem | null;
}

const Header = ({ selectedItem }: HeaderProps) => {
  const getTitle = () => {
    return selectedItem?.lesson?.title || "درس HTML الأساسي";
  };

  const getCourseTitle = () => {
    return "تعلم HTML في 5 دقائق";
  };

  const getSectionTitle = () => {
    return selectedItem?.section?.title || "المقدمة";
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <div className="flex items-center gap-3 text-gray-600">
            <span className="text-lg font-semibold text-gray-800">
              {getCourseTitle()}
            </span>
            <span className="text-gray-400 text-lg">{">"}</span>
            <span className="text-lg font-semibold text-gray-800">
              {getSectionTitle()}
            </span>
            <span className="text-gray-400 text-lg">{">"}</span>
            <span className="text-lg font-semibold text-blue-600">
              {getTitle()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
