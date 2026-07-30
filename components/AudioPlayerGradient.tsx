"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, MessageCircle } from "lucide-react";
import TipButton from "@/components/TipButton";
import { db, PUBLIC_DATA_PATH } from "@/lib/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

export interface Reaction {
  id: string;
  mediaId: string;
  timeSeconds: number;
  comment: string;
  userAvatar?: string;
}

interface Props {
  mediaId: string;
  title: string;
  artist?: string;
  src?: string;
  durationFallback?: number;
}

/**
 * Moving-gradient music player with SoundCloud-style timestamp reactions.
 * Reactions sync live via Firestore when configured.
 */
export default function AudioPlayerGradient({
  mediaId,
  title,
  artist = "Meek Earth",
  src,
  durationFallback = 120,
}: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(durationFallback);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [comment, setComment] = useState("");
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    if (!db) return;
    const q = query(
      collection(db, `${PUBLIC_DATA_PATH}/media_reactions`),
      where("mediaId", "==", mediaId),
    );
    return onSnapshot(q, (snap) => {
      const live = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Reaction);
      setReactions(live.sort((a, b) => a.timeSeconds - b.timeSeconds));
    });
  }, [mediaId]);

  function togglePlay() {
    const el = audioRef.current;
    if (el && src) {
      if (playing) el.pause();
      else void el.play();
    }
    if (!playing) setHasPlayed(true);
    setPlaying(!playing);
  }

  // Simulated playhead when no real audio source is wired up yet.
  useEffect(() => {
    if (!playing || src) return;
    const id = setInterval(() => setTime((t) => (t + 0.25 > duration ? 0 : t + 0.25)), 250);
    return () => clearInterval(id);
  }, [playing, src, duration]);

  async function postReaction(e: React.FormEvent) {
    e.preventDefault();
    if (!comment.trim()) return;
    const reaction = {
      mediaId,
      timeSeconds: Math.floor(time),
      comment: comment.trim(),
      createdAt: serverTimestamp(),
    };
    setComment("");
    if (db) {
      await addDoc(collection(db, `${PUBLIC_DATA_PATH}/media_reactions`), reaction);
    } else {
      setReactions((r) =>
        [...r, { ...reaction, id: crypto.randomUUID() } as unknown as Reaction].sort(
          (a, b) => a.timeSeconds - b.timeSeconds,
        ),
      );
    }
  }

  const progress = duration ? (time / duration) * 100 : 0;
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <div className="rounded-2xl border border-brand-slate/20 bg-brand-deep p-6 text-white shadow-xl">
      {src && (
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onEnded={() => setPlaying(false)}
        />
      )}

      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-lime text-brand-deep transition hover:brightness-110"
        >
          {playing ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
        </button>
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{title}</h3>
          <p className="text-sm text-brand-lime/80">{artist}</p>
        </div>
        <span className="ml-auto text-xs tabular-nums text-white/60">
          {fmt(time)} / {fmt(duration)}
        </span>
      </div>

      {/* Moving gradient waveform bar */}
      <div
        className="relative mt-5 h-16 cursor-pointer overflow-hidden rounded-lg"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pct = (e.clientX - rect.left) / rect.width;
          const next = pct * duration;
          setTime(next);
          if (audioRef.current) audioRef.current.currentTime = next;
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-brand-lime via-brand-blue to-brand-lime bg-[length:200%_100%]"
          animate={{ backgroundPosition: playing ? ["0% 50%", "200% 50%"] : "0% 50%" }}
          transition={{ duration: 6, repeat: playing ? Infinity : 0, ease: "linear" }}
        />
        <div
          className="absolute inset-y-0 right-0 bg-brand-deep/70 backdrop-saturate-50 transition-[width]"
          style={{ width: `${100 - progress}%` }}
        />
        {/* Timestamp reaction pins */}
        {reactions.map((r) => (
          <div
            key={r.id}
            className="group absolute bottom-1"
            style={{ left: `${(r.timeSeconds / duration) * 100}%` }}
          >
            <MessageCircle size={14} className="text-white drop-shadow" />
            <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 w-40 -translate-x-1/2 rounded-lg bg-brand-ink px-3 py-2 text-xs opacity-0 shadow-lg transition group-hover:opacity-100">
              <span className="font-semibold text-brand-lime">{fmt(r.timeSeconds)}</span>{" "}
              {r.comment}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={postReaction} className="mt-4 flex gap-2">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={`React at ${fmt(time)}…`}
          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-brand-lime"
        />
        <button
          type="submit"
          className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium transition hover:brightness-110"
        >
          Post
        </button>
      </form>

      <TipButton show={hasPlayed} message="Enjoying the music? Leave a tip" />
    </div>
  );
}
