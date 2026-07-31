"use client";

import { useEffect, useState } from "react";
import { Play, CalendarDays, MessageCircle, BookOpen, Music } from "lucide-react";
import { TRACKS, mediaIdFor } from "@/lib/tracks";

interface StatItem {
  id: string;
  plays: number;
  playsThisMonth: number;
  reactions: number;
  reads: number;
  readsThisMonth: number;
}

const monthLabel = (monthKey: string) => {
  const [y, m] = monthKey.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, 1).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
};

export default function StatsDashboard() {
  const [items, setItems] = useState<StatItem[]>([]);
  const [available, setAvailable] = useState(true);
  const [month, setMonth] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => {
        setItems(d.items ?? []);
        setAvailable(Boolean(d.available));
        setMonth(d.month ?? "");
      })
      .catch(() => setAvailable(false))
      .finally(() => setLoading(false));
  }, []);

  const byId = new Map(items.map((i) => [i.id, i]));
  const trackRows = TRACKS.map((t) => {
    const s = byId.get(mediaIdFor(t.file));
    return {
      title: t.title,
      plays: s?.plays ?? 0,
      playsThisMonth: s?.playsThisMonth ?? 0,
      reactions: s?.reactions ?? 0,
    };
  });

  const trackIds = new Set(TRACKS.map((t) => mediaIdFor(t.file)));
  const blogRows = items.filter((i) => !trackIds.has(i.id) && i.reads > 0);

  const totals = {
    plays: trackRows.reduce((n, r) => n + r.plays, 0),
    playsThisMonth: trackRows.reduce((n, r) => n + r.playsThisMonth, 0),
    reactions: items.reduce((n, r) => n + r.reactions, 0),
    reads: blogRows.reduce((n, r) => n + r.reads, 0),
  };

  const CARDS = [
    { icon: Play, label: "Total plays", value: totals.plays },
    { icon: CalendarDays, label: `Plays in ${month ? monthLabel(month) : "this month"}`, value: totals.playsThisMonth },
    { icon: MessageCircle, label: "Reactions posted", value: totals.reactions },
    { icon: BookOpen, label: "Blog reads", value: totals.reads },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
          Dashboard
        </p>
        <h1 className="text-4xl font-bold text-brand-ink">Site Stats</h1>
        <p className="mt-3 max-w-xl text-brand-slate">
          Plays, reactions, and reads across meekearthmusic.com.
        </p>
      </header>

      {!loading && !available && (
        <div className="mb-8 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          <strong>Tracking isn&apos;t connected yet.</strong> Counts start recording once the
          stats database is enabled for the project — until then everything shows zero.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((k) => (
          <div key={k.label} className="rounded-xl border border-brand-slate/15 bg-white p-5 shadow-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-deep text-brand-lime">
              <k.icon size={17} />
            </span>
            <p className="mt-4 text-2xl font-bold text-brand-ink">
              {loading ? "—" : k.value.toLocaleString()}
            </p>
            <p className="text-sm text-brand-slate">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Per-song table */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-brand-slate/15 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-4">
          <Music size={16} className="text-brand-lime" />
          <h3 className="text-sm font-semibold text-brand-ink">Songs</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-brand-slate">
              <th className="px-6 py-3 font-medium">Track</th>
              <th className="px-6 py-3 text-right font-medium">Total plays</th>
              <th className="px-6 py-3 text-right font-medium">
                {month ? monthLabel(month) : "This month"}
              </th>
              <th className="px-6 py-3 text-right font-medium">Reactions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {trackRows.map((r) => (
              <tr key={r.title}>
                <td className="px-6 py-3 font-medium text-brand-ink">{r.title}</td>
                <td className="px-6 py-3 text-right tabular-nums text-brand-slate">
                  {loading ? "—" : r.plays.toLocaleString()}
                </td>
                <td className="px-6 py-3 text-right tabular-nums text-brand-slate">
                  {loading ? "—" : r.playsThisMonth.toLocaleString()}
                </td>
                <td className="px-6 py-3 text-right tabular-nums text-brand-slate">
                  {loading ? "—" : r.reactions.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Blog posts */}
      <div className="mt-6 rounded-2xl border border-brand-slate/15 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <BookOpen size={16} className="text-brand-lime" />
          <h3 className="text-sm font-semibold text-brand-ink">Blog posts</h3>
        </div>
        {blogRows.length ? (
          <ul className="divide-y divide-slate-100 text-sm">
            {blogRows.map((p) => (
              <li key={p.id} className="flex items-center justify-between py-3">
                <span className="font-medium text-brand-ink">{p.id}</span>
                <span className="tabular-nums text-brand-slate">
                  {p.reads.toLocaleString()} reads · {p.readsThisMonth.toLocaleString()} this month
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-4 text-center font-serif text-sm tracking-[0.25em] text-brand-slate uppercase">
            Stay Tuned — stats appear with the first post
          </p>
        )}
      </div>
    </div>
  );
}
