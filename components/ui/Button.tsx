import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-md font-normal transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 group",
  {
    variants: {
      variant: {
        default:
          "bg-[#EAEEF7] text-black shadow active:text-[#FAFAFA] active:bg-btn-gradient hover:text-[#FAFAFA] hover:bg-btn-gradient",
      },
      size: {
        default: "min-h-16 md:max-w-[330px] px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
