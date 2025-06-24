import AuthLayout from "@/templates/template-one/features/auth/components/AuthLayout";
import Signin from "@/templates/template-one/pages/auth/signin";
import Signup from "@/templates/template-one/pages/auth/signup";
import { Route } from "react-router-dom";

export const academyAuthRoutes = (
  <Route path="auth" element={<AuthLayout />}>
    <Route path="signin" element={<Signin />} />
    <Route path="signup" element={<Signup />} />
  </Route>
);
