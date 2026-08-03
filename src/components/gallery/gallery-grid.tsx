"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { GitFork, Star } from "lucide-react";
import { SignCanvas } from "@/components/sign/sign-canvas";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { seedGallery } from "@/lib/community";
import { useEditorStore } from "@/lib/store";

export function GalleryGrid() {
  const router = useRouter();
  const gallery = useEditorStore((s) => s.gallery);
  const forkFromGallery = useEditorStore((s) => s.forkFromGallery);
  const rateDesign = useEditorStore((s) => s.rateDesign);
  const loadDesign = useEditorStore((s) => s.loadDesign);

  const items = useMemo(() => {
    const map = new Map<string, (typeof seedGallery)[number]>();
    for (const s of seedGallery) map.set(s.id, s);
    for (const g of gallery) map.set(g.id, g);
    return Array.from(map.values()).sort((a, b) => (b.forks ?? 0) - (a.forks ?? 0));
  }, [gallery]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="max-w-2xl">
        <Badge>Community Templates</Badge>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-[var(--brand-ink)]">
          Design a sign. Edit a template. Print Yard Signs.
        </h1>
        <p className="mt-3 text-[var(--brand-muted)]">
          Anyone can publish a design. Start from a proven template and make it yours.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-[var(--brand-border)] bg-white/80 p-3 shadow-sm"
          >
            <div className="rounded-xl bg-[var(--brand-soft)]/50 p-3">
              <div className="mx-auto w-fit origin-top scale-[0.7]">
                <SignCanvas design={item} maxWidth={220} />
              </div>
            </div>
            <div className="space-y-2 p-2 pt-3">
              <h2 className="font-semibold text-[var(--brand-ink)]">
                {item.title ?? item.templateId}
              </h2>
              <p className="text-xs text-[var(--brand-muted)]">
                by {item.authorName ?? "Community"}
              </p>
              <div className="flex items-center gap-3 text-xs text-[var(--brand-muted)]">
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-amber-500" /> {item.rating ?? "—"}
                </span>
                <span className="inline-flex items-center gap-1">
                  <GitFork className="h-3.5 w-3.5" /> {item.forks ?? 0} forks
                </span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <Button
                  size="sm"
                  onClick={() => {
                    useEditorStore.setState((s) => ({
                      gallery: s.gallery.some((g) => g.id === item.id)
                        ? s.gallery
                        : [item, ...s.gallery],
                    }));
                    forkFromGallery(item.id);
                    router.push("/create");
                  }}
                >
                  Design & edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const next = Math.min(5, Number(((item.rating ?? 4) + 0.1).toFixed(1)));
                    useEditorStore.setState((s) => ({
                      gallery: s.gallery.some((g) => g.id === item.id)
                        ? s.gallery.map((g) =>
                            g.id === item.id ? { ...g, rating: next } : g
                          )
                        : [{ ...item, rating: next }, ...s.gallery],
                    }));
                    rateDesign(item.id, next);
                  }}
                >
                  Rate
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    loadDesign(item);
                    router.push("/create");
                  }}
                >
                  Open
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
