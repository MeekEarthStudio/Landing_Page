"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export const CONTACT_EMAIL = "cbreid3@meekearthstudio.net";

interface Props {
  children: React.ReactNode;
  className?: string;
}

/**
 * Copies the studio contact email to the clipboard and pops a
 * confirmation showing the address (mailto: links silently fail on
 * devices without a configured mail app).
 */
export default function CopyEmailButton({ children, className }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch {
      // Older browsers / non-secure contexts.
      const ta = document.createElement("textarea");
      ta.value = CONTACT_EMAIL;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 3500);
  }

  return (
    <span className="relative inline-flex flex-col items-center">
      <button type="button" onClick={copy} className={className}>
        {children}
      </button>
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
            className="absolute -bottom-12 z-30 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-brand-ink px-4 py-2 text-xs font-semibold text-white shadow-lg"
            role="status"
          >
            <CheckCircle2 size={14} className="text-brand-lime" />
            You copied {CONTACT_EMAIL}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
