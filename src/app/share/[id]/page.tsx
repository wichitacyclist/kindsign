"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { SignCanvas } from "@/components/sign/sign-canvas";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { seedGallery } from "@/lib/community";
import { useEditorStore } from "@/lib/store";

export default function SharePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const design = useEditorStore((s) => s.design);
  const gallery = useEditorStore((s) => s.gallery);
  const loadDesign = useEditorStore((s) => s.loadDesign);
  const duplicateDesign = useEditorStore((s) => s.duplicateDesign);

  const shared = useMemo(() => {
    return (
      gallery.find((g) => g.id === id) ||
      seedGallery.find((g) => g.id === id) ||
      (design.id === id ? design : null)
    );
  }, [gallery, design, id]);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-4xl flex-1 flex-col items-center px-4 py-12 text-center">
        {shared ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand)]">
              Shared KindSign
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold text-[var(--brand-ink)]">
              {shared.title ?? shared.emphasis}
            </h1>
            <p className="mt-2 text-[var(--brand-muted)]">
              {shared.authorName ? `by ${shared.authorName}` : "Community design"}
            </p>
            <div className="mt-8">
              <SignCanvas design={shared} maxWidth={360} />
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/create">
                <Button
                  onClick={() => {
                    loadDesign(shared);
                    duplicateDesign();
                  }}
                >
                  Duplicate & customize
                </Button>
              </Link>
              <Link href="/gallery">
                <Button variant="outline">Community gallery</Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold">
              Sign not found
            </h1>
            <p className="mt-2 text-[var(--brand-muted)]">
              Shared designs are stored locally in this browser for now.
            </p>
            <Link href="/create" className="mt-6">
              <Button>Create a new sign</Button>
            </Link>
          </>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
