"use client";

import { cn } from "../lib/cn";
import type { SelectLook } from "../lib/looks";
import { MOTION_DEFAULTS, type SelectMotion } from "../lib/motion";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

export type SelectSize = "sm" | "md" | "lg";
export type { SelectLook, SelectMotion };

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onChange?: (event: { target: { value: string } }) => void;
  placeholder?: string;
  size?: SelectSize;
  /** Design: solid | soft | glass | gradient */
  look?: SelectLook;
  /** Menu enter motion: none | fade | scale | slide-down */
  motion?: SelectMotion;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  placement?: "auto" | "bottom" | "top";
};

const sizeClass: Record<SelectSize, string> = {
  sm: "sg-select-trigger-sm",
  md: "",
  lg: "sg-select-trigger-lg",
};

function ChevronIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5.5 7.75 10 12.25l4.5-4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4.5 10.5 8.2 14l7.3-8"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Atom — Select (custom)
 * Glass pill trigger + elevated glass menu.
 * Matches Button language (soft radius, gloss, accent selected).
 */
export function Select({
  options,
  value,
  defaultValue = "",
  onValueChange,
  onChange,
  placeholder = "Select…",
  size = "md",
  look = "solid",
  motion = MOTION_DEFAULTS.select,
  label,
  hint,
  error,
  disabled,
  name,
  id,
  className,
  placement = "auto",
}: SelectProps) {
  const reactId = useId();
  const selectId = id ?? `sg-select-${reactId}`;
  const listboxId = `${selectId}-listbox`;
  const hintId = hint ? `${selectId}-hint` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(error);

  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const current = isControlled ? value : uncontrolled;

  const [open, setOpen] = useState(false);
  const [menuPlacement, setMenuPlacement] = useState<"bottom" | "top">("bottom");
  const [highlight, setHighlight] = useState<number>(-1);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const enabledIndexes = useMemo(
    () =>
      options
        .map((opt, index) => ({ opt, index }))
        .filter(({ opt }) => !opt.disabled)
        .map(({ index }) => index),
    [options],
  );

  const selectedOption = options.find((opt) => opt.value === current);
  const displayLabel = selectedOption?.label;
  const isPlaceholder = !selectedOption;

  const commit = useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolled(next);
      onValueChange?.(next);
      onChange?.({ target: { value: next } });
    },
    [isControlled, onChange, onValueChange],
  );

  const close = useCallback(() => {
    setOpen(false);
    setHighlight(-1);
  }, []);

  const openMenu = useCallback(() => {
    if (disabled) return;

    if (placement === "top") {
      setMenuPlacement("top");
    } else if (placement === "bottom") {
      setMenuPlacement("bottom");
    } else if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setMenuPlacement(spaceBelow < 220 && rect.top > spaceBelow ? "top" : "bottom");
    }

    const selectedIndex = options.findIndex((opt) => opt.value === current);
    const start =
      selectedIndex >= 0 && !options[selectedIndex]?.disabled
        ? selectedIndex
        : (enabledIndexes[0] ?? -1);

    setHighlight(start);
    setOpen(true);
  }, [current, disabled, enabledIndexes, options, placement]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        close();
      }
    }

    function onDocKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onDocKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onDocKeyDown);
    };
  }, [close, open]);

  useEffect(() => {
    if (!open || highlight < 0) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${highlight}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [highlight, open]);

  function moveHighlight(delta: number) {
    if (enabledIndexes.length === 0) return;
    const pos = enabledIndexes.indexOf(highlight);
    const nextPos =
      pos === -1
        ? delta > 0
          ? 0
          : enabledIndexes.length - 1
        : (pos + delta + enabledIndexes.length) % enabledIndexes.length;
    setHighlight(enabledIndexes[nextPos]!);
  }

  function selectIndex(index: number) {
    const opt = options[index];
    if (!opt || opt.disabled) return;
    commit(opt.value);
    close();
    triggerRef.current?.focus();
  }

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;

    if (
      event.key === "ArrowDown" ||
      event.key === "ArrowUp" ||
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      if (!open) {
        openMenu();
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        if (highlight >= 0) selectIndex(highlight);
      }
      if (event.key === "ArrowDown") moveHighlight(1);
      if (event.key === "ArrowUp") moveHighlight(-1);
    }

    if (event.key === "Home" && open) {
      event.preventDefault();
      if (enabledIndexes[0] !== undefined) setHighlight(enabledIndexes[0]);
    }
    if (event.key === "End" && open) {
      event.preventDefault();
      const last = enabledIndexes[enabledIndexes.length - 1];
      if (last !== undefined) setHighlight(last);
    }
  }

  const control = (
    <div className="sg-select-root" ref={rootRef}>
      {name ? <input type="hidden" name={name} value={current} /> : null}

      <button
        ref={triggerRef}
        id={selectId}
        type="button"
        className={cn(
          "sg-select-trigger",
          sizeClass[size],
          className,
        )}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        data-open={open || undefined}
        data-look={look === "solid" ? undefined : look}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={onTriggerKeyDown}
      >
        <span
          className="sg-select-value"
          data-placeholder={isPlaceholder || undefined}
        >
          {displayLabel ?? placeholder}
        </span>
        <span className="sg-select-chevron" aria-hidden="true">
          <ChevronIcon />
        </span>
      </button>

      {open ? (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-labelledby={selectId}
          className="sg-select-menu"
          data-placement={menuPlacement}
          data-motion={motion}
          tabIndex={-1}
        >
          {options.map((opt, index) => {
            const selected = opt.value === current;
            const highlighted = index === highlight;
            return (
              <li key={opt.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  data-index={index}
                  className="sg-select-option"
                  aria-selected={selected}
                  data-selected={selected || undefined}
                  data-highlighted={highlighted || undefined}
                  disabled={opt.disabled}
                  onMouseEnter={() => {
                    if (!opt.disabled) setHighlight(index);
                  }}
                  onClick={() => selectIndex(index)}
                >
                  <span>{opt.label}</span>
                  <span className="sg-select-check" aria-hidden="true">
                    <CheckIcon />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );

  if (!label && !hint && !error) {
    return control;
  }

  return (
    <div className="sg-field">
      {label ? (
        <label className="sg-field-label" htmlFor={selectId}>
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
