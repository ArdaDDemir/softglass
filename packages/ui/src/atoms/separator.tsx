import { cn } from "../lib/cn";
import type { HTMLAttributes } from "react";

export type SeparatorOrientation = "horizontal" | "vertical";

export type SeparatorProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: SeparatorOrientation;
  /** When true, decorative only (no accessibility role). */
  decorative?: boolean;
};

/**
 * Atom — Separator
 * Soft hairline divider for forms, cards, and toolbars.
 */
export function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <div
      className={cn(
        "sg-separator",
        orientation === "vertical" && "sg-separator-vertical",
        className,
      )}
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      {...props}
    />
  );
}
