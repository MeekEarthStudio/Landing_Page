"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Bell } from "lucide-react";
import EmailGateModal from "@/components/EmailGateModal";
import TipButton from "@/components/TipButton";

// Posts go live here as they're written — empty slots show "Stay Tuned".
const UPCOMING_SLOTS = [1, 2, 3];

export default function BlogPage() {
  const [gateOpen, setGateOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <header className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
          The blog
        </p>
        <h1 className="text-4xl font-bold text-brand-ink">Stories from the Studio</h1>
        <p className="mt-3 max-w-xl text-brand-slate">
          Writing on the music, the faith behind it, and the road to the documentary.
          First posts are on the way.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {UPCOMING_SLOTS.map((slot, i) => (
          <motion.div
            key={slot}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-brand-slate/25 bg-slate-50"
          >
            <BookOpen size={26} className="text-brand-slate/40" />
            <p className="font-serif text-sm tracking-[0.25em] text-brand-slate uppercase">
              Stay Tuned
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-brand-deep p-8 text-center text-white">
        <h2 className="text-xl font-bold">Be first to read</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-white/70">
          Drop your email and new posts land in your inbox the moment they publish.
        </p>
        {subscribed ? (
          <p className="mt-5 font-semibold text-brand-lime">You&apos;re on the list. Stay tuned!</p>
        ) : (
          <button
            onClick={() => setGateOpen(true)}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-lime px-6 py-3 font-semibold text-brand-deep transition hover:brightness-110"
          >
            <Bell size={16} /> Notify me
          </button>
        )}
      </div>

      <TipButton message="Support the studio — leave a tip" />

      <EmailGateModal
        open={gateOpen}
        onClose={() => setGateOpen(false)}
        onUnlocked={() => {
          setSubscribed(true);
          setGateOpen(false);
        }}
        sourceCategory="blog"
        headline="Get new posts first"
      />
    </div>
  );
}
