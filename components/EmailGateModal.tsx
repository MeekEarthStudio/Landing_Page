"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, X, Loader2, CheckCircle2 } from "lucide-react";

export type SourceCategory = "music" | "documentary" | "nonprofit" | "blog";

const TOKEN_KEY = "meek-earth-access-token";

export function getStoredAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

interface Props {
  open: boolean;
  onClose: () => void;
  onUnlocked: (token: string) => void;
  sourceCategory: SourceCategory;
  headline?: string;
}

/** Lead-capture barrier shown before media access. */
export default function EmailGateModal({ open, onClose, onUnlocked, sourceCategory, headline }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, sourceCategory }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      window.localStorage.setItem(TOKEN_KEY, data.token);
      setStatus("done");
      setTimeout(() => onUnlocked(data.token), 900);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-ink/60 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl border border-brand-lime/30"
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-brand-slate hover:text-brand-ink"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-lime/15 text-brand-lime">
              {status === "done" ? <CheckCircle2 size={24} /> : <Lock size={22} />}
            </div>

            <h2 className="text-2xl font-bold text-brand-ink">
              {headline ?? "Unlock exclusive access"}
            </h2>
            <p className="mt-2 text-sm text-brand-slate">
              Drop your email to unlock the original tracks and get first word when the
              documentary and new posts drop. No spam — ever.
            </p>

            {status === "done" ? (
              <p className="mt-6 flex items-center gap-2 font-medium text-brand-lime">
                <CheckCircle2 size={18} /> You&apos;re in — unlocking now…
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-slate" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-9 pr-3 text-sm text-brand-ink outline-none focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/30"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-lime py-3 font-semibold text-brand-deep transition hover:brightness-110 disabled:opacity-60"
                >
                  {status === "sending" && <Loader2 size={16} className="animate-spin" />}
                  Get access
                </button>
                {status === "error" && <p className="text-sm text-red-500">{message}</p>}
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
