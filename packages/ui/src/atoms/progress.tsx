import { cn } from "../lib/cn";
import type { ProgressLook } from "../lib/looks";
import type { HTMLAttributes } from "react";

export type ProgressSize = "sm" | "md" | "lg";
export type ProgressVariant =
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "muted";
export type { ProgressLook };

export type ProgressProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Progress value. Omit (or pass `null`) for indeterminate.
   * Clamped to [0, max] when numeric.
   */
  value?: number | null;
  /** Upper bound for `value`. Default 100. */
  max?: number;
  size?: ProgressSize;
  /** Accessible name when no visible label is provided. */
  label?: string;
  /**
   * Track / fill chrome: soft | solid | glass | accent | striped
   */
  look?: ProgressLook;
  /**
   * Semantic fill color (independent of look).
   */
  variant?: ProgressVariant;
};

const sizeClass: Record<ProgressSize, string> = {
  sm: "sg-progress-sm",
  md: "",
  lg: "sg-progress-lg",
};

const lookClass: Record<ProgressLook, string> = {
  soft: "",
  solid: "sg-progress-look-solid",
  glass: "sg-progress-look-glass",
  accent: "sg-progress-look-accent",
  striped: "sg-progress-look-striped",
};

const variantClass: Record<ProgressVariant, string> = {
  accent: "",
  success: "sg-progress-success",
  warning: "sg-progress-warning",
  danger: "sg-progress-danger",
  muted: "sg-progress-muted",
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * Atom — Progress
 * Linear progress bar: determinate (`value`) or indeterminate (omit value).
 */
export function Progress({
  className,
  value,
  max = 100,
  size = "md",
  label = "Progress",
  look = "soft",
  variant = "accent",
  ...props
}: ProgressProps) {
  const safeMax = max > 0 ? max : 100;
  const determinate =
    typeof value === "number" && Number.isFinite(value);
  const clamped = determinate ? clamp(value, 0, safeMax) : 0;
  const percent = determinate ? (clamped / safeMax) * 100 : 0;

  return (
    <div
      className={cn(
        "sg-progress",
        sizeClass[size],
        lookClass[look],
        variantClass[variant],
        !determinate && "sg-progress-indeterminate",
        className,
      )}
      role="progressbar"
      aria-label={label}
      aria-valuemin={determinate ? 0 : undefined}
      aria-valuemax={determinate ? safeMax : undefined}
      aria-valuenow={determinate ? clamped : undefined}
      data-look={look}
      data-variant={variant}
      data-state={determinate ? "determinate" : "indeterminate"}
      {...props}
    >
      <div className="sg-progress-track" aria-hidden="true">
        <div
          className="sg-progress-fill"
          style={determinate ? { width: `${percent}%` } : undefined}
        />
      </div>
    </div>
  );
}
