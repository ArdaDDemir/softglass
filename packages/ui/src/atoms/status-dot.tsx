import { cn } from "../lib/cn";
import type { StatusDotLook } from "../lib/looks";
import type { CSSProperties, HTMLAttributes } from "react";

export type StatusDotStatus = "online" | "busy" | "offline" | "away";
export type StatusDotSize = "sm" | "md" | "lg";
export type { StatusDotLook };

export type StatusDotProps = HTMLAttributes<HTMLSpanElement> & {
  /**
   * Semantic presence. Maps to token colors.
   * For a free color, pass `color` instead (or together — `color` wins).
   */
  status?: StatusDotStatus;
  size?: StatusDotSize;
  /**
   * Chrome language: soft | solid | outline | glow
   */
  look?: StatusDotLook;
  /**
   * Custom CSS color (hex/rgb/var). Overrides semantic `status` fill.
   */
  color?: string;
  /**
   * Soft pulse ring (presence “live”). Default on for `online` only;
   * pass boolean to force on/off for any status.
   */
  pulse?: boolean;
  /** Accessible name. Defaults from `status` or "Status". */
  label?: string;
};

const statusClass: Record<StatusDotStatus, string> = {
  online: "sg-status-dot-online",
  busy: "sg-status-dot-busy",
  offline: "sg-status-dot-offline",
  away: "sg-status-dot-away",
};

const sizeClass: Record<StatusDotSize, string> = {
  sm: "sg-status-dot-sm",
  md: "",
  lg: "sg-status-dot-lg",
};

const lookClass: Record<StatusDotLook, string> = {
  soft: "",
  solid: "sg-status-dot-look-solid",
  outline: "sg-status-dot-look-outline",
  glow: "sg-status-dot-look-glow",
};

const defaultLabel: Record<StatusDotStatus, string> = {
  online: "Online",
  busy: "Busy",
  offline: "Offline",
  away: "Away",
};

/**
 * Atom — StatusDot
 * Tiny presence indicator (online / busy / offline / away + custom color).
 */
export function StatusDot({
  className,
  status = "online",
  size = "md",
  look = "soft",
  color,
  pulse,
  label,
  style,
  ...props
}: StatusDotProps) {
  const shouldPulse = pulse ?? status === "online";
  const resolvedLabel = label ?? defaultLabel[status] ?? "Status";

  const inline: CSSProperties | undefined = color
    ? { ...style, ["--sg-status-dot-color" as string]: color }
    : style;

  return (
    <span
      className={cn(
        "sg-status-dot",
        !color && statusClass[status],
        color && "sg-status-dot-custom",
        sizeClass[size],
        lookClass[look],
        shouldPulse && "sg-status-dot-pulse",
        className,
      )}
      role="status"
      aria-label={resolvedLabel}
      data-status={status}
      data-look={look}
      style={inline}
      {...props}
    >
      <span className="sg-status-dot-core" aria-hidden="true" />
    </span>
  );
}
