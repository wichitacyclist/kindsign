import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--brand-border)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-[var(--brand-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <span className="font-semibold text-[var(--brand-ink)]">KindSign</span> —
          open-source donation signs for community kindness.
        </p>
        <div className="flex gap-4">
          <Link href="/create" className="hover:text-[var(--brand-ink)]">
            Create
          </Link>
          <Link href="/gallery" className="hover:text-[var(--brand-ink)]">
            Gallery
          </Link>
          <a
            href="https://github.com"
            className="hover:text-[var(--brand-ink)]"
            target="_blank"
            rel="noreferrer"
          >
            Open source
          </a>
        </div>
      </div>
    </footer>
  );
}
