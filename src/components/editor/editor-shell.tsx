"use client";

import { SignCanvas } from "@/components/sign/sign-canvas";
import { CustomizeForm } from "@/components/editor/customize-form";
import { ExportPanel } from "@/components/editor/export-panel";
import { PreviewPanel } from "@/components/editor/preview-panel";
import { Stepper } from "@/components/editor/stepper";
import { TemplatePicker } from "@/components/editor/template-picker";
import { useEditorStore } from "@/lib/store";

export function EditorShell() {
  const step = useEditorStore((s) => s.step);
  const design = useEditorStore((s) => s.design);

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-6">
      <div className="space-y-6">
        <Stepper />
        {step === "template" && <TemplatePicker />}
        {step === "customize" && <CustomizeForm />}
        {step === "preview" && <PreviewPanel />}
        {step === "export" && <ExportPanel />}
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-[1.75rem] border border-[var(--brand-border)] bg-white/70 p-4 shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)]">
            Live preview
          </p>
          <div className="flex justify-center overflow-auto">
            <SignCanvas design={design} maxWidth={320} />
          </div>
          <p className="mt-3 text-center text-xs text-[var(--brand-muted)]">
            {design.headline} · {design.emphasis}
          </p>
        </div>
      </aside>
    </div>
  );
}
