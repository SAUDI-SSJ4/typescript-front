import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import Dashboard from "@/pages/dashboard";
import MyCourses from "@/pages/dashboard/my-courses";
import DigitalProducts from "@/pages/dashboard/digital-products";
import Favorites from "@/pages/dashboard/favorites";
import Profile from "@/pages/dashboard/profile";
import Purchases from "@/pages/dashboard/purchases";
import Settings from "@/pages/dashboard/settings";
import ShoppingCart from "@/pages/dashboard/shopping-cart";
import Wallet from "@/pages/dashboard/wallet";
import { Route } from "react-router-dom";
import AcademyCourses from "../pages/dashboard/courses";
import AddNewCourse from "@/pages/dashboard/courses/new";
import Trainers from "../pages/dashboard/trainers";
import AddNewTrainer from "@/pages/dashboard/trainers/new";
import { templateRoutes } from "./TemplateRoutes";

export const dashboardRoutes = (
  <Route path="dashboard" element={<DashboardLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
    {/* Students Bag Routes */}
    <Route path="my-courses" element={<MyCourses />} />
    <Route path="trainers" element={<Trainers />} />
    <Route path="trainers/new" element={<AddNewTrainer />} />
    <Route path="courses" element={<AcademyCourses />} />
    <Route path="courses/new" element={<AddNewCourse />} />
    <Route path="digital-products" element={<DigitalProducts />} />
    <Route path="certificates" element={<div>الشهادات - قريباً</div>} />
    <Route path="favorites" element={<Favorites />} />
    {/* Other Routes */}
    <Route path="purchases" element={<Purchases />} />
    <Route path="shopping-cart" element={<ShoppingCart />} />
    <Route path="wallet" element={<Wallet />} />
    {/* Shopping Cart Routes */}
    <Route
      path="affiliate-marketing"
      element={<div>التسويق بالعمولة - قريباً</div>}
    />
    {templateRoutes}
  </Route>
);
