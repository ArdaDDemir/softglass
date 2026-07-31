"use client";

import { cn } from "../lib/cn";
import type { DataTableLook } from "../lib/looks";
import { Checkbox } from "../atoms/checkbox";
import { EmptyState } from "./empty-state";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type ThHTMLAttributes,
  type TdHTMLAttributes,
  type UIEvent,
} from "react";

export type { DataTableLook };

export type DataTableDensity = "comfortable" | "compact";

export type DataTableSortDirection = "asc" | "desc";

export type DataTableSortState = {
  columnId: string;
  direction: DataTableSortDirection;
} | null;

export type DataTableSelectionMode = "none" | "single" | "multiple";

export type DataTableColumnAlign = "start" | "center" | "end";

export type DataTableColumn<T> = {
  id: string;
  header: ReactNode;
  /** Simple field key — used for cell text and default sort. */
  accessor?: keyof T & string;
  cell?: (row: T, index: number) => ReactNode;
  sortable?: boolean;
  /** Custom sort key (preferred over raw accessor when sorting). */
  sortValue?: (row: T) => string | number | boolean | null | undefined;
  align?: DataTableColumnAlign;
  width?: string | number;
};

export type DataTableProps<T> = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  data: T[];
  columns: DataTableColumn<T>[];
  getRowId?: (row: T, index: number) => string;
  /**
   * Accessible name for a row (selection checkbox / row label).
   * Default: row id.
   */
  getRowLabel?: (row: T, index: number) => string;
  /** soft | solid | glass | outline | ghost */
  look?: DataTableLook;
  density?: DataTableDensity;
  /** Sticky thead. Default true. */
  stickyHeader?: boolean;
  loading?: boolean;
  /** Full empty override (replaces default EmptyState). */
  empty?: ReactNode;
  emptyTitle?: ReactNode;
  emptyDescription?: ReactNode;
  selectionMode?: DataTableSelectionMode;
  selectedIds?: string[];
  defaultSelectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  sort?: DataTableSortState;
  defaultSort?: DataTableSortState;
  onSortChange?: (sort: DataTableSortState) => void;
  /**
   * When true (default), reorder `data` client-side for active sort.
   * Set false for server-ordered rows (still shows sort UI if controlled).
   */
  clientSort?: boolean;
  /** Skeleton row count while loading. Default 5. */
  loadingRowCount?: number;
  /**
   * Window only visible rows (native spacer virtualization).
   * Use for long lists (hundreds+). Needs a bounded viewport height
   * (`maxHeight` or style height / maxHeight on the root).
   */
  virtualized?: boolean;
  /**
   * Fixed row height estimate in px for windowing math.
   * Default: 44 (comfortable) / 36 (compact).
   */
  estimateRowHeight?: number;
  /**
   * Scroll viewport max height when virtualized (or any scrollable table).
   * Number = px. Also accept CSS length strings.
   * Default when virtualized: 320.
   */
  maxHeight?: number | string;
  /** Extra rows rendered above/below the viewport. Default 6. */
  overscan?: number;
  "aria-label"?: string;
};

/* —— Low-level table compounds —— */

export type TableProps = HTMLAttributes<HTMLTableElement>;
export function Table({ className, ...props }: TableProps) {
  return <table className={cn("sg-table", className)} {...props} />;
}

export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>;
export function TableHeader({ className, ...props }: TableHeaderProps) {
  return <thead className={cn("sg-table-header", className)} {...props} />;
}

export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;
export function TableBody({ className, ...props }: TableBodyProps) {
  return <tbody className={cn("sg-table-body", className)} {...props} />;
}

export type TableRowProps = HTMLAttributes<HTMLTableRowElement> & {
  selected?: boolean;
};
export function TableRow({
  className,
  selected,
  ...props
}: TableRowProps) {
  return (
    <tr
      className={cn("sg-table-row", className)}
      data-selected={selected || undefined}
      {...props}
    />
  );
}

export type TableHeadProps = Omit<
  ThHTMLAttributes<HTMLTableCellElement>,
  "align"
