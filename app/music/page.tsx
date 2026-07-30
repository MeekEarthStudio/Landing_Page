"use client";

import { useEffect, useState } from "react";
import { Lock, Unlock } from "lucide-react";
import AudioPlayerGradient from "@/components/AudioPlayerGradient";
import EmailGateModal, { getStoredAccessToken } from "@/components/EmailGateModal";

// Real tracks in the gs://meek-earth-assets bucket.
const TRACKS = [
  { file: "And_Suddenly_It_Hurts.wav", title: "And Suddenly It Hurts" },
  { file: "Faith_has_power.wav", title: "Faith Has Power" },
  { file: "Free_from_Myself.wav", title: "Free from Myself" },
  { file: "Freedom.wav", title: "Freedom" },
  { file: "God_Designed.wav", title: "God Designed" },
  { file: "I_Cry_to_jesus.wav", title: "I Cry to Jesus" },
  { file: "I_Don_t_Know_Why.wav", title: "I Don't Know Why" },
  { file: "She_said_she_loves_me.wav", title: "She Said She Loves Me" },
];

const mediaIdFor = (file: string) => file.replace(/\.wav$/i, "").toLowerCase();

export default function MusicPage() {
  const [token, setToken] = useState<string | null>(null);
  const [gateOpen, setGateOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    setToken(getStoredAccessToken());
    setMounted(true);
  }, []);

  // Once unlocked, mint short-lived signed URLs for each track.
  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    (async () => {
      const entries = await Promise.all(
        TRACKS.map(async (t) => {
          try {
            const res = await fetch(
              `/api/stems?token=${encodeURIComponent(token)}&file=${encodeURIComponent(t.file)}`,
            );
            if (!res.ok) return [t.file, ""] as const;
            const data = await res.json();
            return [t.file, data.url as string] as const;
          } catch {
            return [t.file, ""] as const;
          }
        }),
      );
      if (!cancelled) {
        setSignedUrls(Object.fromEntries(entries.filter(([, url]) => url)));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const unlocked = Boolean(token);

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <header className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
          Unreleased tracks
        </p>
        <h1 className="text-4xl font-bold text-brand-ink">Unreleased Music</h1>
        <p className="mt-3 max-w-xl text-brand-slate">
          Eight unreleased songs, streaming straight from the studio vault. Drop your email
          once to unlock them all — then leave timestamped reactions as you listen.
        </p>
      </header>

      {mounted && !unlocked && (
        <button
          onClick={() => setGateOpen(true)}
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-brand-lime px-6 py-3 font-semibold text-brand-deep shadow-lg shadow-brand-lime/25 transition hover:brightness-110"
        >
          <Lock size={16} /> Unlock all 8 tracks
        </button>
      )}
      {mounted && unlocked && (
        <p className="mb-8 inline-flex items-center gap-2 rounded-full bg-brand-lime/15 px-5 py-2.5 text-sm font-semibold text-brand-deep">
          <Unlock size={15} className="text-brand-lime" /> Access unlocked — welcome back.
        </p>
      )}

      <div className="space-y-6">
        {TRACKS.map((track, i) => {
          const gated = !unlocked && i > 0;
          return (
            <div key={track.file} className="relative">
              <div className={gated ? "pointer-events-none select-none blur-sm" : ""}>
                <AudioPlayerGradient
                  mediaId={mediaIdFor(track.file)}
                  title={track.title}
                  src={signedUrls[track.file]}
                  durationFallback={180}
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
        headline="Unlock all 8 unreleased tracks"
      />
    </div>
  );
}
