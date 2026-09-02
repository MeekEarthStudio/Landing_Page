"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Disc3, Heart, HeartHandshake, Music, X } from "lucide-react";

const DISMISS_KEY = "meek-earth-bottombar-dismissed";
const DISMISS_HOURS = 24;
const ROTATE_MS = 8000;

interface Cta {
  id: string;
  icon: typeof Disc3;
  text: string;
  label: string;
  href: string;
  external?: boolean;
  /** Paths where this CTA is redundant or unwanted. */
  hideOn: string[];
}

const CTAS: Cta[] = [
  {
    id: "ep",
    icon: Disc3,
    text: "EP (Live) — It Is Well With My Soul by Grace J Reid",
    label: "Buy the CD",
    href: "https://kunaki.com/sales.asp?PID=PX00Z4BATO&pp=1",
    external: true,
    hideOn: ["/music/grace"],
  },
  {
    id: "tip",
    icon: Heart,
    text: "Enjoying the music? Support the studio",
    label: "Leave a tip",
    href: "https://buy.stripe.com/fZuaEZ64mgFO4FZ2N10ZW00",
    external: true,
    hideOn: ["/music/grace"],
  },
  {
    id: "tracks",
    icon: Music,
    text: "8 original tracks from Carlton B Reid III",
    label: "Listen now",
    href: "/music/carlton",
    hideOn: ["/music/carlton"],
  },
  {
    id: "good-samaritan",
    icon: HeartHandshake,
    text: "Good Samaritan — stewardship logging with AI pastoral chat",
    label: "Open app",
    href: "https://good-samaritan-504806.web.app/",
    external: true,
    hideOn: ["/good-samaritan", "/good-samaritan/support"],
  },
];

/** Slim dismissible bottom bar rotating the site's own CTAs. */
export default function BottomBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  const ctas = CTAS.filter((c) => !c.hideOn.includes(pathname));

  // Appear after a beat, unless dismissed in the last 24h.
  useEffect(() => {
    const dismissedAt = Number(window.localStorage.getItem(DISMISS_KEY) ?? 0);
    if (Date.now() - dismissedAt < DISMISS_HOURS * 60 * 60 * 1000) return;
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible || ctas.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % ctas.length), ROTATE_MS);
    return () => clearInterval(t);
  }, [visible, ctas.length]);

  function dismiss() {
    window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setVisible(false);
  }

  if (!ctas.length) return null;
  const cta = ctas[index % ctas.length];
  const inner = (
    <>
      <cta.icon size={16} className="shrink-0 text-brand-lime" />
      <span className="min-w-0 truncate text-sm text-white/90">{cta.text}</span>
      <span className="shrink-0 rounded-full bg-brand-lime px-3.5 py-1.5 text-xs font-bold text-brand-deep transition group-hover:brightness-110">
        {cta.label}
      </span>
    </>
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 72, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 72, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-brand-ink/95 backdrop-blur"
        >
          <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={cta.id}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex min-w-0 flex-1"
              >
                {cta.external ? (
                  <a
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-w-0 flex-1 items-center gap-3"
                  >
                    {inner}
                  </a>
                ) : (
                  <Link href={cta.href} className="group flex min-w-0 flex-1 items-center gap-3">
                    {inner}
                  </Link>
                )}
              </motion.div>
            </AnimatePresence>
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="shrink-0 rounded-full p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
