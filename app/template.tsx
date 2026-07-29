"use client";

import PageTransition from "@/components/PageTransition";

/** Framer Motion page-transition wrapper applied to every route. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
