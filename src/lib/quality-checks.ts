import { contrastRatio } from "./contrast";
import { getSize } from "./sizes";
import { getTheme } from "./themes";
import type { SignDesign } from "./types";

export type QualityLevel = "pass" | "warn" | "fail";

export interface QualityIssue {
  id: string;
  level: QualityLevel;
  message: string;
  fix?: string;
}

/** Minimum readable sizes at street distance (inches of print height). */
const MIN_HEADLINE_IN = 1.1;
const MIN_BODY_IN = 0.35;

export function runQualityChecks(design: SignDesign): QualityIssue[] {
  const theme = getTheme(design.themeId, design.colorblindSafe);
  const size = getSize(design.sizeId);
  const issues: QualityIssue[] = [];

  const headlineIn = size.heightIn * 0.08;
  const bodyIn = size.heightIn * 0.028;

  if (headlineIn < MIN_HEADLINE_IN) {
    issues.push({
      id: "headline-size",
      level: "warn",
      message: "Headline may be small for driveway viewing on this size.",
      fix: "Choose a larger print size or shorten the headline.",
    });
  }

  if (bodyIn < MIN_BODY_IN) {
    issues.push({
      id: "body-size",
      level: "warn",
      message: "Address text may be hard to read from the street.",
      fix: "Reduce location count or pick a larger size.",
    });
  }

  const primaryContrast = contrastRatio(theme.primaryText, theme.primary);
  if (primaryContrast < 4.5) {
    issues.push({
      id: "contrast-primary",
      level: "fail",
      message: `Primary text contrast is ${primaryContrast.toFixed(1)}:1 (needs 4.5:1).`,
      fix: "Switch themes or enable colorblind-safe mode.",
    });
  }

  const bodyContrast = contrastRatio(theme.text, theme.background);
  if (bodyContrast < 4.5) {
    issues.push({
      id: "contrast-body",
      level: "fail",
      message: `Body text contrast is ${bodyContrast.toFixed(1)}:1 (needs 4.5:1).`,
      fix: "Choose a higher-contrast theme.",
    });
  }

  if (size.safeMarginIn < 0.375) {
    issues.push({
      id: "margins",
      level: "warn",
      message: "Safe margins are tight for some printers.",
      fix: "Keep text away from edges; enable bleed guides.",
    });
  }

  if (design.heroImageDataUrl && design.heroImageDataUrl.length < 8000) {
    issues.push({
      id: "image-res",
      level: "warn",
      message: "Hero image appears low resolution.",
      fix: "Upload a larger photo (at least 1500px wide).",
    });
  }

  if (design.locations.length > 4) {
    issues.push({
      id: "location-density",
      level: "warn",
      message: "Many locations can crowd the sign.",
      fix: "Consider a secondary flyer or QR to a map page.",
    });
  }

  for (const loc of design.locations) {
    if (loc.showQr && loc.qrTarget === "website" && !loc.website) {
      issues.push({
        id: `qr-website-${loc.id}`,
        level: "fail",
        message: `QR for "${loc.name}" points to a website, but none is set.`,
        fix: "Add a website or switch QR target to Maps.",
      });
    }
    if (loc.showQr && loc.qrTarget === "custom" && !loc.customQrUrl) {
      issues.push({
        id: `qr-custom-${loc.id}`,
        level: "fail",
        message: `Custom QR for "${loc.name}" is empty.`,
        fix: "Paste a donation, volunteer, or wishlist URL.",
      });
    }
  }

  if (issues.length === 0) {
    issues.push({
      id: "all-clear",
      level: "pass",
      message: "Print checks look great — ready to export.",
    });
  }

  return issues;
}

export function canExport(issues: QualityIssue[]) {
  return !issues.some((i) => i.level === "fail");
}
