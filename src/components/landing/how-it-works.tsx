const steps = [
  { n: "01", title: "Choose a template", body: "Food drive, school, church, winter coats — pick a starting point." },
  { n: "02", title: "Customize with joy", body: "Headline, emphasis, locations, theme, icon, logo, QR — auto-balanced." },
  { n: "03", title: "Preview & check", body: "Street-readable preview with accessibility and print quality checks." },
  { n: "04", title: "Export or order", body: "PDF, PNG, or SVG — plus one-click presets for popular printers." },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-y border-[var(--brand-border)] bg-white/50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--brand-ink)] sm:text-4xl">
          From idea to yard in under five minutes
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <div className="font-[family-name:var(--font-display)] text-4xl font-bold text-[var(--brand)]/25">
                {s.n}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-[var(--brand-ink)]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--brand-muted)]">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
