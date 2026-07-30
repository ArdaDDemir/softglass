import { cn } from "../lib/cn";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export type LinkLook = "accent" | "muted" | "subtle" | "underline";

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  /**
   * External link: opens in new tab with rel noopener noreferrer.
   * Also adds a small visual cue when `externalAffordance` is true.
   */
  external?: boolean;
  /** Show “↗” hint for external links. Default true when external. */
  externalAffordance?: boolean;
  look?: LinkLook;
  children?: ReactNode;
};

const lookClass: Record<LinkLook, string> = {
  accent: "",
  muted: "sg-link-muted",
  subtle: "sg-link-subtle",
  underline: "sg-link-underline",
};

/**
 * Atom — Link
 * Text link. Next-friendly: plain <a href>; wrap with next/link as needed.
 */
export function Link({
  className,
  href,
  external = false,
  externalAffordance,
  look = "accent",
  children,
  target,
  rel,
  ...props
}: LinkProps) {
  const showCue = externalAffordance ?? external;
  const resolvedTarget = external ? target ?? "_blank" : target;
  const resolvedRel = external
    ? rel ?? "noopener noreferrer"
    : rel;

  return (
    <a
      href={href}
      className={cn("sg-link", lookClass[look], className)}
      data-look={look}
      target={resolvedTarget}
      rel={resolvedRel}
      {...props}
    >
      {children}
      {showCue ? (
        <span className="sg-link-external" aria-hidden="true">
          {" "}
          ↗
        </span>
      ) : null}
    </a>
  );
}
