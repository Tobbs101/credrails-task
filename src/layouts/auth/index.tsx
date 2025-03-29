import { ReactNode } from "react";
import { motion } from "framer-motion";
import Auth_Bg from "@/assets/auth-bg.jpg";
import { Toaster } from "@/components/ui/toaster";

const AuthLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <div className={`flex items-start justify-between min-h-screen`}>
        <div className="h-[100vh] lg:inline hidden overflow-hidden flex-[2.5] relative">
          <img src={Auth_Bg} alt="" className="h-full w-full z-1" />
          <div className="absolute top-0 left-0 h-full w-full bg-black/30"></div>
        </div>
        <motion.div
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full h-[100vh] flex-[3] overflow-y-scroll flex items-center justify-center px-5"
        >
          {children}
        </motion.div>
      </div>
      <Toaster />
    </>
  );
};

export default AuthLayout;
