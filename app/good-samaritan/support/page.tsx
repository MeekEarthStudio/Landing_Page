import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  CircleHelp,
  Copy,
  HeartHandshake,
  LifeBuoy,
  Mail,
  ShieldAlert,
} from "lucide-react";
import CopyEmailButton, { CONTACT_EMAIL } from "@/components/CopyEmailButton";
import {
  GS_APP_URL,
  GS_MAILTO,
  GS_PRIVACY_URL,
  GS_SUPPORT_EMAIL,
  GS_TERMS_URL,
} from "@/lib/goodSamaritan";

export const metadata = {
  title: "Good Samaritan Support — Meek Earth STUDIO",
  description:
    "How to use Good Samaritan, common questions, and how to email support at cbreid3@meekearthstudio.net.",
};

const SIGN_IN = [
  { option: "Sign in with Apple", when: "iPhone (offered next to Google)" },
  { option: "Sign in with Google", when: "iPhone, Android, or the web app" },
  { option: "Sign in / Create account", when: "Email and password" },
  { option: "Reset password", when: "Sends a Firebase link to a real inbox" },
  { option: "Continue with guest email", when: "Try the app without linking Google or Apple" },
];

const TUTORIAL = [
  {
    n: "1",
    title: "Sign in (Welcome)",
    body: "Choose Apple, Google, email and password, or guest email. Google and Apple identities that share the same email become one Good Samaritan account. Apple Hide My Email (privaterelay.appleid.com) is a separate identity unless you later sign in with a matching Google email. Privacy Policy and Terms of Service are linked on this screen.",
  },
  {
    n: "2",
    title: "Home hub — “Choose a portal”",
    body: "This is not a social feed. Nothing you write is posted for other people. The account icon (top left) opens Steward Account: your email, remaining AI prompts, Privacy / Terms, Sign Out, and Delete Account. Two large cards: AI Pastor Portal and Gratitude Journal. Under Also in your ledger: Giving, Kindness, and Artifacts. Worship music at the bottom is an official Spotify embed.",
  },
  {
    n: "3",
    title: "Record gratitude",
    body: "Tap Gratitude Journal, enter a short title (required), optionally add a prayer or reflection, choose a category (Family & Health, Provision & Stewardship, Community & Fellowship, Spiritual Growth, or Daily Mercy), then save. Free accounts can save up to 50 gratitude entries. Pro and Video Pro are unlimited.",
  },
  {
    n: "4",
    title: "Log a donation (Giving)",
    body: "Tap Giving. The toggle at the top switches Giving | Kindness. Tap the gold + button, choose Enter Receipt, then fill in the organization, amount, date, and whether it is a 501(c)(3). On Pro or Video Pro, Upload Document attaches a receipt image or PDF. You can download a ZIP of your files and export a CSV/Excel copy of your giving log. Verify every amount and 501(c)(3) checkbox against your original receipts before any tax use.",
  },
  {
    n: "5",
    title: "Log an act of kindness",
    body: "Tap Kindness (or open Giving and switch the toggle). Tap +, then Log Time for volunteer hours or Log Act for goods shared or an everyday act of mercy. Name the organization or neighbor, add a short description, and save. The Kindness view also shows a Bible-character likeness of your service — a prompt for reflection, not a verdict on your faith. Free accounts can save up to 50 service-log entries.",
  },
  {
    n: "6",
    title: "Talk with the AI Pastor",
    body: "Tap AI Pastor Portal (or Chat with Agent from the + menu on Giving/Kindness). Type a question about scripture, giving, or your walk of faith — or tap a suggestion chip. Use the header to open chat history, start New chat, or open Plans. Conversations are saved. Prompt allowances are per account, not per chat thread. This is an AI companion, not an ordained pastor or counselor.",
  },
  {
    n: "7",
    title: "Request a scripture video",
    body: "In AI Pastor, tap the Scripture Video chip (or ask for a video). Generation can take a few minutes. Open Artifacts on Home (or pull to refresh) to rewatch saved videos. Videos are short films about a randomly chosen Bible verse. They do not include your giving history, gratitude journal, or personal details. Video credits come with Video Pro or a Booster Pack. If generation fails, the video credit is restored.",
  },
  {
    n: "8",
    title: "Plans, quotas, and Restore Purchases",
    body: "Open Plans from the AI Pastor header, from a “limit reached” prompt, or when an unpaid feature asks you to upgrade. On iPhone, digital goods use Apple In-App Purchase only — tap Restore Purchases if you already paid on this Apple ID, and cancel auto-renew in iPhone Settings → your name → Subscriptions. On the web app, purchases use Stripe. Manage or cancel in the Stripe Customer Portal with the Google email on the account. Booster credits do not expire with the calendar month. If you downgrade or cancel, unused text and video balances are kept.",
  },
  {
    n: "9",
    title: "Sign out or delete your account",
    body: "Sign out: Home → account icon → Sign Out. Delete account: Home → account icon → Delete Account. This permanently removes your Good Samaritan data (logs, chats, documents, videos, entitlements) and cannot be undone. Deleting the app account does not cancel an Apple subscription — cancel in iPhone Settings → Apple ID → Subscriptions. After you create a new account, use Restore Purchases to attach an uncancelled Pro or Video Pro plan. Booster is a one-time pack and typically does not restore.",
  },
];

