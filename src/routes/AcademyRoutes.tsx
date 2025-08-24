import Home from "@/templates/template-one/pages";
import { Route } from "react-router-dom";

export const academyRoutes = (
  <Route path="academy">
    <Route path=":academyId" element={<Home />} />
  </Route>
);
