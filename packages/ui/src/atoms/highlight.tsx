import { cn } from "../lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

export type HighlightLook = "soft" | "solid" | "accent" | "warning";

export type HighlightProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  look?: HighlightLook;
};

const lookClass: Record<HighlightLook, string> = {
  soft: "",
  solid: "sg-highlight-look-solid",
  accent: "sg-highlight-look-accent",
  warning: "sg-highlight-look-warning",
};

/**
 * Atom — Highlight
 * Inline mark for search matches / emphasis.
 */
export function Highlight({
  className,
  children,
  look = "soft",
  ...props
}: HighlightProps) {
  return (
    <mark
      className={cn("sg-highlight", lookClass[look], className)}
      data-look={look}
      {...props}
    >
      {children}
    </mark>
  );
}
