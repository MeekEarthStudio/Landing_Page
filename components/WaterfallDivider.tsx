"use client";

import { motion } from "framer-motion";

/**
 * Decorative waterfall between page sections — thin streams of the
 * brand gradient cascade downward as the divider scrolls into view.
 */
export default function WaterfallDivider() {
  const streams = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div aria-hidden className="relative mx-auto h-36 w-full max-w-3xl overflow-hidden">
      {streams.map((i) => (
        <motion.span
          key={i}
          className="absolute top-0 w-0.5 rounded-full bg-gradient-to-b from-transparent via-brand-lime to-brand-blue"
          style={{ left: `${6 + i * 11}%`, height: "55%" }}
          initial={{ y: "-110%" }}
          whileInView={{ y: ["-110%", "200%"] }}
          viewport={{ margin: "-40px" }}
          transition={{
            duration: 1.4 + (i % 3) * 0.5,
            repeat: Infinity,
            ease: "easeIn",
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}
