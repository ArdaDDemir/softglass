import { cn } from "../lib/cn";
import type { HTMLAttributes } from "react";

export type CircularProgressSize = "sm" | "md" | "lg";
export type CircularProgressVariant =
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "muted";
export type CircularProgressLook = "soft" | "solid" | "glass" | "accent";

export type CircularProgressProps = HTMLAttributes<HTMLDivElement> & {
  /** 0…max. Omit / null → indeterminate spin. */
  value?: number | null;
  max?: number;
  size?: CircularProgressSize;
  variant?: CircularProgressVariant;
  /** Track chrome: soft | solid | glass | accent */
  look?: CircularProgressLook;
  /** Show percent text in the center when determinate. Default true. */
  showValue?: boolean;
  label?: string;
};

const sizePx: Record<CircularProgressSize, number> = {
  sm: 36,
  md: 48,
  lg: 64,
};

const strokeW: Record<CircularProgressSize, number> = {
  sm: 3,
  md: 4,
  lg: 5,
};

const variantClass: Record<CircularProgressVariant, string> = {
  accent: "",
  success: "sg-circular-progress-success",
  warning: "sg-circular-progress-warning",
  danger: "sg-circular-progress-danger",
  muted: "sg-circular-progress-muted",
};

const lookClass: Record<CircularProgressLook, string> = {
  soft: "",
  solid: "sg-circular-progress-look-solid",
  glass: "sg-circular-progress-look-glass",
  accent: "sg-circular-progress-look-accent",
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * Atom — CircularProgress
 * Ring progress: determinate value or indeterminate spin.
 */
export function CircularProgress({
  className,
  value,
  max = 100,
  size = "md",
  variant = "accent",
  look = "soft",
  showValue = true,
  label = "Progress",
  ...props
}: CircularProgressProps) {
  const safeMax = max > 0 ? max : 100;
  const determinate = typeof value === "number" && Number.isFinite(value);
  const clamped = determinate ? clamp(value, 0, safeMax) : 0;
  const percent = determinate ? Math.round((clamped / safeMax) * 100) : 0;

  const dim = sizePx[size];
  const stroke = strokeW[size];
  const r = (dim - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = determinate ? c - (percent / 100) * c : c * 0.75;

  return (
    <div
      className={cn(
        "sg-circular-progress",
        `sg-circular-progress-${size}`,
        variantClass[variant],
        lookClass[look],
        !determinate && "sg-circular-progress-indeterminate",
        className,
      )}
      role="progressbar"
      aria-label={label}
      aria-valuemin={determinate ? 0 : undefined}
      aria-valuemax={determinate ? safeMax : undefined}
      aria-valuenow={determinate ? clamped : undefined}
      data-state={determinate ? "determinate" : "indeterminate"}
      data-variant={variant}
      data-look={look}
      style={{ width: dim, height: dim }}
      {...props}
    >
      <svg
        className="sg-circular-progress-svg"
        width={dim}
        height={dim}
        viewBox={`0 0 ${dim} ${dim}`}
        aria-hidden="true"
      >
        <circle
          className="sg-circular-progress-track"
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
        />
        <circle
          className="sg-circular-progress-fill"
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      {determinate && showValue ? (
        <span className="sg-circular-progress-value" aria-hidden="true">
          {percent}
        </span>
      ) : null}
    </div>
  );
}
