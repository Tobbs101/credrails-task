import React, { forwardRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";

type NairaInputProps = Omit<ControllerRenderProps, "ref"> &
  React.InputHTMLAttributes<HTMLInputElement>;

const NairaInput = forwardRef<HTMLInputElement, NairaInputProps>(
  ({ value = "", onChange, onBlur, className, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState<string>(value || "");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/[^\d.]/g, ""); // Remove non-numeric characters except decimal
      setDisplayValue(rawValue);
      onChange(rawValue); // Directly calling field.onChange
    };

    useEffect(() => {
      if (value) {
        const numericValue = Number(value.replace(/,/g, ""));
        if (!isNaN(numericValue)) {
          if (numericValue === 0) {
            setDisplayValue(""); // Set to empty string if value is 0
          } else {
            setDisplayValue(numericValue.toLocaleString("en-NG"));
          }
        } else {
          setDisplayValue("");
        }
      } else {
        setDisplayValue(""); // Set to empty string if value is falsy
      }
    }, [value]);

    const handleBlur = () => {
      if (displayValue) {
        const numericValue = Number(displayValue.replace(/,/g, ""));
        if (!isNaN(numericValue)) {
          if (numericValue === 0) {
            setDisplayValue("");
          } else {
            setDisplayValue(numericValue.toLocaleString("en-NG"));
          }
        } else {
          setDisplayValue("");
        }
      }
      onBlur?.(); // Call field.onBlur if it exists
    };

    const handleFocus = () => {
      const numericValue = Number(value.replace(/,/g, ""));
      if (!isNaN(numericValue) && numericValue === 0) {
        setDisplayValue("");
      } else {
        setDisplayValue(value || ""); // Remove formatting for editing otherwise
      }
    };

    return (
      <div className="relative rounded-md">
        <span className="bg-[#EFF1FF] rounded-sm absolute left-0 flex items-center justify-center h-[45px] w-[50px]">
          <p className="text-md font-semibold">₦</p>
        </span>
        <Input
          ref={ref}
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={cn("pl-[60px]", className)}
          {...props} // Spread props, ensuring ref is NOT duplicated
        />
      </div>
    );
  }
);

NairaInput.displayName = "NairaInput";

export default NairaInput;
