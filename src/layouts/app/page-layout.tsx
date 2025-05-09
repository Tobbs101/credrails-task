import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUsers from "@/hooks/use-users";
import { formatDate } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PageLayout = ({
  pageTitle = "Untitled",
  pageDescription = "Untitled Description",
  children,
}: {
  pageTitle: string;
  pageDescription: string;
  children?: ReactNode;
}) => {
  const { currentUser } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser.email) {
      alert("Session timed out, please log in again!");
      navigate("/auth/login");
    }
  }, [currentUser]);

  useEffect(() => {
    document.title = `${pageTitle} | ${pageDescription}`;
  }, [pageTitle, pageDescription]);

  return (
    <div className="page-layout flex flex-col h-full overflow-y-auto">
      <header className="flex items-center px-7 md:px-[3%] lg:px-[5%] pt-[20px] pb-[12px] border-b border-[#EFF1FF] bg-white z-[11] sticky top-0">
        <div className="page-info">
          <h3 className="text-xl font-black text-primary">{pageTitle}</h3>
          <p className="text-xs text-[#979797]">{pageDescription}</p>
        </div>

        <div className="date items-center gap-1 text-[13px] text-[#979797] ml-auto hidden md:flex">
          <Icon icon="mdi:calendar-month-outline" />
          <span>{formatDate(new Date())}</span>
        </div>

        <div className="divider bg-[#EFF1FF] w-[1px] h-10 mx-10 mr-6 hidden md:flex" />

        <div className="items-center gap-2 cursor-pointer transition-all active:scale-95 hidden md:flex">
          <Avatar className="font-bold">
            <AvatarImage src={""} />
            <AvatarFallback>{currentUser?.firstName?.[0]}</AvatarFallback>
          </Avatar>

          <div className="details hidden xl:block">
            <h3 className="font-extrabold">
              {currentUser?.firstName} {currentUser?.lastName}
            </h3>
            <p className="text-xs text-[#979797] font-semibold">Admin</p>
          </div>
        </div>
      </header>
      <motion.section
        initial={{ opacity: 0, y: 10 }} // Start hidden and 50px below
        animate={{ opacity: 1, y: 0 }} // Fade in and move up to normal position
        transition={{ duration: 0.3, ease: "easeOut" }} // Smooth transition
        className="flex-1 px-7 md:px-[3%] lg:px-[5%] py-[22px] relative"
      >
        {children}
      </motion.section>
    </div>
  );
};

export default PageLayout;
