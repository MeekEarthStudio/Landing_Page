"use client";

import VideoPlayerDocumentary from "@/components/VideoPlayerDocumentary";

export default function DocumentaryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
          Interactive film
        </p>
        <h1 className="text-4xl font-bold text-brand-ink">The Documentary</h1>
        <p className="mt-3 max-w-xl text-brand-slate">
          Follow the journey from studio sessions to the front lines of restoration work.
          Reactions light up in real time as the timeline reaches each moment.
        </p>
      </header>

      <VideoPlayerDocumentary
        mediaId="meek_earth_documentary_ep1"
        title="Meek Earth: Roots — Episode 1"
      />

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          ["Episode 1 — Roots", "Where the sound began: field recordings and first sessions."],
          ["Episode 2 — Currents", "Scoring the ocean restoration expedition. Coming soon."],
          ["Episode 3 — Canopy", "The reforestation anthem, from seed to stage. Coming soon."],
        ].map(([title, body], i) => (
          <div
            key={title}
            className={`rounded-xl border p-5 ${
              i === 0
                ? "border-brand-lime bg-brand-lime/5"
                : "border-brand-slate/15 bg-white opacity-70"
            }`}
          >
            <h3 className="font-semibold text-brand-ink">{title}</h3>
            <p className="mt-1 text-sm text-brand-slate">{body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
