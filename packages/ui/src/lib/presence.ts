"use client";

import { useEffect, useState } from "react";

/**
 * Unmount delay so CSS exit animations can finish.
 * Keep in sync with token exit durations (~`--sg-duration-normal` / motion-med).
 */
export const EXIT_DURATION_MS = 200;

export type PresenceOptions = {
  /** 0 = unmount immediately (motion="none" or reduced-motion). */
  durationMs?: number;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Map motion recipe → exit hold time. */
export function exitDurationForMotion(motion: string | undefined): number {
  if (motion === "none") return 0;
  if (prefersReducedMotion()) return 0;
  return EXIT_DURATION_MS;
}

/**
 * Keep a node mounted while `open` is true **and** briefly after it becomes false
 * so exit keyframes can play. Mirrors Radix presence / `data-state` pattern.
 */
export function usePresence(open: boolean, options?: PresenceOptions) {
  const durationMs = options?.durationMs ?? EXIT_DURATION_MS;
  const [mounted, setMounted] = useState(open);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setExiting(false);
      return;
    }

    if (!mounted) return;

    if (durationMs <= 0) {
      setMounted(false);
      setExiting(false);
      return;
    }

    setExiting(true);
    const id = window.setTimeout(() => {
      setMounted(false);
      setExiting(false);
    }, durationMs);

    return () => window.clearTimeout(id);
  }, [open, durationMs, mounted]);

  return {
    /** Still in the DOM (open or playing exit). */
    mounted,
    /** Exit animation should run. */
    exiting,
    /** For `data-state`: open while interactive, closed while exiting. */
    state: (open && !exiting ? "open" : "closed") as "open" | "closed",
  };
}
