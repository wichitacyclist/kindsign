import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-[var(--brand)] text-white shadow-sm hover:brightness-110 focus-visible:ring-[var(--brand)]",
        secondary: "bg-[var(--brand-soft)] text-[var(--brand-ink)] hover:bg-[#d7ebdc] focus-visible:ring-[var(--brand)]",
        outline: "border border-[var(--brand-border)] bg-white/70 text-[var(--brand-ink)] hover:bg-white focus-visible:ring-[var(--brand)]",
        ghost: "text-[var(--brand-ink)] hover:bg-black/5",
        accent: "bg-[var(--brand-accent)] text-white hover:brightness-110 focus-visible:ring-[var(--brand-accent)]",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";
