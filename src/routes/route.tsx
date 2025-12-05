import { Route, Routes } from "react-router";
import { lazy } from "react";
import { modulePath } from "@shared-constants/path-module";

// Module
import NotFoundError from "shared/errors/not-found-error";
import Forbidden from "shared/errors/forbidden";

export default function DynamicRoute() {
  return (
    <Routes>
      <Route path={modulePath.default.notFound} element={<NotFoundError />} />
      <Route path={modulePath.default.forbidden} element={<NotFoundError />} />
      <Route path={modulePath.default.unauthorized} element={<Forbidden />} />
    </Routes>
  );
}
