import { cn } from "../lib/cn";
import type { StatLook } from "../lib/looks";
import type { HTMLAttributes, ReactNode } from "react";

export type { StatLook };

export type StatTrend = "up" | "down" | "flat";
export type StatSize = "sm" | "md" | "lg";

export type StatProps = HTMLAttributes<HTMLElement> & {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
  /** Optional icon / mark above label. */
  icon?: ReactNode;
  trend?: StatTrend;
  trendLabel?: ReactNode;
  /** solid · soft · glass · outline · accent */
  look?: StatLook;
  size?: StatSize;
  as?: "div" | "article" | "section";
};

/**
 * Molecule — Stat
 * KPI tile with distinct look recipes (accent rail, glass, outline…).
 */
export function Stat({
  className,
  label,
  value,
  hint,
  icon,
  trend,
  trendLabel,
  look = "solid",
  size = "md",
  as: Comp = "article",
  ...props
}: StatProps) {
  return (
    <Comp
      className={cn("sg-stat", className)}
      data-look={look}
      data-size={size === "md" ? undefined : size}
      data-trend={trend}
      {...props}
    >
      {icon ? (
        <div className="sg-stat-icon" aria-hidden="true">
          {icon}
        </div>
      ) : null}
      <div className="sg-stat-label">{label}</div>
      <div className="sg-stat-value-row">
        <div className="sg-stat-value">{value}</div>
        {trend || trendLabel ? (
          <span
            className="sg-stat-trend"
            data-trend={trend}
            aria-label={
              typeof trendLabel === "string"
                ? `Trend ${trendLabel}`
                : trend
                  ? `Trend ${trend}`
                  : undefined
            }
          >
            {trend === "up" ? (
              <span className="sg-stat-trend-arrow" aria-hidden>
                ↑
              </span>
            ) : null}
            {trend === "down" ? (
              <span className="sg-stat-trend-arrow" aria-hidden>
                ↓
              </span>
            ) : null}
            {trend === "flat" ? (
              <span className="sg-stat-trend-arrow" aria-hidden>
                →
              </span>
            ) : null}
            {trendLabel ? (
              <span className="sg-stat-trend-label">{trendLabel}</span>
            ) : null}
          </span>
        ) : null}
      </div>
      {hint ? <div className="sg-stat-hint">{hint}</div> : null}
    </Comp>
  );
}
