import { VariantProps, cva } from "class-variance-authority";
import React from "react";

import { cn } from "@/lib/utils";

const textVariants = cva("block ", {
  variants: {
    variant: {
      primary: "text-text",
      secondary: "text-text-dim",
      white: "text-white",
    },
    size: {
      default: "text-base",
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
    weight: "normal",
  },
});

export interface TextProps
  extends React.HTMLAttributes<
      HTMLParagraphElement | HTMLSpanElement | HTMLDivElement
    >,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div";
}

export const Text = ({
  className,
  variant,
  weight,
  as: Tag = "p",
  size,
  ...props
}: TextProps) => {
  return (
    <Tag
      className={cn(textVariants({ size, variant, className, weight }))}
      {...props}
    />
  );
};
