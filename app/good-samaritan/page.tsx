import Link from "next/link";
import {
  ArrowUpRight,
  BookHeart,
  Check,
  FileArchive,
  HeartHandshake,
  LifeBuoy,
  ShieldCheck,
  Sparkles,
  Download,
  CloudOff,
} from "lucide-react";
import { GS_APP_URL, GS_PRIVACY_URL, GS_TERMS_URL } from "@/lib/goodSamaritan";

export const metadata = {
  title: "Good Samaritan — Meek Earth STUDIO",
  description:
    "Private Christian stewardship journal for logging giving, service, and gratitude — with receipt documents, ledger export, and a private account.",
};

const CAPABILITIES = [
  {
    icon: BookHeart,
    title: "Stewardship logs",
    body: "Record giving transactions, acts of service, and gratitude entries as three independent categories. Free Tier: 15 entries per category. Pro: unlimited.",
  },
  {
    icon: FileArchive,
    title: "Documents + ZIP export",
    body: "Paid tiers can upload receipt images and PDFs, browse uploaded documents, and download a ZIP of files. Free users can still Enter Receipt manually within log caps.",
  },
  {
    icon: Download,
    title: "CSV / Excel ledger export",
    body: "Download a tax-deductible ledger export (date, organization, type, amounts). You remain responsible for verifying accuracy before any tax use.",
  },
  {
    icon: CloudOff,
    title: "Offline sync",
    body: "Write entries locally first; a sync queue posts them to the cloud when you’re back online so logs persist across sessions.",
  },
];

const SAFETY = [
  {
    title: "Private by design",
    body: "There is no public feed, no follows, and no messaging other users. Entries stay on your signed-in account.",
  },
  {
    title: "Log content filter",
    body: "Organization names and similar log fields are checked on the server. Fraudulent or prohibited text can be rejected.",
  },
  {
    title: "Your records, your account",
    body: "Stewardship records stay tied to your authenticated account. Cloud SQL row-level security isolates user rows.",
  },
  {
    title: "Account deletion",
    body: "Delete Account removes your Good Samaritan data — logs, documents, and entitlements. It does not cancel an Apple or Stripe subscription.",
  },
  {
    title: "Not professional advice",
    body: "This is an administrative log — not clergy, a CPA, a tax advisor, or a counselor. You remain responsible for verifying donations, receipts, and filings.",
  },
  {
    title: "Server-side entitlements",
    body: "Free-log caps and document access are enforced on the server — not just in the client UI.",
  },
];

const PLANS = [
  {
    name: "Free",
    price: "$0/mo",
    items: ["15 logs per category", "No documents + ZIP"],
  },
  {
    name: "Pro",
    price: "$9.99/mo",
    items: ["Unlimited stewardship logs", "Documents + ZIP"],
    highlight: true,
  },
];

export default function GoodSamaritanPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <header className="mb-16 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
          Product
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-brand-ink sm:text-5xl">
          Good{" "}
          <span className="font-serif italic bg-gradient-to-r from-brand-lime to-brand-blue bg-clip-text text-transparent">
            Samaritan
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-slate">
          A private Christian stewardship journal. Log giving, acts of kindness, and gratitude
          to God.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brand-slate/80">
          Sign in with Apple, Google, or email. Nothing you write is posted for other people.
          This is an administrative log — not clergy, a CPA, a tax advisor, or a counselor. You
          remain responsible for verifying donations, receipts, and filings.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={GS_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-lime px-8 py-4 font-semibold text-brand-deep shadow-lg shadow-brand-lime/25 transition hover:brightness-110"
          >
            Open Good Samaritan <ArrowUpRight size={18} />
          </a>
          <Link
            href="/good-samaritan/support"
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue px-8 py-4 font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white"
          >
            <LifeBuoy size={18} /> Support &amp; how-to
          </Link>
        </div>
      </header>

      <section className="mb-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-brand-ink">Capabilities</h2>
          <p className="mt-2 text-brand-slate">
            What the live product does today — stewardship logs, documents, and exports.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {CAPABILITIES.map((item) => (
            <div
              key={item.title}
              className="flex flex-col rounded-2xl border border-brand-slate/15 bg-white p-6 shadow-sm"
            >
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-deep text-brand-lime">
                <item.icon size={20} />
              </span>
              <h3 className="text-lg font-bold text-brand-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-slate">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            Plans
          </p>
          <h2 className="text-3xl font-bold text-brand-ink">Quotas & pricing</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-brand-slate">
            On iPhone, digital goods use Apple In-App Purchase. On the web app, purchases use
            Stripe — manage or cancel in the Customer Portal with the same account email. Video
            Pro and Booster are no longer offered in the paywall. An existing Video Pro
            subscription still unlocks unlimited logs and documents until you cancel it.
          </p>
        </div>
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-2xl p-6 ${
                plan.highlight
                  ? "border-2 border-brand-blue bg-white shadow-lg ring-1 ring-brand-blue/20"
                  : "border border-brand-slate/15 bg-white shadow-sm"
              }`}
            >
              {plan.highlight && (
                <span className="mb-3 self-start rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-blue">
                  Popular
                </span>
              )}
              <h3 className="text-xl font-bold text-brand-ink">{plan.name}</h3>
              <p className="mt-2 text-2xl font-extrabold text-brand-ink">{plan.price}</p>
              <ul className="mt-4 flex-1 space-y-2">
                {plan.items.map((line) => (
                  <li key={line} className="flex items-start gap-2 text-sm text-brand-slate">
                    <Check size={15} className="mt-0.5 shrink-0 text-brand-lime" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            Safety
          </p>
          <h2 className="text-3xl font-bold text-brand-ink">Built-in guardrails</h2>
          <p className="mt-2 text-brand-slate">
            A private journal, log content filters, and server-side entitlements.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {SAFETY.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-brand-slate/15 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <ShieldCheck size={18} />
                </span>
                <h3 className="font-bold text-brand-ink">{item.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-brand-slate">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 rounded-3xl bg-brand-deep p-8 text-white sm:p-12">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-brand-lime">
              <HeartHandshake size={22} />
            </span>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Stewardship, logged with care
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Need help? Read the FAQ on the{" "}
              <Link href="/good-samaritan/support" className="text-brand-lime underline-offset-2 hover:underline">
                support page
              </Link>
              {" "}
              first — email unlocks after every section. Or read the{" "}
              <a
                href={GS_PRIVACY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-lime underline-offset-2 hover:underline"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href={GS_TERMS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-lime underline-offset-2 hover:underline"
              >
                Terms
              </a>
              .
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3">
            <a
              href={GS_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-lime px-7 py-3.5 font-semibold text-brand-deep transition hover:brightness-110"
            >
              <Sparkles size={17} /> Launch the app
            </a>
            <Link
              href="/good-samaritan/support"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              <LifeBuoy size={17} /> Get support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
