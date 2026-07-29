"use client";

import { motion } from "framer-motion";
import { pageVariants } from "@/lib/animations";

/** Reusable Framer Motion animation wrapper for page content. */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.div>
  );
}
