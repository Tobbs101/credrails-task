/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import moment from "moment";
import { ControllerRenderProps } from "react-hook-form";
import DateIcon from "@/assets/DateIcon.svg";
import { cn } from "@/lib/utils";

interface DateInputProps extends ControllerRenderProps {
  icon?: string;
  className?: string;
  placeholder?: string;
  disabled?: any;
}

const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  icon,
  className,
  disabled,
  placeholder = "",
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    onChange(date);
    setPopoverOpen(false); // Close the popover after date selection
  };

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger
        className={cn(
          "w-full rounded-sm text-left shadow-[0px_2px_2px_0px_#0000001A] border-[#F4F4F4] ring-[#40196D4D] h-[45px] placeholder:text-[#979797]",
          className
        )}
      >
        <div className="flex items-center justify-start gap-5 text-gray-500">
          <span className="bg-[#EFF1FF] rounded-sm flex items-center justify-center h-[45px] w-[50px]">
            {icon ? icon : <img src={DateIcon} alt="" />}
          </span>
          <p className={`text-sm ${value ? "text-black" : "text-gray-500"}`}>
            {value ? moment(value).format("DD-MM-YYYY") : placeholder}
          </p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          classNames={{ day_selected: "bg-[#40196D] text-white" }}
          selected={value}
          onSelect={handleDateSelect} // Use the custom handler
          disabled={disabled || false}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateInput;
