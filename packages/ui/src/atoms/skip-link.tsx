import { cn } from "../lib/cn";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export type SkipLinkLook = "solid" | "soft" | "outline" | "glass";
export type SkipLinkPlacement = "start" | "center" | "end";

export type SkipLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
  children?: ReactNode;
  /** Visual language when revealed. */
  look?: SkipLinkLook;
  /** Horizontal placement (fixed to viewport). */
  placement?: SkipLinkPlacement;
  /**
   * Always show the control (docs / story demos).
   * Production apps leave this false — visible only on keyboard focus.
   */
  alwaysVisible?: boolean;
};

const lookClass: Record<SkipLinkLook, string> = {
  solid: "",
  soft: "sg-skip-link-look-soft",
  outline: "sg-skip-link-look-outline",
  glass: "sg-skip-link-look-glass",
};

const placementClass: Record<SkipLinkPlacement, string> = {
  start: "sg-skip-link-start",
  center: "sg-skip-link-center",
  end: "sg-skip-link-end",
};

/**
 * Atom — SkipLink
 * Skip-to-content control. Hidden until focused (or alwaysVisible for demos).
 * Uses clip-based hide so overflow parents cannot “eat” it.
 */
export function SkipLink({
  className,
  href = "#main",
  children = "Skip to content",
  look = "solid",
  placement = "start",
  alwaysVisible = false,
  ...props
}: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "sg-skip-link",
        lookClass[look],
        placementClass[placement],
        alwaysVisible && "sg-skip-link-visible",
        className,
      )}
      data-look={look}
      data-placement={placement}
      data-always-visible={alwaysVisible || undefined}
      {...props}
    >
      {children}
    </a>
  );
}
