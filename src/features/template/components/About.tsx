import { Info } from "lucide-react";
import AcademyAboutForm from "./AcademyAboutForm";

function About() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold flex gap-4 items-center text-foreground">
          <Info className="text-primary" />
          من نحن
        </h1>
      </div>
      <AcademyAboutForm />
    </div>
  );
}

export default About;
