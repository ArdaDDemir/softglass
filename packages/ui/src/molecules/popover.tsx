"use client";

import { cn } from "../lib/cn";
import { MOTION_DEFAULTS, type PopoverMotion } from "../lib/motion";
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

export type PopoverPlacement = "auto" | "bottom" | "top";
export type PopoverAlign = "start" | "center" | "end";
export type { PopoverMotion };

export type PopoverProps = {
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial open. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Trigger control (usually a Button). */
  trigger: ReactNode;
  /** Panel body. */
  children: ReactNode;
  placement?: PopoverPlacement;
  align?: PopoverAlign;
  /** Panel enter motion: none | fade | scale | slide-down */
  motion?: PopoverMotion;
  closeOnOutside?: boolean;
  closeOnEscape?: boolean;
  /** Accessible name when content has no heading. */
  "aria-label"?: string;
  className?: string;
  contentClassName?: string;
};

/**
 * Molecule — Popover
 * Floating frost panel anchored to a trigger. Not a menu (use DropdownMenu).
 * Portaled to body with viewport collision. Escape + outside click by default.
 * No focus trap (non-modal).
 */
export function Popover({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  trigger,
  children,
  placement = "auto",
  align = "start",
  motion = MOTION_DEFAULTS.popover,
  closeOnOutside = true,
  closeOnEscape = true,
  "aria-label": ariaLabel,
  className,
  contentClassName,
}: PopoverProps) {
  const reactId = useId();
  const panelId = `sg-popover-${reactId}`;
  const isControlled = openProp !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = isControlled ? openProp : uncontrolled;

  const { mounted: panelMounted, exiting: panelExiting, state: panelState } =
    usePresence(open, { durationMs: exitDurationForMotion(motion) });
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerWrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const { portalReady, floatingStyle, side } = useFloatingPortal({
    open,
    mounted: panelMounted,
    triggerRef: triggerWrapRef,
    panelRef,
    placement,
    align,
    matchWidth: false,
    flipMinSpace: 200,
  });

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const openPanel = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const closePanel = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const toggle = useCallback(() => {
    if (open) closePanel();
    else openPanel();
  }, [closePanel, open, openPanel]);

  useEffect(() => {
    if (!open || panelExiting) return;

    function onPointerDown(event: MouseEvent) {
      if (!closeOnOutside) return;
      if (
        !eventInside(
          event.target,
          rootRef.current,
          panelRef.current,
        )
      ) {
        closePanel();
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (closeOnEscape && event.key === "Escape") {
        event.preventDefault();
        closePanel();
        const btn = triggerWrapRef.current?.querySelector<HTMLElement>(
          "button, [href], [tabindex]:not([tabindex='-1'])",
        );
        btn?.focus();
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeOnEscape, closeOnOutside, closePanel, open, panelExiting]);

  return (
    <div className={cn("sg-popover-root", className)} ref={rootRef}>
      <div
        ref={triggerWrapRef}
        className="sg-popover-trigger"
        data-open={open || undefined}
        onClick={(event) => {
          if (panelExiting) return;
          const target = event.target as HTMLElement;
          if (
            target.closest("button, a, [role='button']") ||
            target === event.currentTarget
          ) {
            toggle();
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" && !open) {
            event.preventDefault();
            openPanel();
          }
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
              className={cn("sg-popover-content", contentClassName)}
              data-placement={side}
              data-align={align}
              data-motion={motion}
              data-state={panelState}
              data-portaled=""
              style={floatingStyle}
            >
              {children}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
