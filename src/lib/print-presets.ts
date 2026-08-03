import type { PrinterPreset } from "./types";

/**
 * One-click export presets aligned with common yard-sign printer specs.
 * Users can always override size, bleed, and file type.
 */
export const printPresets: PrinterPreset[] = [
  {
    id: "custom",
    name: "Custom / DIY",
    url: "",
    recommendedSizeId: "18x24",
    bleedIn: 0.125,
    fileTypes: ["pdf", "png", "svg"],
    dpi: 300,
    notes: "Flexible export for any local print shop.",
    colorMode: "CMYK-safe",
  },
  {
    id: "imprint",
    name: "Imprint",
    url: "https://www.imprint.com/",
    recommendedSizeId: "18x24",
    bleedIn: 0.125,
    fileTypes: ["pdf", "png"],
    dpi: 300,
    notes: "18×24 corrugated plastic; 0.125\" bleed; PDF preferred.",
    colorMode: "CMYK-safe",
  },
  {
    id: "signs-com",
    name: "Signs.com",
    url: "https://www.signs.com/",
    recommendedSizeId: "18x24",
    bleedIn: 0.125,
    fileTypes: ["pdf", "png"],
    dpi: 300,
    notes: "Yard signs typically 18×24; include bleed; high-res PDF/PNG.",
    colorMode: "CMYK-safe",
  },
  {
    id: "vistaprint",
    name: "Vistaprint",
    url: "https://www.vistaprint.com/",
    recommendedSizeId: "18x24",
    bleedIn: 0.125,
    fileTypes: ["pdf", "png"],
    dpi: 300,
    notes: "Upload print-ready PDF with bleed; RGB accepted, CMYK preferred.",
    colorMode: "CMYK-safe",
  },
  {
    id: "uprinting",
    name: "UPrinting",
    url: "https://www.uprinting.com/",
    recommendedSizeId: "18x24",
    bleedIn: 0.125,
    fileTypes: ["pdf"],
    dpi: 300,
    notes: "PDF/X preferred; 0.125\" bleed; keep critical text inside safe area.",
    colorMode: "CMYK-safe",
  },
  {
    id: "signs-on-the-cheap",
    name: "Signs On The Cheap",
    url: "https://www.signsonthecheap.com/",
    recommendedSizeId: "18x24",
    bleedIn: 0.125,
    fileTypes: ["pdf", "png"],
    dpi: 300,
    notes: "Popular for 18×24 yard signs; PDF or PNG at 300 DPI.",
    colorMode: "CMYK-safe",
  },
];

export function getPreset(id: string) {
  return printPresets.find((p) => p.id === id) ?? printPresets[0];
}
