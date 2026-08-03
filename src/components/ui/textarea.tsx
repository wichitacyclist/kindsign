import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[88px] w-full rounded-xl border border-[var(--brand-border)] bg-white/80 px-3 py-2 text-sm text-[var(--brand-ink)] placeholder:text-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
