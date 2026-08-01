import {
  FileText,
  BarChart3,
  Check,
  Clock,
  Tag,
  Mail,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Impact Documentation Services — Meek Earth STUDIO",
  description:
    "Donor-ready After Action Reports and Quarterly Impact Dashboards for nonprofits — fixed-fee, branded, and built to earn trust.",
};

const SERVICES = [
  {
    icon: FileText,
    name: "After Action Reports",
    tagline:
      "The post-event report your donors deserve. Attendance, dollars raised, where every dollar went, and the story of the night — in a branded document ready to email the week after your event.",
    includes: [
      "Event summary and financial breakdown",
      "Impact narrative",
      "Sponsor recognition",
      "Donor-facing design",
    ],
    turnaround: "5–7 business days from receiving your event data",
    price: "$500–$1,500 per report",
    ctaLabel: "Request an After Action Report",
    ctaHref:
      "mailto:cbreid3@meekearthstudio.net?subject=After%20Action%20Report%20%E2%80%94%20%5BYour%20Organization%5D",
  },
  {
    icon: BarChart3,
    name: "Quarterly Impact Dashboards",
    tagline:
      "A one-page metrics snapshot every quarter — the numbers your board and major donors actually ask about, kept current without staff time. Live dashboard access available as an add-on.",
    includes: [
      "Quarterly one-page PDF dashboard",
      "Metrics setup in your first quarter",
      "Year-over-year tracking as history builds",
    ],
    turnaround: "Delivered within two weeks of each quarter's close",
    price: "$500–$750 per quarter",
    ctaLabel: "Set Up a Dashboard",
    ctaHref:
      "mailto:cbreid3@meekearthstudio.net?subject=Quarterly%20Impact%20Dashboard%20%E2%80%94%20%5BYour%20Organization%5D",
  },
];

const STEPS = [
  {
    title: "Reach out",
    body: "Use either button above — tell us your organization and what you need.",
  },
  {
    title: "Share your data",
    body: "We send a short intake form and a secure upload link. We ask for aggregate figures wherever possible and never request payment card or bank details.",
  },
  {
    title: "Review and receive",
    body: "You review a draft, we finalize, and the PDF is yours — typically within the turnaround listed.",
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <header className="mb-12 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
          Impact documentation services
        </p>
        <h1 className="text-4xl font-bold text-brand-ink sm:text-5xl">
          For nonprofits that want their story —{" "}
          <span className="bg-gradient-to-r from-brand-lime to-brand-blue bg-clip-text text-transparent">
            and their numbers
          </span>{" "}
          — told clearly.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-slate">
          Meek Earth Studio produces transparent benefit concerts where every dollar is
          accounted for in public: the split is printed on the ticket, and the totals are
          shared after the show. That documentation discipline is now available to your
          organization. We turn your events and outcomes into donor-ready reports — accurate,
          branded, and built to earn trust.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-brand-slate">
          Every engagement is fixed-fee, template-driven, and delivered as a polished PDF you
          can send to donors, funders, and your board the same day.
        </p>
      </header>

      {/* Services */}
      <div className="grid gap-6 md:grid-cols-2">
        {SERVICES.map((s) => (
          <div
            key={s.name}
            className="flex flex-col rounded-2xl border border-brand-slate/15 bg-white p-8 shadow-sm transition hover:border-brand-lime hover:shadow-lg"
          >
            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-deep text-brand-lime">
              <s.icon size={22} />
            </span>
            <h2 className="text-2xl font-bold text-brand-ink">{s.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-slate">{s.tagline}</p>

            <ul className="mt-5 space-y-2">
              {s.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-brand-ink">
                  <Check size={16} className="mt-0.5 shrink-0 text-brand-lime" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-5 space-y-2 border-t border-slate-100 pt-5 text-sm text-brand-slate">
              <p className="flex items-start gap-2">
                <Clock size={15} className="mt-0.5 shrink-0 text-brand-blue" />
                {s.turnaround}
              </p>
              <p className="flex items-start gap-2 font-semibold text-brand-ink">
                <Tag size={15} className="mt-0.5 shrink-0 text-brand-blue" />
                {s.price}
              </p>
            </div>

            <a
              href={s.ctaHref}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand-lime px-6 py-3 font-semibold text-brand-deep transition hover:brightness-110"
            >
              {s.ctaLabel} <ArrowRight size={16} />
            </a>
          </div>
        ))}
      </div>

      {/* How it works */}
      <section className="mt-16">
        <h2 className="text-center text-3xl font-bold text-brand-ink">How It Works</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="rounded-xl border border-brand-slate/15 bg-white p-6">
              <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue/10 font-bold text-brand-blue">
                {i + 1}
              </span>
              <h3 className="font-semibold text-brand-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-slate">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Data handling */}
      <section className="mt-12 rounded-2xl bg-brand-deep p-8 text-white sm:p-10">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-lime">
            <ShieldCheck size={22} />
          </span>
          <div>
            <h2 className="text-xl font-bold">How We Handle Your Data</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Your files and figures are stored in a private, access-controlled workspace
              dedicated to your organization, processed under Google&apos;s enterprise data
              protection terms, and never used to train AI models. When the engagement ends,
              your data is retained or deleted according to your preference.
            </p>
          </div>
        </div>
      </section>

      <p className="mt-12 text-center text-sm text-brand-slate">
        <a
          href="mailto:cbreid3@meekearthstudio.net"
          className="inline-flex items-center gap-2 font-semibold text-brand-blue transition hover:text-brand-lime"
        >
          <Mail size={15} /> cbreid3@meekearthstudio.net
        </a>
        <span className="mt-2 block font-serif text-xs tracking-[0.25em] uppercase">
          Meek Earth Studio PBC · Woodbridge, VA · Music for the meek
        </span>
      </p>
    </div>
  );
}
