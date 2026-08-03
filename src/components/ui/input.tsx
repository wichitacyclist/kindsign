import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-11 w-full rounded-xl border border-[var(--brand-border)] bg-white/80 px-3 text-sm text-[var(--brand-ink)] placeholder:text-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";
