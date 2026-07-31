"use client";

import { cn } from "../lib/cn";
import {
  useEffect,
  useId,
  useMemo,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
} from "react";

/**
 * ISO calendar date `YYYY-MM-DD` (local calendar parts — no timezone engine).
 */
export type DateRangeValue = {
  start: string;
  end: string;
};

export type CalendarMode = "single" | "range";

export type CalendarProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  mode?: CalendarMode;
  /** Single: controlled ISO date. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Range: controlled `{ start, end }` (empty = unset). */
  rangeValue?: DateRangeValue;
  defaultRangeValue?: DateRangeValue;
  onRangeValueChange?: (value: DateRangeValue) => void;
  min?: string;
  max?: string;
  /**
   * Called after a complete selection (single day, or range start+end).
   * DatePicker uses this to close the popover.
   */
  onSelectComplete?: () => void;
  "aria-label"?: string;
};

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;
const YEAR_PAGE = 12;
const ISO_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
const EMPTY_RANGE: DateRangeValue = { start: "", end: "" };

type Ymd = { y: number; m: number; d: number };
type PanelMode = "day" | "month" | "year";
type Cell = { iso: string; day: number; inMonth: boolean };

export function parseISODate(iso: string | undefined): Ymd | null {
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

export function toISODate(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function ymdToDate({ y, m, d }: Ymd): Date {
  return new Date(y, m, d);
}

export function compareISODate(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

function isDisabledISO(iso: string, min?: string, max?: string): boolean {
  if (min && compareISODate(iso, min) < 0) return true;
  if (max && compareISODate(iso, max) > 0) return true;
  return false;
}

function isMonthDisabled(y: number, m: number, min?: string, max?: string): boolean {
  const lastDay = new Date(y, m + 1, 0).getDate();
  const first = toISODate(y, m, 1);
  const last = toISODate(y, m, lastDay);
  if (max && compareISODate(first, max) > 0) return true;
  if (min && compareISODate(last, min) < 0) return true;
  return false;
}

function isYearDisabled(y: number, min?: string, max?: string): boolean {
  const first = toISODate(y, 0, 1);
  const last = toISODate(y, 11, 31);
  if (max && compareISODate(first, max) > 0) return true;
  if (min && compareISODate(last, min) < 0) return true;
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
  return { y: dt.getFullYear(), m: dt.getMonth(), d: Math.min(ymd.d, last) };
}

function clampDayInMonth(y: number, m: number, d: number): number {
  return Math.min(d, new Date(y, m + 1, 0).getDate());
}

function formatMonthName(m: number): string {
  try {
    return new Date(2000, m, 1).toLocaleDateString(undefined, { month: "long" });
  } catch {
    return String(m + 1);
  }
}

function formatMonthShort(m: number): string {
  try {
    return new Date(2000, m, 1).toLocaleDateString(undefined, { month: "short" });
  } catch {
    return String(m + 1);
  }
}

function buildMonthGrid(viewY: number, viewM: number): Cell[] {
  const first = new Date(viewY, viewM, 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(viewY, viewM + 1, 0).getDate();
  const cells: Cell[] = [];
  const prevLast = new Date(viewY, viewM, 0).getDate();

  for (let i = startPad - 1; i >= 0; i -= 1) {
    const d = prevLast - i;
    const dt = new Date(viewY, viewM - 1, d);
    cells.push({
      iso: toISODate(dt.getFullYear(), dt.getMonth(), dt.getDate()),
      day: d,
      inMonth: false,
    });
  }
  for (let d = 1; d <= daysInMonth; d += 1) {
    cells.push({ iso: toISODate(viewY, viewM, d), day: d, inMonth: true });
  }
  while (cells.length % 7 !== 0 || cells.length < 42) {
    const last = cells[cells.length - 1]!;
    const next = addDays(parseISODate(last.iso)!, 1);
    cells.push({ iso: toISODate(next.y, next.m, next.d), day: next.d, inMonth: false });
  }
  return cells;
}

function isInRangeISO(iso: string, start: string, end: string): boolean {
  if (!start || !end) return false;
  return compareISODate(iso, start) >= 0 && compareISODate(iso, end) <= 0;
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
 * Atom — Calendar
 * Inline day / month / year grids (shared by DatePicker panel).
 * Values: ISO `YYYY-MM-DD`. No timezone engine.
 */
export function Calendar({
  className,
  mode = "single",
  value,
  defaultValue = "",
  onValueChange,
  rangeValue,
  defaultRangeValue = EMPTY_RANGE,
  onRangeValueChange,
  min,
  max,
  onSelectComplete,
  "aria-label": ariaLabel,
  ...props
}: CalendarProps) {
  const isRange = mode === "range";
  const reactId = useId();
  const today = useMemo(() => {
    const n = new Date();
    return toISODate(n.getFullYear(), n.getMonth(), n.getDate());
  }, []);
  const todayYmd = parseISODate(today)!;

  const singleControlled = value !== undefined;
  const [singleUncontrolled, setSingleUncontrolled] = useState(defaultValue);
  const current = singleControlled ? value! : singleUncontrolled;

  const rangeControlled = rangeValue !== undefined;
  const [rangeUncontrolled, setRangeUncontrolled] =
    useState<DateRangeValue>(defaultRangeValue);
  const activeRange = rangeControlled ? rangeValue! : rangeUncontrolled;

  const seed =
    parseISODate(isRange ? activeRange.start || activeRange.end : current) ??
    todayYmd;

  const [view, setView] = useState({ y: seed.y, m: seed.m });
  const [focusISO, setFocusISO] = useState(
    isRange
      ? activeRange.end || activeRange.start || today
      : current || today,
  );
  const [panelMode, setPanelMode] = useState<PanelMode>("day");
  const [yearPageStart, setYearPageStart] = useState(
    () => Math.floor(seed.y / YEAR_PAGE) * YEAR_PAGE,
  );
  const [rangeDraft, setRangeDraft] = useState<DateRangeValue | null>(null);

  // Keep view in sync when controlled value jumps months
  useEffect(() => {
    const next = parseISODate(
      isRange ? activeRange.start || activeRange.end : current,
    );
    if (next) setView({ y: next.y, m: next.m });
  }, [current, activeRange.start, activeRange.end, isRange]);

  const selected = parseISODate(current);
  const cells = useMemo(
    () => buildMonthGrid(view.y, view.m),
    [view.y, view.m],
  );
  const years = useMemo(
    () => Array.from({ length: YEAR_PAGE }, (_, i) => yearPageStart + i),
    [yearPageStart],
  );

  function commitSingle(iso: string) {
    if (!singleControlled) setSingleUncontrolled(iso);
    onValueChange?.(iso);
  }

  function commitRange(next: DateRangeValue) {
    let { start, end } = next;
    if (start && end && compareISODate(start, end) > 0) {
      [start, end] = [end, start];
    }
    const ordered = { start, end };
    if (!rangeControlled) setRangeUncontrolled(ordered);
    onRangeValueChange?.(ordered);
    return ordered;
  }

  function selectISO(iso: string) {
    if (isDisabledISO(iso, min, max)) return;

    if (!isRange) {
      commitSingle(iso);
      setFocusISO(iso);
      onSelectComplete?.();
      return;
    }

    if (!rangeDraft || !rangeDraft.start || rangeDraft.end) {
      setRangeDraft({ start: iso, end: "" });
      setFocusISO(iso);
      return;
    }

    const completed = commitRange({ start: rangeDraft.start, end: iso });
    setRangeDraft(null);
    setFocusISO(completed.end || completed.start || iso);
    onSelectComplete?.();
  }

  function jumpTo(y: number, m: number) {
    const focus = parseISODate(focusISO) ?? todayYmd;
    const d = clampDayInMonth(y, m, focus.d);
    let iso = toISODate(y, m, d);
    if (isDisabledISO(iso, min, max)) {
      const last = new Date(y, m + 1, 0).getDate();
      let found = false;
      for (let day = 1; day <= last; day += 1) {
        const candidate = toISODate(y, m, day);
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
    if (!isMonthDisabled(y, view.m, min, max)) {
      jumpTo(y, view.m);
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
    const cur = parseISODate(focusISO) ?? todayYmd;
    let next = addDays(cur, deltaDays);
    let iso = toISODate(next.y, next.m, next.d);
    let guard = 0;
    while (isDisabledISO(iso, min, max) && guard < 400) {
      next = addDays(next, deltaDays > 0 ? 1 : -1);
      iso = toISODate(next.y, next.m, next.d);
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
      const y = view.y + delta;
      if (isYearDisabled(y, min, max)) return;
      setView((v) => ({ ...v, y }));
      setYearPageStart(Math.floor(y / YEAR_PAGE) * YEAR_PAGE);
      return;
    }
    const focus = parseISODate(focusISO) ?? todayYmd;
    const shifted = addMonths(focus, delta);
    jumpTo(shifted.y, shifted.m);
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
      const start = toISODate(view.y, view.m, 1);
      if (!isDisabledISO(start, min, max)) setFocusISO(start);
    } else if (event.key === "End") {
      event.preventDefault();
      const lastDay = new Date(view.y, view.m + 1, 0).getDate();
      const end = toISODate(view.y, view.m, lastDay);
      if (!isDisabledISO(end, min, max)) setFocusISO(end);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectISO(iso);
    }
  }

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

  const displayRange = rangeDraft ?? activeRange;

  return (
    <div
      className={cn("sg-calendar", className)}
      data-mode={panelMode}
      data-selection={isRange ? "range" : "single"}
      role="group"
      aria-label={
        ariaLabel ??
        (panelMode === "day"
          ? isRange
            ? `Date range · ${formatMonthName(view.m)} ${view.y}`
            : `${formatMonthName(view.m)} ${view.y}`
          : panelMode === "month"
            ? `Choose month · ${view.y}`
            : `Choose year · ${yearPageStart}–${yearPageStart + YEAR_PAGE - 1}`)
      }
      {...props}
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
                setYearPageStart(Math.floor(view.y / YEAR_PAGE) * YEAR_PAGE);
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
          {isRange ? (
            <p className="sg-datepicker-range-hint" aria-live="polite">
              {displayRange.start && !displayRange.end
                ? "Select end date"
                : "Select start date"}
            </p>
          ) : null}
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
                  const rangeStart =
                    isRange &&
                    Boolean(displayRange.start) &&
                    cell.iso === displayRange.start;
                  const rangeEnd =
                    isRange &&
                    Boolean(displayRange.end) &&
                    cell.iso === displayRange.end;
                  const inRange =
                    isRange &&
                    Boolean(displayRange.start && displayRange.end) &&
                    isInRangeISO(
                      cell.iso,
                      displayRange.start,
                      displayRange.end,
                    );
                  const draftStart = rangeDraft?.start;
                  const inDraftPreview =
                    isRange &&
                    Boolean(draftStart) &&
                    !rangeDraft?.end &&
                    Boolean(focusISO) &&
                    isInRangeISO(
                      cell.iso,
                      compareISODate(draftStart!, focusISO) <= 0
                        ? draftStart!
                        : focusISO,
                      compareISODate(draftStart!, focusISO) <= 0
                        ? focusISO
                        : draftStart!,
                    );
                  const selectedDay = isRange
                    ? rangeStart || rangeEnd
                    : cell.iso === current;
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
                      data-range-start={rangeStart || undefined}
                      data-range-end={rangeEnd || undefined}
                      data-in-range={
                        (inRange || inDraftPreview) && !selectedDay
                          ? true
                          : undefined
                      }
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
            const isSelected = Boolean(
              isRange
                ? (activeRange.start &&
                    parseISODate(activeRange.start)?.y === view.y &&
                    parseISODate(activeRange.start)?.m === m) ||
                  (activeRange.end &&
                    parseISODate(activeRange.end)?.y === view.y &&
                    parseISODate(activeRange.end)?.m === m)
                : selected?.y === view.y && selected?.m === m,
            );
            const isCurrent = todayYmd.y === view.y && todayYmd.m === m;
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
            const isSelected = Boolean(
              isRange
                ? parseISODate(activeRange.start)?.y === y ||
                    parseISODate(activeRange.end)?.y === y
                : selected?.y === y,
            );
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
      <span className="sg-calendar-uid" hidden>
        {reactId}
      </span>
    </div>
  );
}
