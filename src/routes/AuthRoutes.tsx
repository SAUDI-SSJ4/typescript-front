import Signup from "@/pages/auth/signup";
<<<<<<< HEAD
import VerifyAccount from "@/pages/auth/verify-account";
import SigninWithGoogle from "@/pages/sigin-with-google";
import { Route } from "react-router-dom";

export const authRoutes = (
  <Route path="auth" element={<AuthLayout />}>
    <Route path="sigin-with-google" element={<SigninWithGoogle />} />
    <Route path="signin" element={<Signin />} />
=======
import { Route } from "react-router-dom";

export const authRoutes = (
  <Route path="auth">
>>>>>>> sketch
    <Route path="signup" element={<Signup />} />
  </Route>
);
