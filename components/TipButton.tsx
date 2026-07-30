"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

const TIP_URL = "https://buy.stripe.com/fZuaEZ64mgFO4FZ2N10ZW00";

interface Props {
  /** Reveal the button (e.g. after a song/video plays or an article is read). */
  show?: boolean;
  message?: string;
}

/** Tip prompt that appears after an interaction; links to the secure Stripe tip page. */
export default function TipButton({ show = true, message = "Enjoying this? Leave a tip" }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-4 flex justify-center"
        >
          <a
            href={TIP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-lime to-brand-blue px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-lime/25 transition hover:brightness-110"
          >
            <Heart size={15} className="fill-current" />
            {message}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
