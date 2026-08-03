import type { SignSize } from "./types";

/** Physical print sizes with bleed and safe margins in inches. */
export const signSizes: SignSize[] = [
  { id: "18x24", label: '18" × 24" Yard Sign', widthIn: 18, heightIn: 24, bleedIn: 0.125, safeMarginIn: 0.5 },
  { id: "24x36", label: '24" × 36" Large Yard Sign', widthIn: 24, heightIn: 36, bleedIn: 0.125, safeMarginIn: 0.625 },
  { id: "11x17", label: '11" × 17" Tabloid', widthIn: 11, heightIn: 17, bleedIn: 0.125, safeMarginIn: 0.375 },
  { id: "a4", label: "A4 (210 × 297 mm)", widthIn: 8.27, heightIn: 11.69, bleedIn: 0.125, safeMarginIn: 0.375 },
  { id: "a3", label: "A3 (297 × 420 mm)", widthIn: 11.69, heightIn: 16.54, bleedIn: 0.125, safeMarginIn: 0.5 },
];

export function getSize(id: string) {
  return signSizes.find((s) => s.id === id) ?? signSizes[0];
}

/** Preview pixels at 72dpi-equivalent for screen (scaled). */
export function previewDimensions(size: SignSize, maxWidth = 420) {
  const aspect = size.heightIn / size.widthIn;
  const width = maxWidth;
  const height = Math.round(maxWidth * aspect);
  return { width, height, aspect };
}
