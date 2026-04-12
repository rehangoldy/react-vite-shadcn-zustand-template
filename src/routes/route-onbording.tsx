import { Route } from "react-router";
import { lazy } from "react";
import { modulePath } from "shared/constants/path-module";

const StarterModule = lazy(
  () => import("@modules/onboarding/starter/starter")
)


// Region import module

export default function RouteOnboarding() {
  return (
    <Route path={modulePath.onboarding.onboarding} element={<StarterModule />} />
  )
}