"use client";

import { useState } from "react";
import { Copy, Download, ExternalLink, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { canExport, runQualityChecks } from "@/lib/quality-checks";
import { copyShareLink, exportPdf, exportPng, exportSvg } from "@/lib/export";
import { printPresets } from "@/lib/print-presets";
import { useEditorStore } from "@/lib/store";
import type { PrinterPresetId } from "@/lib/types";

export function ExportPanel() {
  const design = useEditorStore((s) => s.design);
  const printerPresetId = useEditorStore((s) => s.printerPresetId);
  const setPrinterPreset = useEditorStore((s) => s.setPrinterPreset);
  const publishToGallery = useEditorStore((s) => s.publishToGallery);
  const duplicateDesign = useEditorStore((s) => s.duplicateDesign);
  const setStep = useEditorStore((s) => s.setStep);
  const [busy, setBusy] = useState<string | null>(null);
  const [shareMsg, setShareMsg] = useState("");
  const [title, setTitle] = useState(design.title ?? "");
  const [authorName, setAuthorName] = useState(design.authorName ?? "");
  const issues = runQualityChecks(design);
  const ok = canExport(issues);
  const preset = printPresets.find((p) => p.id === printerPresetId)!;

  async function withBusy(label: string, fn: () => Promise<void>) {
    setBusy(label);
    try {
      await fn();
    } finally {
      setBusy(null);
    }
  }

  function canvas() {
    const el = document.getElementById("kindsign-canvas");
    if (!el) throw new Error("Preview canvas not found");
    return el as HTMLElement;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--brand-ink)]">
          Export & order
        </h2>
        <p className="mt-1 text-sm text-[var(--brand-muted)]">
          Professional print files at 300 DPI — then send to your favorite printer.
        </p>
      </div>

      {!ok && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          Fix failing print checks before exporting, or override carefully for draft use.
        </div>
      )}

      <section className="space-y-3">
        <Label>Printer preset</Label>
        <div className="grid gap-2 sm:grid-cols-2">
          {printPresets.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPrinterPreset(p.id as PrinterPresetId)}
              className={`rounded-xl border p-3 text-left ${
                printerPresetId === p.id
                  ? "border-[var(--brand)] ring-2 ring-[var(--brand)]/20"
                  : "border-[var(--brand-border)]"
              }`}
            >
              <div className="text-sm font-semibold text-[var(--brand-ink)]">{p.name}</div>
              <p className="mt-1 text-xs text-[var(--brand-muted)]">{p.notes}</p>
            </button>
          ))}
        </div>
        {preset.url && (
          <a
            href={preset.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--brand)]"
          >
            Open {preset.name} <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </section>

      <div className="flex flex-wrap gap-3">
        <Button
          disabled={!!busy}
          onClick={() =>
            withBusy("pdf", async () => {
              await exportPdf(canvas(), design);
            })
          }
        >
          <Download className="h-4 w-4" />
          {busy === "pdf" ? "Preparing…" : "Export PDF"}
        </Button>
        <Button
          variant="secondary"
          disabled={!!busy}
          onClick={() =>
            withBusy("png", async () => {
              await exportPng(canvas(), design);
            })
          }
        >
          PNG 300 DPI
        </Button>
        <Button
          variant="outline"
          disabled={!!busy}
          onClick={() =>
            withBusy("svg", async () => {
              await exportSvg(canvas(), design);
            })
          }
        >
          SVG
        </Button>
      </div>

      <section className="space-y-3 rounded-2xl border border-[var(--brand-border)] bg-white/70 p-4">
        <h3 className="font-semibold text-[var(--brand-ink)]">Share & community</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            onClick={async () => {
              const url = await copyShareLink(design.id);
              setShareMsg(`Copied: ${url}`);
            }}
          >
            <Share2 className="h-4 w-4" /> Copy public URL
          </Button>
          <Button variant="outline" onClick={() => duplicateDesign()}>
            <Copy className="h-4 w-4" /> Duplicate template
          </Button>
        </div>
        {shareMsg && <p className="text-xs text-[var(--brand-muted)]">{shareMsg}</p>}
        <div className="grid gap-2 sm:grid-cols-2">
          <div>
            <Label>Gallery title</Label>
            <Input
              className="mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Spring Coat Drive"
            />
          </div>
          <div>
            <Label>Your name / org</Label>
            <Input
              className="mt-1"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Neighborhood Helpers"
            />
          </div>
        </div>
        <Button
          onClick={() => {
            if (!title.trim() || !authorName.trim()) {
              setShareMsg("Add a title and author to publish.");
              return;
            }
            publishToGallery({ title: title.trim(), authorName: authorName.trim() });
            setShareMsg("Published to Community Templates on this device.");
          }}
        >
          Publish to Community Templates
        </Button>
      </section>

      <Button type="button" variant="outline" onClick={() => setStep("preview")}>
        Back to preview
      </Button>
    </div>
  );
}
