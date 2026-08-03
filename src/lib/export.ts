"use client";

import { toPng, toSvg } from "html-to-image";
import { downloadBlob, downloadText } from "./utils";
import { getSize } from "./sizes";
import type { SignDesign } from "./types";

const DPI = 300;

export async function exportPng(node: HTMLElement, design: SignDesign) {
  const size = getSize(design.sizeId);
  const width = Math.round(size.widthIn * DPI);
  const height = Math.round(size.heightIn * DPI);
  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: width / node.offsetWidth,
    backgroundColor: undefined,
  });
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  downloadBlob(blob, `kindsign-${design.templateId}-${size.id}-${DPI}dpi.png`);
  return { width, height };
}

export async function exportSvg(node: HTMLElement, design: SignDesign) {
  const size = getSize(design.sizeId);
  const dataUrl = await toSvg(node, { cacheBust: true });
  const svg = decodeURIComponent(dataUrl.split(",")[1] ?? "");
  downloadText(svg, `kindsign-${design.templateId}-${size.id}.svg`, "image/svg+xml");
}

/**
 * Print-ready PDF via browser print engine.
 * Opens a dedicated print window with bleed/crop CSS @page.
 */
export async function exportPdf(node: HTMLElement, design: SignDesign) {
  const size = getSize(design.sizeId);
  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: (size.widthIn * DPI) / node.offsetWidth,
  });

  const w = window.open("", "_blank", "noopener,noreferrer,width=900,height=1200");
  if (!w) throw new Error("Pop-up blocked — allow pop-ups to export PDF.");

  const widthPt = size.widthIn * 72;
  const heightPt = size.heightIn * 72;
  const bleedPt = size.bleedIn * 72;

  w.document.write(`<!DOCTYPE html><html><head><title>KindSign Print</title>
<style>
  @page { size: ${widthPt + bleedPt * 2}pt ${heightPt + bleedPt * 2}pt; margin: 0; }
  html, body { margin: 0; padding: 0; background: white; }
  .sheet { width: ${widthPt + bleedPt * 2}pt; height: ${heightPt + bleedPt * 2}pt; position: relative; }
  img { width: ${widthPt}pt; height: ${heightPt}pt; position: absolute; top: ${bleedPt}pt; left: ${bleedPt}pt; }
  .crop { position: absolute; width: 12pt; height: 12pt; border-color: #000; border-style: solid; }
  .tl { top: 2pt; left: 2pt; border-width: 0 0 1pt 1pt; }
  .tr { top: 2pt; right: 2pt; border-width: 0 1pt 1pt 0; }
  .bl { bottom: 2pt; left: 2pt; border-width: 1pt 0 0 1pt; }
  .br { bottom: 2pt; right: 2pt; border-width: 1pt 1pt 0 0; }
</style></head><body>
<div class="sheet">
  ${design.showCropMarks ? '<div class="crop tl"></div><div class="crop tr"></div><div class="crop bl"></div><div class="crop br"></div>' : ""}
  <img src="${dataUrl}" alt="KindSign" />
</div>
<script>window.onload = () => { setTimeout(() => { window.print(); }, 250); };</script>
</body></html>`);
  w.document.close();
}

export function shareUrl(designId: string) {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}/share/${designId}`;
}

export async function copyShareLink(designId: string) {
  const url = shareUrl(designId);
  await navigator.clipboard.writeText(url);
  return url;
}
