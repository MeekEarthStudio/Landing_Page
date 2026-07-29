"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Music, Film, HeartHandshake, ArrowRight, Sparkles } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/animations";

const PILLARS = [
  {
    href: "/music",
    icon: Music,
    title: "Unreleased Music",
    body: "Stream exclusive stems and drop time-synced reactions right on the waveform.",
    cta: "Enter the stem locker",
  },
  {
    href: "/documentary",
    icon: Film,
    title: "Interactive Documentary",
    body: "Watch the story unfold and react moment-by-moment alongside the community.",
    cta: "Watch the film",
  },
  {
    href: "/library",
    icon: HeartHandshake,
    title: "Free Nonprofit Library",
    body: "Rights-cleared music, footage, and toolkits — free for organizations doing good.",
    cta: "Browse the library",
  },
];

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-[28rem] w-[54rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-lime/25 via-brand-blue/15 to-brand-lime/25 blur-3xl"
        />
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="enter"
          className="mx-auto max-w-4xl px-4 pb-20 pt-24 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-lime/40 bg-brand-lime/10 px-4 py-1.5 text-sm font-medium text-brand-deep"
          >
            <Sparkles size={14} className="text-brand-lime" />
            Music · Film · Impact
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-5xl font-bold tracking-tight text-brand-ink sm:text-6xl"
          >
            Meek Earth{" "}
            <span className="font-serif italic bg-gradient-to-r from-brand-lime to-brand-blue bg-clip-text text-transparent">
              STUDIO
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg text-brand-slate">
            A next-generation home for unreleased music, interactive documentary film, and a
            free creative arsenal for the nonprofits healing our planet.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/music"
              className="inline-flex items-center gap-2 rounded-full bg-brand-lime px-7 py-3.5 font-semibold text-brand-deep shadow-lg shadow-brand-lime/25 transition hover:brightness-110"
            >
              Listen to unreleased stems <ArrowRight size={17} />
            </Link>
            <Link
              href="/library"
              className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand-blue/25 transition hover:brightness-110"
            >
              Free nonprofit toolkit
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="enter"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {PILLARS.map((p) => (
            <motion.div key={p.href} variants={fadeUp}>
              <Link
                href={p.href}
                className="group flex h-full flex-col rounded-2xl border border-brand-slate/15 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-brand-lime hover:shadow-xl"
              >
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-deep text-brand-lime">
                  <p.icon size={22} />
                </span>
                <h2 className="text-xl font-bold text-brand-ink">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-slate">{p.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition group-hover:gap-3 group-hover:text-brand-lime">
                  {p.cta} <ArrowRight size={15} />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Impact strip */}
      <section className="bg-brand-deep py-16 text-white">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 text-center md:grid-cols-4">
          {[
            ["12k+", "Community listeners"],
            ["340", "Nonprofits equipped"],
            ["58", "Free assets released"],
            ["$86k", "Raised for causes"],
          ].map(([stat, label]) => (
            <div key={label}>
              <p className="text-4xl font-bold text-brand-lime">{stat}</p>
              <p className="mt-1 text-sm text-white/60">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
