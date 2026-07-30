"use client";

import { cn } from "../lib/cn";
import {
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type RatingLook = "soft" | "solid" | "outline" | "glass" | "glow";
export type RatingSize = "sm" | "md" | "lg";
export type RatingColor = "gold" | "accent" | "rose";

export type RatingProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> & {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  /** Max stars. Default 5. */
  max?: number;
  size?: RatingSize;
  look?: RatingLook;
  /** Fill palette for active stars. */
  color?: RatingColor;
  /** Read-only display. */
  readOnly?: boolean;
  disabled?: boolean;
  label?: string;
  /** Show numeric value next to stars (e.g. 4.0). */
  showValue?: boolean;
  /**
   * Clicking the current value again clears to 0.
   * Default true when interactive.
   */
  clearable?: boolean;
  /** Optional leading label text inside the shell. */
  caption?: ReactNode;
};

const sizeClass: Record<RatingSize, string> = {
  sm: "sg-rating-sm",
  md: "",
  lg: "sg-rating-lg",
};

const lookClass: Record<RatingLook, string> = {
  soft: "",
  solid: "sg-rating-look-solid",
  outline: "sg-rating-look-outline",
  glass: "sg-rating-look-glass",
  glow: "sg-rating-look-glow",
};

const colorClass: Record<RatingColor, string> = {
  gold: "",
  accent: "sg-rating-color-accent",
  rose: "sg-rating-color-rose",
};

function StarGlyph({ active }: { active: boolean }) {
  return (
    <svg
      className="sg-rating-svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className={cn(
          "sg-rating-svg-path",
          active ? "sg-rating-svg-path-on" : "sg-rating-svg-path-off",
        )}
        d="M12 2.5l2.74 5.55 6.13.89-4.43 4.32 1.05 6.11L12 16.48l-5.49 2.89 1.05-6.11-4.43-4.32 6.13-.89L12 2.5z"
      />
    </svg>
  );
}

/**
 * Atom — Rating
 * Softglass star rating — SVG stars in a soft shell (not plain text ★).
 */
export function Rating({
  className,
  value,
  defaultValue = 0,
  onValueChange,
  max = 5,
  size = "md",
  look = "soft",
  color = "gold",
  readOnly = false,
  disabled = false,
  label = "Rating",
  showValue = false,
  clearable = true,
  caption,
  ...props
}: RatingProps) {
  const count = Math.max(1, Math.min(10, max));
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const [hover, setHover] = useState<number | null>(null);
  const current = isControlled ? Number(value) : internal;
  const display = hover ?? current;
  const interactive = !disabled && !readOnly;

  function setValue(next: number) {
    if (!interactive) return;
    let resolved = next;
    if (clearable && next === current) resolved = 0;
    if (!isControlled) setInternal(resolved);
    onValueChange?.(resolved);
  }

  return (
    <div
      className={cn(
        "sg-rating",
        sizeClass[size],
        lookClass[look],
        colorClass[color],
        !interactive && "sg-rating-static",
        className,
      )}
      data-look={look}
      data-color={color}
      data-readonly={readOnly || undefined}
      data-disabled={disabled || undefined}
      role="slider"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={count}
      aria-valuenow={current}
      aria-valuetext={`${current} of ${count}`}
      aria-readonly={readOnly || undefined}
      aria-disabled={disabled || undefined}
      onMouseLeave={() => setHover(null)}
      {...props}
    >
      {caption ? <span className="sg-rating-caption">{caption}</span> : null}

      <div className="sg-rating-stars" role="presentation">
        {Array.from({ length: count }, (_, i) => {
          const n = i + 1;
          const active = n <= display;
          return (
            <button
              key={n}
              type="button"
              className={cn(
                "sg-rating-star",
                active && "sg-rating-star-active",
              )}
              disabled={!interactive}
              tabIndex={interactive ? 0 : -1}
              aria-label={`${n} of ${count}`}
              onMouseEnter={() => {
                if (interactive) setHover(n);
              }}
              onFocus={() => {
                if (interactive) setHover(n);
              }}
              onBlur={() => setHover(null)}
              onClick={() => setValue(n)}
            >
              <StarGlyph active={active} />
            </button>
          );
        })}
      </div>

      {showValue ? (
        <span className="sg-rating-score" aria-hidden="true">
          {current.toFixed(1)}
        </span>
      ) : null}
    </div>
  );
}
