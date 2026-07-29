"use client";

import { cn } from "../lib/cn";
import { MOTION_DEFAULTS, type DatePickerMotion } from "../lib/motion";
import { exitDurationForMotion, usePresence } from "../lib/presence";
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

export type DatePickerSize = "sm" | "md" | "lg";
export type { DatePickerMotion };

/**
 * ISO calendar date `YYYY-MM-DD` (local calendar parts — no timezone engine).
 */
export type DatePickerProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  size?: DatePickerSize;
  /** Panel enter/exit motion (same recipes as Select). */
  motion?: DatePickerMotion;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  /** Inclusive min date `YYYY-MM-DD`. */
  min?: string;
  /** Inclusive max date `YYYY-MM-DD`. */
  max?: string;
  name?: string;
  id?: string;
  className?: string;
  placement?: "auto" | "bottom" | "top";
  "aria-label"?: string;
};

const sizeClass: Record<DatePickerSize, string> = {
  sm: "sg-datepicker-trigger-sm",
  md: "",
  lg: "sg-datepicker-trigger-lg",
};

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

/** How many years in the year grid page. */
const YEAR_PAGE = 12;

const ISO_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

type Ymd = { y: number; m: number; d: number };
type PanelMode = "day" | "month" | "year";

function parseISO(iso: string | undefined): Ymd | null {
  if (!iso) return null;
  const match = ISO_RE.exec(iso);
  if (!match) return null;
  const y = Number(match[1]);
  const m = Number(match[2]) - 1;
  const d = Number(match[3]);
  if (!Number.isFinite(y) || m < 0 || m > 11 || d < 1 || d > 31) return null;
  const dt = new Date(y, m, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== m || dt.getDate() !== d) {
    return null;
  }
  return { y, m, d };
}

function toISO(y: number, m: number, d: number): string {
  const mm = String(m + 1).padStart(2, "0");
  const dd = String(d).padStart(2, "0");
  return `${y}-${mm}-${dd}`;
}

function ymdToDate({ y, m, d }: Ymd): Date {
  return new Date(y, m, d);
}

