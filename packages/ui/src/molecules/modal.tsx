"use client";

import { Button } from "../atoms/button";
import { cn } from "../lib/cn";
import { MOTION_DEFAULTS, type ModalMotion } from "../lib/motion";
import { exitDurationForMotion, usePresence } from "../lib/presence";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

export type ModalSize = "md" | "lg";
export type { ModalMotion };

export type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  /** Enter / exit motion: none | scale | fade | slide-up */
  motion?: ModalMotion;
  /** Close when backdrop is clicked (default true). */
  closeOnBackdrop?: boolean;
  /** Close on Escape (default true). */
  closeOnEscape?: boolean;
  className?: string;
  panelClassName?: string;
};

/**
 * Molecule — Modal
 * Glass elevated dialog over a frosted backdrop.
 * Portaled to `document.body`. Enter + exit via `data-state` + motion recipes.
 */
export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
  motion = MOTION_DEFAULTS.modal,
  closeOnBackdrop = true,
  closeOnEscape = true,
  className,
  panelClassName,
}: ModalProps) {
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

  // Capture focus origin when opening.
  useEffect(() => {
    if (!open) return;
    previouslyFocused.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
  }, [open]);

  // Body scroll lock for entire presence (including exit).
  useEffect(() => {
    if (!mounted) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mounted]);

  // Restore focus after unmount.
  useEffect(() => {
    if (mounted) return;
    previouslyFocused.current?.focus?.();
  }, [mounted]);

  // Focus trap + Escape only while fully open (not exiting).
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
      className={cn("sg-modal-root", className)}
      role="presentation"
      data-motion={motion}
      data-state={state}
    >
      <button
        type="button"
        className="sg-modal-backdrop"
        aria-label="Close dialog"
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
          "sg-modal-panel",
          "sg-surface-glass-elevated",
          size === "lg" && "sg-modal-panel-lg",
          panelClassName,
        )}
      >
        <div className="sg-modal-header">
          <div>
            <h2 id={titleId} className="sg-modal-title">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="sg-modal-description">
                {description}
              </p>
            ) : null}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            iconOnly
            className="sg-modal-close"
            aria-label="Close"
            disabled={exiting}
            onClick={() => onOpenChange(false)}
          >
            ×
          </Button>
        </div>

        {children ? <div className="sg-modal-body">{children}</div> : null}

        {footer ? <div className="sg-modal-footer">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}

export type ModalFooterProps = HTMLAttributes<HTMLDivElement>;

export function ModalFooter({
  className,
  children,
  ...props
}: ModalFooterProps) {
  return (
    <div className={cn("sg-modal-footer", className)} {...props}>
      {children}
    </div>
  );
}
