import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SUPPORT_URL } from "@/lib/links";

export function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="overflow-hidden rounded-[2rem] bg-[var(--brand)] px-8 py-12 text-white shadow-xl sm:px-12">
        <div className="max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
            Help your block. Inspire a movement.
          </h2>
          <p className="mt-3 text-white/85">
            Generate a beautiful sign today. Share your template so the next volunteer
            starts even faster. If KindSign helps your community, you can support the
            project too.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/create">
              <Button
                size="lg"
                className="bg-white text-[var(--brand)] hover:bg-white/90"
              >
                Create your first KindSign
              </Button>
            </Link>
            <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:bg-white/10"
              >
                Support the site
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
