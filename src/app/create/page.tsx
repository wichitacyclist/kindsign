import { EditorShell } from "@/components/editor/editor-shell";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";

export const metadata = {
  title: "Create a KindSign",
  description: "Choose a template, customize, preview, and export a print-ready donation sign.",
};

export default function CreatePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <EditorShell />
      </main>
      <SiteFooter />
    </>
  );
}
