"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

interface AnalyticsEvent {
  id: string;
  event: string;
  detail: string;
  ts: string;
}

const SAMPLE_EVENTS: Omit<AnalyticsEvent, "id" | "ts">[] = [
  { event: "page_view", detail: "/music — organic search" },
  { event: "email_signup", detail: "sourceCategory: documentary" },
  { event: "stem_download", detail: "neon_horizon_stem.wav" },
  { event: "reaction_posted", detail: "documentary @ 00:47" },
  { event: "toolkit_download", detail: "Grant Writing Toolkit" },
  { event: "donation_webhook", detail: "$25.00 — ocean fund" },
];

/**
 * Real-time event inspector. In production this streams query results
 * from BigQuery via a server route; in demo mode it simulates the feed.
 */
export default function AnalyticsInspector() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      const sample = SAMPLE_EVENTS[i % SAMPLE_EVENTS.length];
      setEvents((prev) =>
        [
          {
            ...sample,
            id: crypto.randomUUID(),
            ts: new Date().toLocaleTimeString(),
          },
          ...prev,
        ].slice(0, 8),
      );
      i++;
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-2xl border border-brand-slate/15 bg-brand-ink p-5 text-white">
      <div className="mb-4 flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-lime opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-lime" />
        </span>
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <Activity size={15} className="text-brand-lime" /> Live event stream
        </h3>
        <span className="ml-auto rounded bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/60">
          BigQuery
        </span>
      </div>
      <ul className="space-y-2 font-mono text-xs">
        {events.length === 0 && <li className="text-white/40">Waiting for events…</li>}
        {events.map((e) => (
          <li key={e.id} className="flex items-baseline gap-3 border-b border-white/5 pb-2">
            <span className="text-white/40">{e.ts}</span>
            <span className="font-semibold text-brand-lime">{e.event}</span>
            <span className="truncate text-white/70">{e.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
