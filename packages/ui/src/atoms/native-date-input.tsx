"use client";

import { cn } from "../lib/cn";
import {
  useId,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";

export type NativeDateInputSize = "sm" | "md" | "lg";
export type NativeDateInputLook = "soft" | "solid" | "outline" | "glass";

export type NativeDateInputProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> & {
  /** ISO date YYYY-MM-DD. Not a full DatePicker suite. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: NativeDateInputSize;
  look?: NativeDateInputLook;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  requiredMark?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  /** Optional min/max ISO bounds. */
  min?: string;
  max?: string;
};

const sizeClass: Record<NativeDateInputSize, string> = {
  sm: "sg-ndate-sm",
  md: "",
  lg: "sg-ndate-lg",
};

const lookClass: Record<NativeDateInputLook, string> = {
  soft: "",
  solid: "sg-ndate-look-solid",
  outline: "sg-ndate-look-outline",
  glass: "sg-ndate-look-glass",
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function daysInMonth(year: number, monthIndex0: number) {
  return new Date(year, monthIndex0 + 1, 0).getDate();
}

function parseIso(raw: string | undefined) {
  if (!raw || !/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const now = new Date();
    return {
      y: now.getFullYear(),
      m: now.getMonth() + 1,
      d: now.getDate(),
    };
  }
  const [ys, ms, ds] = raw.split("-");
  const y = Number(ys);
  const m = Number(ms);
  const d = Number(ds);
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) {
    return { y: 2026, m: 1, d: 1 };
  }
  return {
    y: Math.min(2100, Math.max(1900, y)),
    m: Math.min(12, Math.max(1, m)),
    d: Math.min(31, Math.max(1, d)),
  };
}

function formatIso(y: number, m: number, d: number) {
  const dim = daysInMonth(y, m - 1);
  const day = Math.min(d, dim);
  return `${y}-${pad2(m)}-${pad2(day)}`;
}

function toTime(y: number, m: number, d: number) {
  return new Date(y, m - 1, d).getTime();
}

/**
 * Atom — NativeDateInput
 * Softglass YYYY-MM-DD control (custom UI — not OS date picker chrome).
 * Still not the full Softglass DatePicker calendar suite.
 */
export function NativeDateInput({
  className,
  value,
  defaultValue,
  onValueChange,
  size = "md",
  look = "soft",
  label,
  hint,
  error,
  requiredMark = false,
  fullWidth = false,
  disabled = false,
  min,
  max,
  id,
  ...props
}: NativeDateInputProps) {
  const reactId = useId();
  const inputId = id ?? `sg-ndate-${reactId}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(error);

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(
    defaultValue ?? formatIso(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
  );
  const current = parseIso(isControlled ? value : internal);
  const minP = min ? parseIso(min) : null;
  const maxP = max ? parseIso(max) : null;

  function withinBounds(y: number, m: number, d: number) {
    const t = toTime(y, m, d);
    if (minP && t < toTime(minP.y, minP.m, minP.d)) return false;
    if (maxP && t > toTime(maxP.y, maxP.m, maxP.d)) return false;
    return true;
  }

  function commit(y: number, m: number, d: number) {
    let next = formatIso(y, m, d);
    let p = parseIso(next);
    if (minP && toTime(p.y, p.m, p.d) < toTime(minP.y, minP.m, minP.d)) {
      next = formatIso(minP.y, minP.m, minP.d);
      p = minP;
    }
    if (maxP && toTime(p.y, p.m, p.d) > toTime(maxP.y, maxP.m, maxP.d)) {
      next = formatIso(maxP.y, maxP.m, maxP.d);
    }
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  }

  function nudgeYear(delta: number) {
    if (disabled) return;
    commit(current.y + delta, current.m, current.d);
  }

  function nudgeMonth(delta: number) {
    if (disabled) return;
    let m = current.m + delta;
    let y = current.y;
    while (m > 12) {
      m -= 12;
      y += 1;
    }
    while (m < 1) {
      m += 12;
      y -= 1;
    }
    commit(y, m, current.d);
  }

  function nudgeDay(delta: number) {
    if (disabled) return;
    const dt = new Date(current.y, current.m - 1, current.d + delta);
    commit(dt.getFullYear(), dt.getMonth() + 1, dt.getDate());
  }

  function onSegKey(
    e: KeyboardEvent<HTMLButtonElement>,
    kind: "y" | "m" | "d",
  ) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (kind === "y") nudgeYear(1);
      if (kind === "m") nudgeMonth(1);
      if (kind === "d") nudgeDay(1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (kind === "y") nudgeYear(-1);
      if (kind === "m") nudgeMonth(-1);
      if (kind === "d") nudgeDay(-1);
    }
  }

  const control = (
    <div
      id={inputId}
      className={cn(
        "sg-ndate",
        sizeClass[size],
        lookClass[look],
        fullWidth && "sg-ndate-block",
        !label && !hint && !error && className,
      )}
      data-look={look}
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
      role="group"
      aria-labelledby={typeof label === "string" ? `${inputId}-label` : undefined}
      aria-describedby={describedBy}
      {...props}
    >
      <span className="sg-ndate-glyph" aria-hidden="true">
        <span className="sg-ndate-glyph-top" />
        <span className="sg-ndate-glyph-body">
          <span className="sg-ndate-glyph-dot" />
          <span className="sg-ndate-glyph-dot" />
          <span className="sg-ndate-glyph-dot" />
          <span className="sg-ndate-glyph-dot" />
        </span>
      </span>

      <div className="sg-ndate-segments">
        {/* Day */}
        <div className="sg-ndate-segment">
          <button
            type="button"
            className="sg-ndate-step"
            tabIndex={-1}
            disabled={disabled}
            aria-label="Increase day"
            onClick={() => nudgeDay(1)}
          >
            ▴
          </button>
          <button
            type="button"
            className="sg-ndate-value sg-ndate-value-day"
            disabled={disabled}
            aria-label="Day"
            onKeyDown={(e) => onSegKey(e, "d")}
          >
            {pad2(current.d)}
          </button>
          <button
            type="button"
            className="sg-ndate-step"
            tabIndex={-1}
            disabled={disabled}
            aria-label="Decrease day"
            onClick={() => nudgeDay(-1)}
          >
            ▾
          </button>
        </div>

        <span className="sg-ndate-sep" aria-hidden="true">
          /
        </span>

        {/* Month */}
        <div className="sg-ndate-segment">
          <button
            type="button"
            className="sg-ndate-step"
            tabIndex={-1}
            disabled={disabled}
            aria-label="Increase month"
            onClick={() => nudgeMonth(1)}
          >
            ▴
          </button>
          <button
            type="button"
            className="sg-ndate-value sg-ndate-value-month"
            disabled={disabled}
            aria-label="Month"
            onKeyDown={(e) => onSegKey(e, "m")}
          >
            {MONTHS[current.m - 1]}
          </button>
          <button
            type="button"
            className="sg-ndate-step"
            tabIndex={-1}
            disabled={disabled}
            aria-label="Decrease month"
            onClick={() => nudgeMonth(-1)}
          >
            ▾
          </button>
        </div>

        <span className="sg-ndate-sep" aria-hidden="true">
          /
        </span>

        {/* Year */}
        <div className="sg-ndate-segment">
          <button
            type="button"
            className="sg-ndate-step"
            tabIndex={-1}
            disabled={disabled}
            aria-label="Increase year"
            onClick={() => nudgeYear(1)}
          >
            ▴
          </button>
          <button
            type="button"
            className="sg-ndate-value sg-ndate-value-year"
            disabled={disabled}
            aria-label="Year"
            onKeyDown={(e) => onSegKey(e, "y")}
          >
            {current.y}
          </button>
          <button
            type="button"
            className="sg-ndate-step"
            tabIndex={-1}
            disabled={disabled}
            aria-label="Decrease year"
            onClick={() => nudgeYear(-1)}
          >
            ▾
          </button>
        </div>
      </div>

      <span className="sg-visually-hidden" aria-live="polite">
        {formatIso(current.y, current.m, current.d)}
        {withinBounds(current.y, current.m, current.d) ? "" : " out of range"}
      </span>
    </div>
  );

  if (!label && !hint && !error) return control;

  return (
    <div className={cn("sg-field", fullWidth && "sg-input-block", className)}>
      {label ? (
        <label
          id={`${inputId}-label`}
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
