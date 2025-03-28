import AuthLayout from "@/layouts/auth";
import { RouteObject } from "react-router-dom";
import AuthLogin from ".";

export const authRoute: RouteObject = {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    {
      path: "/auth/login/*",
      element: <AuthLogin />,
    },
    { path: "/auth/register/*", element: <AuthLogin /> },
  ],
};
