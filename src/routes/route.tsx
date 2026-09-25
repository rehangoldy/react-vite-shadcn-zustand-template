import { Route, Routes } from "react-router";
import { modulePath } from "@shared-constants/path-module";
import RouteOnboarding from "./route-onbording";

// Module
import NotFoundError from "shared/errors/not-found-error";
import Forbidden from "shared/errors/forbidden";

export default function DynamicRoute() {
  return (
    <Routes>
      <Route path={modulePath.default.notFound} element={<NotFoundError />} />
      <Route path={modulePath.default.forbidden} element={<NotFoundError />} />
      <Route path={modulePath.default.unauthorized} element={<Forbidden />} />  
      {RouteOnboarding()}
    </Routes>
  );
}
