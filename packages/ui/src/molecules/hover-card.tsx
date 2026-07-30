"use client";

import { cn } from "../lib/cn";
import { MOTION_DEFAULTS, type HoverCardMotion } from "../lib/motion";
import { exitDurationForMotion, usePresence } from "../lib/presence";
import {
  eventInside,
  useFloatingPortal,
} from "../lib/use-floating-portal";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

export type HoverCardPlacement = "auto" | "bottom" | "top";
export type HoverCardAlign = "start" | "center" | "end";
export type { HoverCardMotion };

export type HoverCardProps = {
  /** Trigger element (link, avatar, …). */
  trigger: ReactNode;
  /** Preview body. */
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: HoverCardPlacement;
  align?: HoverCardAlign;
  motion?: HoverCardMotion;
  /** Delay before open (ms). */
  openDelay?: number;
  /** Delay before close (ms) — keeps card usable when moving pointer into it. */
  closeDelay?: number;
  "aria-label"?: string;
  className?: string;
  contentClassName?: string;
};

/**
 * Molecule — HoverCard
 * Delayed preview panel (Popover family). Hover/focus open; not a focus trap.
 */
export function HoverCard({
  trigger,
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placement = "auto",
  align = "center",
  motion = MOTION_DEFAULTS.hoverCard,
  openDelay = 280,
  closeDelay = 160,
  "aria-label": ariaLabel,
  className,
  contentClassName,
}: HoverCardProps) {
  const reactId = useId();
  const panelId = `sg-hover-card-${reactId}`;
  const isControlled = openProp !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = isControlled ? openProp : uncontrolled;

  const { mounted: panelMounted, state: panelState } = usePresence(open, {
    durationMs: exitDurationForMotion(motion),
  });

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerWrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const { portalReady, floatingStyle, side } = useFloatingPortal({
    open,
    mounted: panelMounted,
    triggerRef: triggerWrapRef,
    panelRef,
    placement,
    align,
    matchWidth: false,
    flipMinSpace: 180,
  });

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const clearTimers = useCallback(() => {
    if (openTimer.current != null) {
      window.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current != null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleOpen = useCallback(() => {
    clearTimers();
    openTimer.current = window.setTimeout(() => setOpen(true), openDelay);
  }, [clearTimers, openDelay, setOpen]);

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimer.current = window.setTimeout(() => setOpen(false), closeDelay);
  }, [clearTimers, closeDelay, setOpen]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        clearTimers();
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [clearTimers, open, setOpen]);

  // Outside pointer closes (after leave path already scheduled).
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (
        !eventInside(event.target, rootRef.current, panelRef.current)
      ) {
        clearTimers();
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [clearTimers, open, setOpen]);

  return (
    <div className={cn("sg-hover-card-root", className)} ref={rootRef}>
      <div
        ref={triggerWrapRef}
        className="sg-hover-card-trigger"
        data-open={open || undefined}
        onMouseEnter={scheduleOpen}
        onMouseLeave={scheduleClose}
        onFocus={scheduleOpen}
        onBlur={(event) => {
          // Keep open when focus moves into the portaled panel.
          const next = event.relatedTarget as Node | null;
          if (next && panelRef.current?.contains(next)) return;
          scheduleClose();
        }}
      >
        {trigger}
      </div>

      {panelMounted && portalReady
        ? createPortal(
            <div
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-modal="false"
              aria-label={ariaLabel}
              className={cn("sg-hover-card-content", contentClassName)}
              data-placement={side}
              data-align={align}
              data-motion={motion}
              data-state={panelState}
              data-portaled=""
              style={floatingStyle}
              onMouseEnter={scheduleOpen}
              onMouseLeave={scheduleClose}
            >
              {children}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
