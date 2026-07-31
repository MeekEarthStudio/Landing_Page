import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import MeekEarthLogo from "@/components/MeekEarthLogo";
import BottomBar from "@/components/BottomBar";
import SiteNav from "@/components/SiteNav";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Meek Earth STUDIO — Music, Film & Impact",
  description:
    "Eight original tracks streaming now, an interactive documentary in production, and stories from the studio. Stay tuned.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/85 backdrop-blur">
          <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
            <MeekEarthLogo />
            <SiteNav />
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-slate-100 bg-brand-ink py-10 text-white">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center">
            <p className="font-serif text-sm tracking-[0.3em] text-brand-lime uppercase">
              Meek Earth Studio
            </p>
            <p className="max-w-md text-sm text-white/60">
              Music, film, and stories from the studio — more on the way. Stay tuned.
            </p>
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Meek Earth STUDIO. All rights reserved.
            </p>
          </div>
        </footer>

        <BottomBar />

        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
