/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const FormInput = ({
  field,
  label,
  placeholder,
  type,
  disabled,
  className,
  description,
  hasError,
}: {
  field: any;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  description?: any;
  hasError?: any;
}) => {
  if (type === "file")
    return (
      <FormItem className="w-full flex-1 p-2 mb-5">
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <Input
            disabled={disabled}
            className={cn(`text-xs duration-200 bg-white`, className)}
            type={type}
            placeholder={placeholder}
            {...field}
          />
        </FormControl>

        <div
          className={`flex items-start ${
            hasError
              ? "justify-between"
              : description
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <FormMessage className="text-xs h-[20px]" />

          {description && <FormDescription>{description}</FormDescription>}
        </div>
      </FormItem>
    );

  return (
    <FormItem className="w-full flex-1 mb-5">
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <Input
          disabled={disabled}
          className={cn(`text-xs duration-200 bg-white`, className)}
          type={type}
          placeholder={placeholder}
          {...field}
        />
      </FormControl>

      <div
        className={`flex items-start ${
          hasError
            ? "justify-between"
            : description
            ? "justify-end"
            : "justify-start"
        }`}
      >
        <FormMessage className="text-xs h-[20px]" />

        {description && <FormDescription>{description}</FormDescription>}
      </div>
    </FormItem>
  );
};

export default FormInput;
