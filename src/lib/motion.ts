import type { Variants } from "framer-motion"

// §6.3 — stagger container + item for grids and lists
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
}

// §6.4 — wordmark char-by-char (apply per character with custom delay)
export function charVariant(index: number): Variants {
  return {
    hidden: { opacity: 0, y: 36, filter: "blur(6px)", skewY: 5 },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      skewY: 0,
      transition: {
        duration: 0.65,
        delay: index * 0.065 + 0.18,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }
}

// §6.5 — project card hover
export const cardHover = {
  whileHover: { y: -4, transition: { duration: 0.2 } },
  whileTap: { scale: 0.98 },
}

// §6.6 — nav entrance
export const navEntrance: Variants = {
  hidden: { y: "-100%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}
