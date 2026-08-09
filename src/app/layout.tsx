import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kindsign.vercel.app"),
  title: "KindSign — Beautiful donation yard signs in under 5 minutes",
  description:
    "Free community yard sign templates for cities, churches, schools, and neighbors. Customize, preview, and export print-ready files in under five minutes.",
  openGraph: {
    title: "KindSign — Free community yard sign templates",
    description:
      "Design a beautiful donation yard sign in under 5 minutes. Export print-ready files and order from major printers.",
    url: "https://kindsign.vercel.app",
    siteName: "KindSign",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "KindSign — Free community yard sign templates",
    description:
      "Design a beautiful donation yard sign in under 5 minutes. Export print-ready files and order from major printers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
