import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "@/pages";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";
import CourseDetails from "@/pages/courses/[slug]";
import LaunchAcademy from "@/pages/launch-academy";
import EmployeeTraining from "@/pages/employee-training";
import Ai from "@/pages/ai";
import { dashboardRoutes } from "./DashboardRoutes";
import { authRoutes } from "./AuthRoutes";
import { academyRoutes } from "./AcademyRoutes";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="courses/:slug" element={<CourseDetails />} />
      <Route path="launch-academy" element={<LaunchAcademy />} />
      <Route path="ai" element={<Ai />} />
      <Route path="employee-training" element={<EmployeeTraining />} />
      {dashboardRoutes}
      {authRoutes}
      {academyRoutes}
      <Route path="*" element={<NotFound />} />
    </>
  )
);