const FAQ = [
  {
    q: "What is this app for?",
    a: "A private record of charitable giving, acts of kindness, and gratitude to God, with optional AI pastoral chat and scripture video reflections. It is an administrative log and reflection companion — not a church, CPA, law firm, clinic, or ordained pastor.",
  },
  {
    q: "Is my journal public?",
    a: "No. There is no public feed, no follows, and no messaging other users. Entries stay on your signed-in account.",
  },
  {
    q: "Which sign-in should I use?",
    a: "Use Apple or Google if you already have those accounts. Use the same email if you want one Good Samaritan account across Apple and Google. Guest email is for trying the app; those addresses cannot receive password-reset mail.",
  },
  {
    q: "I forgot my password.",
    a: "On Welcome, tap Reset password and use an inbox you can open. Guest @guest.meekearthstudio.net addresses cannot receive mail.",
  },
  {
    q: "Sign in with Apple was cancelled / did nothing.",
    a: "Dismissing the Apple sheet is a cancel. Try again, and confirm the iPhone is signed into an Apple ID (Settings → your name). For sandbox testing, set Settings → App Store → Sandbox Account before opening the app.",
  },
  {
    q: "Where do I find Plans?",
    a: "AI Pastor header (Plans), Steward Account quotas, or any screen that says you have reached a free limit.",
  },
  {
    q: "Why can’t I upload a receipt photo?",
    a: "Upload Document is a Pro / Video Pro feature. Free accounts can still Enter Receipt by typing the gift (up to 50 giving entries). Camera and photo access are only for attaching your own receipts.",
  },
  {
    q: "Why did the app ask for location?",
    a: "Good Samaritan does not track live GPS. Some receipt photos already store location in the image, and a photo-picker library requires that notice.",
  },
  {
    q: "I hit a 50-entry limit.",
    a: "Free tier caps giving, kindness, and gratitude separately at 50 each. Upgrade to Pro or Video Pro for unlimited logs in those categories.",
  },
  {
    q: "I ran out of AI chat or video credits.",
    a: "Open Plans. Pro raises the monthly text allowance. Video Pro adds video reflections. A Booster Pack adds bonus text and video credits that carry until used.",
  },
  {
    q: "I paid but still see Free.",
    a: "On iPhone, open Plans → Restore Purchases, stay signed in, and wait for the server to refresh entitlements. Purchases are confirmed by Apple before quotas change. On the web app, use the Stripe portal with the same email as the account.",
  },
  {
    q: "How do I cancel a subscription?",
    a: "iPhone: Settings → your name → Subscriptions. Web: Stripe Customer Portal. Deleting the Good Samaritan account does not cancel Apple or Stripe billing.",
  },
  {
    q: "Can I get a refund in the app?",
    a: "No. Apple In-App Purchases are refunded through Apple. Stripe purchases are handled in the Stripe portal / Stripe support.",
  },
  {
    q: "Does the AI see my real name and email?",
    a: "Prompts sent to the AI use an anonymous alias such as User_0000000000001. Emails, phones, addresses, and similar details are replaced with placeholders first. Illegal or NSFW prompts are blocked and never sent to the model.",
  },
  {
    q: "Why was my prompt blocked?",
    a: "Illegal or inappropriate content is refused before it reaches the AI. Repeated illegal prompts produce warnings; a fourth illegal infraction flags the account for review and shares Celebrate Recovery help. Keep chats to stewardship and Good Samaritan purposes.",
  },
  {
    q: "Do videos include my donations or gratitude notes?",
    a: "No. Each video is about a randomly selected encouraging Bible verse. Your ledger and journal are not sent into the video.",
  },
  {
    q: "A video is taking a long time.",
    a: "Leave it running, then open Artifacts and pull to refresh. If generation fails, the video credit is returned.",
  },
  {
    q: "Does this replace tax software or a CPA?",
    a: "No. You are responsible for verifying amounts, 501(c)(3) status, and receipts before any filing. Export is a copy of your log, not a filed return.",
  },
  {
    q: "Is there an age limit?",
    a: "The app is not directed at children under 13. We do not knowingly collect personal information from children under 13.",
  },
];

