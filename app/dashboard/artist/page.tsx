"use client";

import { TrendingUp, Users, Mail, Download } from "lucide-react";
import AnalyticsInspector from "@/components/AnalyticsInspector";

// Demo data — in production these come from BigQuery via a server route
// (lib/bigquery.ts runAnalyticsQuery) and the GA4 Data API.
const KPIS = [
  { icon: Users, label: "Fans (30d)", value: "12,481", delta: "+18%" },
  { icon: Mail, label: "Email signups", value: "3,204", delta: "+31%" },
  { icon: Download, label: "Stem downloads", value: "1,879", delta: "+12%" },
  { icon: TrendingUp, label: "Signup conversion", value: "25.7%", delta: "+4.2pt" },
];

const GROWTH = [42, 48, 45, 61, 58, 72, 69, 84, 91, 88, 104, 121];

export default function ArtistDashboard() {
  const max = Math.max(...GROWTH);
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
          Artist dashboard
        </p>
        <h1 className="text-4xl font-bold text-brand-ink">Fan Growth & Conversion</h1>
        <p className="mt-3 max-w-xl text-brand-slate">
          Engagement metrics warehoused in BigQuery, refreshed from GA4 and Firestore events.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((k) => (
          <div key={k.label} className="rounded-xl border border-brand-slate/15 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-deep text-brand-lime">
                <k.icon size={17} />
              </span>
              <span className="rounded-full bg-brand-lime/15 px-2 py-0.5 text-xs font-semibold text-brand-deep">
                {k.delta}
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-brand-ink">{k.value}</p>
            <p className="text-sm text-brand-slate">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[3fr_2fr]">
        {/* Growth chart */}
        <div className="rounded-2xl border border-brand-slate/15 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-sm font-semibold text-brand-ink">
            Monthly fan growth (weekly signups)
          </h3>
          <div className="flex h-48 items-end gap-2">
            {GROWTH.map((v, i) => (
              <div key={i} className="group relative flex-1">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-brand-blue to-brand-lime transition group-hover:brightness-110"
                  style={{ height: `${(v / max) * 100 * 1.8}px` }}
                />
                <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-brand-ink px-1.5 py-0.5 text-[10px] text-white opacity-0 transition group-hover:opacity-100">
                  {v}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-brand-slate">
            <span>W1</span>
            <span>W6</span>
            <span>W12</span>
          </div>
        </div>

        <AnalyticsInspector />
      </div>
    </div>
  );
}
