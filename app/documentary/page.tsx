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
          The film is in production. When it premieres here, reactions will light up in
          real time as the timeline reaches each moment — stay tuned.
        </p>
      </header>

      <VideoPlayerDocumentary
        mediaId="meek_earth_documentary"
        title="Meek Earth Documentary — Stay Tuned"
      />

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-brand-slate/25 bg-slate-50 p-8"
          >
            <h3 className="font-semibold text-brand-ink">Episode {n}</h3>
            <p className="font-serif text-xs tracking-[0.3em] text-brand-slate uppercase">
              Stay Tuned
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
