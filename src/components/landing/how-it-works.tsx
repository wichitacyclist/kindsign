const steps = [
  {
    n: "01",
    title: "Choose a Template",
    body: "Food drive, school, church, coats, pets — choose a design that fits your cause.",
  },
  {
    n: "02",
    title: "Edit",
    body: "Type your headline, drop-off locations, logo, and QR codes. KindSign lays out everything for you.",
  },
  {
    n: "03",
    title: "Download a print-ready file",
    body: "Export a PDF or PNG at 300 DPI with bleed — ready for a professional yard-sign printer.",
  },
  {
    n: "04",
    title: "Order from a major printer",
    body: "One click opens Signs.com, Signs On The Cheap, or Imprint. Upload your file and order stakes + shipping.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-y border-[var(--brand-border)] bg-white/50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--brand-ink)] sm:text-4xl">
          Easily Design your Yard Sign / Create a Template / Use Our Templates /
          Create Community Good
        </h2>
        <p className="mt-3 max-w-2xl text-base text-[var(--brand-muted)]">
          KindSign designs the sign. You download the file. Then you order printing from a trusted yard-sign company — no design skills required.
        </p>
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
