import { cn } from "../lib/cn";
import type { HTMLAttributes } from "react";

export type SpinnerSize = "sm" | "md" | "lg";

export type SpinnerProps = HTMLAttributes<HTMLSpanElement> & {
  size?: SpinnerSize;
  /** Accessible label announced by screen readers. */
  label?: string;
};

const sizeClass: Record<SpinnerSize, string> = {
  sm: "sg-spinner-sm",
  md: "",
  lg: "sg-spinner-lg",
};

/**
 * Atom — Spinner
 * Standalone loading indicator (Button uses its own internal spinner).
 */
export function Spinner({
  className,
  size = "md",
  label = "Loading",
  ...props
}: SpinnerProps) {
  return (
    <span
      className={cn("sg-spinner", sizeClass[size], className)}
      role="status"
      aria-label={label}
      {...props}
    >
      <span className="sg-spinner-visual" aria-hidden="true" />
    </span>
  );
}
