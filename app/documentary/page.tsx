import TipButton from "@/components/TipButton";

export const metadata = {
  title: "The Documentary — Meek Earth STUDIO",
  description:
    "Episode 1 of the Meek Earth STUDIO documentary is streaming now. More episodes on the way — stay tuned.",
};

export default function DocumentaryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
          The documentary
        </p>
        <h1 className="text-4xl font-bold text-brand-ink">Episode 1 — Streaming Now</h1>
        <p className="mt-3 max-w-xl text-brand-slate">
          The first episode of the Meek Earth STUDIO documentary is here. Press play — and
          stay tuned for what comes next.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl bg-brand-ink shadow-xl">
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/b2GAGXhVmvI?si=68UWnBy_q3U84xRk"
            title="Meek Earth STUDIO Documentary — Episode 1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>

      <TipButton message="Enjoyed the film? Leave a tip" />

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-brand-lime bg-brand-lime/5 p-8 text-center">
          <h3 className="font-semibold text-brand-ink">Episode 1</h3>
          <p className="mt-1 font-serif text-xs tracking-[0.3em] text-brand-deep uppercase">
            Streaming now
          </p>
        </div>
        {[2, 3].map((n) => (
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
