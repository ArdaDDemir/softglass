import { cn } from "../lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

export type MeterLook = "soft" | "solid" | "glass" | "striped";
export type MeterVariant =
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "muted";

export type MeterProps = HTMLAttributes<HTMLDivElement> & {
  value: number;
  min?: number;
  max?: number;
  look?: MeterLook;
  variant?: MeterVariant;
  /** Optional label above the bar. */
  label?: ReactNode;
  showValue?: boolean;
};

const lookClass: Record<MeterLook, string> = {
  soft: "",
  solid: "sg-meter-look-solid",
  glass: "sg-meter-look-glass",
  striped: "sg-meter-look-striped",
};

const variantClass: Record<MeterVariant, string> = {
  accent: "",
  success: "sg-meter-success",
  warning: "sg-meter-warning",
  danger: "sg-meter-danger",
  muted: "sg-meter-muted",
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * Atom — Meter
 * Read-only scalar bar (HTML meter semantics). Not Progress (no indeterminate).
 */
export function Meter({
  className,
  value,
  min = 0,
  max = 100,
  look = "soft",
  variant = "accent",
  label,
  showValue = true,
  ...props
}: MeterProps) {
  const safeMax = max > min ? max : min + 1;
  const clamped = clamp(value, min, safeMax);
  const percent = ((clamped - min) / (safeMax - min)) * 100;

  return (
    <div
      className={cn(
        "sg-meter",
        lookClass[look],
        variantClass[variant],
        className,
      )}
      data-look={look}
      data-variant={variant}
      {...props}
    >
      {(label || showValue) && (
        <div className="sg-meter-header">
          {label ? <span className="sg-meter-label">{label}</span> : <span />}
          {showValue ? (
            <span className="sg-meter-value" aria-hidden="true">
              {Math.round(percent)}%
            </span>
          ) : null}
        </div>
      )}
      <div
        className="sg-meter-track"
        role="meter"
        aria-valuemin={min}
        aria-valuemax={safeMax}
        aria-valuenow={clamped}
        aria-label={typeof label === "string" ? label : "Meter"}
      >
        <div
          className="sg-meter-fill"
          style={{ width: `${percent}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
