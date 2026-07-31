"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Ticket, Hammer, HeartHandshake, Mail, Sparkles } from "lucide-react";
import EmailGateModal from "@/components/EmailGateModal";
import TipButton from "@/components/TipButton";
import WaterfallDivider from "@/components/WaterfallDivider";

const sectionReveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [joined, setJoined] = useState(false);

  return (
    <div className="overflow-hidden">
      <header className="mx-auto max-w-3xl px-4 pt-16 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
          About the studio
        </p>
        <h1 className="text-4xl font-bold text-brand-ink sm:text-5xl">
          Meek Earth{" "}
          <span className="font-serif italic bg-gradient-to-r from-brand-lime to-brand-blue bg-clip-text text-transparent">
            STUDIO
          </span>
        </h1>
      </header>

      <WaterfallDivider />

      {/* 1 — Concerts, back in your control */}
      <motion.section
        {...sectionReveal}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl px-4 text-center"
      >
        <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-deep text-brand-lime">
          <Ticket size={26} />
        </span>
        <h2 className="text-3xl font-bold text-brand-ink">
          Returning agency to the concert goer — <span className="text-brand-blue">2027</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-slate">
          Are you tired of Ticketmaster prices and hidden fees? Are you tired of not knowing
          exactly where your donation goes when you donate? Meek Earth STUDIO solves all these
          problems through transparent, intimate concerts, streamed from the comfort of your
          own home. Meek Earth STUDIO is affordable to premium — and if you&apos;re ready to be
          in control of your concert experience again:
        </p>
        {joined ? (
          <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-lime/15 px-6 py-3 font-semibold text-brand-deep">
            <Sparkles size={16} className="text-brand-lime" /> You&apos;re on the waitlist. See
            you in 2027.
          </p>
        ) : (
          <button
            onClick={() => setWaitlistOpen(true)}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-lime px-8 py-4 font-semibold text-brand-deep shadow-lg shadow-brand-lime/25 transition hover:brightness-110"
          >
            <Ticket size={18} /> Join the waitlist
          </button>
        )}
      </motion.section>

      <WaterfallDivider />

      {/* 2 — Building the studio */}
      <motion.section
        {...sectionReveal}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl px-4 text-center"
      >
        <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-deep text-brand-lime">
          <Hammer size={26} />
        </span>
        <h2 className="text-3xl font-bold text-brand-ink">Tips build the studio</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-slate">
          Every tip goes toward raising the studio itself. Carlton is bootstrapping Meek Earth
          Studio PBC Inc. from the ground up — no investors, no labels — and your support puts
          real bricks in the foundation.
        </p>
        <TipButton message="Help build Meek Earth Studio — leave a tip" />
      </motion.section>

      <WaterfallDivider />

      {/* 3 — Music for the Meek */}
      <motion.section
        {...sectionReveal}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl px-4 pb-24 text-center"
      >
        <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-deep text-brand-lime">
          <HeartHandshake size={26} />
        </span>
        <h2 className="text-3xl font-bold text-brand-ink">Music for the Meek</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-slate">
          Meek Earth STUDIO is returning the arts to underserved communities, fairly paying
          artists, and funding nonprofits.
        </p>
        <a
          href="mailto:cbreid3@meekearthstudio.net"
          className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-brand-blue px-7 py-3.5 font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white"
        >
          <Mail size={17} /> Business inquiries: cbreid3@meekearthstudio.net
        </a>
      </motion.section>

      <EmailGateModal
        open={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        onUnlocked={() => {
          setJoined(true);
          setWaitlistOpen(false);
        }}
        sourceCategory="waitlist"
        headline="Join the 2027 concert waitlist"
        description="Be first in line when transparent, intimate streamed concerts launch. No spam — ever."
      />
    </div>
  );
}
