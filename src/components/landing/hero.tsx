"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SignCanvas } from "@/components/sign/sign-canvas";
import { createDesign, createLocation } from "@/lib/defaults";

const preview = {
  ...createDesign("food-drive"),
  locations: [
    createLocation({
      name: "Neighborhood Pantry",
      address: "88 Hope Street",
      city: "Your City",
      state: "CA",
      zip: "90210",
    }),
  ],
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[var(--brand)]/15 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-[var(--brand-accent)]/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(47,107,79,0.18) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-5 gap-1">
              <Sparkles className="h-3 w-3" /> Open movement for community kindness
            </Badge>
            <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold leading-[0.95] tracking-tight text-[var(--brand-ink)] sm:text-6xl lg:text-7xl">
              KindSign
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--brand-muted)] sm:text-xl">
              The world&apos;s easiest open-source donation sign system. Beautiful,
              print-ready yard signs in under five minutes — for any city, church,
              school, or neighbor who wants to help.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/create">
                <Button size="lg">
                  Start a sign <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/gallery">
                <Button size="lg" variant="outline">
                  Browse community templates
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-[var(--brand-muted)]">
              No guilt. No politics. Just neighbors helping neighbors.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[var(--brand)]/20 to-transparent blur-xl" />
            <SignCanvas design={preview} maxWidth={360} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
