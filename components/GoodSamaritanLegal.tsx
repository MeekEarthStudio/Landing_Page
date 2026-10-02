import type { ReactNode } from "react";
import Link from "next/link";

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-brand-ink">{title}</h2>
      <div className="mt-3 space-y-4 text-sm leading-relaxed text-brand-slate">{children}</div>
    </section>
  );
}

export function LegalPage({
  kicker,
  title,
  meta,
  children,
}: {
  kicker: string;
  title: string;
  meta: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 pb-28">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
        {kicker}
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-brand-ink">{title}</h1>
      <p className="mt-3 text-sm text-brand-slate">{meta}</p>
      {children}
      <p className="mt-12 text-sm text-brand-slate">
        <Link href="/good-samaritan" className="font-semibold text-brand-blue hover:underline">
          ← Back to Good Samaritan
        </Link>
      </p>
    </article>
  );
}
