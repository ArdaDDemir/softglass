"use client";

import { cn } from "../lib/cn";
import {
  useId,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";

export type TimeInputSize = "sm" | "md" | "lg";
export type TimeInputLook = "soft" | "solid" | "outline" | "glass";

export type TimeInputProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> & {
  /** HH:mm string (24h). No timezone engine. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: TimeInputSize;
  look?: TimeInputLook;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  requiredMark?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  /** Minute step for steppers / arrows. Default 1. */
  minuteStep?: number;
  /** 24h (default) or 12h display with AM/PM. Value still HH:mm 24h. */
  hourCycle?: 24 | 12;
};

const sizeClass: Record<TimeInputSize, string> = {
  sm: "sg-time-sm",
  md: "",
  lg: "sg-time-lg",
};

const lookClass: Record<TimeInputLook, string> = {
  soft: "",
  solid: "sg-time-look-solid",
  outline: "sg-time-look-outline",
  glass: "sg-time-look-glass",
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function parseTime(raw: string | undefined): { h: number; m: number } {
  if (!raw || !/^\d{1,2}:\d{2}$/.test(raw)) return { h: 0, m: 0 };
  const [hs, ms] = raw.split(":");
  const h = Math.min(23, Math.max(0, Number(hs)));
  const m = Math.min(59, Math.max(0, Number(ms)));
  if (!Number.isFinite(h) || !Number.isFinite(m)) return { h: 0, m: 0 };
  return { h, m };
}

function formatTime(h: number, m: number) {
  return `${pad2(h)}:${pad2(m)}`;
}

function toDisplayHour(h24: number, hourCycle: 24 | 12) {
  if (hourCycle === 24) return h24;
  const h = h24 % 12;
  return h === 0 ? 12 : h;
}

function fromDisplayHour(displayH: number, isPm: boolean, hourCycle: 24 | 12) {
  if (hourCycle === 24) return Math.min(23, Math.max(0, displayH));
  let h = displayH % 12;
  if (displayH === 12) h = 0;
  if (isPm) h += 12;
  return h;
}

/**
 * Atom — TimeInput
 * Softglass HH:mm control (custom UI — not native OS time picker).
 * Value is always 24h `HH:mm`. No timezone engine.
 */
export function TimeInput({
  className,
  value,
  defaultValue = "09:00",
  onValueChange,
  size = "md",
  look = "soft",
  label,
  hint,
  error,
  requiredMark = false,
  fullWidth = false,
  disabled = false,
  minuteStep = 1,
  hourCycle = 24,
  id,
  ...props
}: TimeInputProps) {
  const reactId = useId();
  const inputId = id ?? `sg-time-${reactId}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(error);

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const current = parseTime(isControlled ? value : internal);
  const isPm = current.h >= 12;
  const displayH = toDisplayHour(current.h, hourCycle);
  const step = Math.max(1, Math.min(30, minuteStep));

  function commit(h: number, m: number) {
    const next = formatTime(
      ((h % 24) + 24) % 24,
      ((m % 60) + 60) % 60,
    );
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  }

  function nudgeHour(delta: number) {
    if (disabled) return;
    commit(current.h + delta, current.m);
  }

  function nudgeMinute(delta: number) {
    if (disabled) return;
    let m = current.m + delta * step;
    let h = current.h;
    while (m >= 60) {
      m -= 60;
      h += 1;
    }
    while (m < 0) {
      m += 60;
      h -= 1;
    }
    commit(h, m);
  }

  function onHourKey(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      nudgeHour(1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      nudgeHour(-1);
    }
  }

  function onMinuteKey(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      nudgeMinute(1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      nudgeMinute(-1);
    }
  }

  const control = (
    <div
      id={inputId}
      className={cn(
        "sg-time",
        sizeClass[size],
        lookClass[look],
        fullWidth && "sg-time-block",
        !label && !hint && !error && className,
      )}
      data-look={look}
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
      role="group"
      aria-label={typeof label === "string" ? undefined : "Time"}
      aria-labelledby={typeof label === "string" ? `${inputId}-label` : undefined}
      aria-describedby={describedBy}
      {...props}
    >
      <span className="sg-time-glyph" aria-hidden="true">
        <span className="sg-time-glyph-face">
          <span className="sg-time-glyph-hand sg-time-glyph-hand-h" />
          <span className="sg-time-glyph-hand sg-time-glyph-hand-m" />
        </span>
      </span>

      <div className="sg-time-segments">
        <div className="sg-time-segment">
          <button
            type="button"
            className="sg-time-step"
            tabIndex={-1}
            disabled={disabled}
            aria-label="Increase hour"
            onClick={() => nudgeHour(1)}
          >
            ▴
          </button>
          <button
            type="button"
            className="sg-time-value"
            disabled={disabled}
            aria-label="Hour"
            aria-valuenow={displayH}
            onKeyDown={onHourKey}
          >
            {pad2(displayH)}
          </button>
          <button
            type="button"
            className="sg-time-step"
            tabIndex={-1}
            disabled={disabled}
            aria-label="Decrease hour"
            onClick={() => nudgeHour(-1)}
          >
            ▾
          </button>
        </div>

        <span className="sg-time-colon" aria-hidden="true">
          :
        </span>

        <div className="sg-time-segment">
          <button
            type="button"
            className="sg-time-step"
            tabIndex={-1}
            disabled={disabled}
            aria-label="Increase minute"
            onClick={() => nudgeMinute(1)}
          >
            ▴
          </button>
          <button
            type="button"
            className="sg-time-value"
            disabled={disabled}
            aria-label="Minute"
            aria-valuenow={current.m}
            onKeyDown={onMinuteKey}
          >
            {pad2(current.m)}
          </button>
          <button
            type="button"
            className="sg-time-step"
            tabIndex={-1}
            disabled={disabled}
            aria-label="Decrease minute"
            onClick={() => nudgeMinute(-1)}
          >
            ▾
          </button>
        </div>

        {hourCycle === 12 ? (
          <div className="sg-time-ampm" role="group" aria-label="AM or PM">
            <button
              type="button"
              className={cn("sg-time-ampm-btn", !isPm && "sg-time-ampm-active")}
              disabled={disabled}
              aria-pressed={!isPm}
              onClick={() =>
                commit(fromDisplayHour(displayH, false, 12), current.m)
              }
            >
              AM
            </button>
            <button
              type="button"
              className={cn("sg-time-ampm-btn", isPm && "sg-time-ampm-active")}
              disabled={disabled}
              aria-pressed={isPm}
              onClick={() =>
                commit(fromDisplayHour(displayH, true, 12), current.m)
              }
            >
              PM
            </button>
          </div>
        ) : null}
      </div>

      <span className="sg-visually-hidden" aria-live="polite">
        {formatTime(current.h, current.m)}
      </span>
    </div>
  );

  if (!label && !hint && !error) return control;

  return (
    <div
      className={cn(
        "sg-field",
        fullWidth && "sg-input-block",
        className,
      )}
    >
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
