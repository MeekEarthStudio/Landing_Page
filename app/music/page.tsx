"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Music, Mic2, ArrowRight } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/animations";

const ARTISTS = [
  {
    href: "/music/carlton",
    icon: Music,
    name: "Carlton B Reid III",
    blurb: "Eight original songs streaming from the studio vault — unlock them all with your email.",
    cta: "Listen to Carlton",
  },
  {
    href: "/music/grace",
    icon: Mic2,
    name: "Grace J Reid",
    blurb: "EP (Live) — It Is Well With My Soul. Streaming now on Bandcamp.",
    cta: "Listen to Grace",
  },
];

/** Artist gateway — visitors choose whose music to enter. */
export default function MusicGatewayPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20">
      <motion.div variants={staggerContainer} initial="initial" animate="enter">
        <motion.header variants={fadeUp} className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            Original music
          </p>
          <h1 className="text-4xl font-bold text-brand-ink sm:text-5xl">Choose Your Artist</h1>
          <p className="mx-auto mt-3 max-w-md text-brand-slate">
            Two voices, one studio. Pick who you want to listen to first.
          </p>
        </motion.header>

        <div className="grid gap-6 sm:grid-cols-2">
          {ARTISTS.map((artist) => (
            <motion.div key={artist.href} variants={fadeUp}>
              <Link
                href={artist.href}
                className="group flex h-full flex-col items-center rounded-2xl border border-brand-slate/15 bg-white p-10 text-center shadow-sm transition hover:-translate-y-1 hover:border-brand-lime hover:shadow-xl"
              >
                <span className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-deep text-brand-lime">
                  <artist.icon size={28} />
                </span>
                <h2 className="text-2xl font-bold text-brand-ink">{artist.name}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-slate">
                  {artist.blurb}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-brand-blue transition group-hover:gap-3 group-hover:text-brand-lime">
                  {artist.cta} <ArrowRight size={16} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
