import {
  FileText,
  Check,
  Clock,
  Tag,
  Mail,
  ShieldCheck,
  Copy,
  Sparkles,
  Code2,
  FileDown,
  LineChart,
  Globe,
  Layers,
  Zap,
} from "lucide-react";
import CopyEmailButton, { CONTACT_EMAIL } from "@/components/CopyEmailButton";

export const metadata = {
  title: "Interactive After Action Reports — Meek Earth STUDIO",
  description:
    "Polished, mobile-first web pages for nonprofits that account for every event dollar — transparent, donor-ready, and embedded on your site.",
};

const FEATURES = [
  {
    icon: FileText,
    name: "The Totals Page",
    signature: true,
    description:
      "Your event's dollar flow, displayed the way we publish our own: gross, costs, and net-to-mission, with every headline number expandable to show where it comes from. Donors don't have to trust you. They can look.",
  },
  {
    icon: Sparkles,
    name: "The story of the night",
    signature: false,
    description:
      "Narrative, photos, and video, designed to be read on a phone from an email link.",
  },
  {
    icon: Globe,
    name: "Sponsor and partner recognition",
    signature: false,
    description: "Links out to the people who showed up for you.",
  },
  {
    icon: Code2,
    name: "Embed anywhere",
    signature: false,
    description:
      "One line of code works on WordPress, Squarespace, Wix, or any site. No plugin, no IT project. The report lives at your web address, in front of your donors.",
  },
  {
    icon: FileDown,
    name: "A downloadable PDF",
    signature: false,
    description:
      "Built from the same page, for boards, funders, and print.",
  },
  {
    icon: LineChart,
    name: "Engagement summary",
    signature: false,
    description:
      "Delivered 30 days after publish — views, time spent, most-read sections — so you learn what actually moved your donors.",
  },
  {
    icon: Layers,
    name: "Hosting included for 12 months",
    signature: false,
    description:
      "With a modest renewal after — or we hand you the files to keep forever. Your report, either way.",
  },
];

const PRICING_TIERS = [
  {
    name: "Compact",
    price: "From $950",
    description: "A single event, straightforward finances",
  },
  {
    name: "Standard",
    price: "From $1,650",
    description: "A single event with sponsors and multiple revenue streams",
    highlight: true,
  },
  {
    name: "Flagship",
    price: "From $2,950",
    description:
      "A gala or multi-day event; photo essay, tiered sponsor sections, board version",
  },
  {
    name: "Season Partner",
    price: "$4,200 / year",
    description:
      "Three Standard reports across your event calendar — one relationship, one intake, every event accounted for. (Save $750 vs. booking separately.)",
  },
];

