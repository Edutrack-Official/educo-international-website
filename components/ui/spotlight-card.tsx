"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Card that leans towards the pointer, with a soft accent light following it. The position is
 * written straight to CSS variables, so moving the mouse never re-renders.
 */
export function SpotlightCard({ children, className }: { children: ReactNode; className?: string }) {
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
    e.currentTarget.style.setProperty("--rx", `${(0.5 - (e.clientY - rect.top) / rect.height) * 7}deg`);
    e.currentTarget.style.setProperty("--ry", `${((e.clientX - rect.left) / rect.width - 0.5) * 7}deg`);
  };

  const onLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "group/spot relative overflow-hidden rounded-3xl border border-fg/10 bg-surface shadow-card [transform:perspective(900px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] transition-[transform,translate,scale,rotate,border-color,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lift",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), color-mix(in oklab, var(--accent) 13%, transparent), transparent 65%)",
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
