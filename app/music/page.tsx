"use client";

import { useEffect, useState } from "react";
import { Lock, Unlock } from "lucide-react";
import AudioPlayerGradient from "@/components/AudioPlayerGradient";
import EmailGateModal, { getStoredAccessToken } from "@/components/EmailGateModal";

const STEMS = [
  { mediaId: "neon_horizon_stem", title: "Neon Horizon (Stem Pack)", duration: 148 },
  { mediaId: "tidal_bloom_stem", title: "Tidal Bloom (Unreleased)", duration: 122 },
  { mediaId: "canopy_pulse_stem", title: "Canopy Pulse (Live Bounce)", duration: 176 },
];

export default function MusicPage() {
  const [token, setToken] = useState<string | null>(null);
  const [gateOpen, setGateOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setToken(getStoredAccessToken());
    setMounted(true);
  }, []);

  const unlocked = Boolean(token);

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <header className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
          Stem locker
        </p>
        <h1 className="text-4xl font-bold text-brand-ink">Unreleased Music</h1>
        <p className="mt-3 max-w-xl text-brand-slate">
          Exclusive stems and unreleased bounces. Hover the waveform pins to see what the
          community is saying — or drop your own timestamped reaction.
        </p>
      </header>

      {mounted && !unlocked && (
        <button
          onClick={() => setGateOpen(true)}
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-brand-lime px-6 py-3 font-semibold text-brand-deep shadow-lg shadow-brand-lime/25 transition hover:brightness-110"
        >
          <Lock size={16} /> Unlock the full locker
        </button>
      )}
      {mounted && unlocked && (
        <p className="mb-8 inline-flex items-center gap-2 rounded-full bg-brand-lime/15 px-5 py-2.5 text-sm font-semibold text-brand-deep">
          <Unlock size={15} className="text-brand-lime" /> Access unlocked — welcome back.
        </p>
      )}

      <div className="space-y-6">
        {STEMS.map((stem, i) => {
          const gated = !unlocked && i > 0;
          return (
            <div key={stem.mediaId} className="relative">
              <div className={gated ? "pointer-events-none select-none blur-sm" : ""}>
                <AudioPlayerGradient
                  mediaId={stem.mediaId}
                  title={stem.title}
                  durationFallback={stem.duration}
                />
              </div>
              {gated && (
                <button
                  onClick={() => setGateOpen(true)}
                  className="absolute inset-0 flex items-center justify-center rounded-2xl bg-brand-ink/40"
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-ink shadow-lg">
                    <Lock size={14} /> Unlock with email
                  </span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      <EmailGateModal
        open={gateOpen}
        onClose={() => setGateOpen(false)}
        onUnlocked={(t) => {
          setToken(t);
          setGateOpen(false);
        }}
        sourceCategory="music"
        headline="Unlock the stem locker"
      />
    </div>
  );
}
