"use client";

import { SignCanvas } from "@/components/sign/sign-canvas";
import { Button } from "@/components/ui/button";
import { runQualityChecks } from "@/lib/quality-checks";
import { useEditorStore } from "@/lib/store";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";

export function PreviewPanel() {
  const design = useEditorStore((s) => s.design);
  const updateDesign = useEditorStore((s) => s.updateDesign);
  const setStep = useEditorStore((s) => s.setStep);
  const issues = runQualityChecks(design);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--brand-ink)]">
          Preview
        </h2>
        <p className="mt-1 text-sm text-[var(--brand-muted)]">
          What neighbors will see from the curb — check readability before you print.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        <label className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 border border-[var(--brand-border)]">
          <input
            type="checkbox"
            checked={design.showBleed}
            onChange={(e) => updateDesign({ showBleed: e.target.checked })}
          />
          Show bleed / safe area
        </label>
        <label className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 border border-[var(--brand-border)]">
          <input
            type="checkbox"
            checked={design.showCropMarks}
            onChange={(e) => updateDesign({ showCropMarks: e.target.checked })}
          />
          Crop marks on PDF
        </label>
      </div>

      <div className="flex justify-center rounded-[2rem] border border-[var(--brand-border)] bg-[var(--brand-soft)]/40 p-6">
        <SignCanvas design={design} maxWidth={380} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-[var(--brand-ink)]">Print quality checks</h3>
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="flex gap-2 rounded-xl border border-[var(--brand-border)] bg-white/80 p-3 text-sm"
          >
            {issue.level === "pass" && (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            )}
            {issue.level === "warn" && (
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            )}
            {issue.level === "fail" && (
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
            )}
            <div>
              <p className="font-medium text-[var(--brand-ink)]">{issue.message}</p>
              {issue.fix && (
                <p className="mt-1 text-xs text-[var(--brand-muted)]">{issue.fix}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={() => setStep("customize")}>
          Edit
        </Button>
        <Button type="button" onClick={() => setStep("export")}>
          Continue to export
        </Button>
      </div>
    </div>
  );
}
