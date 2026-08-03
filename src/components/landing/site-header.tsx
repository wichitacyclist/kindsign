"use client";

import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--brand-border)]/70 bg-[var(--brand-bg)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--brand-ink)]"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--brand)] text-white">
            <HeartHandshake className="h-5 w-5" />
          </span>
          KindSign
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--brand-muted)] md:flex">
          <Link href="/#how" className="hover:text-[var(--brand-ink)]">
            How it works
          </Link>
          <Link href="/gallery" className="hover:text-[var(--brand-ink)]">
            Community
          </Link>
          <Link href="/create" className="hover:text-[var(--brand-ink)]">
            Templates
          </Link>
        </nav>
        <Link href="/create">
          <Button>Create a sign</Button>
        </Link>
      </div>
    </header>
  );
}
