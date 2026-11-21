"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  /** Distance in px the element travels up into place. */
  distance?: number;
};

/** Standard scroll reveal: fade and rise once, when the element enters view. */
export function Reveal({ children, delay = 0, distance = 26, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -70px 0px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Heading reveal: each word slides up from behind its own baseline. `accent`
 * is the closing part of the sentence, set in the accent colour.
 */
export function Words({ text, accent }: { text: string; accent?: string }) {
  const plain = text.split(" ").filter(Boolean);
  const tinted = accent ? accent.split(" ").filter(Boolean) : [];

  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ staggerChildren: 0.045 }}
    >
      {[...plain, ...tinted].map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.14em] align-bottom -mb-[0.14em]">
            <motion.span
              className={i >= plain.length ? "inline-block italic text-gold" : "inline-block"}
              variants={{
                hidden: { y: "108%" },
                show: { y: 0, transition: { duration: 0.9, ease: EASE } },
              }}
            >
              {word}
            </motion.span>
          </span>{" "}
        </span>
      ))}
    </motion.span>
  );
}
