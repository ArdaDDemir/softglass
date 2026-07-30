"use client";

import { cn } from "../lib/cn";
import type { CollapsibleLook } from "../lib/looks";
import { MOTION_DEFAULTS, type CollapsibleMotion } from "../lib/motion";
import {
  useId,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type { CollapsibleLook, CollapsibleMotion };

export type CollapsibleProps = HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Trigger label or custom node (button chrome wraps it). */
  trigger: ReactNode;
  /** Panel body. */
  children?: ReactNode;
  disabled?: boolean;
  /** soft | solid | glass | outline */
  look?: CollapsibleLook;
  /** none | fade | height */
  motion?: CollapsibleMotion;
  /** Optional props for the trigger button. */
  triggerProps?: Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "type" | "disabled" | "aria-expanded" | "aria-controls"
  >;
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <span
      className="sg-collapsible-chevron-wrap"
      data-open={open || undefined}
      aria-hidden="true"
    >
      <svg className="sg-collapsible-chevron" viewBox="0 0 20 20" fill="none">
        <path
          d="M5.5 7.75 10 12.25l4.5-4.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * Molecule — Collapsible
 * Single disclosure panel. Controlled (`open`) or uncontrolled (`defaultOpen`).
 */
export function Collapsible({
  className,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  trigger,
  children,
  disabled = false,
  look = "soft",
  motion = MOTION_DEFAULTS.collapsible,
  triggerProps,
  ...props
}: CollapsibleProps) {
  const baseId = useId();
  const contentId = `${baseId}-content`;
  const isControlled = openProp !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = isControlled ? openProp : uncontrolled;

  function setOpen(next: boolean) {
    if (disabled) return;
    if (!isControlled) setUncontrolled(next);
    onOpenChange?.(next);
  }

  const {
    className: triggerClassName,
    onClick: triggerOnClick,
    ...restTrigger
  } = triggerProps ?? {};

  return (
    <div
      className={cn("sg-collapsible", className)}
      data-look={look}
      data-motion={motion}
      data-state={open ? "open" : "closed"}
      data-disabled={disabled || undefined}
      {...props}
    >
      <button
        type="button"
        className={cn("sg-collapsible-trigger", triggerClassName)}
        aria-expanded={open}
        aria-controls={contentId}
        disabled={disabled}
        data-state={open ? "open" : "closed"}
        onClick={(event) => {
          triggerOnClick?.(event);
          if (event.defaultPrevented) return;
          setOpen(!open);
        }}
        {...restTrigger}
      >
        <span className="sg-collapsible-trigger-label">{trigger}</span>
        <ChevronIcon open={open} />
      </button>
      {/* Closed = unmounted (hidden) — cheap; avoid always-on height grids */}
      <div
        id={contentId}
        className="sg-collapsible-panel"
        data-state={open ? "open" : "closed"}
        hidden={!open}
      >
        <div className="sg-collapsible-content">{children}</div>
      </div>
    </div>
  );
}
