"use client";

import { cn } from "../lib/cn";
import type { SelectLook } from "../lib/looks";
import { MOTION_DEFAULTS, type SelectMotion } from "../lib/motion";
import { exitDurationForMotion, usePresence } from "../lib/presence";
import {
  eventInside,
  useFloatingPortal,
} from "../lib/use-floating-portal";
import type { SelectOption, SelectSize } from "./select";
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
import { createPortal } from "react-dom";

export type { SelectLook, SelectMotion, SelectOption, SelectSize };

export type MultiSelectProps = {
  options: SelectOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  size?: SelectSize;
  look?: SelectLook;
  motion?: SelectMotion;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  placement?: "auto" | "bottom" | "top";
  /** Soft cap; further options disabled when reached. */
  maxSelected?: number;
  /**
   * Show a filter input inside the menu (narrows options).
   * Default true.
   */
  filterable?: boolean;
  filterPlaceholder?: string;
  emptyFilterMessage?: string;
};

const sizeClass: Record<SelectSize, string> = {
  sm: "sg-select-trigger-sm",
  md: "",
  lg: "sg-select-trigger-lg",
};

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

/**
 * Atom — MultiSelect
 * Multi value glass select with removable chips. Menu stays open while picking.
 */
export function MultiSelect({
  options,
  value,
  defaultValue = [],
  onValueChange,
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
  maxSelected,
  filterable = true,
  filterPlaceholder = "Filter…",
  emptyFilterMessage = "No matches",
}: MultiSelectProps) {
  const reactId = useId();
  const selectId = id ?? `sg-ms-${reactId}`;
  const listboxId = `${selectId}-listbox`;
  const filterId = `${selectId}-filter`;
  const hintId = hint ? `${selectId}-hint` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(error);

  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState<string[]>(defaultValue);
  const current = isControlled ? value! : uncontrolled;

  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const [filterQuery, setFilterQuery] = useState("");

  const { mounted: menuMounted, exiting: menuExiting, state: menuState } =
    usePresence(open, { durationMs: exitDurationForMotion(motion) });

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLInputElement>(null);

  const { portalReady, floatingStyle, side: menuPlacement } = useFloatingPortal({
    open,
    mounted: menuMounted,
    triggerRef: rootRef,
    panelRef: menuRef,
    placement,
    matchWidth: true,
    flipMinSpace: 220,
  });

  const selectedSet = useMemo(() => new Set(current), [current]);
  const selectedOptions = useMemo(
    () => options.filter((o) => selectedSet.has(o.value)),
    [options, selectedSet],
  );

  const atMax =
    maxSelected !== undefined && current.length >= maxSelected;

  const filteredOptions = useMemo(() => {
    if (!filterable) return options;
    const q = filterQuery.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        o.value.toLowerCase().includes(q),
    );
  }, [filterQuery, filterable, options]);

  const enabledIndexes = useMemo(
    () =>
      filteredOptions
        .map((opt, index) => ({ opt, index }))
        .filter(({ opt }) => {
          if (opt.disabled) return false;
          if (atMax && !selectedSet.has(opt.value)) return false;
          return true;
        })
        .map(({ index }) => index),
    [atMax, filteredOptions, selectedSet],
  );

  const commit = useCallback(
    (next: string[]) => {
      if (!isControlled) setUncontrolled(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const close = useCallback(() => {
    setOpen(false);
    setHighlight(-1);
    setFilterQuery("");
  }, []);

  const openMenu = useCallback(() => {
    if (disabled) return;
    setFilterQuery("");
    setHighlight(-1);
    setOpen(true);
  }, [disabled]);

  useEffect(() => {
    if (!open || menuExiting) return;
    setHighlight((h) =>
      enabledIndexes.includes(h) ? h : (enabledIndexes[0] ?? -1),
    );
  }, [enabledIndexes, filterQuery, menuExiting, open]);

  useEffect(() => {
    if (!open || menuExiting || !filterable) return;
    const id = window.requestAnimationFrame(() => filterRef.current?.focus());
    return () => window.cancelAnimationFrame(id);
  }, [filterable, menuExiting, open]);

  useEffect(() => {
    if (!open || menuExiting) return;
    function onPointerDown(event: MouseEvent) {
      if (!eventInside(event.target, rootRef.current, menuRef.current)) {
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
  }, [close, open, menuExiting]);

  useEffect(() => {
    if (!open || menuExiting || highlight < 0) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${highlight}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [highlight, open, menuExiting]);

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

  function toggleIndex(index: number) {
    const opt = filteredOptions[index];
    if (!opt || opt.disabled) return;
    const isOn = selectedSet.has(opt.value);
    if (!isOn && atMax) return;
    const next = isOn
      ? current.filter((v) => v !== opt.value)
      : [...current, opt.value];
    commit(next);
  }

  function removeValue(val: string) {
    if (disabled) return;
    commit(current.filter((v) => v !== val));
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
        if (highlight >= 0) toggleIndex(highlight);
      }
      if (event.key === "ArrowDown") moveHighlight(1);
      if (event.key === "ArrowUp") moveHighlight(-1);
    }
    if (event.key === "Backspace" && !open && current.length > 0) {
      event.preventDefault();
      commit(current.slice(0, -1));
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
    <div className="sg-select-root sg-multiselect-root" ref={rootRef}>
      {name
        ? current.map((v) => (
            <input key={v} type="hidden" name={`${name}[]`} value={v} />
          ))
        : null}

      <div
        className={cn(
          "sg-select-trigger",
          "sg-multiselect-trigger",
          sizeClass[size],
          className,
        )}
        data-open={open || undefined}
        data-look={look === "solid" ? undefined : look}
        data-disabled={disabled || undefined}
        onClick={(event) => {
          if (disabled) return;
          // Chip remove buttons own the click — do not toggle the menu.
          const t = event.target as HTMLElement;
          if (t.closest(".sg-multiselect-chip-x")) return;
          open ? close() : openMenu();
        }}
      >
        <span className="sg-multiselect-chips">
          {selectedOptions.length === 0 ? (
            <span className="sg-select-value" data-placeholder="true">
              {placeholder}
            </span>
          ) : (
            selectedOptions.map((opt) => (
              <span key={opt.value} className="sg-multiselect-chip">
                <span className="sg-multiselect-chip-label">{opt.label}</span>
                <button
                  type="button"
                  className="sg-multiselect-chip-x"
                  aria-label={`Remove ${opt.label}`}
                  disabled={disabled}
                  onMouseDown={(e) => {
                    // Beat parent toggle + focus side-effects.
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeValue(opt.value);
                  }}
                >
                  ×
                </button>
              </span>
            ))
          )}
        </span>
        <button
          ref={triggerRef}
          id={selectId}
          type="button"
          className="sg-multiselect-caret"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          aria-label={typeof label === "string" ? label : "Multi select"}
          onClick={(e) => {
            e.stopPropagation();
            if (disabled) return;
            open ? close() : openMenu();
          }}
          onKeyDown={onTriggerKeyDown}
        >
          <span className="sg-select-chevron" aria-hidden="true">
            <ChevronIcon />
          </span>
        </button>
      </div>

      {menuMounted && portalReady
        ? createPortal(
            <div
              ref={menuRef}
              className="sg-select-menu sg-multiselect-menu"
              data-placement={menuPlacement}
              data-motion={motion}
              data-state={menuState}
              data-portaled=""
              style={floatingStyle}
            >
              {filterable ? (
                <div className="sg-multiselect-filter">
                  <input
                    ref={filterRef}
                    id={filterId}
                    type="search"
                    className="sg-multiselect-filter-input"
                    placeholder={filterPlaceholder}
                    value={filterQuery}
                    aria-label={filterPlaceholder}
                    aria-controls={listboxId}
                    autoComplete="off"
                    onChange={(e) => {
                      setFilterQuery(e.target.value);
                      setHighlight(0);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        moveHighlight(1);
                      } else if (e.key === "ArrowUp") {
                        e.preventDefault();
                        moveHighlight(-1);
                      } else if (e.key === "Enter") {
                        e.preventDefault();
                        if (highlight >= 0) toggleIndex(highlight);
                      }
                    }}
                  />
                </div>
              ) : null}
              <ul
                ref={listRef}
                id={listboxId}
                role="listbox"
                aria-multiselectable="true"
                aria-labelledby={selectId}
                className="sg-multiselect-options"
                tabIndex={-1}
              >
                {filteredOptions.length === 0 ? (
                  <li className="sg-combobox-empty" role="presentation">
                    {emptyFilterMessage}
                  </li>
                ) : (
                  filteredOptions.map((opt, index) => {
                    const selected = selectedSet.has(opt.value);
                    const highlighted = index === highlight;
                    const optionDisabled =
                      Boolean(opt.disabled) || (atMax && !selected);
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
                          disabled={optionDisabled}
                          onMouseEnter={() => {
                            if (!optionDisabled) setHighlight(index);
                          }}
                          onClick={() => toggleIndex(index)}
                        >
                          <span>{opt.label}</span>
                          <span className="sg-select-check" aria-hidden="true">
                            <CheckIcon />
                          </span>
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
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
