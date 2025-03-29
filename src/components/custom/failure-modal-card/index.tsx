import { FailureModalIcon } from "@/assets/Icons/FailureModalIcon";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface IFailureModalProps {
  title: string | ReactNode;
  info: string | ReactNode;
  primaryBtnLabel: string;
  onProceed?: () => void;
  onClose?: () => void;
}

const FailureModalCard = ({
  title,
  info,
  primaryBtnLabel = "Okay",
  onProceed,
}: IFailureModalProps) => {
  return (
    <DialogContent
      removeCloseIcon
      overlay={<DialogOverlay className="bg-[#40196d40]" />}
      className="sm:max-w-md h-[405px] md:w-[415px] p-[46px_40px_47px_40px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] gap-0 rounded-[6px] w-[95%] fade-in-20 flex flex-col"
    >
      <div className="cta flex flex-col flex-1 justify-between mb-[46px] items-center">
        <DialogTitle className="text-[20px] font-extrabold">
          {title}
        </DialogTitle>

        <FailureModalIcon />

        <span className="text-[15px]">{info}</span>
      </div>

      <DialogFooter className="flex items-center justify-center sm:justify-center flex-row">
        <DialogClose asChild>
          <Button
            type="button"
            className="rounded-[10px] p-[14px 30px] text-[16px] w-[100px] h-[48px] bg-primary hover:bg-primary/80 transition-all active:scale-95 font-bold"
            onClick={() => onProceed?.()}
          >
            {primaryBtnLabel}
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default FailureModalCard;
