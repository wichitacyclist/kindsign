import { z } from "zod";

export const locationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Location name is required").max(80),
  address: z.string().min(1, "Address is required").max(120),
  city: z.string().min(1, "City is required").max(60),
  state: z.string().min(2, "State is required").max(2),
  zip: z.string().min(5, "ZIP is required").max(10),
  website: z.string().url().optional().or(z.literal("")),
  showQr: z.boolean(),
  qrTarget: z.enum(["maps", "website", "custom"]),
  customQrUrl: z.string().url().optional().or(z.literal("")),
  showGpsIcon: z.boolean(),
});

export const signDesignSchema = z.object({
  id: z.string(),
  templateId: z.string(),
  themeId: z.string(),
  sizeId: z.string(),
  headline: z.string().min(1).max(48),
  emphasis: z.string().min(1).max(40),
  subtitle: z.string().min(1).max(80),
  slogan: z.string().min(1).max(80),
  iconId: z.string(),
  mapStyle: z.enum(["none", "city", "state", "county", "skyline"]),
  locations: z.array(locationSchema).min(1, "Add at least one drop-off location"),
  logoDataUrl: z.string().optional(),
  heroImageDataUrl: z.string().optional(),
  showBleed: z.boolean(),
  showCropMarks: z.boolean(),
  colorblindSafe: z.boolean(),
  title: z.string().optional(),
  authorName: z.string().optional(),
  published: z.boolean().optional(),
  rating: z.number().optional(),
  forks: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SignDesignInput = z.infer<typeof signDesignSchema>;
