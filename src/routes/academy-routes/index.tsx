import Home from "@/templates/template-one/pages";
import CourseDetails from "@/templates/template-one/pages/courses/[slug]";
import { Route } from "react-router-dom";
import { academyAuthRoutes } from "./AuthRoutes";
import { hasSubdomain } from "@/lib/subdomain";

export const academyRoutes = hasSubdomain() ? (
  <Route path="/">
    <Route index element={<Home />} />
    <Route path="courses/:courseSlug" element={<CourseDetails />} />
    {academyAuthRoutes}
  </Route>
) : (
  <Route path="academy/:academySlug">
    <Route index element={<Home />} />
    <Route path="courses/:courseSlug" element={<CourseDetails />} />
    {academyAuthRoutes}
  </Route>
);
