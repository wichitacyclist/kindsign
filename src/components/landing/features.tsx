"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  MapPinned,
  Palette,
  Printer,
  QrCode,
  Users,
} from "lucide-react";

const items = [
  {
    icon: Palette,
    title: "Templates that feel human",
    body: "Thirteen professional layouts sharing one hopeful design language.",
  },
  {
    icon: MapPinned,
    title: "Unlimited drop-offs",
    body: "Names, addresses, GPS cues, logos, and QR codes that just work.",
  },
  {
    icon: QrCode,
    title: "Smart QR codes",
    body: "Directions, donation pages, volunteer links, or wishlists — automatic.",
  },
  {
    icon: Printer,
    title: "Print-shop ready",
    body: "300 DPI exports with bleed, crop marks, and presets for major printers.",
  },
  {
    icon: CheckCircle2,
    title: "Quality checks built in",
    body: "Contrast, margins, type size, and image resolution warnings before export.",
  },
  {
    icon: Users,
    title: "Community gallery",
    body: "Publish, fork, rate, and improve templates together — open movement style.",
  },
];

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand)]">
          Why KindSign
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--brand-ink)] sm:text-4xl">
          Canva joy. Printful precision. Community heart.
        </h2>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-[var(--brand-border)] bg-white/70 p-5 shadow-sm"
          >
            <item.icon className="mb-3 h-5 w-5 text-[var(--brand)]" />
            <h3 className="font-semibold text-[var(--brand-ink)]">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--brand-muted)]">
              {item.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
