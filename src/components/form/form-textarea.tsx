/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

const FormTextArea = ({
  field,
  label,
  placeholder,
  disabled,
  className,
  description,
  hasError,
  rows,
  containerClassName,
}: {
  field: any;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  description?: any;
  hasError?: any;
  rows?: number;
}) => {
  return (
    <FormItem className={cn("w-full flex-1 p-2", containerClassName)}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Textarea
          rows={rows}
          disabled={disabled}
          className={cn(`text-xs resize-none duration-200 bg-white`, className)}
          placeholder={placeholder}
          {...field}
        />
      </FormControl>

      <div
        className={`flex items-center ${
          hasError
            ? "justify-between"
            : description
            ? "justify-end"
            : "justify-start"
        }`}
      >
        <FormMessage className="text-xs" />
        {description && <FormDescription>{description}</FormDescription>}
      </div>
    </FormItem>
  );
};

export default FormTextArea;
