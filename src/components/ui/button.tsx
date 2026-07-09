import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Solid blue — primary CTA (matches Dnyxstudios "Get Started" / "Start Your Project")
        default: "bg-[#007AFF] text-white rounded-full hover:bg-[#1E6EF4] hover:-translate-y-0.5 active:translate-y-0",
        destructive: "bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90",
        // Light border pill — secondary CTA (matches "View Our Work →")
        outline: "border border-[#E6E6E6] bg-white text-[#191919] rounded-full hover:border-[#007AFF] hover:text-[#007AFF] hover:-translate-y-0.5",
        secondary: "bg-[#F5F5F7] text-[#191919] rounded-full hover:bg-[#E8E8EA]",
        ghost: "text-[#191919] hover:bg-[#F5F5F7] rounded-full",
        link: "text-[#007AFF] underline-offset-4 hover:underline p-0 h-auto",
        // Hero CTA — solid blue pill (same as default but with stronger shadow)
        hero: "bg-[#007AFF] text-white rounded-full font-semibold hover:bg-[#1E6EF4] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,122,255,0.35)] active:translate-y-0",
        // Hero outline — light border pill matching "View Our Work →"
        heroOutline: "border border-[#DADADA] bg-white text-[#191919] rounded-full hover:border-[#007AFF] hover:text-[#007AFF] hover:-translate-y-0.5",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-7 text-base",
        xl: "h-13 px-9 text-base",
        icon: "h-10 w-10",
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
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
