"use client";

import { useRef } from "react";
import {
  motion,
  type MotionValue,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";
import { marqueeItems } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Two ribbons of the conditions treated, crossing in an X. They drift on
 * their own, speed up with scroll velocity, flip direction with the scroll,
 * and lean (skew) the harder you scroll.
 */
export function Marquee() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const boost = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const skew = useTransform(smooth, [-2500, 2500], [-7, 7], { clamp: true });

  return (
    <section aria-label="What we teach" className="relative overflow-hidden py-10 sm:py-14">
      <Ribbon
        base={-2.2}
        boost={boost}
        skew={skew}
        className="relative z-10 -rotate-2 bg-accent text-accent-ink shadow-lift"
        dot="text-gold-2 dark:text-accent-ink"
      />
      <Ribbon
        base={1.6}
        boost={boost}
        skew={skew}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 rotate-2 border-y border-fg/10 bg-surface text-fg/70"
        dot="text-gold"
        muted
      />
    </section>
  );
}

function Ribbon({
  base,
  boost,
  skew,
  className,
  dot,
  muted,
}: {
  base: number;
  boost: MotionValue<number>;
  skew: MotionValue<number>;
  className: string;
  dot: string;
  muted?: boolean;
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const b = boost.get();
    // Only a deliberate scroll flips direction, not the spring settling around zero.
    if (b < -0.15) dir.current = -1;
    else if (b > 0.15) dir.current = 1;
    const move = dir.current * base * (delta / 1000) * (1 + Math.abs(b));
    x.set(wrap(-50, 0, x.get() + move));
  });

  const translate = useTransform(x, (v) => `${v}%`);
  // Four copies: shifting by half the strip lands on an identical frame, so the loop is seamless.
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className={cn("w-[110%] -translate-x-[5%] py-4 sm:py-5", className)} aria-hidden={muted}>
      <motion.ul style={{ x: translate, skewX: skew }} className="flex w-max items-center">
        {items.map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="flex items-center gap-7 whitespace-nowrap pr-7"
            aria-hidden={muted || i >= marqueeItems.length}
          >
            <span className={cn("display", muted ? "text-xl italic sm:text-2xl" : "text-2xl sm:text-3xl")}>{item}</span>
            <span aria-hidden className={cn("text-xl", dot)}>✦</span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
