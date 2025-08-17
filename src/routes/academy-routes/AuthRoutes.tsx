import SigninWithGoogle from "@/pages/sigin-with-google";
import AuthLayout from "@/templates/template-one/features/auth/components/AuthLayout";
import ForgotPassword from "@/templates/template-one/pages/auth/forgot-password";
import ResetPassword from "@/templates/template-one/pages/auth/reset-password";
import Signin from "@/templates/template-one/pages/auth/signin";
import Signup from "@/templates/template-one/pages/auth/signup";
import VerifyAccount from "@/templates/template-one/pages/auth/verify-account";
import { Route } from "react-router-dom";

export const academyAuthRoutes = (
  <Route path="auth" element={<AuthLayout />}>
    <Route path="sigin-with-google" element={<SigninWithGoogle />} />
    <Route path="signin" element={<Signin />} />
    <Route path="signup" element={<Signup />} />
    <Route path="verify-account" element={<VerifyAccount />} />
    <Route path="forgot-password" element={<ForgotPassword />} />
    <Route path="reset-password" element={<ResetPassword />} />
  </Route>
);
