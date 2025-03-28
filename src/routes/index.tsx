import { authRoute } from "@/pages/auth/routes";
import { createBrowserRouter } from "react-router-dom";
import { rootRoute } from "./root";
import { pageRoutes } from "@/pages/routes";

export const router = createBrowserRouter([rootRoute, authRoute, pageRoutes]);
