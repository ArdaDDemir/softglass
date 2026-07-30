"use client";

import { cn } from "../lib/cn";
import type { NumberInputLook } from "../lib/looks";
import type { InputHTMLAttributes, ReactNode } from "react";
import { useId, useState } from "react";

export type NumberInputSize = "sm" | "md" | "lg";
export type { NumberInputLook };

export type NumberInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "value" | "defaultValue" | "onChange"
> & {
  value?: number | null;
  defaultValue?: number | null;
  onValueChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: NumberInputSize;
  /** Visual language: soft | solid | outline | ghost */
  look?: NumberInputLook;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  requiredMark?: boolean;
  fullWidth?: boolean;
  /** Hide +/− steppers. Default false. */
  hideSteppers?: boolean;
};

const sizeClass: Record<NumberInputSize, string> = {
  sm: "sg-number-input-sm",
  md: "",
  lg: "sg-number-input-lg",
};

const lookClass: Record<NumberInputLook, string> = {
  soft: "",
  solid: "sg-number-input-look-solid",
  outline: "sg-number-input-look-outline",
  ghost: "sg-number-input-look-ghost",
};

function clampOptional(
  n: number,
  min?: number,
  max?: number,
): number {
  let out = n;
  if (min !== undefined && Number.isFinite(min)) out = Math.max(min, out);
  if (max !== undefined && Number.isFinite(max)) out = Math.min(max, out);
  return out;
}

function parseInput(raw: string): number | null {
  if (raw.trim() === "") return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

/**
 * Atom — NumberInput
 * Numeric field with optional steppers + field meta.
 */
export function NumberInput({
  className,
  value,
  defaultValue = null,
  onValueChange,
  min,
  max,
  step = 1,
  size = "md",
  look = "soft",
  label,
  hint,
  error,
  requiredMark = false,
  fullWidth = true,
  hideSteppers = false,
  disabled,
  id,
  ...props
}: NumberInputProps) {
  const reactId = useId();
  const inputId = id ?? `sg-number-${reactId}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(error);

  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState<number | null>(
    defaultValue ?? null,
  );
  const current = isControlled ? value : uncontrolled;

  function commit(next: number | null) {
    const resolved =
      next === null ? null : clampOptional(next, min, max);
    if (!isControlled) setUncontrolled(resolved);
    onValueChange?.(resolved);
  }

  function nudge(direction: 1 | -1) {
    if (disabled) return;
    const base = current ?? min ?? 0;
    const delta = (Number.isFinite(step) && step !== 0 ? step : 1) * direction;
    commit(clampOptional(base + delta, min, max));
  }

  const display =
    current === null || current === undefined ? "" : String(current);

  const atMin =
    min !== undefined &&
    current !== null &&
    current !== undefined &&
    current <= min;
  const atMax =
    max !== undefined &&
    current !== null &&
    current !== undefined &&
    current >= max;

  const control = (
    <div
      className={cn(
        "sg-number-input",
        sizeClass[size],
        lookClass[look],
        hideSteppers && "sg-number-input-plain",
        fullWidth && "sg-input-block",
        !label && !hint && !error && className,
      )}
      data-look={look}
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
      data-size={size}
    >
      {!hideSteppers ? (
        <button
          type="button"
          className="sg-number-input-step sg-number-input-dec"
          tabIndex={-1}
          disabled={disabled || atMin}
          aria-label="Decrease"
          onClick={() => nudge(-1)}
        >
          <span aria-hidden="true">−</span>
        </button>
      ) : null}
      <input
        id={inputId}
        type="number"
        className="sg-number-input-field"
        value={display}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onChange={(e) => {
          const parsed = parseInput(e.target.value);
          if (e.target.value.trim() === "") {
            commit(null);
            return;
          }
          if (parsed === null) return;
          commit(parsed);
        }}
        {...props}
      />
      {!hideSteppers ? (
        <button
          type="button"
          className="sg-number-input-step sg-number-input-inc"
          tabIndex={-1}
          disabled={disabled || atMax}
          aria-label="Increase"
          onClick={() => nudge(1)}
        >
          <span aria-hidden="true">+</span>
        </button>
      ) : null}
    </div>
  );

  if (!label && !hint && !error) {
    return control;
  }

  return (
    <div className={cn("sg-field", fullWidth && "sg-input-block", className)}>
      {label ? (
        <label
          className={cn("sg-field-label", requiredMark && "sg-field-required")}
          htmlFor={inputId}
        >
          {label}
        </label>
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
