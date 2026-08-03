import { nanoid } from "nanoid";
import type { DropOffLocation, SignDesign, TemplateId } from "./types";
import { getTemplate } from "./templates";

export function createLocation(
  partial?: Partial<DropOffLocation>
): DropOffLocation {
  return {
    id: nanoid(8),
    name: "Community Center",
    address: "123 Main Street",
    city: "Springfield",
    state: "IL",
    zip: "62701",
    website: "",
    showQr: true,
    qrTarget: "maps",
    customQrUrl: "",
    showGpsIcon: true,
    ...partial,
  };
}

export function createDesign(templateId: TemplateId = "community"): SignDesign {
  const template = getTemplate(templateId);
  const now = new Date().toISOString();
  const base: SignDesign = {
    id: nanoid(10),
    templateId,
    themeId: "hope-green",
    sizeId: "18x24",
    headline: "HELP A NEIGHBOR",
    emphasis: "ESSENTIALS",
    subtitle: "Support Families Nearby",
    slogan: "Neighbors Helping Neighbors.",
    iconId: "handshake",
    mapStyle: "none",
    locations: [createLocation()],
    showBleed: true,
    showCropMarks: true,
    colorblindSafe: false,
    createdAt: now,
    updatedAt: now,
  };
  return {
    ...base,
    ...template.defaults,
    templateId,
    id: base.id,
    locations: base.locations,
    createdAt: now,
    updatedAt: now,
  };
}
