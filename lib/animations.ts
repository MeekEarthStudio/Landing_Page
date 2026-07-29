// Page transition animation presets for Framer Motion.
import type { Variants, Transition } from "framer-motion";

export const pageTransition: Transition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
};

/** Default page enter/exit: fade + rise with a subtle scale settle. */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 24, scale: 0.995 },
  enter: { opacity: 1, y: 0, scale: 1, transition: pageTransition },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: "easeIn" } },
};

/** Staggered reveal for hero sections and card grids. */
export const staggerContainer: Variants = {
  initial: {},
  enter: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: pageTransition },
};

/** Green→blue gradient sweep used on players and CTAs. */
export const gradientSweep: Variants = {
  initial: { backgroundPosition: "0% 50%" },
  enter: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: { duration: 8, repeat: Infinity, ease: "linear" },
  },
};