function compareISO(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

function clampISO(iso: string, min?: string, max?: string): string {
  let next = iso;
  if (min && compareISO(next, min) < 0) next = min;
  if (max && compareISO(next, max) > 0) next = max;
  return next;
}

function isDisabledISO(iso: string, min?: string, max?: string): boolean {
  if (min && compareISO(iso, min) < 0) return true;
  if (max && compareISO(iso, max) > 0) return true;
  return false;
}

/** Month has no selectable day inside min/max. */
function isMonthDisabled(
  y: number,
  m: number,
  min?: string,
  max?: string,
): boolean {
  const lastDay = new Date(y, m + 1, 0).getDate();
  const first = toISO(y, m, 1);
  const last = toISO(y, m, lastDay);
  if (max && compareISO(first, max) > 0) return true;
  if (min && compareISO(last, min) < 0) return true;
  return false;
}

/** Year has no selectable day inside min/max. */
function isYearDisabled(y: number, min?: string, max?: string): boolean {
  const first = toISO(y, 0, 1);
  const last = toISO(y, 11, 31);
  if (max && compareISO(first, max) > 0) return true;
  if (min && compareISO(last, min) < 0) return true;
  return false;
}

function addDays(ymd: Ymd, delta: number): Ymd {
  const dt = ymdToDate(ymd);
  dt.setDate(dt.getDate() + delta);
  return { y: dt.getFullYear(), m: dt.getMonth(), d: dt.getDate() };
}

function addMonths(ymd: Ymd, delta: number): Ymd {
  const dt = new Date(ymd.y, ymd.m + delta, 1);
  const last = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
  const d = Math.min(ymd.d, last);
  return { y: dt.getFullYear(), m: dt.getMonth(), d };
}

function clampDayInMonth(y: number, m: number, d: number): number {
  const last = new Date(y, m + 1, 0).getDate();
  return Math.min(d, last);
}

function formatDisplay(iso: string): string {
  const ymd = parseISO(iso);
  if (!ymd) return iso;
  try {
    return ymdToDate(ymd).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function formatMonthName(m: number): string {
  try {
    return new Date(2000, m, 1).toLocaleDateString(undefined, {
      month: "long",
    });
  } catch {
    return String(m + 1);
  }
}

function formatMonthShort(m: number): string {
  try {
    return new Date(2000, m, 1).toLocaleDateString(undefined, {
      month: "short",
    });
  } catch {
    return String(m + 1);
  }
}

type Cell = {
  iso: string;
  day: number;
  inMonth: boolean;
};

function buildMonthGrid(viewY: number, viewM: number): Cell[] {
  const first = new Date(viewY, viewM, 1);
  const startPad = first.getDay(); // 0 = Sunday
  const daysInMonth = new Date(viewY, viewM + 1, 0).getDate();
  const cells: Cell[] = [];

  const prevLast = new Date(viewY, viewM, 0).getDate();
  for (let i = startPad - 1; i >= 0; i -= 1) {
    const d = prevLast - i;
    const dt = new Date(viewY, viewM - 1, d);
    cells.push({
      iso: toISO(dt.getFullYear(), dt.getMonth(), dt.getDate()),
      day: d,
      inMonth: false,
    });
  }

  for (let d = 1; d <= daysInMonth; d += 1) {
    cells.push({
      iso: toISO(viewY, viewM, d),
      day: d,
      inMonth: true,
    });
  }

  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1]!;
    const next = addDays(parseISO(last.iso)!, 1);
    cells.push({
      iso: toISO(next.y, next.m, next.d),
      day: next.d,
      inMonth: false,
    });
  }
  while (cells.length < 42) {
    const last = cells[cells.length - 1]!;
    const next = addDays(parseISO(last.iso)!, 1);
    cells.push({
      iso: toISO(next.y, next.m, next.d),
      day: next.d,
      inMonth: false,
    });
  }

  return cells;
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect
        x="3.25"
        y="4.5"
        width="13.5"
        height="12.25"
        rx="2.25"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M3.25 8.25h13.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M7 3.25v2.5M13 3.25v2.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M12.25 5.5 7.75 10l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M7.75 5.5 12.25 10l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Atom — DatePicker
 * Single calendar date. Solid trigger + frost panel.
 * Day grid, plus month/year grids so you can jump without only using arrows.
 * Value is ISO `YYYY-MM-DD` (local calendar; no range/time/locale packs).
 */
export function DatePicker({
  value,
  defaultValue = "",
  onValueChange,
  placeholder = "Pick a date…",
  size = "md",
  motion = MOTION_DEFAULTS.datePicker,
  label,
  hint,
  error,
  disabled,
  min,
  max,
  name,
  id,
  className,
  placement = "auto",
  "aria-label": ariaLabel,
}: DatePickerProps) {
  const reactId = useId();
  const pickerId = id ?? `sg-datepicker-${reactId}`;
  const panelId = `${pickerId}-panel`;
  const hintId = hint ? `${pickerId}-hint` : undefined;
  const errorId = error ? `${pickerId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(error);

  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const current = isControlled ? value : uncontrolled;
  const selected = parseISO(current);

  const today = useMemo(() => {
    const now = new Date();
    return toISO(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);
  const todayYmd = parseISO(today)!;

  const [open, setOpen] = useState(false);
  const [menuPlacement, setMenuPlacement] = useState<"bottom" | "top">("bottom");
  const [panelMode, setPanelMode] = useState<PanelMode>("day");
  const [view, setView] = useState(() => {
    const base = selected ?? parseISO(today)!;
    return { y: base.y, m: base.m };
  });
  /** First year of the 12-year page in year mode. */
  const [yearPageStart, setYearPageStart] = useState(() => {
    const base = selected ?? parseISO(today)!;
    return Math.floor(base.y / YEAR_PAGE) * YEAR_PAGE;
  });
  const [focusISO, setFocusISO] = useState<string>(() => current || today);
  const { mounted: panelMounted, exiting: panelExiting, state: panelState } =
    usePresence(open, { durationMs: exitDurationForMotion(motion) });

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const cells = useMemo(
    () => buildMonthGrid(view.y, view.m),
    [view.y, view.m],
  );

  const years = useMemo(
    () =>
      Array.from({ length: YEAR_PAGE }, (_, i) => yearPageStart + i),
    [yearPageStart],
  );

  const commit = useCallback(
    (next: string) => {
      const clamped = clampISO(next, min, max);
      if (!isControlled) setUncontrolled(clamped);
      onValueChange?.(clamped);
    },
    [isControlled, max, min, onValueChange],
  );

  const close = useCallback(() => {
    setOpen(false);
    setPanelMode("day");
  }, []);

  const openPanel = useCallback(() => {
    if (disabled) return;

    if (placement === "top") {
      setMenuPlacement("top");
    } else if (placement === "bottom") {
      setMenuPlacement("bottom");
    } else if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setMenuPlacement(spaceBelow < 320 && rect.top > spaceBelow ? "top" : "bottom");
    }

    const base =
      parseISO(current) ??
      parseISO(clampISO(today, min, max)) ??
      parseISO(today)!;
    setView({ y: base.y, m: base.m });
    setYearPageStart(Math.floor(base.y / YEAR_PAGE) * YEAR_PAGE);
    setFocusISO(toISO(base.y, base.m, base.d));
    setPanelMode("day");
    setOpen(true);
  }, [current, disabled, max, min, placement, today]);

  useEffect(() => {
    if (!open || panelExiting) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        close();
      }
    }

    function onDocKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      // Drill back: year → month → day → close
      setPanelMode((mode) => {
        if (mode === "year") return "month";
        if (mode === "month") return "day";
        close();
        triggerRef.current?.focus();
        return mode;
      });
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onDocKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onDocKeyDown);
    };
  }, [close, open, panelExiting]);

  useEffect(() => {
    if (!open || panelExiting || panelMode !== "day") return;
    const el = panelRef.current?.querySelector<HTMLElement>(
      `[data-iso="${focusISO}"]`,
    );
    el?.focus({ preventScroll: true });
  }, [focusISO, open, panelExiting, panelMode, view.y, view.m]);

  function selectISO(iso: string) {
    if (isDisabledISO(iso, min, max)) return;
    commit(iso);
    close();
    triggerRef.current?.focus();
  }

  /** Keep focus day when jumping month/year (clamp day into new month). */
  function jumpTo(y: number, m: number) {
    const focus = parseISO(focusISO) ?? parseISO(today)!;
    const d = clampDayInMonth(y, m, focus.d);
    let iso = toISO(y, m, d);
    if (isDisabledISO(iso, min, max)) {
      // First enabled day in that month
      const last = new Date(y, m + 1, 0).getDate();
      let found = false;
      for (let day = 1; day <= last; day += 1) {
        const candidate = toISO(y, m, day);
        if (!isDisabledISO(candidate, min, max)) {
          iso = candidate;
          found = true;
          break;
        }
      }
      if (!found) return;
    }
    setView({ y, m });
    setFocusISO(iso);
  }

  function selectMonth(m: number) {
    if (isMonthDisabled(view.y, m, min, max)) return;
    jumpTo(view.y, m);
    setPanelMode("day");
  }

  function selectYear(y: number) {
    if (isYearDisabled(y, min, max)) return;
    const m = view.m;
    // If current month is invalid in that year, pick first valid month
    if (!isMonthDisabled(y, m, min, max)) {
      jumpTo(y, m);
    } else {
      for (let month = 0; month < 12; month += 1) {
        if (!isMonthDisabled(y, month, min, max)) {
          jumpTo(y, month);
          break;
        }
      }
      setView((v) => ({ ...v, y }));
    }
    setPanelMode("month");
  }

  function moveFocus(deltaDays: number) {
    const cur = parseISO(focusISO) ?? parseISO(today)!;
    let next = addDays(cur, deltaDays);
    let iso = toISO(next.y, next.m, next.d);
    let guard = 0;
    while (isDisabledISO(iso, min, max) && guard < 400) {
      next = addDays(next, deltaDays > 0 ? 1 : -1);
      iso = toISO(next.y, next.m, next.d);
      guard += 1;
    }
    if (isDisabledISO(iso, min, max)) return;
    setFocusISO(iso);
    setView({ y: next.y, m: next.m });
  }

  function shiftByNav(delta: number) {
    if (panelMode === "year") {
      setYearPageStart((s) => s + delta * YEAR_PAGE);
      return;
    }
    if (panelMode === "month") {
      // Prev/next year while picking month
      const y = view.y + delta;
      if (isYearDisabled(y, min, max)) return;
      setView((v) => ({ ...v, y }));
      setYearPageStart(Math.floor(y / YEAR_PAGE) * YEAR_PAGE);
      return;
    }
    // day mode — shift month
    const focus = parseISO(focusISO) ?? parseISO(today)!;
    const shifted = addMonths(focus, delta);
    jumpTo(shifted.y, shifted.m);
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
      if (!open) openPanel();
    }
  }

  function onDayKeyDown(event: KeyboardEvent<HTMLButtonElement>, iso: string) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveFocus(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      moveFocus(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      moveFocus(-7);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      moveFocus(7);
    } else if (event.key === "PageUp") {
      event.preventDefault();
      shiftByNav(event.shiftKey ? -12 : -1);
    } else if (event.key === "PageDown") {
      event.preventDefault();
      shiftByNav(event.shiftKey ? 12 : 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      const start = toISO(view.y, view.m, 1);
      if (!isDisabledISO(start, min, max)) setFocusISO(start);
    } else if (event.key === "End") {
      event.preventDefault();
      const lastDay = new Date(view.y, view.m + 1, 0).getDate();
      const end = toISO(view.y, view.m, lastDay);
      if (!isDisabledISO(end, min, max)) setFocusISO(end);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectISO(iso);
    }
  }

  const display = current && parseISO(current) ? formatDisplay(current) : null;

  const navPrevLabel =
    panelMode === "year"
      ? "Previous years"
      : panelMode === "month"
        ? "Previous year"
        : "Previous month";
  const navNextLabel =
    panelMode === "year"
      ? "Next years"
      : panelMode === "month"
        ? "Next year"
        : "Next month";

  const headerTitle =
    panelMode === "year"
      ? `${yearPageStart} – ${yearPageStart + YEAR_PAGE - 1}`
      : panelMode === "month"
        ? String(view.y)
        : null;

  const control = (
    <div className="sg-datepicker-root" ref={rootRef}>
      {name ? <input type="hidden" name={name} value={current} /> : null}

      <button
        ref={triggerRef}
        id={pickerId}
        type="button"
        className={cn(
          "sg-datepicker-trigger",
          sizeClass[size],
          className,
        )}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        aria-label={ariaLabel ?? (label ? undefined : "Date")}
        data-open={open || undefined}
        onClick={() => (open ? close() : openPanel())}
        onKeyDown={onTriggerKeyDown}
      >
        <span
          className="sg-datepicker-value"
          data-placeholder={!display || undefined}
        >
          {display ?? placeholder}
        </span>
        <span className="sg-datepicker-icon" aria-hidden="true">
          <CalendarIcon />
        </span>
      </button>

      {panelMounted ? (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-label={
            panelMode === "day"
              ? `${formatMonthName(view.m)} ${view.y}`
              : panelMode === "month"
                ? `Choose month · ${view.y}`
                : `Choose year · ${yearPageStart}–${yearPageStart + YEAR_PAGE - 1}`
          }
          className="sg-datepicker-panel"
          data-placement={menuPlacement}
          data-motion={motion}
          data-state={panelState}
          data-mode={panelMode}
        >
          <div className="sg-datepicker-header">
            <button
              type="button"
              className="sg-datepicker-nav"
              aria-label={navPrevLabel}
              onClick={() => shiftByNav(-1)}
            >
              <ChevronLeftIcon />
            </button>

            {panelMode === "day" ? (
              <div className="sg-datepicker-caption">
                <button
                  type="button"
                  className="sg-datepicker-caption-btn"
                  aria-label={`Choose month, currently ${formatMonthName(view.m)}`}
                  onClick={() => setPanelMode("month")}
                >
                  {formatMonthName(view.m)}
                </button>
                <button
                  type="button"
                  className="sg-datepicker-caption-btn"
                  aria-label={`Choose year, currently ${view.y}`}
                  onClick={() => {
                    setYearPageStart(
                      Math.floor(view.y / YEAR_PAGE) * YEAR_PAGE,
                    );
                    setPanelMode("year");
                  }}
                >
                  {view.y}
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="sg-datepicker-caption-btn sg-datepicker-caption-btn-wide"
                aria-live="polite"
                onClick={() =>
                  setPanelMode(panelMode === "year" ? "month" : "day")
                }
              >
                {headerTitle}
              </button>
            )}

            <button
              type="button"
              className="sg-datepicker-nav"
              aria-label={navNextLabel}
              onClick={() => shiftByNav(1)}
            >
              <ChevronRightIcon />
            </button>
          </div>

          {panelMode === "day" ? (
            <>
              <div className="sg-datepicker-weekdays" aria-hidden="true">
                {WEEKDAYS.map((wd) => (
                  <span key={wd} className="sg-datepicker-weekday">
                    {wd}
                  </span>
                ))}
              </div>

              <div className="sg-datepicker-grid" role="grid">
                {Array.from({ length: cells.length / 7 }, (_, week) => (
                  <div key={week} className="sg-datepicker-row" role="row">
                    {cells.slice(week * 7, week * 7 + 7).map((cell) => {
                      const selectedDay = cell.iso === current;
                      const isToday = cell.iso === today;
                      const focused = cell.iso === focusISO;
                      const dayDisabled = isDisabledISO(cell.iso, min, max);

                      return (
                        <button
                          key={cell.iso}
                          type="button"
                          role="gridcell"
                          tabIndex={focused ? 0 : -1}
                          data-iso={cell.iso}
                          className="sg-datepicker-day"
                          aria-selected={selectedDay}
                          aria-current={isToday ? "date" : undefined}
                          aria-disabled={dayDisabled || undefined}
                          data-selected={selectedDay || undefined}
                          data-today={isToday || undefined}
                          data-outside={!cell.inMonth || undefined}
                          data-focused={focused || undefined}
                          disabled={dayDisabled}
                          onClick={() => selectISO(cell.iso)}
                          onKeyDown={(event) => onDayKeyDown(event, cell.iso)}
                          onFocus={() => setFocusISO(cell.iso)}
                        >
                          {cell.day}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </>
          ) : null}

          {panelMode === "month" ? (
            <div
              className="sg-datepicker-picker-grid"
              role="listbox"
              aria-label="Month"
            >
              {Array.from({ length: 12 }, (_, m) => {
                const monthDisabled = isMonthDisabled(view.y, m, min, max);
                const isSelected =
                  selected?.y === view.y && selected?.m === m;
                const isCurrent =
                  todayYmd.y === view.y && todayYmd.m === m;
                return (
                  <button
                    key={m}
                    type="button"
                    role="option"
                    className="sg-datepicker-picker-cell"
                    aria-selected={isSelected}
                    data-selected={isSelected || undefined}
                    data-today={isCurrent || undefined}
                    disabled={monthDisabled}
                    onClick={() => selectMonth(m)}
                  >
                    {formatMonthShort(m)}
                  </button>
                );
              })}
            </div>
          ) : null}

          {panelMode === "year" ? (
            <div
              className="sg-datepicker-picker-grid"
              role="listbox"
              aria-label="Year"
            >
              {years.map((y) => {
                const yearDisabled = isYearDisabled(y, min, max);
                const isSelected = selected?.y === y;
                const isCurrent = todayYmd.y === y;
                return (
                  <button
                    key={y}
                    type="button"
                    role="option"
                    className="sg-datepicker-picker-cell"
                    aria-selected={isSelected}
                    data-selected={isSelected || undefined}
                    data-today={isCurrent || undefined}
                    disabled={yearDisabled}
                    onClick={() => selectYear(y)}
                  >
                    {y}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );

  if (!label && !hint && !error) {
    return control;
  }

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
