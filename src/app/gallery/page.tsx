import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";

export const metadata = {
  title: "Community Templates — KindSign",
  description: "Browse, fork, rate, and improve community donation sign templates.",
};

export default function GalleryPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <GalleryGrid />
      </main>
      <SiteFooter />
    </>
  );
}
