"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/good-samaritan", label: "Overview", exact: true },
  { href: "/good-samaritan/support", label: "Support" },
  { href: "/good-samaritan/privacy", label: "Privacy" },
  { href: "/good-samaritan/terms", label: "Terms" },
];

export default function GoodSamaritanSubnav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-slate-100 bg-white/80 backdrop-blur">
      <nav
        aria-label="Good Samaritan"
        className="mx-auto flex max-w-5xl flex-wrap gap-1 px-4 py-3"
      >
        {LINKS.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                active
                  ? "bg-brand-deep text-brand-lime"
                  : "text-brand-slate hover:bg-slate-100 hover:text-brand-ink"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
