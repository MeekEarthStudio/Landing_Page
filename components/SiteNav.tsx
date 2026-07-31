"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "/music", label: "Music" },
  { href: "/documentary", label: "Documentary" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

/** Site navigation: inline links on desktop, hamburger dropdown on mobile. */
export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the dropdown whenever navigation happens.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop */}
      <nav className="hidden items-center gap-6 text-sm font-medium text-brand-slate md:flex">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="transition hover:text-brand-blue">
            {item.label}
          </Link>
        ))}
        <Link
          href="/music"
          className="rounded-full bg-brand-lime px-4 py-2 font-semibold text-brand-deep transition hover:brightness-110"
        >
          Listen now
        </Link>
      </nav>

      {/* Mobile */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="rounded-lg p-2 text-brand-ink transition hover:bg-slate-100 md:hidden"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full border-b border-slate-100 bg-white shadow-lg md:hidden"
          >
            <div className="flex flex-col px-4 py-3">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 font-medium text-brand-ink transition hover:bg-brand-lime/10 hover:text-brand-blue"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/music"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-brand-lime px-4 py-3 text-center font-semibold text-brand-deep transition hover:brightness-110"
              >
                Listen now
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
