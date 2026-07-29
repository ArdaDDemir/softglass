"use client";

import { cn } from "../lib/cn";
import type { TooltipLook } from "../lib/looks";
import { MOTION_DEFAULTS, type TooltipMotion } from "../lib/motion";
import {
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type TooltipPlacement = "top" | "bottom";
export type { TooltipLook, TooltipMotion };

export type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  placement?: TooltipPlacement;
  /** Design: frost | solid | accent */
  look?: TooltipLook;
  /** Enter motion: none | fade | scale | slide */
  motion?: TooltipMotion;
  enabled?: boolean;
  className?: string;
  contentClassName?: string;
  delayMs?: number;
} & Omit<HTMLAttributes<HTMLSpanElement>, "content" | "children">;

/**
 * Atom — Tooltip
 * Lightweight frost tooltip on hover/focus. Keep copy short.
 */
export function Tooltip({
  content,
  children,
  placement = "top",
  look = "frost",
  motion = MOTION_DEFAULTS.tooltip,
  enabled = true,
  className,
  contentClassName,
  delayMs = 80,
  ...props
}: TooltipProps) {
  const tipId = useId();
  const [open, setOpen] = useState(false);
  const timerRef = useRef<number | null>(null);

  function show() {
    if (!enabled) return;
    if (timerRef.current != null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setOpen(true), delayMs);
  }

  function hide() {
    if (timerRef.current != null) window.clearTimeout(timerRef.current);
    timerRef.current = null;
    setOpen(false);
  }

  return (
    <span
      className={cn("sg-tooltip-wrap", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      {...props}
    >
      <span aria-describedby={open ? tipId : undefined}>{children}</span>
      <span
        id={tipId}
        role="tooltip"
        className={cn("sg-tooltip", contentClassName)}
        data-placement={placement}
        data-look={look === "frost" ? undefined : look}
        data-motion={motion}
        data-open={open || undefined}
      >
        {content}
        <span className="sg-tooltip-arrow" aria-hidden />
      </span>
    </span>
  );
}
