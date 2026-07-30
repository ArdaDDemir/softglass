"use client";

import { Button } from "../atoms/button";
import { cn } from "../lib/cn";
import { MOTION_DEFAULTS, type SheetMotion } from "../lib/motion";
import { exitDurationForMotion, usePresence } from "../lib/presence";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

export type SheetSide = "left" | "right" | "bottom";
export type { SheetMotion };

export type SheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  /** Edge the panel attaches to. */
  side?: SheetSide;
  /** Enter / exit: none | slide | fade */
  motion?: SheetMotion;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  panelClassName?: string;
};

/**
 * Molecule — Sheet (Drawer)
 * Edge panel — Modal’s sibling. Portal + presence + focus trap + body scroll lock.
 */
export function Sheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  side = "right",
  motion = MOTION_DEFAULTS.sheet,
  closeOnBackdrop = true,
  closeOnEscape = true,
  className,
  panelClassName,
}: SheetProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [portalReady, setPortalReady] = useState(false);
  const { mounted, exiting, state } = usePresence(open, {
    durationMs: exitDurationForMotion(motion),
  });

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mounted]);

  useEffect(() => {
    if (mounted) return;
    previouslyFocused.current?.focus?.();
  }, [mounted]);

  useEffect(() => {
    if (!open || exiting) return;

    const FOCUSABLE =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusTimer = window.setTimeout(() => {
      const panel = panelRef.current;
      const focusable = panel?.querySelector<HTMLElement>(FOCUSABLE);
      (focusable ?? panel)?.focus();
    }, 0);

    function onKeyDown(event: KeyboardEvent) {
      if (closeOnEscape && event.key === "Escape") {
        event.preventDefault();
        onOpenChange(false);
        return;
      }

      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;

      const nodes = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

      if (nodes.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = nodes[0]!;
      const last = nodes[nodes.length - 1]!;
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !panel.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !panel.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, exiting, closeOnEscape, onOpenChange]);

  if (!mounted || !portalReady) return null;

  return createPortal(
    <div
      className={cn("sg-sheet-root", className)}
      role="presentation"
      data-side={side}
      data-motion={motion}
      data-state={state}
    >
      <button
        type="button"
        className="sg-sheet-backdrop"
        aria-label="Close panel"
        tabIndex={exiting ? -1 : undefined}
        onClick={() => {
          if (exiting) return;
          if (closeOnBackdrop) onOpenChange(false);
        }}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={cn(
          "sg-sheet-panel",
          "sg-surface-solid",
          panelClassName,
        )}
        data-side={side}
        data-state={state}
        data-motion={motion}
      >
        <div className="sg-sheet-header">
          <div className="sg-sheet-heading">
            <h2 id={titleId} className="sg-sheet-title">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="sg-sheet-description">
                {description}
              </p>
            ) : null}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            iconOnly
            className="sg-sheet-close"
            aria-label="Close"
            disabled={exiting}
            onClick={() => onOpenChange(false)}
          >
            ×
          </Button>
        </div>

        {children ? <div className="sg-sheet-body">{children}</div> : null}
        {footer ? <div className="sg-sheet-footer">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}
