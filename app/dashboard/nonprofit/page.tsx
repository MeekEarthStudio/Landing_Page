"use client";

import { HeartHandshake, Globe2, FileDown, DollarSign } from "lucide-react";

// Demo data — in production sourced from BigQuery impact tables and
// donation webhooks (app/api/webhooks).
const IMPACT = [
  { icon: HeartHandshake, label: "Nonprofits served", value: "340" },
  { icon: FileDown, label: "Toolkit downloads", value: "5,912" },
  { icon: Globe2, label: "Countries reached", value: "27" },
  { icon: DollarSign, label: "Raised for causes", value: "$86,340" },
];

const CAUSES = [
  { name: "Ocean restoration", pct: 38, color: "bg-brand-blue" },
  { name: "Reforestation", pct: 29, color: "bg-brand-lime" },
  { name: "Clean water access", pct: 19, color: "bg-brand-slate" },
  { name: "Community arts", pct: 14, color: "bg-brand-royal" },
];

export default function NonprofitDashboard() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
          Nonprofit dashboard
        </p>
        <h1 className="text-4xl font-bold text-brand-ink">Cause & Donor Impact</h1>
        <p className="mt-3 max-w-xl text-brand-slate">
          Where the library, music, and documentary audiences turn into real-world impact.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {IMPACT.map((k) => (
          <div key={k.label} className="rounded-xl border border-brand-slate/15 bg-white p-5 shadow-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-deep text-brand-lime">
              <k.icon size={17} />
            </span>
            <p className="mt-4 text-2xl font-bold text-brand-ink">{k.value}</p>
            <p className="text-sm text-brand-slate">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Donations by cause */}
        <div className="rounded-2xl border border-brand-slate/15 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-sm font-semibold text-brand-ink">Donations by cause</h3>
          <div className="space-y-5">
            {CAUSES.map((c) => (
              <div key={c.name}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="font-medium text-brand-ink">{c.name}</span>
                  <span className="text-brand-slate">{c.pct}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most downloaded assets */}
        <div className="rounded-2xl border border-brand-slate/15 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-sm font-semibold text-brand-ink">Top library assets (30d)</h3>
          <ul className="divide-y divide-slate-100 text-sm">
            {[
              ["Grant Writing Toolkit", "1,204 downloads"],
              ["Ocean Restoration Score", "987 downloads"],
              ["Reforestation B-Roll Pack", "743 downloads"],
              ["Impact Report Template", "612 downloads"],
              ["Community Anthem (Stems)", "489 downloads"],
            ].map(([name, count]) => (
              <li key={name} className="flex items-center justify-between py-3">
                <span className="font-medium text-brand-ink">{name}</span>
                <span className="text-brand-slate">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
