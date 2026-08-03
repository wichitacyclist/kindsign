import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-[var(--brand-soft)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--brand)]",
        className
      )}
      {...props}
    />
  );
}
