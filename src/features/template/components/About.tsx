import { Info } from "lucide-react";
import AcademyAboutForm from "./AcademyAboutForm";
import { useAcademyAbout } from "../hooks/useAboutQueries";
import { Loader } from "@/components/shared";

function About() {
  const { data: about, isPending } = useAcademyAbout();

  if (isPending) {
    return (
      <div className="element-center">
        <Loader />
      </div>
    );
  }
  return (
    !isPending &&
    about && (
      <div className="space-y-6">
        <Header />
        <AcademyAboutForm about={about.data} />
      </div>
    )
  );
}

export default About;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Info className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">قسم من نحن</span>
        </div>
      </div>
    </div>
  );
}
