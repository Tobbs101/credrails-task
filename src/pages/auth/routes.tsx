import { Navigate, RouteObject } from "react-router-dom";
import AuthLogin from ".";
import AuthRegister from "./register";
import AuthLayout from "@/layouts/auth";

export const authRoute: RouteObject = {
  path: "/auth",
  children: [
    {
      path: "/auth",
      element: <Navigate to="/auth/login" />,
      errorElement: <AuthLogin />,
    },
    {
      path: "/auth/login/*",
      element: <AuthLogin />,
    },
    { path: "/auth/register/*", element: <AuthRegister /> },
  ],
};
