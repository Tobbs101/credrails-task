import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { KudaLogoLight } from "@/assets/svg-components";

const NotFound = () => {
  const navigate = useNavigate();

  const onClickBtn = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-start flex-col p-10 md:p-[50px]">
      <KudaLogoLight />
      <div className="w-full md:w-[70%] h-[90%] flex items-start flex-col justify-center">
        <span className="w-[75px] mb-[30px] h-[75px] rounded-full bg-[#F7685B] text-[65px] flex items-center justify-center text-white">
          <Icon
            icon="fluent-mdl2:status-circle-error-x"
            className="ml-[3px] mb-[3px]"
          />
        </span>
        <span className="w-[80px] h-[26px] flex items-center justify-center text-[#979797] bg-[#F9F9F9] border rounded-[100px] text-center border-[#DBDCE0] text-[11px] font-[800] p-[6px_10px]">
          Error 404 !
        </span>
        <h1 className="text-[34px] font-[900] text-brand-purple mt-[10px]">
          Page Not Found
        </h1>
        <p className="text-[#979797] text-[15px] font-[400] mt-[15px]">
          We're not exactly sure what happened, but something went wrong.
        </p>
        <p className="text-[#979797] text-[15px] font-[400] mt-[10px]">
          If you need immediate help, please contact{" "}
          <a
            href="mailto:collections@kudasupport.com"
            className="text-brand-purple underline cursor-pointer"
          >
            collections@kudasupport.com
          </a>
        </p>

        <Button
          className="w-[148px] h-[48px] flex items-center justify-center gap-[10px] bg-brand-purple mt-[35px] hover:bg-brand-purple/90 rounded-[10px] tetx-[16px] font-[700] p-[14px_30px]"
          onClick={onClickBtn}
        >
          <Icon icon="famicons:arrow-back-sharp" className="text-[18px]" />
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
