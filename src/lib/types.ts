export type ThemeId =
  | "hope-green"
  | "sunrise-orange"
  | "deep-navy"
  | "charcoal"
  | "clean-white"
  | "warm-gray"
  | "community-blue";

export type TemplateId =
  | "minimal"
  | "community"
  | "modern"
  | "church"
  | "school"
  | "holiday"
  | "food-drive"
  | "winter-essentials"
  | "back-to-school"
  | "baby-supplies"
  | "pet-supplies"
  | "disaster-relief"
  | "general-essentials";

export type IconId =
  | "handshake"
  | "heart"
  | "home"
  | "church"
  | "school"
  | "food"
  | "backpack"
  | "baby"
  | "pet"
  | "tree"
  | "leaf"
  | "family"
  | "none";

export type SignSizeId = "18x24" | "24x36" | "11x17" | "a4" | "a3";

export type MapStyle = "none" | "city" | "state" | "county" | "skyline";

export type PrinterPresetId =
  | "signs-com"
  | "signs-on-the-cheap"
  | "imprint"
  | "custom";

export interface DropOffLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  website?: string;
  showQr: boolean;
  qrTarget: "maps" | "website" | "custom";
  customQrUrl?: string;
  showGpsIcon: boolean;
}

export interface SignDesign {
  id: string;
  templateId: TemplateId;
  themeId: ThemeId;
  sizeId: SignSizeId;
  headline: string;
  emphasis: string;
  subtitle: string;
  slogan: string;
  iconId: IconId;
  mapStyle: MapStyle;
  locations: DropOffLocation[];
  logoDataUrl?: string;
  heroImageDataUrl?: string;
  showBleed: boolean;
  showCropMarks: boolean;
  colorblindSafe: boolean;
  published?: boolean;
  authorName?: string;
  title?: string;
  rating?: number;
  forks?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ColorTheme {
  id: ThemeId;
  name: string;
  description: string;
  background: string;
  surface: string;
  primary: string;
  primaryText: string;
  accent: string;
  muted: string;
  text: string;
  soft: string;
  border: string;
}

export interface SignTemplate {
  id: TemplateId;
  name: string;
  category: string;
  description: string;
  defaults: Partial<SignDesign>;
  layout: "centered" | "split" | "banner" | "poster" | "warm";
}

export interface SignSize {
  id: SignSizeId;
  label: string;
  widthIn: number;
  heightIn: number;
  bleedIn: number;
  safeMarginIn: number;
}

export interface PrinterPreset {
  id: PrinterPresetId;
  name: string;
  tagline: string;
  url: string;
  orderUrl: string;
  recommendedSizeId: SignSizeId;
  recommendedExport: "pdf" | "png";
  bleedIn: number;
  fileTypes: ("pdf" | "png" | "svg")[];
  dpi: number;
  notes: string;
  colorMode: "RGB" | "CMYK-safe";
  featured: boolean;
  steps: string[];
}
