/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Option {
  id: number;
  title: string;
  value: string;
}

interface FormSelectProps {
  field: any;
  label?: string;
  placeholder?: string;
  options?: Option[];
  hasNotApplicable?: boolean;
  className?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  field,
  label,
  placeholder,
  options,
  hasNotApplicable,
  className,
}) => {
  return (
    <FormItem className="w-full flex-1 p-2">
      <FormLabel>{label}</FormLabel>
      <Select onValueChange={field.onChange} value={field.value}>
        <FormControl>
          <SelectTrigger className={cn("text-xs", className)}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {hasNotApplicable && (
            <SelectItem value="n/a">Not Applicable</SelectItem>
          )}
          {options?.map((option: any, index: number) => (
            <SelectItem key={index} value={option.value}>
              {option.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="min-h-5">
        <FormMessage className="text-xs" />
      </div>
    </FormItem>
  );
};

export default FormSelect;
