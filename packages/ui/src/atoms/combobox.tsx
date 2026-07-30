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

export type ComboboxProps = {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  /** Shown when filter yields no rows. */
  emptyMessage?: string;
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
  /** Custom filter; default = label/value substring (case-insensitive). */
  filterOption?: (option: SelectOption, query: string) => boolean;
  /**
   * Async search hook. When set, called (debounced) as the query changes.
   * Parent typically updates `options` + `loading`.
   */
  onSearch?: (query: string) => void;
  /** Show loading empty state while remote search runs. */
  loading?: boolean;
  loadingMessage?: string;
  /** Debounce for `onSearch` in ms. Default 200. */
  searchDebounceMs?: number;
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

function defaultFilter(option: SelectOption, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    option.label.toLowerCase().includes(q) ||
    option.value.toLowerCase().includes(q)
  );
}

/**
 * Atom — Combobox
 * Searchable single-select: type to filter, pick from listbox.
 * Not free-text create — values must match an option (v1.1).
 */
export function Combobox({
  options,
  value,
  defaultValue = "",
  onValueChange,
  placeholder = "Search…",
  emptyMessage = "No matches",
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
  filterOption = defaultFilter,
  onSearch,
  loading = false,
  loadingMessage = "Loading…",
  searchDebounceMs = 200,
}: ComboboxProps) {
  const reactId = useId();
  const comboId = id ?? `sg-combo-${reactId}`;
  const listboxId = `${comboId}-listbox`;
  const hintId = hint ? `${comboId}-hint` : undefined;
  const errorId = error ? `${comboId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(error);

  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const current = isControlled ? value! : uncontrolled;

  const selected = options.find((o) => o.value === current);
  const [query, setQuery] = useState(selected?.label ?? "");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);

  const { mounted: menuMounted, exiting: menuExiting, state: menuState } =
    usePresence(open, { durationMs: exitDurationForMotion(motion) });

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const { portalReady, floatingStyle, side: menuPlacement } = useFloatingPortal({
    open,
    mounted: menuMounted,
    triggerRef: rootRef,
    panelRef: listRef,
    placement,
    matchWidth: true,
    flipMinSpace: 220,
  });

  // Sync display text when controlled value changes externally (while closed).
  useEffect(() => {
    if (open) return;
    const next = options.find((o) => o.value === current);
    setQuery(next?.label ?? "");
  }, [current, options, open]);

  // Async mode: parent filters via `onSearch` + `options`. Local filter otherwise.
  const filtered = useMemo(() => {
    if (onSearch) return options;
    return options.filter((opt) => filterOption(opt, query));
  }, [filterOption, onSearch, options, query]);

  const enabledIndexes = useMemo(
    () =>
      filtered
        .map((opt, index) => ({ opt, index }))
        .filter(({ opt }) => !opt.disabled)
        .map(({ index }) => index),
    [filtered],
  );

  useEffect(() => {
    if (!onSearch) return;
    const id = window.setTimeout(() => {
      onSearch(query);
    }, searchDebounceMs);
    return () => window.clearTimeout(id);
  }, [onSearch, query, searchDebounceMs]);

  const commit = useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolled(next);
      onValueChange?.(next);
      const opt = options.find((o) => o.value === next);
      setQuery(opt?.label ?? "");
    },
    [isControlled, onValueChange, options],
  );

  const close = useCallback(() => {
    setOpen(false);
    setHighlight(-1);
    const opt = options.find((o) => o.value === current);
    setQuery(opt?.label ?? "");
  }, [current, options]);

  const openMenu = useCallback(() => {
    if (disabled) return;
    setOpen(true);
  }, [disabled]);

  useEffect(() => {
    if (!open || menuExiting) return;
    function onPointerDown(event: MouseEvent) {
      if (!eventInside(event.target, rootRef.current, listRef.current)) {
        close();
      }
    }
    function onDocKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        inputRef.current?.focus();
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

  // Reset highlight when filter set changes.
  useEffect(() => {
    if (!open) return;
    setHighlight(enabledIndexes[0] ?? -1);
  }, [query, open, enabledIndexes]);

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
    const opt = filtered[index];
    if (!opt || opt.disabled) return;
    commit(opt.value);
    setOpen(false);
    setHighlight(-1);
    inputRef.current?.focus();
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (disabled) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        openMenu();
        return;
      }
      moveHighlight(event.key === "ArrowDown" ? 1 : -1);
    }
    if (event.key === "Enter" && open) {
      event.preventDefault();
      if (highlight >= 0) selectIndex(highlight);
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

  const activeDesc =
    open && highlight >= 0 ? `${listboxId}-opt-${highlight}` : undefined;

  const control = (
    <div className="sg-select-root sg-combobox-root" ref={rootRef}>
      {name ? <input type="hidden" name={name} value={current} /> : null}

      <div
        className={cn(
          "sg-select-trigger",
          "sg-combobox-trigger",
          sizeClass[size],
          className,
        )}
        data-open={open || undefined}
        data-look={look === "solid" ? undefined : look}
      >
        <input
          ref={inputRef}
          id={comboId}
          type="text"
          role="combobox"
          className="sg-combobox-input"
          autoComplete="off"
          spellCheck={false}
          disabled={disabled}
          placeholder={placeholder}
          value={query}
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={activeDesc}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          onChange={(event) => {
            setQuery(event.target.value);
            if (!open) openMenu();
            else setOpen(true);
          }}
          onFocus={() => openMenu()}
          onKeyDown={onInputKeyDown}
        />
        <span className="sg-select-chevron" aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="none">
            <path
              d="M5.5 7.75 10 12.25l4.5-4.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      {menuMounted && portalReady
        ? createPortal(
            <ul
              ref={listRef}
              id={listboxId}
              role="listbox"
              aria-label={typeof label === "string" ? label : "Options"}
              className="sg-select-menu"
              data-placement={menuPlacement}
              data-motion={motion}
              data-state={menuState}
              data-portaled=""
              style={floatingStyle}
              tabIndex={-1}
            >
              {loading ? (
                <li
                  className="sg-combobox-empty sg-combobox-loading"
                  role="presentation"
                  data-loading="true"
                >
                  {loadingMessage}
                </li>
              ) : filtered.length === 0 ? (
                <li className="sg-combobox-empty" role="presentation">
                  {emptyMessage}
                </li>
              ) : (
                filtered.map((opt, index) => {
                  const isSelected = opt.value === current;
                  const highlighted = index === highlight;
                  return (
                    <li key={opt.value} role="presentation">
                      <button
                        type="button"
                        id={`${listboxId}-opt-${index}`}
                        role="option"
                        data-index={index}
                        className="sg-select-option"
                        aria-selected={isSelected}
                        data-selected={isSelected || undefined}
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
                })
              )}
            </ul>,
            document.body,
          )
        : null}
    </div>
  );

  if (!label && !hint && !error) return control;

  return (
    <div className="sg-field">
      {label ? (
        <label className="sg-field-label" htmlFor={comboId}>
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