const HELP_CHECKS = [
  "The email on your Good Samaritan account",
  "Whether you are on iPhone, Android, or the web app",
  "What you were trying to do",
  "What happened, including any error text you saw",
];

export default function GoodSamaritanSupportPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
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
          How to use the app, answers to common questions, and how to email us when you need
          a person. Support is email-only for now.
        </p>
      </header>

      <section
        id="ask-for-help"
        className="mb-16 rounded-3xl border border-brand-slate/15 bg-white shadow-sm"
      >
        <div className="rounded-t-3xl bg-brand-deep px-6 py-6 text-white sm:px-8">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-brand-lime">
              <LifeBuoy size={22} />
            </span>
            <div>
              <h2 className="text-2xl font-bold">How to ask for help</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
                Write us at{" "}
                <a
                  href={GS_MAILTO}
                  className="font-semibold text-brand-lime underline-offset-2 hover:underline"
                >
                  {GS_SUPPORT_EMAIL}
                </a>
                . Include the details below so we can find your account and reply faster.
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">
              In your email, include
            </p>
            <ol className="mt-4 space-y-3">
              {HELP_CHECKS.map((item, i) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-brand-slate">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-deep text-xs font-bold text-brand-lime">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm leading-relaxed text-brand-slate">
              The first time you open each section in the app, a short introduction appears.
              You can skip one screen or skip all of them. This page is that same walkthrough
              in writing.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3 rounded-2xl bg-slate-50 p-6 pb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-slate">
              Support email
            </p>
            <p className="break-all font-mono text-sm font-semibold text-brand-ink">
              {CONTACT_EMAIL}
            </p>
            <div className="mt-2 flex flex-col gap-2">
              <a
                href={GS_MAILTO}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-lime px-5 py-3 text-sm font-semibold text-brand-deep transition hover:brightness-110"
              >
                <Mail size={16} /> Open a pre-filled email
              </a>
              <CopyEmailButton className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-brand-blue px-5 py-3 text-sm font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white">
                <Copy size={16} /> Copy the address
              </CopyEmailButton>
            </div>
          </div>
        </div>
      </section>

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
        <div className="mb-8 overflow-x-auto rounded-2xl border border-brand-slate/15">
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

      <section className="mb-16">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            FAQ
          </p>
          <h2 className="text-3xl font-bold text-brand-ink">Common questions</h2>
        </div>
        <div className="space-y-3">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-brand-slate/15 bg-white p-5 shadow-sm open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center gap-3 font-bold text-brand-ink [&::-webkit-details-marker]:hidden">
                <CircleHelp size={18} className="shrink-0 text-brand-blue" />
                <span className="flex-1">{item.q}</span>
                <span className="text-brand-slate transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 pl-8 text-sm leading-relaxed text-brand-slate">{item.a}</p>
            </details>
          ))}
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

      <section className="mb-8 rounded-3xl bg-brand-deep p-8 text-white sm:p-12">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-brand-lime">
              <HeartHandshake size={22} />
            </span>
            <h2 className="text-2xl font-bold sm:text-3xl">Still stuck?</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Email{" "}
              <a href={GS_MAILTO} className="font-semibold text-brand-lime">
                {GS_SUPPORT_EMAIL}
              </a>{" "}
              with your account email and device. Read the{" "}
              <a
                href={GS_PRIVACY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/30 underline-offset-2 hover:decoration-brand-lime"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href={GS_TERMS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/30 underline-offset-2 hover:decoration-brand-lime"
              >
                Terms of Service
              </a>{" "}
              anytime.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:items-end">
            <a
              href={GS_MAILTO}
              className="inline-flex items-center gap-2 rounded-full bg-brand-lime px-7 py-3.5 font-semibold text-brand-deep transition hover:brightness-110"
            >
              <Mail size={17} /> Email support
            </a>
            <a
              href={GS_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              Open the app <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <p className="text-center text-sm text-brand-slate">
        <Link href="/good-samaritan" className="font-semibold text-brand-blue hover:underline">
          ← Back to Good Samaritan
        </Link>
      </p>
    </div>
  );
}
