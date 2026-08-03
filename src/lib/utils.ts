import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadText(content: string, filename: string, mime: string) {
  downloadBlob(new Blob([content], { type: mime }), filename);
}

export function formatAddress(parts: {
  address: string;
  city: string;
  state: string;
  zip: string;
}) {
  return `${parts.address}, ${parts.city}, ${parts.state} ${parts.zip}`;
}

export function mapsUrl(parts: {
  address: string;
  city: string;
  state: string;
  zip: string;
}) {
  const q = encodeURIComponent(formatAddress(parts));
  return `https://www.google.com/maps/dir/?api=1&destination=${q}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
