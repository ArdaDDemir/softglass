"use client";

import { cn } from "../lib/cn";
import type { SliderLook } from "../lib/looks";
import type { InputHTMLAttributes, ReactNode } from "react";
import { useId, useState } from "react";

export type SliderSize = "sm" | "md" | "lg";
export type { SliderLook };

export type SliderProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "value" | "defaultValue" | "onChange"
> & {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: SliderSize;
  /** Visual language: soft | solid | glass | accent */
  look?: SliderLook;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  requiredMark?: boolean;
  /** Show current value next to the label. Default true. */
  showValue?: boolean;
  fullWidth?: boolean;
};

const sizeClass: Record<SliderSize, string> = {
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

/**
 * Atom — Slider
 * Single-value range control with field meta (label / hint / error).
 * Native range input for keyboard + a11y; softglass track/thumb skin.
 */
export function Slider({
  className,
  value,
  defaultValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  size = "md",
  look = "soft",
  label,
  hint,
  error,
  requiredMark = false,
  showValue = true,
  fullWidth = true,
  disabled,
  id,
  ...props
}: SliderProps) {
  const reactId = useId();
  const inputId = id ?? `sg-slider-${reactId}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(error);

  const safeMin = min;
  const safeMax = max >= min ? max : min;
  const mid = safeMin + (safeMax - safeMin) / 2;
  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState(
    defaultValue !== undefined ? defaultValue : mid,
  );
  const raw = isControlled ? Number(value) : uncontrolled;
  const current = clamp(
    Number.isFinite(raw) ? raw : mid,
    safeMin,
    safeMax,
  );
  const percent =
    safeMax === safeMin
      ? 0
      : ((current - safeMin) / (safeMax - safeMin)) * 100;

  function commit(next: number) {
    const clamped = clamp(next, safeMin, safeMax);
    if (!isControlled) setUncontrolled(clamped);
    onValueChange?.(clamped);
  }

  const control = (
    <div
      className={cn(
        "sg-slider",
        sizeClass[size],
        lookClass[look],
        fullWidth && "sg-input-block",
        !label && !hint && !error && className,
      )}
      data-look={look}
      data-disabled={disabled || undefined}
      style={{ ["--sg-slider-pct" as string]: `${percent}%` }}
    >
      <input
        id={inputId}
        type="range"
        className="sg-slider-input"
        min={safeMin}
        max={safeMax}
        step={step}
        value={current}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        aria-valuemin={safeMin}
        aria-valuemax={safeMax}
        aria-valuenow={current}
        onChange={(e) => commit(Number(e.target.value))}
        {...props}
      />
    </div>
  );

  if (!label && !hint && !error) {
    return control;
  }

  return (
    <div className={cn("sg-field", fullWidth && "sg-input-block", className)}>
      {label ? (
        <div className="sg-slider-label-row">
          <label
            className={cn("sg-field-label", requiredMark && "sg-field-required")}
            htmlFor={inputId}
          >
            {label}
          </label>
          {showValue ? (
            <span className="sg-slider-value" aria-hidden="true">
              {current}
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
