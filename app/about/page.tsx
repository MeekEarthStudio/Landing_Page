"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Ticket, HeartHandshake, Mail, Sparkles, UserPlus, Bell, Mic2 } from "lucide-react";
import EmailGateModal from "@/components/EmailGateModal";
import WaterfallDivider from "@/components/WaterfallDivider";
import CopyEmailButton, { CONTACT_EMAIL } from "@/components/CopyEmailButton";

const APPLY_URL = "https://meekearth.net";

const sectionReveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  const [updatesOpen, setUpdatesOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

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

      <motion.section
        id="concert"
        {...sectionReveal}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl scroll-mt-24 px-4 text-center"
      >
        <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-deep text-brand-lime">
          <Ticket size={26} />
        </span>
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
          First acoustic concert
        </p>
        <h2 className="text-3xl font-bold text-brand-ink">
          May 2027 — <span className="text-brand-blue">DMV</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-slate">
          Meek Earth STUDIO produces and sells intimate, high-fidelity acoustic concerts. The
          first show is livestreamed from a venue TBD in Virginia, DC, or Maryland, in
          collaboration with one small nonprofit. This is not a benefit show, a fundraiser, or
          a battle of the bands. The nonprofit does not pay the studio, and the studio does
          not raise money for the nonprofit.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-brand-slate">
          Your ticket pays the artists and the production. Community tickets are $0
          (distributed by the partner). Access is $18. General admission is $35. Each of the
          two performing artists receives one-fifth of net ticket revenue, paid within fourteen
          days, plus broadcast-quality recordings of the set. There is no tip jar.
        </p>
        {subscribed ? (
          <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-lime/15 px-6 py-3 font-semibold text-brand-deep">
            <Sparkles size={16} className="text-brand-lime" /> You&apos;re signed up for concert
            updates. We&apos;ll write when seats open.
          </p>
        ) : (
          <button
            onClick={() => setUpdatesOpen(true)}
            className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-brand-blue px-8 py-4 font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white"
          >
            <Bell size={18} /> Get concert updates
          </button>
        )}
        <p className="mx-auto mt-4 max-w-xl text-sm text-brand-slate">
          A campaign to back the concert and reserve a seat opens October 1, 2026.
        </p>
      </motion.section>

      <WaterfallDivider />

      <motion.section
        id="open-call"
        {...sectionReveal}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl px-4 text-center"
      >
        <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-deep text-brand-lime">
          <Mic2 size={26} />
        </span>
        <h2 className="text-3xl font-bold text-brand-ink">Open call for artists</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-slate">
          Your music. Their mission. DMV solo, duo, and band acts to headline the first
          acoustic concert — and use the set to spotlight a local nonprofit serving neighbors
          in need. Real production, real exposure, a real share of real ticket revenue.
        </p>
        <dl className="mx-auto mt-8 grid max-w-xl gap-4 text-left sm:grid-cols-2">
          {[
            ["Who", "Solo, duo, or full band. Under 100,000 monthly listeners. Based in VA, DC, or MD."],
            ["What you get", "Broadcast-quality recordings of your set, and one-fifth of net ticket revenue paid within 14 days."],
            ["When / where", "May 2027. DMV — venue TBD."],
            ["Apply", "Free. Rolling deadline."],
          ].map(([label, body]) => (
            <div key={label} className="rounded-2xl border border-brand-slate/15 bg-white p-4">
              <dt className="text-xs font-semibold uppercase tracking-widest text-brand-blue">
                {label}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-brand-slate">{body}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-lime px-8 py-4 font-semibold text-brand-deep shadow-lg shadow-brand-lime/25 transition hover:brightness-110"
          >
            Apply now
          </a>
          <CopyEmailButton className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue px-7 py-3.5 font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white">
            <Mail size={17} /> {CONTACT_EMAIL}
          </CopyEmailButton>
        </div>
      </motion.section>

      <WaterfallDivider />

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
          Meek Earth STUDIO is returning the arts to underserved communities, paying small
          artists a written share of the gate, and collaborating with small nonprofits on
          media and audience attention — not raising charitable funds.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/api/contact"
            download="meek-earth-studio.vcf"
            className="inline-flex items-center gap-2 rounded-full bg-brand-lime px-7 py-3.5 font-semibold text-brand-deep shadow-lg shadow-brand-lime/25 transition hover:brightness-110"
          >
            <UserPlus size={18} /> Contact Us — save to your phone
          </a>
          <CopyEmailButton className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue px-7 py-3.5 font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white">
            <Mail size={17} /> Business inquiries: {CONTACT_EMAIL}
          </CopyEmailButton>
        </div>
      </motion.section>

      <EmailGateModal
        open={updatesOpen}
        onClose={() => setUpdatesOpen(false)}
        onUnlocked={() => {
          setSubscribed(true);
          setUpdatesOpen(false);
        }}
        sourceCategory="waitlist"
        headline="Get concert updates"
        description="A campaign to back the concert and reserve a seat opens October 1, 2026. Leave your email and we’ll write when it does. No spam."
      />
    </div>
  );
}
