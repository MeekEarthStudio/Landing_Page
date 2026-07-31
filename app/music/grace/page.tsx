import { Disc3 } from "lucide-react";

export const metadata = {
  title: "Grace J Reid — It Is Well With My Soul | Meek Earth STUDIO",
  description: "EP (Live) — It Is Well With My Soul by Grace J. Reid, streaming on Bandcamp.",
};

export default function GraceMusicPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <header className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
          Grace J Reid
        </p>
        <h1 className="text-4xl font-bold text-brand-ink">It Is Well With My Soul</h1>
        <p className="mx-auto mt-3 max-w-xl text-brand-slate">
          EP (Live) — recorded and streaming now. Press play below, straight from Bandcamp.
        </p>
      </header>

      <div className="flex justify-center">
        <iframe
          title="EP (Live) - It Is Well With My Soul by Grace J. Reid"
          style={{ border: 0, width: 350, height: 786 }}
          src="https://bandcamp.com/EmbeddedPlayer/album=2027528792/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/"
          seamless
        />
      </div>

      <p className="mt-6 text-center text-sm text-brand-slate">
        <a
          href="https://gracejreid.bandcamp.com/album/ep-live-it-is-well-with-my-soul"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-blue transition hover:text-brand-lime"
        >
          EP (Live) — It Is Well With My Soul by Grace J. Reid on Bandcamp
        </a>
      </p>

      <div className="mt-8 flex justify-center">
        <a
          href="https://kunaki.com/sales.asp?PID=PX00Z4BATO&pp=1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-brand-lime px-7 py-3.5 font-semibold text-brand-deep shadow-lg shadow-brand-lime/25 transition hover:brightness-110"
        >
          <Disc3 size={18} /> Buy the EP on CD
        </a>
      </div>
    </div>
  );
}
