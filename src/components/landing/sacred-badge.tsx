"use client";

import { motion } from "framer-motion";

/** Fixed petal centers — avoids SSR/client float precision hydration mismatches. */
const PETAL_CENTERS = [
  { cx: "42", cy: "32" },
  { cx: "37", cy: "40.66" },
  { cx: "27", cy: "40.66" },
  { cx: "22", cy: "32" },
  { cx: "27", cy: "23.34" },
  { cx: "37", cy: "23.34" },
] as const;

function SacredGeometryMark() {
  return (
    <span className="relative grid h-8 w-8 shrink-0 place-items-center" aria-hidden>
      <motion.svg
        viewBox="0 0 64 64"
        className="absolute h-9 w-9"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
        <circle cx="32" cy="32" r="18" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        {PETAL_CENTERS.map((petal) => (
          <circle
            key={`${petal.cx}-${petal.cy}`}
            cx={petal.cx}
            cy={petal.cy}
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.55"
          />
        ))}
      </motion.svg>
      <motion.svg
        viewBox="0 0 64 64"
        className="absolute h-7 w-7 text-[var(--brand-accent)]"
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <polygon
          points="32,8 52,44 12,44"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <polygon
          points="32,56 12,20 52,20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="32" r="4.5" fill="currentColor" opacity="0.9" />
      </motion.svg>
    </span>
  );
}

export function SacredBadge({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      className="relative mb-5 inline-flex max-w-full items-center gap-2.5 overflow-hidden border-2 border-[var(--brand-ink)] bg-[var(--brand-ink)] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-white shadow-[4px_4px_0_0_var(--brand-accent)]"
      style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45 }}
    >
      <span className="pointer-events-none absolute inset-0 opacity-30" aria-hidden>
        <motion.span
          className="absolute -left-6 -top-6 h-20 w-20 rounded-full border border-white/40"
          animate={{ rotate: 360, scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute -right-8 -bottom-8 h-24 w-24 border border-[var(--brand-accent)]/70"
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </span>
      <SacredGeometryMark />
      <span className="relative z-10 leading-tight">{children}</span>
    </motion.span>
  );
}
