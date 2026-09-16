import { Check, Download, Mail } from "lucide-react";
import CopyEmailButton, { CONTACT_EMAIL } from "@/components/CopyEmailButton";

export const metadata = {
  title: "Partner with us — Meek Earth STUDIO",
  description:
    "Two ways for DMV employers, banks, and community development institutions to back Meek Earth Studio’s first live acoustic concert — a marketing and employee-experience purchase, not a charitable gift.",
};

const FLIER_PDF = "/meek-earth-studio-business-partnership-flier.pdf";
const SITE_URL = "https://meekearth.net";

const SEAT_POINTS = [
  "Volume pricing for teams of 25+",
  "Delivered as redeemable links, no roster required",
  "Booked from your engagement budget, not your giving budget",
];

const SPONSOR_POINTS = [
  "Logo on-air, on the concert page, and in the recap email",
  "Verbal credit during the pre-show and livestream",
  "Attendance and viewership report after the show",
];

export default function PartnerPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <header className="mb-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.2em]">
          <span className="text-brand-slate">Meek Earth Studio</span>
          <span className="text-brand-blue">Partner with us</span>
        </div>
        <h1 className="font-serif text-4xl font-medium leading-tight text-brand-ink sm:text-5xl">
          Team night.
          <br />
          Brand spotlight.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-slate">
          Two ways for DMV employers, banks, and community development institutions to back Meek
          Earth Studio&apos;s first live acoustic concert — an ordinary marketing and
          employee-experience purchase, not a charitable gift.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-3xl border border-brand-slate/15 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-slate">
            Batch virtual seats
          </p>
          <p className="mt-3 font-serif text-4xl text-brand-ink">
            $18<span className="text-2xl text-brand-slate">/seat</span>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-brand-slate">
            An employee experience purchase — a team night, not a giving-budget line. Every
            employee gets a private livestream link to a professionally produced acoustic concert.
          </p>
          <ul className="mt-6 space-y-3 border-t border-brand-slate/10 pt-6">
            {SEAT_POINTS.map((line) => (
              <li key={line} className="flex items-start gap-2 text-sm text-brand-slate">
                <Check size={16} className="mt-0.5 shrink-0 text-brand-lime" />
                {line}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-brand-lime/40 bg-brand-lime/10 p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Sponsorship
          </p>
          <p className="mt-3 font-serif text-4xl text-brand-ink">From $500</p>
          <p className="mt-4 text-sm leading-relaxed text-brand-slate">
            Marketing placement on a well-produced concert, watched by an engaged local audience
            — not a charitable sponsorship, and not tax-deductible.
          </p>
          <ul className="mt-6 space-y-3 border-t border-brand-lime/30 pt-6">
            {SPONSOR_POINTS.map((line) => (
              <li key={line} className="flex items-start gap-2 text-sm text-brand-slate">
                <Check size={16} className="mt-0.5 shrink-0 text-brand-lime" />
                {line}
              </li>
            ))}
          </ul>
        </article>
      </div>

      <dl className="mt-10 grid gap-6 rounded-3xl bg-brand-deep px-6 py-6 text-white sm:grid-cols-3 sm:px-10">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">When</dt>
          <dd className="mt-1 text-lg font-semibold">May 2027</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Where</dt>
          <dd className="mt-1 text-lg font-semibold">DMV — venue TBD</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            Who it&apos;s for
          </dt>
          <dd className="mt-1 text-lg font-semibold">Employers &amp; local sponsors</dd>
        </div>
      </dl>

      <section className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-serif text-3xl text-brand-ink">Let&apos;s talk.</h2>
          <p className="mt-2 text-sm text-brand-slate">
            Reach the studio at{" "}
            <a
              href={SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-blue hover:underline"
            >
              meekearth.net
            </a>{" "}
            or {CONTACT_EMAIL}.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <CopyEmailButton className="inline-flex items-center gap-2 rounded-full bg-brand-lime px-6 py-3 font-semibold text-brand-deep shadow-md transition hover:brightness-110">
            <Mail size={16} /> {CONTACT_EMAIL}
          </CopyEmailButton>
          <a
            href={FLIER_PDF}
            download
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue px-6 py-3 font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white"
          >
            <Download size={16} /> Download the flier
          </a>
        </div>
      </section>
    </div>
  );
}
