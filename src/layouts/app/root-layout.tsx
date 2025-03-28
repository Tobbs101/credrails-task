import { Outlet } from "react-router-dom";
import SideBar from "./side-bar";
import { Toaster } from "@/components/ui/toaster";

const RootLayout = () => {
  return (
    <div className="h-screen flex flex-col lg:flex-row">
      <SideBar />
      <main className="flex-1 lg:w-[75%] pt-[70px] lg:pt-0">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};

export default RootLayout;