const STEPS = [
  {
    order: 1,
    title: "Reach out",
    body: (
      <>
        Email <span className="font-semibold text-brand-blue">{CONTACT_EMAIL}</span> — tell us your organization and your event.
      </>
    ),
  },
  {
    order: 2,
    title: "Short intake",
    body: "A few questions about your records so we can quote you one fixed number. You'll get the quote and a plain-language engagement letter; work begins at a 50% deposit.",
  },
  {
    order: 3,
    title: "Send us what you have",
    body: "A secure upload link for your exports, statements, photos, and notes. We ask for aggregate figures wherever possible and never request payment card numbers, bank credentials, or individual donor personal information.",
  },
  {
    order: 4,
    title: "Review and publish",
    body: "You review a draft, we finalize, you paste one line of code into your site — or send it to us and we'll place it for you. Balance is due on delivery.",
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      {/* Hero */}
      <header className="mb-16 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
          Services
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-brand-ink sm:text-5xl">
          Interactive After Action Reports
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-xl font-medium text-brand-ink/90 sm:text-2xl">
          For nonprofits that want their story —{" "}
          <span className="bg-gradient-to-r from-brand-lime to-brand-blue bg-clip-text text-transparent">
            and their numbers
          </span>{" "}
          — told clearly, on their own website.
        </p>
        <div className="mx-auto mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-brand-slate">
          <p>
            Meek Earth Studio produces transparent benefit concerts where every dollar is
            accounted for in public: the split is printed on the ticket, and the totals are
            shared after the show. Now we build that same accountability for your events.
          </p>
          <p>
            An <strong className="font-semibold text-brand-ink">Interactive After Action Report</strong> is a
            polished, mobile-first web page that tells the story of your event and accounts for
            every dollar — attendance, funds raised, where the money went, and the night itself.
            You embed it on your own website with a single line of code, link it in your donor
            emails, and download the matching PDF for your board packet. One event, one page,
            every number sourced.
          </p>
        </div>
      </header>

      {/* What's in every report */}
      <section id="whats-included" className="mb-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-brand-ink">What&apos;s in every report</h2>
          <p className="mt-2 text-brand-slate">
            Built from the ground up to earn trust and engage donors on any device.
          </p>
        </div>

        {/* Signature Feature Card */}
        <div className="mb-8 rounded-3xl border-2 border-brand-lime bg-gradient-to-br from-white via-slate-50/50 to-brand-lime/10 p-8 shadow-md sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-deep text-brand-lime shadow-sm">
              <FileText size={26} />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-bold text-brand-ink">The Totals Page</h3>
                <span className="rounded-full bg-brand-lime/30 px-3 py-1 text-xs font-semibold text-brand-deep uppercase tracking-wider">
                  Signature Feature
                </span>
              </div>
              <p className="mt-3 text-base leading-relaxed text-brand-slate">
                Your event&apos;s dollar flow, displayed the way we publish our own: gross,
                costs, and net-to-mission, with every headline number expandable to show where
                it comes from. Donors don&apos;t have to trust you. They can look.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {FEATURES.filter((f) => !f.signature).map((feature) => (
            <div
              key={feature.name}
              className="flex flex-col rounded-2xl border border-brand-slate/15 bg-white p-6 shadow-sm transition hover:border-brand-lime hover:shadow-md"
            >
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                <feature.icon size={20} />
              </span>
              <h3 className="text-lg font-bold text-brand-ink">{feature.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-slate">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="mb-20">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            Pricing
          </p>
          <h2 className="text-3xl font-bold text-brand-ink">What it costs</h2>
          <p className="mt-3 text-lg font-medium text-brand-ink">
            Every engagement is <strong className="font-bold text-brand-blue">fixed-fee</strong> — you know the total before we begin, in writing.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-brand-slate">
            Agencies charge $5,000–$12,000 to design a report — and they don&apos;t touch your numbers. We design the report <em>and</em> verify every dollar in it, for a fraction of that.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col rounded-2xl p-6 transition ${
                tier.highlight
                  ? "border-2 border-brand-blue bg-white shadow-lg ring-1 ring-brand-blue/20"
                  : "border border-brand-slate/15 bg-white shadow-sm hover:border-brand-lime hover:shadow-md"
              }`}
            >
              {tier.highlight && (
                <span className="mb-3 self-start rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue uppercase tracking-wider">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold text-brand-ink">{tier.name}</h3>
              <p className="mt-2 text-2xl font-extrabold text-brand-ink">{tier.price}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-brand-slate">
                {tier.description}
              </p>
              <CopyEmailButton className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-lime px-5 py-3 text-sm font-semibold text-brand-deep transition hover:brightness-110">
                Request a Quote <Copy size={14} />
              </CopyEmailButton>
            </div>
          ))}
        </div>

        {/* Pricing Notes & Record Conditions */}
        <div className="mt-8 rounded-2xl border border-brand-slate/15 bg-slate-50/80 p-8 text-sm leading-relaxed text-brand-slate">
          <p className="mb-4">
            Your exact fixed quote depends on one honest factor:{" "}
            <strong className="font-semibold text-brand-ink">the condition of your records.</strong>{" "}
            Clean, reconciled numbers price at the bottom of each tier. If your event lives in
            spreadsheets, processor statements, and a folder of receipts — that&apos;s normal, and
            most clients are here. And if it&apos;s paper, partial, and needs real
            reconstruction, we do that too:{" "}
            <strong className="font-semibold text-brand-ink">send us what you have, we&apos;ll sort it.</strong>{" "}
            Heavy-reconstruction engagements run up to{" "}
            <strong className="font-semibold text-brand-ink">$4,500</strong>, and reconstruction
            work includes a written record of every assumption we made — which itself becomes
            something you can show a funder.
          </p>
          <p className="mb-6">
            Whatever the number is, it&apos;s quoted before we start, locked in the engagement
            letter, and never revised mid-project. In fairness both directions: if the materials
            you send turn out drastically different from what was described at intake, we pause and
            re-quote before continuing — and if they turn out <em>cleaner</em> than described,
            you get the difference back.
          </p>
          <div className="space-y-3 border-t border-slate-200/80 pt-6 text-xs text-brand-ink">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <p className="flex items-center gap-2">
                <Clock size={16} className="text-brand-blue" />
                <span>
                  Standard turnaround: <strong className="font-semibold">5–7 business days</strong>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Zap size={16} className="text-brand-lime" />
                <span>
                  Rush (3 business days): <strong className="font-semibold">+$400</strong>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Clock size={16} className="text-brand-blue" />
                <span>
                  Reconstruction turnaround: <strong className="font-semibold">7–10 business days</strong> (Rush available)
                </span>
              </p>
            </div>
            <p className="pt-2 text-xs text-brand-slate">
              Hosting is included for 12 months. Renewal after year one: <strong className="font-semibold text-brand-ink">$120/year</strong> — or we hand you the files to keep forever. Your report, either way.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mb-20">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            Process
          </p>
          <h2 className="text-3xl font-bold text-brand-ink">How it works</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div
              key={step.order}
              className="flex flex-col rounded-2xl border border-brand-slate/15 bg-white p-6 shadow-sm"
            >
              <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue/10 font-bold text-brand-blue">
                {step.order}
              </span>
              <h3 className="font-bold text-brand-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-slate">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <CopyEmailButton className="inline-flex items-center gap-2 rounded-full bg-brand-lime px-8 py-4 font-semibold text-brand-deep shadow-md transition hover:brightness-110">
            Request a Report <Copy size={16} />
          </CopyEmailButton>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="mb-20">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            Interactive Demo
          </p>
          <h2 className="text-3xl font-bold text-brand-ink">See one</h2>
          <p className="mx-auto mt-3 max-w-2xl text-brand-slate">
            We publish our own after action reports first — the same format, built from our
            own concerts, with our own dollars accounted for in public.
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-brand-slate/80">
            Demo coming soon
          </p>
        </div>

        {/* Live Embed Option 1 */}
        <div className="mb-12">
          <div className="mb-4 text-center">
            <h3 className="text-lg font-bold text-brand-ink">Option 1: Full-Width Interactive View</h3>
            <p className="text-xs text-brand-slate">Full-width layout suitable for landing pages and dedicated report sections.</p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-brand-slate/15 shadow-md">
            <iframe
              src="https://meek-earth-email-capture-94556.web.app"
              width="100%"
              height="800"
              style={{
                width: "100%",
                minHeight: "800px",
                border: "none",
                overflow: "hidden",
                background: "#000000",
              }}
              title="Deanwood Concert Impact Report"
            />
          </div>
        </div>

        {/* Live Embed Option 2 */}
        <div>
          <div className="mb-4 text-center">
            <h3 className="text-lg font-bold text-brand-ink">Option 2: Compact Card View</h3>
            <p className="text-xs text-brand-slate">Centered card layout ideal for sidebar embeds or quick intake forms.</p>
          </div>
          <div className="py-2">
            <iframe
              src="https://meek-earth-email-capture-94556.web.app"
              width="100%"
              height="680"
              style={{
                maxWidth: "480px",
                border: "none",
                overflow: "hidden",
                display: "block",
                margin: "0 auto",
                background: "#000000",
              }}
              title="Deanwood Concert Impact Report"
            />
          </div>
        </div>
      </section>

      {/* How We Handle Your Data */}
      <section id="data-handling" className="mb-16 rounded-2xl bg-brand-deep p-8 text-white sm:p-10">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-lime">
            <ShieldCheck size={22} />
          </span>
          <div>
            <h2 className="text-xl font-bold">How we handle your data</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Your files and figures are stored in a private, access-controlled workspace
              dedicated to your organization and are never used to train AI models. We work from
              aggregate figures — not donor lists — and when the engagement ends, your data is
              retained or deleted according to your preference. Every number we publish traces
              to a source document, and a human verifies every figure before it goes live.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Contact */}
      <div className="text-center text-sm text-brand-slate">
        <CopyEmailButton className="inline-flex items-center gap-2 font-semibold text-brand-blue transition hover:text-brand-lime">
          <Mail size={15} /> {CONTACT_EMAIL} <Copy size={13} />
        </CopyEmailButton>
        <span className="mt-4 block font-serif text-xs tracking-[0.25em] uppercase">
          Meek Earth Studio PBC · Woodbridge, VA · Music for the meek
        </span>
      </div>
    </div>
  );
}
