/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormDate = ({ field, label }: { field: any; label: string }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage visibility

  return (
    <FormItem className="w-full flex-1 flex-col p-2">
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="relative border border-gray-200 shadow-sm rounded-md p-[1px]">
          <ReactDatePicker
            selected={field.value ? new Date(field.value) : null}
            onChange={(date: Date | null) => field.onChange(date)}
            className={cn(
              "w-full pl-3 pr-10 text-xs outline-none focus:ring-0 py-2",
              !field.value && "text-muted-foreground"
            )}
            dateFormat="dd/MM/yyyy"
            placeholderText="Pick a date"
            showPopperArrow={false}
            onClickOutside={() => setIsOpen(false)} // Close when clicking outside
            onSelect={() => setIsOpen(false)} // Close when a date is selected
            open={isOpen} // Control the visibility with state
            onFocus={() => setIsOpen(true)} // Open when input is focused
          />
          <CalendarIcon
            className="absolute right-2 top-2 h-4 w-4 opacity-50 cursor-pointer"
            onClick={(e: any) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }} // Toggle visibility on click
          />
        </div>
      </FormControl>
      <div className="min-h-5">
        <FormMessage className="text-xs" />
      </div>
    </FormItem>
  );
};

export default FormDate;
