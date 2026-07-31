"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Film, Send } from "lucide-react";
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

interface Reaction {
  id: string;
  timeSeconds: number;
  comment: string;
}

interface Props {
  mediaId: string;
  title: string;
  src?: string;
  poster?: string;
}

/** Documentary video player with a time-synced reaction sidebar. */
export default function VideoPlayerDocumentary({ mediaId, title, src, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
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
    const el = videoRef.current;
    if (el && src) {
      if (playing) el.pause();
      else void el.play();
    }
    if (!playing) setHasPlayed(true);
    setPlaying(!playing);
  }

  // Simulated playhead while no video source is wired up.
  useEffect(() => {
    if (!playing || src) return;
    const id = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [playing, src]);

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
        [...r, { ...reaction, id: crypto.randomUUID() }].sort(
          (a, b) => a.timeSeconds - b.timeSeconds,
        ),
      );
    }
  }

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const active = reactions.filter((r) => Math.abs(r.timeSeconds - time) <= 6);

  return (
    <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
      {/* Player */}
      <div className="relative overflow-hidden rounded-2xl bg-brand-ink shadow-xl">
        {src ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            className="aspect-video w-full"
            onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            onEnded={() => setPlaying(false)}
          />
        ) : (
          <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-brand-deep via-brand-ink to-brand-slate">
            <Film size={56} className="text-brand-lime/40" />
            <p className="font-serif text-xl tracking-[0.25em] text-brand-lime uppercase">
              Stay Tuned
            </p>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-brand-ink/90 to-transparent p-4">
          <button
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-lime text-brand-deep transition hover:brightness-110"
          >
            {playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </button>
          <div>
            <p className="text-sm font-semibold text-white">{title}</p>
            <p className="text-xs text-brand-lime">{fmt(time)}</p>
          </div>
        </div>
      </div>

      {/* Time-synced reaction sidebar */}
      <div className="flex flex-col rounded-2xl border border-brand-slate/15 bg-white p-4 shadow-sm">
        <h4 className="mb-3 text-sm font-semibold text-brand-ink">Live reactions</h4>
        <div className="flex-1 space-y-2 overflow-y-auto">
          {reactions.map((r) => {
            const isActive = active.some((a) => a.id === r.id);
            return (
              <motion.div
                key={r.id}
                animate={{ scale: isActive ? 1.02 : 1 }}
                className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "border-brand-lime bg-brand-lime/10 text-brand-ink"
                    : "border-slate-100 bg-slate-50 text-brand-slate"
                }`}
              >
                <span className="mr-2 font-mono text-xs font-semibold text-brand-blue">
                  {fmt(r.timeSeconds)}
                </span>
                {r.comment}
              </motion.div>
            );
          })}
        </div>
        <form onSubmit={postReaction} className="mt-3 flex gap-2">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={`Comment at ${fmt(time)}…`}
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-lime"
          />
          <button
            type="submit"
            aria-label="Post reaction"
            className="rounded-lg bg-brand-blue px-3 text-white transition hover:brightness-110"
          >
            <Send size={16} />
          </button>
        </form>
      </div>

      <div className="lg:col-span-2">
        <TipButton show={hasPlayed} message="Enjoyed the film? Leave a tip" />
      </div>
    </div>
  );
}
