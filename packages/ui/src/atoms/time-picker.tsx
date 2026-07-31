"use client";

import { cn } from "../lib/cn";
import { MOTION_DEFAULTS, type DatePickerMotion } from "../lib/motion";
import { exitDurationForMotion, usePresence } from "../lib/presence";
import {
  eventInside,
  useFloatingPortal,
} from "../lib/use-floating-portal";
import { TimeInput, type TimeInputLook, type TimeInputSize } from "./time-input";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

export type TimePickerSize = TimeInputSize;
export type TimePickerLook = TimeInputLook;
export type TimePickerMotion = DatePickerMotion;

export type TimePickerProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Quick picks under the control (HH:mm 24h). */
  presets?: string[];
  size?: TimePickerSize;
  look?: TimePickerLook;
  motion?: TimePickerMotion;
  hourCycle?: 24 | 12;
  minuteStep?: number;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  placeholder?: string;
  name?: string;
  id?: string;
  className?: string;
  placement?: "auto" | "bottom" | "top";
  "aria-label"?: string;
};

const DEFAULT_PRESETS = ["09:00", "12:00", "13:00", "17:00", "18:00"] as const;

const sizeClass: Record<TimePickerSize, string> = {
  sm: "sg-datepicker-trigger-sm",
  md: "",
  lg: "sg-datepicker-trigger-lg",
};

function ClockIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle
        cx="10"
        cy="10"
        r="6.75"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M10 6.5V10l2.5 1.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Atom — TimePicker
 * Trigger + portaled panel with TimeInput and optional presets.
 * Value is always 24h `HH:mm`. No timezone engine.
 */
export function TimePicker({
  value,
  defaultValue = "09:00",
  onValueChange,
  presets = [...DEFAULT_PRESETS],
  size = "md",
  look = "soft",
  motion = MOTION_DEFAULTS.datePicker,
  hourCycle = 24,
  minuteStep = 5,
  label,
  hint,
  error,
  disabled,
  placeholder = "Pick a time…",
  name,
  id,
  className,
  placement = "auto",
  "aria-label": ariaLabel,
}: TimePickerProps) {
  const reactId = useId();
  const pickerId = id ?? `sg-timepicker-${reactId}`;
  const panelId = `${pickerId}-panel`;
  const hintId = hint ? `${pickerId}-hint` : undefined;
  const errorId = error ? `${pickerId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(error);

  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const current = isControlled ? value! : uncontrolled;

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(current);
  const { mounted: panelMounted, exiting: panelExiting, state: panelState } =
    usePresence(open, { durationMs: exitDurationForMotion(motion) });

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const { portalReady, floatingStyle, side: menuPlacement } = useFloatingPortal({
    open,
    mounted: panelMounted,
    triggerRef,
    panelRef,
    placement,
    align: "start",
    matchWidth: false,
    flipMinSpace: 240,
    gap: 6,
  });

  const commit = useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolled(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const close = useCallback(() => setOpen(false), []);

  const openPanel = useCallback(() => {
    if (disabled) return;
    setDraft(current);
    setOpen(true);
  }, [current, disabled]);

  useEffect(() => {
    if (!open || panelExiting) return;

    function onPointerDown(event: MouseEvent) {
      if (!eventInside(event.target, rootRef.current, panelRef.current)) {
        close();
      }
    }

    function onDocKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      close();
      triggerRef.current?.focus();
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onDocKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onDocKeyDown);
    };
  }, [close, open, panelExiting]);

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;
    if (
      event.key === "ArrowDown" ||
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      if (!open) openPanel();
    }
  }

  function applyDraft() {
    commit(draft);
    close();
    triggerRef.current?.focus();
  }

  function pickPreset(hhmm: string) {
    setDraft(hhmm);
    commit(hhmm);
    close();
    triggerRef.current?.focus();
  }

  const control = (
    <div className="sg-timepicker-root" ref={rootRef}>
      {name ? <input type="hidden" name={name} value={current} /> : null}
      <button
        ref={triggerRef}
        id={pickerId}
        type="button"
        className={cn("sg-datepicker-trigger", sizeClass[size], className)}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        aria-label={ariaLabel ?? (label ? undefined : "Time")}
        data-open={open || undefined}
        onClick={() => (open ? close() : openPanel())}
        onKeyDown={onTriggerKeyDown}
      >
        <span
          className="sg-datepicker-value"
          data-placeholder={!current || undefined}
        >
          {current || placeholder}
        </span>
        <span className="sg-datepicker-icon" aria-hidden="true">
          <ClockIcon />
        </span>
      </button>

      {panelMounted && portalReady
        ? createPortal(
            <div
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-modal="false"
              aria-label="Time picker"
              className="sg-timepicker-panel"
              data-placement={menuPlacement}
              data-motion={motion}
              data-state={panelState}
              data-portaled=""
              style={floatingStyle}
            >
              <TimeInput
                label="Time"
                value={draft}
                onValueChange={setDraft}
                size={size}
                look={look}
                hourCycle={hourCycle}
                minuteStep={minuteStep}
                fullWidth
              />
              {presets.length > 0 ? (
                <div className="sg-timepicker-presets" role="list">
                  {presets.map((p) => (
                    <button
                      key={p}
                      type="button"
                      role="listitem"
                      className="sg-timepicker-preset"
                      data-selected={p === draft || undefined}
                      onClick={() => pickPreset(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              ) : null}
              <div className="sg-timepicker-actions">
                <button
                  type="button"
                  className="sg-timepicker-apply"
                  onClick={applyDraft}
                >
                  Apply
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );

  if (!label && !hint && !error) return control;

  return (
    <div className="sg-field">
      {label ? (
        <label className="sg-field-label" htmlFor={pickerId}>
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
