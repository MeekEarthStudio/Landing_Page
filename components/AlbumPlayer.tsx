"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  MessageCircle,
  Music2,
} from "lucide-react";
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
import { mediaIdFor } from "@/lib/tracks";

export interface AlbumTrack {
  file: string;
  title: string;
}

export interface Reaction {
  id: string;
  mediaId: string;
  timeSeconds: number;
  comment: string;
  userAvatar?: string;
}

interface Props {
  tracks: readonly AlbumTrack[];
  sources?: Record<string, string>;
  artist?: string;
  albumTitle?: string;
}

/**
 * Native Bandcamp-style album player: one element with play/skip controls
 * and a selectable track list. Reactions sync live via Firestore when configured.
 */
export default function AlbumPlayer({
  tracks,
  sources = {},
  artist = "Carlton B Reid III",
  albumTitle = "Original Music",
}: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [durations, setDurations] = useState<Record<string, number>>({});
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [comment, setComment] = useState("");
  const [hasPlayed, setHasPlayed] = useState(false);
  const wantPlayRef = useRef(false);

  const track = tracks[index];
  const mediaId = mediaIdFor(track.file);
  const src = sources[track.file] || "";
  const duration = durations[track.file] ?? 180;

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

  // Load a new track source; resume play if the user was listening / just skipped.
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    setTime(0);
    el.currentTime = 0;
    if (src) {
      el.load();
      if (wantPlayRef.current) {
        void el.play().then(
          () => setPlaying(true),
          () => setPlaying(false),
        );
      } else {
        setPlaying(false);
      }
    } else {
      setPlaying(false);
    }
  }, [src, index]);

  function selectTrack(next: number, autoplay: boolean) {
    if (next < 0 || next >= tracks.length) return;
    wantPlayRef.current = autoplay;
    if (next === index) {
      const el = audioRef.current;
      if (autoplay && el && src) {
        void el.play().then(
          () => {
            setPlaying(true);
            setHasPlayed(true);
          },
          () => setPlaying(false),
        );
      }
      return;
    }
    setIndex(next);
  }

  function togglePlay() {
    const el = audioRef.current;
    if (!src || !el) {
      // No signed URL yet — still toggle UI for gated/preview state.
      setPlaying((p) => !p);
      if (!playing) setHasPlayed(true);
      return;
    }
    if (playing) {
      el.pause();
      wantPlayRef.current = false;
      setPlaying(false);
    } else {
      wantPlayRef.current = true;
      void el.play().then(
        () => {
          setPlaying(true);
          setHasPlayed(true);
        },
        () => setPlaying(false),
      );
    }
  }

  function skipPrev() {
    if (time > 3) {
      const el = audioRef.current;
      if (el) el.currentTime = 0;
      setTime(0);
      return;
    }
    selectTrack(index === 0 ? tracks.length - 1 : index - 1, playing || wantPlayRef.current);
  }

  function skipNext() {
    selectTrack(index === tracks.length - 1 ? 0 : index + 1, playing || wantPlayRef.current);
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
  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-slate/20 bg-brand-deep text-white shadow-xl">
      {src && (
        <audio
          ref={audioRef}
          src={src}
          preload="metadata"
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => {
            const d = e.currentTarget.duration;
            if (Number.isFinite(d) && d > 0) {
              setDurations((prev) => ({ ...prev, [track.file]: d }));
            }
          }}
          onPlay={() => {
            setPlaying(true);
            setHasPlayed(true);
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            const next = index === tracks.length - 1 ? 0 : index + 1;
            wantPlayRef.current = true;
            setIndex(next);
          }}
        />
      )}

      {/* Now-playing header — Bandcamp-style single surface */}
      <div className="relative overflow-hidden border-b border-white/10 p-6 sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-lime/20 via-brand-deep to-brand-blue/25"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-lime/15 blur-3xl"
        />

        <div className="relative flex items-start gap-5">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-brand-ink/60 shadow-inner ring-1 ring-white/10 sm:h-28 sm:w-28">
            <Music2 size={36} className="text-brand-lime" />
          </div>

          <div className="min-w-0 flex-1 pt-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-lime/90">
              {albumTitle}
            </p>
            <h3 className="mt-1 truncate text-xl font-bold sm:text-2xl">{track.title}</h3>
            <p className="mt-1 text-sm text-white/70">{artist}</p>
            <p className="mt-2 text-xs tabular-nums text-white/50">
              Track {index + 1} of {tracks.length}
              {!src && (
                <span className="ml-2 rounded bg-white/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-brand-lime/80">
                  unlock to stream
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Transport */}
        <div className="relative mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={skipPrev}
            aria-label="Previous track"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <SkipBack size={20} />
          </button>
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-lime text-brand-deep shadow-lg shadow-brand-lime/30 transition hover:brightness-110"
          >
            {playing ? <Pause size={28} /> : <Play size={28} className="ml-0.5" />}
          </button>
          <button
            type="button"
            onClick={skipNext}
            aria-label="Next track"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <SkipForward size={20} />
          </button>
        </div>

        {/* Scrubber */}
        <div className="relative mt-5">
          <div
            className="relative h-3 cursor-pointer overflow-hidden rounded-full bg-white/10"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              const next = pct * duration;
              setTime(next);
              if (audioRef.current) audioRef.current.currentTime = next;
            }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-lime via-brand-blue to-brand-lime bg-[length:200%_100%]"
              style={{ width: `${progress}%` }}
              animate={{ backgroundPosition: playing ? ["0% 50%", "200% 50%"] : "0% 50%" }}
              transition={{ duration: 6, repeat: playing ? Infinity : 0, ease: "linear" }}
            />
            {reactions.map((r) => (
              <div
                key={r.id}
                className="group absolute -top-1"
                style={{ left: `${(r.timeSeconds / duration) * 100}%` }}
              >
                <MessageCircle size={12} className="text-white drop-shadow" />
                <div className="pointer-events-none absolute bottom-5 left-1/2 z-10 w-40 -translate-x-1/2 rounded-lg bg-brand-ink px-3 py-2 text-xs opacity-0 shadow-lg transition group-hover:opacity-100">
                  <span className="font-semibold text-brand-lime">{fmt(r.timeSeconds)}</span>{" "}
                  {r.comment}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs tabular-nums text-white/55">
            <span>{fmt(time)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>
      </div>

      {/* Track list */}
      <ol className="max-h-[22rem] overflow-y-auto">
        {tracks.map((t, i) => {
          const active = i === index;
          const trackSrc = sources[t.file];
          return (
            <li key={t.file} className="border-t border-white/5">
              <button
                type="button"
                onClick={() => selectTrack(i, true)}
                className={`flex w-full items-center gap-3 px-5 py-3.5 text-left transition ${
                  active
                    ? "bg-brand-lime/15 text-white"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span
                  className={`w-6 shrink-0 text-center text-xs tabular-nums ${
                    active ? "font-bold text-brand-lime" : "text-white/40"
                  }`}
                >
                  {active && playing ? (
                    <span className="inline-flex gap-0.5" aria-hidden>
                      <span className="h-3 w-0.5 animate-pulse bg-brand-lime" />
                      <span className="h-3 w-0.5 animate-pulse bg-brand-lime [animation-delay:120ms]" />
                      <span className="h-3 w-0.5 animate-pulse bg-brand-lime [animation-delay:240ms]" />
                    </span>
                  ) : (
                    i + 1
                  )}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium">{t.title}</span>
                <span className="shrink-0 text-xs tabular-nums text-white/40">
                  {durations[t.file] ? fmt(durations[t.file]) : trackSrc ? "—" : "···"}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Reactions for the active track */}
      <div className="border-t border-white/10 p-5">
        <form onSubmit={postReaction} className="flex gap-2">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={`React to “${track.title}” at ${fmt(time)}…`}
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
    </div>
  );
}
