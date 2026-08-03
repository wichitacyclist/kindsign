"use client";

import { motion } from "framer-motion";
import { SignCanvas } from "@/components/sign/sign-canvas";
import { Badge } from "@/components/ui/badge";
import { createDesign } from "@/lib/defaults";
import { useEditorStore } from "@/lib/store";
import { templates } from "@/lib/templates";

export function TemplatePicker() {
  const applyTemplate = useEditorStore((s) => s.applyTemplate);

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--brand-ink)]">
          Choose a sign template
        </h2>
        <p className="mt-1 text-sm text-[var(--brand-muted)]">
          Every template shares the same hopeful design language — pick the one that fits your drive.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {templates.map((t, i) => {
          const preview = createDesign(t.id);
          return (
            <motion.button
              key={t.id}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => applyTemplate(t.id)}
              className="group rounded-2xl border border-[var(--brand-border)] bg-white/80 p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="overflow-hidden rounded-xl bg-[var(--brand-soft)]/40 p-3">
                <div className="mx-auto w-fit scale-[0.72] origin-top">
                  <SignCanvas design={preview} maxWidth={220} />
                </div>
              </div>
              <div className="mt-3 flex items-start justify-between gap-2 px-1">
                <div>
                  <h3 className="font-semibold text-[var(--brand-ink)]">{t.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--brand-muted)]">
                    {t.description}
                  </p>
                </div>
                <Badge>{t.category}</Badge>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
