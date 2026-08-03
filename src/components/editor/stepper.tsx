"use client";

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/lib/store";

const steps = [
  { id: "template", label: "Template" },
  { id: "customize", label: "Customize" },
  { id: "preview", label: "Preview" },
  { id: "export", label: "Export" },
] as const;

export function Stepper() {
  const step = useEditorStore((s) => s.step);
  const setStep = useEditorStore((s) => s.setStep);
  const idx = steps.findIndex((s) => s.id === step);

  return (
    <ol className="flex flex-wrap gap-2">
      {steps.map((s, i) => (
        <li key={s.id}>
          <button
            type="button"
            onClick={() => setStep(s.id)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition",
              i <= idx
                ? "bg-[var(--brand)] text-white"
                : "bg-white/70 text-[var(--brand-muted)] border border-[var(--brand-border)]"
            )}
          >
            {i + 1}. {s.label}
          </button>
        </li>
      ))}
    </ol>
  );
}
