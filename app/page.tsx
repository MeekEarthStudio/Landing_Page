"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Music, Film, BookOpen, ArrowRight, Sparkles, Ticket, HeartHandshake } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/animations";

const PILLARS = [
  {
    href: "/music",
    icon: Music,
    title: "Original Music",
    body: "Original songs from Carlton B Reid III and Grace J Reid — choose your artist and press play.",
    cta: "Choose your artist",
  },
  {
    href: "/documentary",
    icon: Film,
    title: "The Documentary",
    body: "Episode 1 is streaming now — press play, and stay tuned for what comes next.",
    cta: "Watch now",
  },
  {
    href: "/blog",
    icon: BookOpen,
    title: "The Blog",
    body: "Stories from the studio — the music, the faith behind it, and the road ahead.",
    cta: "Visit the blog",
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
            A next-generation home for original music, interactive documentary film, and
            stories from the studio.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/music"
              className="inline-flex items-center gap-2 rounded-full bg-brand-lime px-7 py-3.5 font-semibold text-brand-deep shadow-lg shadow-brand-lime/25 transition hover:brightness-110"
            >
              Listen to original tracks <ArrowRight size={17} />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand-blue/25 transition hover:brightness-110"
            >
              Read the blog
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

      {/* Good Samaritan */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-brand-slate/15 bg-gradient-to-br from-white via-slate-50 to-brand-lime/10 p-10 sm:p-14"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-blue/10 blur-3xl"
          />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-deep text-brand-lime">
                <HeartHandshake size={22} />
              </span>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
                Live product
              </p>
              <h2 className="text-3xl font-bold text-brand-ink sm:text-4xl">
                Good{" "}
                <span className="font-serif italic bg-gradient-to-r from-brand-lime to-brand-blue bg-clip-text text-transparent">
                  Samaritan
                </span>
              </h2>
              <p className="mt-4 max-w-xl text-brand-slate">
                Christian stewardship logging for giving, service, and gratitude — with AI
                pastoral chat, video reflections, document exports, and safety guardrails from
                PII redaction to server-side quotas.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/good-samaritan"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-lime px-7 py-3.5 font-semibold text-brand-deep shadow-lg shadow-brand-lime/25 transition hover:brightness-110"
                >
                  See capabilities & safety <ArrowRight size={17} />
                </Link>
                <a
                  href="https://good-samaritan-504806.web.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue px-7 py-3.5 font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white"
                >
                  Open the app
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Concert waitlist teaser */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-brand-deep p-10 text-center text-white sm:p-14"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-lime/20 via-brand-blue/15 to-brand-lime/20 blur-3xl"
          />
          <span className="relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-brand-lime">
            <Ticket size={22} />
          </span>
          <h2 className="relative text-3xl font-bold sm:text-4xl">
            Concerts, reimagined —{" "}
            <span className="font-serif italic text-brand-lime">2027</span>
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/70">
            Transparent, intimate concerts streamed from the comfort of your own home. No
            hidden fees, no middlemen — you're back in control.
          </p>
          <Link
            href="/about"
            className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-brand-lime px-8 py-4 font-semibold text-brand-deep shadow-lg shadow-brand-lime/25 transition hover:brightness-110"
          >
            Join the waitlist <ArrowRight size={17} />
          </Link>
        </motion.div>
      </section>

      {/* What's live strip */}
      <section className="bg-brand-deep py-16 text-white">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 text-center sm:grid-cols-3">
          {[
            ["8", "Original tracks streaming now"],
            ["Ep. 1", "Documentary streaming now"],
            ["Live", "Good Samaritan stewardship app"],
          ].map(([stat, label]) => (
            <div key={label}>
              <p className="font-serif text-3xl font-bold text-brand-lime">{stat}</p>
              <p className="mt-1 text-sm text-white/60">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
