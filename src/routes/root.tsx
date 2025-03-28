import { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const rootRoute: RouteObject = {
  path: "/",
  element: <Navigate to="/auth" replace />,
};
