import { Route } from "react-router-dom";
import About from "@/features/template/components/About";
import MainMenu from "@/features/template/components/MainMenu";
import MainSettings from "@/features/template/components/MainSettings";
import StudentFaqs from "@/features/template/components/StudentFaqs";
import StudentReviews from "@/features/template/components/StudentReviews";

export const templateRoutes = (
  <Route path="template">
    <Route index element={<MainSettings />} />
    <Route path="main-menu" element={<MainMenu />} />
    <Route path="about" element={<About />} />
    <Route path="student-reviews" element={<StudentReviews />} />
    <Route path="faqs" element={<StudentFaqs />} />
  </Route>
);
