import { cn } from "../lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

export type VisuallyHiddenProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode;
  /** Render as a different element when needed (e.g. legend). Default span. */
  as?: "span" | "div" | "legend";
};

/**
 * Atom — VisuallyHidden
 * Hide content visually while keeping it available to assistive tech.
 */
export function VisuallyHidden({
  className,
  as: Comp = "span",
  children,
  ...props
}: VisuallyHiddenProps) {
  return (
    <Comp className={cn("sg-visually-hidden", className)} {...props}>
      {children}
    </Comp>
  );
}
