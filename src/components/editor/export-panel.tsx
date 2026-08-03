"use client";

import { useState } from "react";
import { Copy, Download, ExternalLink, Printer, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { canExport, runQualityChecks } from "@/lib/quality-checks";
import { copyShareLink, exportPdf, exportPng, exportSvg } from "@/lib/export";
import { featuredPrinters, getPreset, printPresets } from "@/lib/print-presets";
import { useEditorStore } from "@/lib/store";
import type { PrinterPresetId } from "@/lib/types";

export function ExportPanel() {
  const design = useEditorStore((s) => s.design);
  const printerPresetId = useEditorStore((s) => s.printerPresetId);
  const setPrinterPreset = useEditorStore((s) => s.setPrinterPreset);
  const updateDesign = useEditorStore((s) => s.updateDesign);
  const publishToGallery = useEditorStore((s) => s.publishToGallery);
  const duplicateDesign = useEditorStore((s) => s.duplicateDesign);
  const setStep = useEditorStore((s) => s.setStep);
  const [busy, setBusy] = useState<string | null>(null);
  const [shareMsg, setShareMsg] = useState("");
  const [exported, setExported] = useState(false);
  const [title, setTitle] = useState(design.title ?? "");
  const [authorName, setAuthorName] = useState(design.authorName ?? "");
  const issues = runQualityChecks(design);
  const ok = canExport(issues);
  const preset = getPreset(printerPresetId);
  const others = printPresets.filter((p) => !p.featured);

  async function withBusy(label: string, fn: () => Promise<void>) {
    setBusy(label);
    try {
      await fn();
      setExported(true);
    } finally {
      setBusy(null);
    }
  }

  function canvas() {
    const el = document.getElementById("kindsign-canvas");
    if (!el) throw new Error("Preview canvas not found");
    return el as HTMLElement;
  }

  function selectPrinter(id: PrinterPresetId) {
    const next = getPreset(id);
    setPrinterPreset(id);
    updateDesign({ sizeId: next.recommendedSizeId });
    setExported(false);
  }

  async function exportForPrinter() {
    await withBusy("order", async () => {
      if (preset.recommendedExport === "png") {
        await exportPng(canvas(), design);
      } else {
        await exportPdf(canvas(), design);
      }
    });
  }

  async function exportAndOrder() {
    await exportForPrinter();
    if (preset.orderUrl) {
      window.open(preset.orderUrl, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--brand-ink)]">
          Export & order
        </h2>
        <p className="mt-1 text-sm text-[var(--brand-muted)]">
          Save a print-ready file, then order from one of the three major yard-sign printers.
        </p>
      </div>

      {!ok && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          Fix failing print checks before exporting, or override carefully for draft use.
        </div>
      )}

      <section className="space-y-3">
        <Label>Featured yard-sign printers</Label>
        <div className="grid gap-3">
          {featuredPrinters.map((p, index) => (
            <button
              key={p.id}
              type="button"
              onClick={() => selectPrinter(p.id)}
              className={`rounded-2xl border p-4 text-left transition ${
                printerPresetId === p.id
                  ? "border-[var(--brand)] bg-white ring-2 ring-[var(--brand)]/20"
                  : "border-[var(--brand-border)] bg-white/70 hover:bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[var(--brand-soft)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--brand)]">
                      #{index + 1}
                    </span>
                    <span className="text-base font-semibold text-[var(--brand-ink)]">
                      {p.name}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[var(--brand-muted)]">{p.tagline}</p>
                  <p className="mt-2 text-xs text-[var(--brand-muted)]">{p.notes}</p>
                </div>
                <Printer className="mt-1 h-5 w-5 shrink-0 text-[var(--brand)]" />
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--brand-border)] bg-white/80 p-4">
        <h3 className="font-semibold text-[var(--brand-ink)]">
          Order with {preset.name}
        </h3>
        <ol className="mt-3 space-y-2 text-sm text-[var(--brand-muted)]">
          {preset.steps.map((step, i) => (
            <li key={step} className="flex gap-2">
              <span className="font-bold text-[var(--brand)]">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button disabled={!!busy} onClick={() => void exportAndOrder()}>
            <Download className="h-4 w-4" />
            {busy === "order"
              ? "Preparing…"
              : `Export ${preset.recommendedExport.toUpperCase()} & open ${preset.name}`}
          </Button>
          {preset.orderUrl && (
            <a href={preset.orderUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" type="button">
                Open {preset.name} <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </a>
          )}
        </div>
        {exported && (
          <p className="mt-3 text-xs text-emerald-700">
            File ready. Upload it on the printer site to finish your order.
          </p>
        )}
      </section>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="secondary"
          disabled={!!busy}
          onClick={() =>
            withBusy("pdf", async () => {
              await exportPdf(canvas(), design);
            })
          }
        >
          PDF only
        </Button>
        <Button
          variant="outline"
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
          variant="ghost"
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

      <section className="space-y-2">
        <Label>Other options</Label>
        <div className="flex flex-wrap gap-2">
          {others.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => selectPrinter(p.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                printerPresetId === p.id
                  ? "border-[var(--brand)] bg-[var(--brand-soft)] text-[var(--brand)]"
                  : "border-[var(--brand-border)] text-[var(--brand-muted)]"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </section>

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
