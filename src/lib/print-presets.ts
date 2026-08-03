import type { PrinterPreset } from "./types";

/**
 * Featured yard-sign printers.
 * None offer a public API to inject artwork into checkout, so KindSign
 * exports print-ready files and deep-links to each printer's yard-sign order page.
 */
export const printPresets: PrinterPreset[] = [
  {
    id: "signs-com",
    name: "Signs.com",
    tagline: "Best overall quality & options",
    url: "https://www.signs.com/",
    orderUrl: "https://www.signs.com/yard-signs/",
    recommendedSizeId: "18x24",
    recommendedExport: "pdf",
    bleedIn: 0.125,
    fileTypes: ["pdf", "png"],
    dpi: 300,
    notes: "18×24 corrugated plastic; 0.125\" bleed; PDF preferred.",
    colorMode: "CMYK-safe",
    featured: true,
    steps: [
      "Export a print-ready PDF (300 DPI, bleed included).",
      "Open Signs.com yard signs and choose 18\" × 24\".",
      "Upload your KindSign PDF and add stakes if needed.",
    ],
  },
  {
    id: "signs-on-the-cheap",
    name: "Signs On The Cheap",
    tagline: "Budget-friendly bulk yard signs",
    url: "https://www.signsonthecheap.com/",
    orderUrl: "https://www.signsonthecheap.com/yard-signs/",
    recommendedSizeId: "18x24",
    recommendedExport: "pdf",
    bleedIn: 0.125,
    fileTypes: ["pdf", "png"],
    dpi: 300,
    notes: "Popular for affordable 18×24 coroplast; PDF or PNG at 300 DPI.",
    colorMode: "CMYK-safe",
    featured: true,
    steps: [
      "Export PDF or PNG at 300 DPI.",
      "Open Signs On The Cheap and pick your size/quantity.",
      "Upload your file and review the proof before printing.",
    ],
  },
  {
    id: "imprint",
    name: "Imprint",
    tagline: "Trusted promo & yard-sign printing",
    url: "https://imprint.com/",
    orderUrl: "https://imprint.com/shop/products/custom-18-x-24-yard-signs",
    recommendedSizeId: "18x24",
    recommendedExport: "pdf",
    bleedIn: 0.125,
    fileTypes: ["pdf", "png"],
    dpi: 300,
    notes: "Custom 18×24 yard signs; submit artwork after checkout or during order.",
    colorMode: "CMYK-safe",
    featured: true,
    steps: [
      "Export a print-ready PDF from KindSign.",
      "Open Imprint's 18\" × 24\" yard sign product page.",
      "Add to cart, then upload/submit your KindSign design.",
    ],
  },
  {
    id: "custom",
    name: "Local print shop",
    tagline: "Any shop that accepts PDF/PNG",
    url: "",
    orderUrl: "",
    recommendedSizeId: "18x24",
    recommendedExport: "pdf",
    bleedIn: 0.125,
    fileTypes: ["pdf", "png", "svg"],
    dpi: 300,
    notes: "Flexible export for FedEx Office, Staples, or your neighborhood printer.",
    colorMode: "CMYK-safe",
    featured: false,
    steps: [
      "Export PDF (preferred) or PNG.",
      "Take the file to your local print shop.",
      "Ask for 18\" × 24\" corrugated plastic with wire stakes.",
    ],
  },
];

export const featuredPrinters = printPresets.filter((p) => p.featured);

export function getPreset(id: string) {
  return printPresets.find((p) => p.id === id) ?? printPresets[0];
}
