"use client";

import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Check,
  ChevronDown,
  CircleHelp,
  Copy,
  HeartHandshake,
  LifeBuoy,
  Lock,
  Mail,
} from "lucide-react";
import CopyEmailButton from "@/components/CopyEmailButton";
import { GS_MAILTO, GS_PRIVACY_URL, GS_SUPPORT_EMAIL, GS_TERMS_URL } from "@/lib/goodSamaritan";
import { FAQ, FAQ_IDS, FAQ_STORAGE_KEY, HELP_CHECKS } from "@/lib/goodSamaritanSupport";

function loadRead(): string[] {
  try {
    const raw = window.localStorage.getItem(FAQ_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string" && FAQ_IDS.includes(id));
  } catch {
    return [];
  }
}

export default function GoodSamaritanFaqGate() {
  const [read, setRead] = useState<Set<string>>(new Set());
  const [opened, setOpened] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);
  const wasComplete = useRef(false);
  const emailRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const saved = loadRead();
    setRead(new Set(saved));
    setOpened(new Set(saved));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(FAQ_STORAGE_KEY, JSON.stringify([...read]));
  }, [hydrated, read]);

  const readCount = read.size;
  const total = FAQ.length;
  const complete = hydrated && readCount === total;

  useEffect(() => {
    if (complete && !wasComplete.current) {
      emailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    wasComplete.current = complete;
  }, [complete]);

  function toggleExpand(id: string) {
    setOpened((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleRead(id: string, checked: boolean) {
    if (!opened.has(id)) return;
    setRead((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  return (
    <>
      <section id="faq" className="mb-16">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            FAQ
          </p>
          <h2 className="text-3xl font-bold text-brand-ink">Common questions</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-brand-slate">
            Open <span className="font-semibold text-brand-ink">Learn more</span> on every
            question, then check <span className="font-semibold text-brand-ink">I’ve read this
            section</span>. Email support stays hidden until you finish the list.
          </p>
          <p
            className="mt-4 text-sm font-semibold text-brand-blue"
            aria-live="polite"
          >
            {hydrated ? `${readCount} of ${total} sections read` : `0 of ${total} sections read`}
          </p>
          <div className="mx-auto mt-3 h-2 max-w-md overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-brand-lime transition-[width] duration-300"
              style={{ width: `${hydrated ? (readCount / total) * 100 : 0}%` }}
            />
          </div>
        </div>

        <div className="space-y-3 pb-8">
          {FAQ.map((item, index) => {
            const isOpen = expanded.has(item.id);
            const isOpened = opened.has(item.id);
            const isRead = read.has(item.id);
            return (
              <article
                key={item.id}
                className={`scroll-mb-28 rounded-2xl border bg-white p-5 shadow-sm transition ${
                  isRead
                    ? "border-brand-lime/60 ring-1 ring-brand-lime/20"
                    : "border-brand-slate/15"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      isRead
                        ? "bg-brand-lime text-brand-deep"
                        : "bg-brand-deep text-brand-lime"
                    }`}
                    aria-hidden
                  >
                    {isRead ? <Check size={14} /> : index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-brand-ink">{item.q}</h3>
                    <button
                      type="button"
                      onClick={() => toggleExpand(item.id)}
                      aria-expanded={isOpen}
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition hover:text-brand-ink"
                    >
                      <BookOpen size={15} />
                      {isOpen ? "Hide this section" : "Learn more about this section"}
                      <ChevronDown
                        size={15}
                        className={`transition ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                  <CircleHelp size={18} className="mt-1 shrink-0 text-brand-blue/70" />
                </div>

                {isOpen && (
                  <p className="mt-4 text-sm leading-relaxed text-brand-slate">{item.a}</p>
                )}

                {isOpened && (
                  <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl bg-slate-50 px-3 py-3 text-sm text-brand-ink">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 accent-brand-blue"
                      checked={isRead}
                      onChange={(e) => toggleRead(item.id, e.target.checked)}
                    />
                    <span>
                      I’ve read this section
                      {!isRead && (
                        <span className="block text-xs font-normal text-brand-slate">
                          Required before email support unlocks
                        </span>
                      )}
                    </span>
                  </label>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section
        ref={emailRef}
        id="ask-for-help"
        className="mb-8 scroll-mt-24 rounded-3xl border border-brand-slate/15 bg-white shadow-sm"
      >
        {complete ? (
          <>
            <div className="rounded-t-3xl bg-brand-deep px-6 py-6 text-white sm:px-8">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-brand-lime">
                  <LifeBuoy size={22} />
                </span>
                <div>
                  <h2 className="text-2xl font-bold">How to ask for help</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
                    You finished the FAQ. Write us at{" "}
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
              </div>
              <div className="flex flex-col justify-center gap-3 rounded-2xl bg-slate-50 p-6 pb-14">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-slate">
                  Support email
                </p>
                <p className="break-all font-mono text-sm font-semibold text-brand-ink">
                  {GS_SUPPORT_EMAIL}
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
            <div className="border-t border-slate-100 px-6 py-5 text-sm text-brand-slate sm:px-8">
              Read the{" "}
              <a
                href={GS_PRIVACY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-blue hover:underline"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href={GS_TERMS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-blue hover:underline"
              >
                Terms of Service
              </a>{" "}
              anytime.
            </div>
          </>
        ) : (
          <div className="rounded-3xl bg-brand-deep px-6 py-10 text-center text-white sm:px-12">
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-brand-lime">
              <Lock size={22} />
            </span>
            <h2 className="text-2xl font-bold sm:text-3xl">Email support is locked</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/70">
              Most answers are in the FAQ above. Open each section, then check that you’ve
              read it. The contact address appears here only after all {total} sections are
              marked.
            </p>
            <p className="mt-5 font-semibold text-brand-lime">
              {hydrated ? readCount : 0} / {total} complete
            </p>
            <a
              href="#faq"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Back to the FAQ
            </a>
          </div>
        )}
      </section>

      {!complete && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-4 pb-4">
          <div className="pointer-events-auto mx-auto flex max-w-xl items-center gap-3 rounded-full border border-brand-slate/15 bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
            <HeartHandshake size={18} className="shrink-0 text-brand-blue" />
            <p className="min-w-0 flex-1 text-xs font-medium text-brand-ink sm:text-sm">
              Read every FAQ section to unlock email — {hydrated ? readCount : 0}/{total}
            </p>
            <a
              href="#faq"
              className="shrink-0 rounded-full bg-brand-deep px-3 py-1.5 text-xs font-semibold text-brand-lime"
            >
              Continue
            </a>
          </div>
        </div>
      )}
    </>
  );
}
