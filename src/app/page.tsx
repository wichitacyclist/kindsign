import { CtaBand } from "@/components/landing/cta";
import { FeaturedTweet } from "@/components/landing/featured-tweet";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <HowItWorks />
        <FeaturedTweet />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
