import * as React from "react";
import { cn } from "@/lib/utils";
import BtnLoader from "../custom/btn-loader";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting: boolean;
}

const SubmitBtn = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, isSubmitting, children, ...props }, ref) => {
    const defaultClassName =
      "w-full bg-primary active:scale-[90%] duration-200 transition-all font-medium text-sm py-2 text-white rounded-md border border-primary";

    return (
      <button
        type="submit"
        className={cn(defaultClassName, className, {
          "cursor-not-allowed bg-gray-100 flex items-center justify-center py-2 border-primary":
            isSubmitting,
          "bg-primary/50 border-primary/50": props?.disabled && !isSubmitting,
        })}
        {...props}
        ref={ref}
      >
        {isSubmitting ? <BtnLoader /> : children}
      </button>
    );
  }
);

SubmitBtn.displayName = "SubmitBtn";

export { SubmitBtn };
