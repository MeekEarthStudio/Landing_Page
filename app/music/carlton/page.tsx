"use client";

import { useEffect, useState } from "react";
import { Lock, Unlock } from "lucide-react";
import AudioPlayerGradient from "@/components/AudioPlayerGradient";
import EmailGateModal, { getStoredAccessToken } from "@/components/EmailGateModal";
import { TRACKS, mediaIdFor } from "@/lib/tracks";

export default function CarltonMusicPage() {
  const [token, setToken] = useState<string | null>(null);
  const [gateOpen, setGateOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});
  const [streamingDown, setStreamingDown] = useState(false);

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
        const ok = entries.filter(([, url]) => url);
        setSignedUrls(Object.fromEntries(ok));
        setStreamingDown(ok.length === 0);
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
          Carlton B Reid III
        </p>
        <h1 className="text-4xl font-bold text-brand-ink">Original Music</h1>
        <p className="mt-3 max-w-xl text-brand-slate">
          Eight original songs, streaming straight from the studio vault. Drop your email
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

      {mounted && unlocked && streamingDown && (
        <div className="mb-8 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          <strong>Streaming is warming up.</strong> Your access is confirmed, but the audio
          server isn&apos;t reachable right now — playback will work once the cloud storage
          connection is live. Check back soon.
        </div>
      )}

      <div className="space-y-6">
        {TRACKS.map((track) => {
          const gated = !unlocked;
          return (
            <div key={track.file} className="relative">
              <div className={gated ? "pointer-events-none select-none blur-sm" : ""}>
                <AudioPlayerGradient
                  mediaId={mediaIdFor(track.file)}
                  title={track.title}
                  artist="Carlton B Reid III"
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
        headline="Unlock all 8 original tracks"
      />
    </div>
  );
}
