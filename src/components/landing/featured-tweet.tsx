"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (el?: HTMLElement | null) => void;
      };
    };
  }
}

export function FeaturedTweet() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.twttr?.widgets?.load(ref.current);
  }, []);

  return (
    <section className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-[var(--brand)]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand)]">
            KindSign in the wild
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--brand-ink)] sm:text-4xl">
            A finished sign, ready to share.
          </h2>
          <p className="mt-3 text-[var(--brand-muted)]">
            When someone posts their KindSign, the next volunteer can start even faster.
          </p>
        </div>

        <div
          ref={ref}
          className="mx-auto mt-10 flex max-w-[560px] justify-center [&_.twitter-tweet]:mx-auto"
        >
          <blockquote className="twitter-tweet" data-media-max-width="560">
            <p lang="zxx" dir="ltr">
              <a href="https://t.co/Am2tPsUpm8">pic.twitter.com/Am2tPsUpm8</a>
            </p>
            &mdash; John Doerksen (@realjdoerksen){" "}
            <a href="https://x.com/realjdoerksen/status/2081302469817122921?ref_src=twsrc%5Etfw">
              July 26, 2026
            </a>
          </blockquote>
        </div>
      </div>

      <Script
        src="https://platform.x.com/widgets.js"
        strategy="lazyOnload"
        onLoad={() => {
          window.twttr?.widgets?.load(ref.current);
        }}
      />
    </section>
  );
}