> & {
  align?: DataTableColumnAlign;
  sortable?: boolean;
  sorted?: DataTableSortDirection | false;
};
export function TableHead({
  className,
  align = "start",
  sortable,
  sorted,
  children,
  ...props
}: TableHeadProps) {
  const ariaSort =
    sorted === "asc"
      ? "ascending"
      : sorted === "desc"
        ? "descending"
        : sortable
          ? "none"
          : undefined;

  return (
    <th
      className={cn("sg-table-head", className)}
      data-align={align === "start" ? undefined : align}
      data-sortable={sortable || undefined}
      data-sorted={sorted || undefined}
      aria-sort={ariaSort}
      {...props}
    >
      {children}
    </th>
  );
}

export type TableCellProps = Omit<
  TdHTMLAttributes<HTMLTableCellElement>,
  "align"
> & {
  align?: DataTableColumnAlign;
};
export function TableCell({
  className,
  align = "start",
  ...props
}: TableCellProps) {
  return (
    <td
      className={cn("sg-table-cell", className)}
      data-align={align === "start" ? undefined : align}
      {...props}
    />
  );
}

/* —— Helpers —— */

function defaultRowId<T>(row: T, index: number): string {
  if (row && typeof row === "object") {
    const rec = row as Record<string, unknown>;
    if (typeof rec.id === "string" || typeof rec.id === "number") {
      return String(rec.id);
    }
  }
  return String(index);
}

function compareSortValues(
  a: string | number | boolean | null | undefined,
  b: string | number | boolean | null | undefined,
): number {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  if (typeof a === "boolean" && typeof b === "boolean") {
    return Number(a) - Number(b);
  }
  return String(a).localeCompare(String(b), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

function cellContent<T>(
  column: DataTableColumn<T>,
  row: T,
  index: number,
): ReactNode {
  if (column.cell) return column.cell(row, index);
  if (column.accessor) {
    const value = (row as Record<string, unknown>)[column.accessor];
    if (value == null) return null;
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return String(value);
    }
    return null;
  }
  return null;
}

function columnWidthStyle(width?: string | number): CSSProperties | undefined {
  if (width == null) return undefined;
  return { width: typeof width === "number" ? `${width}px` : width };
}

function headerText(header: ReactNode): string {
  if (typeof header === "string" || typeof header === "number") {
    return String(header);
  }
  return "Column";
}

function sortButtonLabel(
  header: ReactNode,
  sorted: DataTableSortDirection | false,
): string {
  const name = headerText(header);
  if (sorted === "asc") return `Sort ${name}, currently ascending`;
  if (sorted === "desc") return `Sort ${name}, currently descending`;
  return `Sort ${name}`;
}

function defaultEstimateRowHeight(density: DataTableDensity): number {
  return density === "compact" ? 36 : 44;
}

/** Parse CSS max-height / height to a px number when possible (for window math). */
function parseCssLengthToPx(value: number | string | undefined): number | null {
  if (value == null) return null;
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return value;
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    if (trimmed.endsWith("px")) {
      const n = Number.parseFloat(trimmed);
      return Number.isFinite(n) && n > 0 ? n : null;
    }
    const bare = Number.parseFloat(trimmed);
    if (Number.isFinite(bare) && bare > 0 && /^\d+(\.\d+)?$/.test(trimmed)) {
      return bare;
    }
  }
  return null;
}

function resolveMaxHeightStyle(
  maxHeight: number | string | undefined,
  virtualized: boolean,
  styleMaxHeight: CSSProperties["maxHeight"],
): number | string | undefined {
  if (maxHeight != null) {
    return typeof maxHeight === "number" ? maxHeight : maxHeight;
  }
  if (styleMaxHeight != null) return styleMaxHeight;
  if (virtualized) return 320;
  return undefined;
}

function SortGlyph({ direction }: { direction?: DataTableSortDirection | false }) {
  if (direction === "asc") {
    return (
      <span className="sg-table-sort-icon" aria-hidden="true">
        ↑
      </span>
    );
  }
  if (direction === "desc") {
    return (
      <span className="sg-table-sort-icon" aria-hidden="true">
        ↓
      </span>
    );
  }
  return (
    <span className="sg-table-sort-icon sg-table-sort-icon-idle" aria-hidden="true">
      ↕
    </span>
  );
}

