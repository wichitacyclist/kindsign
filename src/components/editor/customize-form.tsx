"use client";

import { Plus, Trash2, Upload } from "lucide-react";
import { ICON_OPTIONS } from "@/components/icons/sign-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  EMPHASIS_OPTIONS,
  HEADLINE_OPTIONS,
  SLOGAN_OPTIONS,
  SUBTITLE_OPTIONS,
} from "@/lib/templates";
import { themes } from "@/lib/themes";
import { signSizes } from "@/lib/sizes";
import { useEditorStore } from "@/lib/store";
import type { IconId, MapStyle, ThemeId } from "@/lib/types";

function ChipRow({
  options,
  value,
  onPick,
}: {
  options: string[];
  value: string;
  onPick: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onPick(opt)}
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
            value === opt
              ? "bg-[var(--brand)] text-white"
              : "bg-[var(--brand-soft)] text-[var(--brand-ink)] hover:brightness-95"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function CustomizeForm() {
  const design = useEditorStore((s) => s.design);
  const updateDesign = useEditorStore((s) => s.updateDesign);
  const addLocation = useEditorStore((s) => s.addLocation);
  const updateLocation = useEditorStore((s) => s.updateLocation);
  const removeLocation = useEditorStore((s) => s.removeLocation);
  const setStep = useEditorStore((s) => s.setStep);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--brand-ink)]">
          Customize your sign
        </h2>
        <p className="mt-1 text-sm text-[var(--brand-muted)]">
          Typography scales automatically. No overlapping. No manual nudging.
        </p>
      </div>

      <section className="space-y-3">
        <Label>Headline</Label>
        <Input
          value={design.headline}
          onChange={(e) => updateDesign({ headline: e.target.value.toUpperCase() })}
          maxLength={48}
        />
        <ChipRow
          options={HEADLINE_OPTIONS}
          value={design.headline}
          onPick={(v) => updateDesign({ headline: v })}
        />
      </section>

      <section className="space-y-3">
        <Label>Main emphasis</Label>
        <Input
          value={design.emphasis}
          onChange={(e) => updateDesign({ emphasis: e.target.value.toUpperCase() })}
          maxLength={40}
        />
        <ChipRow
          options={EMPHASIS_OPTIONS}
          value={design.emphasis}
          onPick={(v) => updateDesign({ emphasis: v })}
        />
      </section>

      <section className="space-y-3">
        <Label>Subtitle</Label>
        <Input
          value={design.subtitle}
          onChange={(e) => updateDesign({ subtitle: e.target.value })}
          maxLength={80}
        />
        <ChipRow
          options={SUBTITLE_OPTIONS}
          value={design.subtitle}
          onPick={(v) => updateDesign({ subtitle: v })}
        />
      </section>

      <section className="space-y-3">
        <Label>Bottom slogan</Label>
        <Textarea
          value={design.slogan}
          onChange={(e) => updateDesign({ slogan: e.target.value })}
          maxLength={80}
        />
        <ChipRow
          options={SLOGAN_OPTIONS}
          value={design.slogan}
          onPick={(v) => updateDesign({ slogan: v })}
        />
      </section>

      <section className="space-y-3">
        <Label>Color theme</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {themes.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => updateDesign({ themeId: t.id as ThemeId })}
              className={`rounded-xl border p-3 text-left transition ${
                design.themeId === t.id
                  ? "border-[var(--brand)] ring-2 ring-[var(--brand)]/30"
                  : "border-[var(--brand-border)]"
              }`}
            >
              <div className="mb-2 flex gap-1">
                {[t.primary, t.accent, t.background, t.soft].map((c) => (
                  <span
                    key={c}
                    className="h-4 w-4 rounded-full border border-black/5"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div className="text-xs font-semibold text-[var(--brand-ink)]">{t.name}</div>
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-[var(--brand-muted)]">
          <input
            type="checkbox"
            checked={design.colorblindSafe}
            onChange={(e) => updateDesign({ colorblindSafe: e.target.checked })}
          />
          Colorblind-safe mode
        </label>
      </section>

      <section className="space-y-3">
        <Label>Icon</Label>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
          {ICON_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => updateDesign({ iconId: opt.id as IconId })}
              className={`rounded-xl border px-2 py-2 text-[11px] font-medium ${
                design.iconId === opt.id
                  ? "border-[var(--brand)] bg-[var(--brand-soft)]"
                  : "border-[var(--brand-border)]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <Label>Map silhouette</Label>
        <select
          className="h-11 w-full rounded-xl border border-[var(--brand-border)] bg-white/80 px-3 text-sm"
          value={design.mapStyle}
          onChange={(e) => updateDesign({ mapStyle: e.target.value as MapStyle })}
        >
          <option value="none">None</option>
          <option value="city">City silhouette</option>
          <option value="skyline">Local skyline</option>
          <option value="state">State outline</option>
          <option value="county">County outline</option>
        </select>
      </section>

      <section className="space-y-3">
        <Label>Print size</Label>
        <select
          className="h-11 w-full rounded-xl border border-[var(--brand-border)] bg-white/80 px-3 text-sm"
          value={design.sizeId}
          onChange={(e) => updateDesign({ sizeId: e.target.value as typeof design.sizeId })}
        >
          {signSizes.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Drop-off locations</Label>
          <Button type="button" size="sm" variant="secondary" onClick={addLocation}>
            <Plus className="h-4 w-4" /> Add
          </Button>
        </div>
        <div className="space-y-4">
          {design.locations.map((loc, index) => (
            <div
              key={loc.id}
              className="space-y-2 rounded-2xl border border-[var(--brand-border)] bg-white/70 p-3"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[var(--brand-ink)]">
                  Location {index + 1}
                </p>
                <button
                  type="button"
                  className="text-[var(--brand-muted)] hover:text-red-600"
                  onClick={() => removeLocation(loc.id)}
                  aria-label="Remove location"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <Input
                placeholder="Name"
                value={loc.name}
                onChange={(e) => updateLocation(loc.id, { name: e.target.value })}
              />
              <Input
                placeholder="Address"
                value={loc.address}
                onChange={(e) => updateLocation(loc.id, { address: e.target.value })}
              />
              <div className="grid grid-cols-3 gap-2">
                <Input
                  placeholder="City"
                  value={loc.city}
                  onChange={(e) => updateLocation(loc.id, { city: e.target.value })}
                />
                <Input
                  placeholder="ST"
                  value={loc.state}
                  maxLength={2}
                  onChange={(e) =>
                    updateLocation(loc.id, { state: e.target.value.toUpperCase() })
                  }
                />
                <Input
                  placeholder="ZIP"
                  value={loc.zip}
                  onChange={(e) => updateLocation(loc.id, { zip: e.target.value })}
                />
              </div>
              <Input
                placeholder="Optional website"
                value={loc.website ?? ""}
                onChange={(e) => updateLocation(loc.id, { website: e.target.value })}
              />
              <div className="flex flex-wrap gap-3 text-xs text-[var(--brand-muted)]">
                <label className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={loc.showQr}
                    onChange={(e) => updateLocation(loc.id, { showQr: e.target.checked })}
                  />
                  QR code
                </label>
                <label className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={loc.showGpsIcon}
                    onChange={(e) =>
                      updateLocation(loc.id, { showGpsIcon: e.target.checked })
                    }
                  />
                  GPS icon
                </label>
                <select
                  className="rounded-lg border border-[var(--brand-border)] bg-white px-2 py-1"
                  value={loc.qrTarget}
                  onChange={(e) =>
                    updateLocation(loc.id, {
                      qrTarget: e.target.value as typeof loc.qrTarget,
                    })
                  }
                >
                  <option value="maps">Google Maps</option>
                  <option value="website">Website</option>
                  <option value="custom">Custom URL</option>
                </select>
              </div>
              {loc.qrTarget === "custom" && (
                <Input
                  placeholder="Donation / volunteer / wishlist URL"
                  value={loc.customQrUrl ?? ""}
                  onChange={(e) =>
                    updateLocation(loc.id, { customQrUrl: e.target.value })
                  }
                />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <label className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-dashed border-[var(--brand-border)] bg-white/60 p-4">
          <span className="flex items-center gap-2 text-sm font-semibold text-[var(--brand-ink)]">
            <Upload className="h-4 w-4" /> Logo (PNG/SVG)
          </span>
          <input
            type="file"
            accept="image/png,image/svg+xml,image/webp"
            className="text-xs"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              updateDesign({ logoDataUrl: await fileToDataUrl(file) });
            }}
          />
        </label>
        <label className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-dashed border-[var(--brand-border)] bg-white/60 p-4">
          <span className="flex items-center gap-2 text-sm font-semibold text-[var(--brand-ink)]">
            <Upload className="h-4 w-4" /> Hero photo
          </span>
          <input
            type="file"
            accept="image/*"
            className="text-xs"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              updateDesign({ heroImageDataUrl: await fileToDataUrl(file) });
            }}
          />
        </label>
      </section>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={() => setStep("template")}>
          Back
        </Button>
        <Button type="button" onClick={() => setStep("preview")}>
          Preview sign
        </Button>
      </div>
    </div>
  );
}
