import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "@/pages";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";
import CourseDetails from "@/pages/courses/[slug]";
import LiveCourseDetails from "@/pages/live-courses/[slug]";
import InPersonCourseDetails from "@/pages/in-person-courses/[slug]";
import LaunchAcademy from "@/pages/launch-academy";
import EmployeeTraining from "@/pages/employee-training";
import Ai from "@/pages/ai";
<<<<<<< HEAD
import MockPayment from "@/pages/mock-payment";

=======
import PublicBlogs from "@/pages/blogs/index";
import SingleBlog from "@/pages/blogs/[id]";
>>>>>>> sketch
import { dashboardRoutes } from "./DashboardRoutes";
import { authRoutes } from "./AuthRoutes";
import { academyRoutes } from "./academy-routes";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="courses/:courseSlug" element={<CourseDetails />} />
      <Route path="live-courses/:courseSlug" element={<LiveCourseDetails />} />
      <Route path="in-person-courses/:courseSlug" element={<InPersonCourseDetails />} />
      <Route path="launch-academy" element={<LaunchAcademy />} />
      <Route path="blogs" element={<PublicBlogs />} />
      <Route path="blogs/:id" element={<SingleBlog />} />
      <Route path="ai" element={<Ai />} />
      <Route path="employee-training" element={<EmployeeTraining />} />
<<<<<<< HEAD
      <Route path="mock-payment" element={<MockPayment />} />

=======
>>>>>>> sketch
      {dashboardRoutes}
      {authRoutes}
      {academyRoutes}
      <Route path="*" element={<NotFound />} />
    </>
  )
);
