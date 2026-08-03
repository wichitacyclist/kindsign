"use client";

import { useEffect, useState } from "react";
import { SignIcon } from "@/components/icons/sign-icons";
import { MapSilhouette } from "@/components/sign/map-silhouettes";
import { getTemplate } from "@/lib/templates";
import { getTheme } from "@/lib/themes";
import { getSize, previewDimensions } from "@/lib/sizes";
import { locationQrUrl, qrDataUrl } from "@/lib/qr";
import { formatAddress } from "@/lib/utils";
import type { SignDesign } from "@/lib/types";

interface SignCanvasProps {
  design: SignDesign;
  maxWidth?: number;
  className?: string;
  id?: string;
}

export function SignCanvas({
  design,
  maxWidth = 420,
  className,
  id = "kindsign-canvas",
}: SignCanvasProps) {
  const theme = getTheme(design.themeId, design.colorblindSafe);
  const size = getSize(design.sizeId);
  const template = getTemplate(design.templateId);
  const { width, height } = previewDimensions(size, maxWidth);
  const [qrMap, setQrMap] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const entries = await Promise.all(
        design.locations
          .filter((l) => l.showQr)
          .map(async (l) => [l.id, await qrDataUrl(locationQrUrl(l), theme.text)] as const)
      );
      if (!cancelled) setQrMap(Object.fromEntries(entries));
    })();
    return () => {
      cancelled = true;
    };
  }, [design.locations, theme.text]);

  const layout = template.layout;
  const pad = Math.round(width * 0.08);

  return (
    <div
      id={id}
      className={className}
      style={{
        width,
        height,
        background: theme.background,
        color: theme.text,
        position: "relative",
        overflow: "hidden",
        fontFamily: "var(--font-display), Georgia, serif",
        boxShadow: "0 25px 60px rgba(28,50,40,0.18)",
      }}
      aria-label="Donation sign preview"
    >
      {/* Soft atmospheric wash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 20% 10%, ${theme.soft} 0%, transparent 45%), radial-gradient(circle at 90% 80%, ${theme.soft} 0%, transparent 40%)`,
          pointerEvents: "none",
        }}
      />

      {design.mapStyle !== "none" && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "28%" }}>
          <MapSilhouette style={design.mapStyle} color={theme.primary} />
        </div>
      )}

      {design.heroImageDataUrl && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: layout === "split" ? "34%" : "22%",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={design.heroImageDataUrl}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.92 }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to bottom, transparent 40%, ${theme.background})`,
            }}
          />
        </div>
      )}

      {design.showBleed && (
        <div
          style={{
            position: "absolute",
            inset: Math.round(width * 0.015),
            border: `1px dashed ${theme.border}`,
            opacity: 0.55,
            pointerEvents: "none",
          }}
        />
      )}

      <div
        style={{
          position: "relative",
          height: "100%",
          padding: pad,
          display: "flex",
          flexDirection: "column",
          justifyContent: layout === "banner" ? "flex-start" : "space-between",
          gap: Math.round(height * 0.02),
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          {design.logoDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={design.logoDataUrl}
              alt="Organization logo"
              style={{ maxHeight: height * 0.08, maxWidth: width * 0.28, objectFit: "contain" }}
            />
          ) : (
            <div style={{ width: 1, height: 1 }} />
          )}
          {design.iconId !== "none" && (
            <div
              style={{
                width: width * 0.12,
                height: width * 0.12,
                borderRadius: "50%",
                background: theme.surface,
                display: "grid",
                placeItems: "center",
                color: theme.primary,
                boxShadow: `0 8px 20px ${theme.border}`,
              }}
            >
              <SignIcon id={design.iconId} className="h-[60%] w-[60%]" />
            </div>
          )}
        </div>

        <div
          style={{
            textAlign: layout === "split" ? "left" : "center",
            marginTop: design.heroImageDataUrl ? height * 0.06 : 0,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-sans), system-ui, sans-serif",
              fontSize: Math.max(11, width * 0.042),
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: theme.muted,
            }}
          >
            {design.headline}
          </p>
          <h1
            style={{
              margin: `${height * 0.012}px 0 0`,
              fontSize: Math.max(28, width * (design.emphasis.length > 14 ? 0.1 : 0.14)),
              lineHeight: 0.95,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: theme.primary,
              textWrap: "balance",
            }}
          >
            {design.emphasis}
          </h1>
          <p
            style={{
              margin: `${height * 0.018}px 0 0`,
              fontFamily: "var(--font-sans), system-ui, sans-serif",
              fontSize: Math.max(12, width * 0.045),
              fontWeight: 500,
              color: theme.text,
              textWrap: "balance",
            }}
          >
            {design.subtitle}
          </p>
        </div>

        {layout === "split" && (
          <div
            style={{
              height: 4,
              width: "42%",
              background: theme.accent,
              borderRadius: 99,
            }}
          />
        )}

        <div
          style={{
            background: theme.surface,
            borderRadius: layout === "split" ? 8 : 18,
            padding: Math.round(width * 0.045),
            border: `1px solid ${theme.border}`,
            display: "flex",
            flexDirection: "column",
            gap: Math.round(height * 0.015),
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-sans), system-ui, sans-serif",
              fontSize: Math.max(10, width * 0.032),
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: theme.muted,
            }}
          >
            Drop-off locations
          </p>
          {design.locations.slice(0, 4).map((loc) => (
            <div
              key={loc.id}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {loc.showGpsIcon && (
                    <span style={{ color: theme.primary, fontSize: width * 0.04 }} aria-hidden>
                      ⌖
                    </span>
                  )}
                  <strong
                    style={{
                      fontFamily: "var(--font-sans), system-ui, sans-serif",
                      fontSize: Math.max(11, width * 0.038),
                      fontWeight: 700,
                    }}
                  >
                    {loc.name}
                  </strong>
                </div>
                <p
                  style={{
                    margin: "2px 0 0",
                    fontFamily: "var(--font-sans), system-ui, sans-serif",
                    fontSize: Math.max(10, width * 0.03),
                    color: theme.muted,
                    lineHeight: 1.25,
                  }}
                >
                  {formatAddress(loc)}
                </p>
              </div>
              {loc.showQr && qrMap[loc.id] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrMap[loc.id]}
                  alt={`QR code for ${loc.name}`}
                  style={{ width: width * 0.12, height: width * 0.12 }}
                />
              )}
            </div>
          ))}
        </div>

        <p
          style={{
            margin: 0,
            textAlign: "center",
            fontSize: Math.max(12, width * 0.042),
            fontWeight: 600,
            fontStyle: "italic",
            color: theme.primary,
            textWrap: "balance",
          }}
        >
          {design.slogan}
        </p>
      </div>
    </div>
  );
}
