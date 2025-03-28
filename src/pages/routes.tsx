import RootLayout from "@/layouts/app/root-layout";
import { Navigate, RouteObject } from "react-router-dom";
import Overview from "./overview";
import Details from "./details";
import Upload from "./upload";

export const pageRoutes: RouteObject = {
  path: "/dashboard",
  element: <RootLayout />,
  children: [
    {
      path: "/dashboard",
      element: <Navigate to="/dashboard/overview" />,
      errorElement: <Overview />,
    },
    {
      path: "/dashboard/overview",
      element: <Overview />,
    },
    {
      path: "/dashboard/upload",
      element: <Upload />,
    },
    {
      path: "/dashboard/details",
      element: <Details />,
    },

    // {
    //   path: "/dashboard/users",
    //   element: <UserManagement />,
    //   children: [
    //     {
    //       path: "/dashboard/users",
    //       element: <UserManagementTabs />,
    //     },
    //     {
    //       path: "/dashboard/users/:user_email",
    //       element: <UserDetails />,
    //     },
    //     {
    //       path: "/dashboard/users/team",
    //       element: <TeamDetails />,
    //     },
    //   ],
    //   errorElement: <UserPageErrorBoundary />,
    // },
    // {
    //   path: "/dashboard/queue",
    //   element: <QueueManagement />,
    //   children: [
    //     {
    //       path: "/dashboard/queue",
    //       element: <QueueManagementTabs />,
    //     },
    //     {
    //       path: "/dashboard/queue/:queue_id",
    //       element: <QueueDetails />,
    //     },
    //     {
    //       path: "/dashboard/queue/upload-record",
    //       element: <UploadRecord />,
    //     },
    //     {
    //       path: "/dashboard/queue/:queue_id/loan-report/:loan_report_id",
    //       element: <LoanReportDetails />,
    //     },
    //   ],
    //   errorElement: <UserPageErrorBoundary />,
    // },
  ],
};
