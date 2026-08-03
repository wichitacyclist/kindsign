import Link from "next/link";
import { GITHUB_URL, SUPPORT_EMAIL, SUPPORT_URL } from "@/lib/links";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--brand-border)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-[var(--brand-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          Community based, yard sign templates.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/create" className="hover:text-[var(--brand-ink)]">
            Create
          </Link>
          <Link href="/gallery" className="hover:text-[var(--brand-ink)]">
            Gallery
          </Link>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="hover:text-[var(--brand-ink)]"
          >
            {SUPPORT_EMAIL}
          </a>
          <a
            href={SUPPORT_URL}
            className="font-semibold text-[var(--brand)] hover:brightness-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            Support the site
          </a>
          <a
            href={GITHUB_URL}
            className="hover:text-[var(--brand-ink)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open source
          </a>
        </div>
      </div>
    </footer>
  );
}
