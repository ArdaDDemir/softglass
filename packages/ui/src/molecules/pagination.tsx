"use client";

import { cn } from "../lib/cn";
import type { PaginationLook } from "../lib/looks";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export type { PaginationLook };

export type PaginationSize = "sm" | "md";

export type PaginationProps = Omit<
  HTMLAttributes<HTMLElement>,
  "onChange" | "children"
> & {
  /** 1-based current page. */
  page: number;
  /** Total pages (≥ 1). */
  pageCount: number;
  onPageChange: (page: number) => void;
  /** soft | solid | ghost */
  look?: PaginationLook;
  size?: PaginationSize;
  /**
   * Prev / next (+ page label) only — no page number list.
   * Default false.
   */
  compact?: boolean;
  /** Pages shown on each side of current. Default 1. */
  siblingCount?: number;
  disabled?: boolean;
  /** Accessible name. */
  "aria-label"?: string;
  prevLabel?: ReactNode;
  nextLabel?: ReactNode;
};

function clampPage(page: number, pageCount: number) {
  const max = Math.max(1, pageCount);
  return Math.min(Math.max(1, page), max);
}

/**
 * Build page tokens: numbers + "ellipsis".
 * Example (page 5, count 10, sibling 1): 1 … 4 5 6 … 10
 */
function buildRange(
  page: number,
  pageCount: number,
  siblingCount: number,
): Array<number | "ellipsis"> {
  const total = Math.max(1, pageCount);
  const current = clampPage(page, total);
  const siblings = Math.max(0, siblingCount);

  // Always show all when small
  if (total <= 7 + siblings * 2) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);
  const showLeftEllipsis = left > 2;
  const showRightEllipsis = right < total - 1;

  const items: Array<number | "ellipsis"> = [1];

  if (showLeftEllipsis) items.push("ellipsis");
  else {
    for (let i = 2; i < left; i++) items.push(i);
  }

  for (let i = left; i <= right; i++) items.push(i);

  if (showRightEllipsis) items.push("ellipsis");
  else {
    for (let i = right + 1; i < total; i++) items.push(i);
  }

  if (total > 1) items.push(total);
  return items;
}

function PageButton({
  className,
  active,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      className={cn("sg-pagination-btn", className)}
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      {...props}
    />
  );
}

/**
 * Molecule — Pagination
 * Known total page model (server/client). Compact or full page list.
 */
export function Pagination({
  className,
  page,
  pageCount,
  onPageChange,
  look = "soft",
  size = "md",
  compact = false,
  siblingCount = 1,
  disabled = false,
  "aria-label": ariaLabel = "Pagination",
  prevLabel = "Previous",
  nextLabel = "Next",
  ...props
}: PaginationProps) {
  const total = Math.max(1, Math.floor(pageCount) || 1);
  const current = clampPage(page, total);
  const atStart = current <= 1;
  const atEnd = current >= total;

  function go(next: number) {
    if (disabled) return;
    const clamped = clampPage(next, total);
    if (clamped === current) return;
    onPageChange(clamped);
  }

  const range = compact ? null : buildRange(current, total, siblingCount);

  return (
    <nav
      aria-label={ariaLabel}
      className={cn("sg-pagination", className)}
      data-look={look}
      data-size={size === "md" ? undefined : size}
      data-compact={compact || undefined}
      data-disabled={disabled || undefined}
      {...props}
    >
      <ul className="sg-pagination-list">
        <li className="sg-pagination-item">
          <PageButton
            className="sg-pagination-prev"
            disabled={disabled || atStart}
            aria-label={typeof prevLabel === "string" ? prevLabel : "Previous page"}
            onClick={() => go(current - 1)}
          >
            {prevLabel}
          </PageButton>
        </li>

        {compact ? (
          <li className="sg-pagination-item">
            <span className="sg-pagination-status" aria-live="polite">
              {current} / {total}
            </span>
          </li>
        ) : (
          range!.map((token, index) =>
            token === "ellipsis" ? (
              <li
                key={`e-${index}`}
                className="sg-pagination-item sg-pagination-ellipsis"
                aria-hidden="true"
              >
                …
              </li>
            ) : (
              <li key={token} className="sg-pagination-item">
                <PageButton
                  active={token === current}
                  disabled={disabled}
                  aria-label={`Page ${token}`}
                  onClick={() => go(token)}
                >
                  {token}
                </PageButton>
              </li>
            ),
          )
        )}

        <li className="sg-pagination-item">
          <PageButton
            className="sg-pagination-next"
            disabled={disabled || atEnd}
            aria-label={typeof nextLabel === "string" ? nextLabel : "Next page"}
            onClick={() => go(current + 1)}
          >
            {nextLabel}
          </PageButton>
        </li>
      </ul>
    </nav>
  );
}
