"use client";

import { cn } from "../lib/cn";
import type { SliderLook } from "../lib/looks";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { useId, useState } from "react";

export type RangeSliderSize = "sm" | "md" | "lg";
export type { SliderLook as RangeSliderLook };

export type RangeValue = [number, number];

export type RangeSliderProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> & {
  value?: RangeValue;
  defaultValue?: RangeValue;
  onValueChange?: (value: RangeValue) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: RangeSliderSize;
  look?: SliderLook;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  showValue?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
};

const sizeClass: Record<RangeSliderSize, string> = {
  sm: "sg-slider-sm",
  md: "",
  lg: "sg-slider-lg",
};

const lookClass: Record<SliderLook, string> = {
  soft: "",
  solid: "sg-slider-look-solid",
  glass: "sg-slider-look-glass",
  accent: "sg-slider-look-accent",
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function sortRange(a: number, b: number): RangeValue {
  return a <= b ? [a, b] : [b, a];
}

/**
 * Atom — RangeSlider
 * Dual-thumb range. Softglass track shared with Slider looks.
 */
export function RangeSlider({
  className,
  value,
  defaultValue = [20, 80],
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  size = "md",
  look = "soft",
  label,
  hint,
  error,
  showValue = true,
  fullWidth = true,
  disabled = false,
  ...props
}: RangeSliderProps) {
  const reactId = useId();
  const baseId = `sg-range-${reactId}`;
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<RangeValue>(defaultValue);
  const raw = isControlled ? value : internal;
  const lo = clamp(raw[0], min, max);
  const hi = clamp(raw[1], min, max);
  const [from, to] = sortRange(lo, hi);
  const span = max === min ? 1 : max - min;
  const leftPct = ((from - min) / span) * 100;
  const rightPct = ((to - min) / span) * 100;
  const invalid = Boolean(error);
  const hintId = hint ? `${baseId}-hint` : undefined;
  const errorId = error ? `${baseId}-error` : undefined;

  function commit(next: RangeValue) {
    const sorted = sortRange(
      clamp(next[0], min, max),
      clamp(next[1], min, max),
    );
    if (!isControlled) setInternal(sorted);
    onValueChange?.(sorted);
  }

  const control = (
    <div
      className={cn(
        "sg-slider",
        "sg-range-slider",
        sizeClass[size],
        lookClass[look],
        fullWidth && "sg-input-block",
        !label && !hint && !error && className,
      )}
      data-look={look}
      data-disabled={disabled || undefined}
      style={
        {
          ["--sg-slider-pct" as string]: `${rightPct - leftPct}%`,
          ["--sg-range-left" as string]: `${leftPct}%`,
          ["--sg-range-right" as string]: `${rightPct}%`,
        } as CSSProperties
      }
      {...props}
    >
      <div className="sg-range-slider-track" aria-hidden="true" />
      <input
        id={`${baseId}-min`}
        type="range"
        className="sg-slider-input sg-range-slider-input sg-range-slider-min"
        min={min}
        max={max}
        step={step}
        value={from}
        disabled={disabled}
        aria-label={typeof label === "string" ? `${label} minimum` : "Minimum"}
        aria-valuemin={min}
        aria-valuemax={to}
        aria-valuenow={from}
        aria-invalid={invalid || undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        onChange={(e) => {
          const next = Number(e.target.value);
          commit([Math.min(next, to), to]);
        }}
      />
      <input
        id={`${baseId}-max`}
        type="range"
        className="sg-slider-input sg-range-slider-input sg-range-slider-max"
        min={min}
        max={max}
        step={step}
        value={to}
        disabled={disabled}
        aria-label={typeof label === "string" ? `${label} maximum` : "Maximum"}
        aria-valuemin={from}
        aria-valuemax={max}
        aria-valuenow={to}
        aria-invalid={invalid || undefined}
        onChange={(e) => {
          const next = Number(e.target.value);
          commit([from, Math.max(next, from)]);
        }}
      />
    </div>
  );

  if (!label && !hint && !error) return control;

  return (
    <div className={cn("sg-field", fullWidth && "sg-input-block", className)}>
      {label ? (
        <div className="sg-slider-label-row">
          <label className="sg-field-label" htmlFor={`${baseId}-min`}>
            {label}
          </label>
          {showValue ? (
            <span className="sg-slider-value" aria-hidden="true">
              {from} – {to}
            </span>
          ) : null}
        </div>
      ) : null}
      {control}
      {hint && !error ? (
        <p id={hintId} className="sg-field-hint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="sg-field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
