import QRCode from "qrcode";
import { mapsUrl } from "./utils";
import type { DropOffLocation } from "./types";

export function locationQrUrl(loc: DropOffLocation) {
  if (loc.qrTarget === "website" && loc.website) return loc.website;
  if (loc.qrTarget === "custom" && loc.customQrUrl) return loc.customQrUrl;
  return mapsUrl(loc);
}

export async function qrDataUrl(text: string, color = "#122033") {
  return QRCode.toDataURL(text, {
    margin: 1,
    width: 256,
    color: { dark: color, light: "#00000000" },
    errorCorrectionLevel: "M",
  });
}
