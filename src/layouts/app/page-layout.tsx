import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStoredAppUser } from "@/hooks/use-stored-app-user";
import { formatDate } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { ReactNode, useEffect } from "react";

const PageLayout = ({
  pageTitle = "Untitled",
  pageDescription = "Untitled Description",
  children,
}: {
  pageTitle: string;
  pageDescription: string;
  children?: ReactNode;
}) => {
  const [user] = useStoredAppUser();
  // console.log(user);

  useEffect(() => {
    document.title = `${pageTitle} | ${pageDescription}`;
  }, [pageTitle, pageDescription]);

  return (
    <div className="page-layout flex flex-col h-full overflow-y-auto">
      <header className="flex items-center px-7 md:px-[3%] lg:px-[5%] pt-[20px] pb-[12px] border-b border-[#EFF1FF] bg-white z-[11] sticky top-0">
        <div className="page-info">
          <h3 className="text-xl font-black">{pageTitle}</h3>
          <p className="text-xs text-[#979797]">{pageDescription}</p>
        </div>

        <div className="date items-center gap-1 text-[13px] text-[#979797] ml-auto hidden md:flex">
          <Icon icon="mdi:calendar-month-outline" />
          <span>{formatDate(new Date())}</span>
        </div>

        <div className="divider bg-[#EFF1FF] w-[1px] h-10 mx-10 mr-6 hidden md:flex" />

        <div className="profile items-center gap-2 cursor-pointer transition-all active:scale-95 hidden md:flex">
          <Avatar>
            <AvatarImage src={user?.picture} />
            <AvatarFallback>{user?.fullName[0]}</AvatarFallback>
          </Avatar>

          <div className="details hidden xl:block">
            <h3 className="font-extrabold">{user?.fullName}</h3>
            <p className="text-xs text-[#979797]">{user?.role}</p>
          </div>
        </div>
      </header>
      <section className="flex-1 px-7 md:px-[3%] lg:px-[5%] py-[22px] relative">
        {children}
      </section>
    </div>
  );
};

export default PageLayout;