/** Vary skeleton widths so loading rows feel like real content. */
const SKELETON_WIDTHS = ["68%", "52%", "78%", "44%", "60%", "72%"] as const;

/**
 * Molecule — DataTable
 * Product-list table: sort, selection, sticky header, density, look, empty/loading,
 * optional native row windowing (`virtualized`).
 */
export function DataTable<T>({
  className,
  data,
  columns,
  getRowId = defaultRowId,
  getRowLabel,
  look = "soft",
  density = "comfortable",
  stickyHeader = true,
  loading = false,
  empty,
  emptyTitle = "No results",
  emptyDescription = "Nothing to show yet.",
  selectionMode = "none",
  selectedIds: selectedIdsProp,
  defaultSelectedIds,
  onSelectionChange,
  sort: sortProp,
  defaultSort = null,
  onSortChange,
  clientSort = true,
  loadingRowCount = 5,
  virtualized = false,
  estimateRowHeight,
  maxHeight,
  overscan = 6,
  "aria-label": ariaLabel = "Data table",
  style,
  ...props
}: DataTableProps<T>) {
  const selectable = selectionMode !== "none";
  const multi = selectionMode === "multiple";
  const rowHeight =
    estimateRowHeight ?? defaultEstimateRowHeight(density);
  const resolvedMaxHeight = resolveMaxHeightStyle(
    maxHeight,
    virtualized,
    style?.maxHeight,
  );

  const sortControlled = sortProp !== undefined;
  const [sortUncontrolled, setSortUncontrolled] =
    useState<DataTableSortState>(defaultSort);
  const sort = sortControlled ? sortProp : sortUncontrolled;

  const selectionControlled = selectedIdsProp !== undefined;
  const [selectedUncontrolled, setSelectedUncontrolled] = useState<string[]>(
    () => defaultSelectedIds ?? [],
  );
  const selectedIds = selectionControlled
    ? selectedIdsProp
    : selectedUncontrolled;
  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const setSelected = useCallback(
    (next: string[]) => {
      if (!selectionControlled) setSelectedUncontrolled(next);
      onSelectionChange?.(next);
    },
    [onSelectionChange, selectionControlled],
  );

  const setSort = useCallback(
    (next: DataTableSortState) => {
      if (!sortControlled) setSortUncontrolled(next);
      onSortChange?.(next);
    },
    [onSortChange, sortControlled],
  );

  const toggleSort = useCallback(
    (columnId: string) => {
      if (!sort || sort.columnId !== columnId) {
        setSort({ columnId, direction: "asc" });
        return;
      }
      if (sort.direction === "asc") {
        setSort({ columnId, direction: "desc" });
        return;
      }
      setSort(null);
    },
    [setSort, sort],
  );

  const sortedData = useMemo(() => {
    if (!clientSort || !sort) return data;
    const column = columns.find((c) => c.id === sort.columnId);
    if (!column?.sortable) return data;

    const indexed = data.map((row, index) => ({ row, index }));
    indexed.sort((a, b) => {
      const av = column.sortValue
        ? column.sortValue(a.row)
        : column.accessor
          ? ((a.row as Record<string, unknown>)[
              column.accessor
            ] as string | number | boolean | null | undefined)
          : undefined;
      const bv = column.sortValue
        ? column.sortValue(b.row)
        : column.accessor
          ? ((b.row as Record<string, unknown>)[
              column.accessor
            ] as string | number | boolean | null | undefined)
          : undefined;
      const cmp = compareSortValues(av, bv);
      // Stable tie-break on original index
      if (cmp === 0) return a.index - b.index;
      return sort.direction === "asc" ? cmp : -cmp;
    });
    return indexed.map((x) => x.row);
  }, [clientSort, columns, data, sort]);

  const rowIds = useMemo(
    () => sortedData.map((row, index) => getRowId(row, index)),
    [getRowId, sortedData],
  );

  const allSelected =
    multi && rowIds.length > 0 && rowIds.every((id) => selectedSet.has(id));
  const someSelected =
    multi &&
    !allSelected &&
    rowIds.some((id) => selectedSet.has(id));

  const toggleAll = useCallback(() => {
    if (!multi) return;
    if (allSelected) setSelected([]);
    else setSelected([...rowIds]);
  }, [allSelected, multi, rowIds, setSelected]);

  const toggleRow = useCallback(
    (id: string) => {
      if (!selectable) return;
      if (multi) {
        if (selectedSet.has(id)) {
          setSelected(selectedIds.filter((x) => x !== id));
        } else {
          setSelected([...selectedIds, id]);
        }
        return;
      }
      // single
      if (selectedSet.has(id)) setSelected([]);
      else setSelected([id]);
    },
    [multi, selectable, selectedIds, selectedSet, setSelected],
  );

  const colSpan = columns.length + (selectable ? 1 : 0);
  const showEmpty = !loading && data.length === 0;
  const selectAllLabel = allSelected
    ? "Deselect all rows"
    : someSelected
      ? "Select all rows (some selected)"
      : "Select all rows";

  /* —— Virtualization (native spacer window) —— */
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const windowActive =
    virtualized && !loading && !showEmpty && sortedData.length > 0;

  const measureViewport = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const next = el.clientHeight;
    setViewportHeight((prev) => (prev === next ? prev : next));
  }, []);

  useEffect(() => {
    if (!windowActive) return;
    measureViewport();
    const el = scrollRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measureViewport());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measureViewport, windowActive, resolvedMaxHeight, density, rowHeight]);

  // Reset scroll when data identity / sort changes so window stays valid
  useEffect(() => {
    if (!windowActive) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = 0;
    setScrollTop(0);
  }, [windowActive, sortedData, sort]);

  const onScroll = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      if (!windowActive) return;
      const next = event.currentTarget.scrollTop;
      setScrollTop((prev) => (Math.abs(prev - next) < 1 ? prev : next));
    },
    [windowActive],
  );

  const fallbackViewport =
    parseCssLengthToPx(resolvedMaxHeight) ??
    parseCssLengthToPx(style?.height) ??
    320;
  const effectiveViewport =
    viewportHeight > 0 ? viewportHeight : fallbackViewport;

  const { startIndex, endIndex, padTop, padBottom } = useMemo(() => {
    const total = sortedData.length;
    if (!windowActive || total === 0) {
      return {
        startIndex: 0,
        endIndex: total,
        padTop: 0,
        padBottom: 0,
      };
    }
    const safeHeight = Math.max(1, rowHeight);
    const rawStart = Math.floor(scrollTop / safeHeight) - overscan;
    const start = Math.max(0, rawStart);
    const visible = Math.ceil(effectiveViewport / safeHeight) + overscan * 2;
    const end = Math.min(total, start + Math.max(visible, 1));
    return {
      startIndex: start,
      endIndex: end,
      padTop: start * safeHeight,
      padBottom: Math.max(0, (total - end) * safeHeight),
    };
  }, [
    effectiveViewport,
    overscan,
    rowHeight,
    scrollTop,
    sortedData.length,
    windowActive,
  ]);

  const visibleRows = windowActive
    ? sortedData.slice(startIndex, endIndex)
    : sortedData;

  const rootStyle: CSSProperties = {
    ...style,
    ...(resolvedMaxHeight != null && style?.maxHeight == null
      ? {
          maxHeight:
            typeof resolvedMaxHeight === "number"
              ? resolvedMaxHeight
              : resolvedMaxHeight,
        }
      : null),
  };

  return (
    <div
      className={cn("sg-data-table", className)}
      data-look={look}
      data-density={density === "comfortable" ? undefined : density}
      data-sticky-header={stickyHeader ? undefined : "false"}
      data-loading={loading || undefined}
      data-empty={showEmpty || undefined}
      data-selection={selectable ? selectionMode : undefined}
      data-virtualized={virtualized || undefined}
      data-virtual-start={windowActive ? startIndex : undefined}
      data-virtual-end={windowActive ? endIndex : undefined}
      style={rootStyle}
      {...props}
    >
      <div
        ref={scrollRef}
        className="sg-data-table-scroll"
        onScroll={onScroll}
      >
        <Table aria-label={ariaLabel} aria-busy={loading || undefined}>
          <TableHeader>
            <TableRow>
              {selectable ? (
                <TableHead
                  className="sg-table-head-select"
                  scope="col"
                  aria-label="Row selection"
                >
                  {multi ? (
                    <Checkbox
                      aria-label={selectAllLabel}
                      checked={allSelected}
                      indeterminate={someSelected}
                      onCheckedChange={() => toggleAll()}
                    />
                  ) : (
                    <span className="sg-table-select-spacer" aria-hidden="true" />
                  )}
                </TableHead>
              ) : null}
              {columns.map((column) => {
                const isSorted =
                  sort?.columnId === column.id ? sort.direction : false;
                return (
                  <TableHead
                    key={column.id}
                    scope="col"
                    align={column.align}
                    sortable={column.sortable}
                    sorted={isSorted}
                    style={columnWidthStyle(column.width)}
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        className="sg-table-sort-btn"
                        aria-label={sortButtonLabel(column.header, isSorted)}
                        onClick={() => toggleSort(column.id)}
                      >
                        <span className="sg-table-head-label" aria-hidden="true">
                          {column.header}
                        </span>
                        <SortGlyph direction={isSorted} />
                      </button>
                    ) : (
                      <span className="sg-table-head-label">{column.header}</span>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: Math.max(1, loadingRowCount) }, (_, i) => (
                  <TableRow
                    key={`sk-${i}`}
                    className="sg-table-row-skeleton"
                    aria-hidden="true"
                  >
                    {selectable ? (
                      <TableCell className="sg-table-cell-select">
                        <span className="sg-table-skeleton-block sg-table-skeleton-check" />
                      </TableCell>
                    ) : null}
                    {columns.map((column, colIndex) => (
                      <TableCell key={column.id} align={column.align}>
                        <span
                          className="sg-table-skeleton-block"
                          style={{
                            width:
                              SKELETON_WIDTHS[
                                (i + colIndex) % SKELETON_WIDTHS.length
                              ],
                          }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : null}

            {showEmpty ? (
              <TableRow className="sg-table-row-empty">
                <TableCell colSpan={colSpan} className="sg-table-cell-empty">
                  {empty ?? (
                    <EmptyState
                      look="soft"
                      size="sm"
                      title={emptyTitle as string}
                      description={
                        emptyDescription == null
                          ? undefined
                          : (emptyDescription as string)
                      }
                    />
                  )}
                </TableCell>
              </TableRow>
            ) : null}

            {!loading && !showEmpty && padTop > 0 ? (
              <TableRow
                className="sg-table-row-spacer"
                aria-hidden="true"
                data-spacer="top"
              >
                <TableCell
                  colSpan={colSpan}
                  className="sg-table-cell-spacer"
                  style={{ height: padTop }}
                />
              </TableRow>
            ) : null}

            {!loading && !showEmpty
              ? visibleRows.map((row, localIndex) => {
                  const index = windowActive
                    ? startIndex + localIndex
                    : localIndex;
                  const id = getRowId(row, index);
                  const isSelected = selectedSet.has(id);
                  const rowLabel = getRowLabel?.(row, index) ?? id;
                  return (
                    <TableRow
                      key={id}
                      selected={isSelected}
                      data-row-id={id}
                      data-row-index={index}
                      aria-selected={selectable ? isSelected : undefined}
                    >
                      {selectable ? (
                        <TableCell className="sg-table-cell-select">
                          <Checkbox
                            aria-label={`Select ${rowLabel}`}
                            checked={isSelected}
                            onCheckedChange={() => toggleRow(id)}
                          />
                        </TableCell>
                      ) : null}
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={columnWidthStyle(column.width)}
                        >
                          {cellContent(column, row, index)}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              : null}

            {!loading && !showEmpty && padBottom > 0 ? (
              <TableRow
                className="sg-table-row-spacer"
                aria-hidden="true"
                data-spacer="bottom"
              >
                <TableCell
                  colSpan={colSpan}
                  className="sg-table-cell-spacer"
                  style={{ height: padBottom }}
                />
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
