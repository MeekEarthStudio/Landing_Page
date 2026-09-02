import Link from "next/link";
import { ArrowUpRight, BookOpen, ShieldAlert } from "lucide-react";
import { GS_APP_URL } from "@/lib/goodSamaritan";
import { SIGN_IN, TUTORIAL } from "@/lib/goodSamaritanSupport";
import GoodSamaritanFaqGate from "@/components/GoodSamaritanFaqGate";

export const metadata = {
  title: "Good Samaritan Support — Meek Earth STUDIO",
  description:
    "How to use Good Samaritan and answers to common questions. Email support unlocks after you read the FAQ.",
};

export default function GoodSamaritanSupportPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 pb-28">
      <header className="mb-14 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
          Help
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-brand-ink sm:text-5xl">
          Good Samaritan{" "}
          <span className="font-serif italic bg-gradient-to-r from-brand-lime to-brand-blue bg-clip-text text-transparent">
            support
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-slate">
          Start with the walkthrough and FAQ. Email support is at the bottom of this page, and
          it only appears after you open and mark every FAQ section as read.
        </p>
        <a
          href={GS_APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-brand-blue px-7 py-3 font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white"
        >
          Open the app <ArrowUpRight size={18} />
        </a>
      </header>

      <section className="mb-16 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <ShieldAlert size={20} className="mt-0.5 shrink-0 text-amber-700" />
          <div>
            <h2 className="font-bold text-brand-ink">If you are in crisis</h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-slate">
              The in-app chat can share <strong>988</strong> (call or text),{" "}
              <strong>SAMHSA</strong> (1-800-662-4357), and Celebrate Recovery. That is a
              software referral, not clinical care. If you or someone else is in immediate
              danger, call emergency services.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            Tutorial
          </p>
          <h2 className="text-3xl font-bold text-brand-ink">Using the app from first launch</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-brand-slate">
            Good Samaritan is a private Christian stewardship journal. You log giving, acts of
            kindness, and gratitude to God. Optional AI pastoral chat and short scripture videos
            are a companion — not clergy, a CPA, a tax advisor, or a counselor.
          </p>
        </div>
        <div className="mb-8 overflow-hidden rounded-2xl border border-brand-slate/15">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-deep text-white">
              <tr>
                <th className="px-4 py-3 font-semibold">Sign-in option</th>
                <th className="px-4 py-3 font-semibold">When to use it</th>
              </tr>
            </thead>
            <tbody>
              {SIGN_IN.map((row) => (
                <tr key={row.option} className="border-t border-slate-100 odd:bg-slate-50/60">
                  <td className="px-4 py-3 font-semibold text-brand-ink">{row.option}</td>
                  <td className="px-4 py-3 text-brand-slate">{row.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ol className="space-y-4">
          {TUTORIAL.map((step) => (
            <li
              key={step.n}
              className="rounded-2xl border border-brand-slate/15 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-deep font-bold text-brand-lime">
                  {step.n}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-brand-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-slate">{step.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-16">
        <div className="overflow-x-auto rounded-2xl border border-brand-slate/15">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-brand-deep text-white">
              <tr>
                <th className="px-4 py-3 font-semibold">Plan</th>
                <th className="px-4 py-3 font-semibold">AI text / month</th>
                <th className="px-4 py-3 font-semibold">AI video / month</th>
                <th className="px-4 py-3 font-semibold">Logs</th>
                <th className="px-4 py-3 font-semibold">Documents + ZIP</th>
              </tr>
            </thead>
            <tbody className="text-brand-slate">
              <tr className="border-t border-slate-100">
                <td className="px-4 py-3 font-semibold text-brand-ink">Free</td>
                <td className="px-4 py-3">20</td>
                <td className="px-4 py-3">0</td>
                <td className="px-4 py-3">50 per category</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-t border-slate-100 bg-slate-50/60">
                <td className="px-4 py-3 font-semibold text-brand-ink">Pro</td>
                <td className="px-4 py-3">250</td>
                <td className="px-4 py-3">0 included</td>
                <td className="px-4 py-3">Unlimited</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-t border-slate-100">
                <td className="px-4 py-3 font-semibold text-brand-ink">Video Pro</td>
                <td className="px-4 py-3">500</td>
                <td className="px-4 py-3">8</td>
                <td className="px-4 py-3">Unlimited</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-t border-slate-100 bg-slate-50/60">
                <td className="px-4 py-3 font-semibold text-brand-ink">Booster Pack (one-time)</td>
                <td className="px-4 py-3">+450 bonus</td>
                <td className="px-4 py-3">+12 bonus</td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-16 rounded-2xl border border-brand-slate/15 bg-slate-50 p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-3">
          <BookOpen size={20} className="text-brand-blue" />
          <h2 className="text-xl font-bold text-brand-ink">Quick map of the screens</h2>
        </div>
        <pre className="overflow-x-auto text-xs leading-relaxed text-brand-slate sm:text-sm">
{`Welcome (sign in)
  └── Home hub
        ├── Account icon → quotas, Privacy, Terms, Sign Out, Delete Account
        ├── AI Pastor Portal → chats, Scripture Video, Plans, history
        ├── Gratitude Journal → title, reflection, category, save
        ├── Giving → + → Enter Receipt / Upload Document (Pro)
        ├── Kindness → + → Log Time / Log Act · Bible-character reflection
        ├── Artifacts → saved videos
        └── Worship music (Spotify)`}
        </pre>
      </section>

      <GoodSamaritanFaqGate />

      <p className="text-center text-sm text-brand-slate">
        <Link href="/good-samaritan" className="font-semibold text-brand-blue hover:underline">
          ← Back to Good Samaritan
        </Link>
      </p>
    </div>
  );
}
