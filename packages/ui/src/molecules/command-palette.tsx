"use client";

import { cn } from "../lib/cn";
import { MOTION_DEFAULTS, type ModalMotion } from "../lib/motion";
import { exitDurationForMotion, usePresence } from "../lib/presence";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

export type { ModalMotion as CommandPaletteMotion };

export type CommandItem = {
  id: string;
  label: string;
  description?: string;
  /** Extra searchable text (not shown). */
  keywords?: string;
  /** Optional group heading key. */
  group?: string;
  icon?: ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
};

export type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItem[];
  /** Called after item select (before close). */
  onSelect?: (item: CommandItem) => void;
  placeholder?: string;
  emptyMessage?: string;
  /** Accessible dialog name. */
  label?: string;
  motion?: ModalMotion;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  panelClassName?: string;
};

function filterItems(items: CommandItem[], query: string): CommandItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((item) => {
    const hay = [
      item.label,
      item.description ?? "",
      item.keywords ?? "",
      item.group ?? "",
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}

function groupItems(items: CommandItem[]): { group: string | null; items: CommandItem[] }[] {
  const order: string[] = [];
  const map = new Map<string, CommandItem[]>();
  const ungrouped: CommandItem[] = [];

  for (const item of items) {
    if (!item.group) {
      ungrouped.push(item);
      continue;
    }
    if (!map.has(item.group)) {
      map.set(item.group, []);
      order.push(item.group);
    }
    map.get(item.group)!.push(item);
  }

  const result: { group: string | null; items: CommandItem[] }[] = [];
  if (ungrouped.length) result.push({ group: null, items: ungrouped });
  for (const g of order) {
    result.push({ group: g, items: map.get(g)! });
  }
  return result;
}

/**
 * Molecule — CommandPalette (minimal)
 * Search + list + keyboard select. Modal shell. No fuzzy ranking lib.
 */
export function CommandPalette({
  open,
  onOpenChange,
  items,
  onSelect,
  placeholder = "Type a command or search…",
  emptyMessage = "No results",
  label = "Command palette",
  motion = MOTION_DEFAULTS.modal,
  closeOnBackdrop = true,
  closeOnEscape = true,
  className,
  panelClassName,
}: CommandPaletteProps) {
  const labelId = useId();
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [portalReady, setPortalReady] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const { mounted, exiting, state } = usePresence(open, {
    durationMs: exitDurationForMotion(motion),
  });

  const filtered = useMemo(() => filterItems(items, query), [items, query]);
  const groups = useMemo(() => groupItems(filtered), [filtered]);
  const flatIds = useMemo(() => filtered.map((i) => i.id), [filtered]);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setQuery("");
    setActiveIndex(0);
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mounted]);

  useEffect(() => {
    if (mounted) return;
    previouslyFocused.current?.focus?.();
  }, [mounted]);

  useEffect(() => {
    if (!open || exiting) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open, exiting]);

  // Clamp active index when filter shrinks.
  useEffect(() => {
    if (activeIndex >= filtered.length) {
      setActiveIndex(Math.max(0, filtered.length - 1));
    }
  }, [filtered.length, activeIndex]);

  function selectItem(item: CommandItem) {
    if (item.disabled || exiting) return;
    item.onSelect?.();
    onSelect?.(item);
    onOpenChange(false);
  }

  useEffect(() => {
    if (!open || exiting) return;

    function onKeyDown(event: KeyboardEvent) {
      if (closeOnEscape && event.key === "Escape") {
        event.preventDefault();
        onOpenChange(false);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (filtered.length === 0) return;
        setActiveIndex((i) => {
          let next = i;
          for (let step = 0; step < filtered.length; step++) {
            next = (next + 1) % filtered.length;
            if (!filtered[next]?.disabled) return next;
          }
          return i;
        });
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (filtered.length === 0) return;
        setActiveIndex((i) => {
          let next = i;
          for (let step = 0; step < filtered.length; step++) {
            next = (next - 1 + filtered.length) % filtered.length;
            if (!filtered[next]?.disabled) return next;
          }
          return i;
        });
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const item = filtered[activeIndex];
        if (item) selectItem(item);
        return;
      }

      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const FOCUSABLE =
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
      const nodes = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
      if (nodes.length === 0) {
        event.preventDefault();
        return;
      }
      const first = nodes[0]!;
      const last = nodes[nodes.length - 1]!;
      const active = document.activeElement;
      if (event.shiftKey) {
        if (active === first || !panel.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !panel.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, exiting, closeOnEscape, onOpenChange, filtered, activeIndex]);

  // Scroll active option into view.
  useEffect(() => {
    if (!open) return;
    const id = flatIds[activeIndex];
    if (!id) return;
    document
      .getElementById(`${listId}-opt-${id}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, flatIds, listId, open]);

  if (!mounted || !portalReady) return null;

  const activeItem = filtered[activeIndex];
  const activeDescendant = activeItem
    ? `${listId}-opt-${activeItem.id}`
    : undefined;

  let optionIndex = -1;

  return createPortal(
    <div
      className={cn("sg-command-root", className)}
      role="presentation"
      data-motion={motion}
      data-state={state}
    >
      <button
        type="button"
        className="sg-command-backdrop"
        aria-label="Close command palette"
        tabIndex={exiting ? -1 : undefined}
        onClick={() => {
          if (exiting) return;
          if (closeOnBackdrop) onOpenChange(false);
        }}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        tabIndex={-1}
        className={cn(
          "sg-command-panel",
          "sg-surface-glass-elevated",
          panelClassName,
        )}
        data-state={state}
        data-motion={motion}
      >
        <h2 id={labelId} className="sg-command-sr-only">
          {label}
        </h2>

        <div className="sg-command-search">
          <span className="sg-command-search-icon" aria-hidden="true">
            ⌕
          </span>
          <input
            ref={inputRef}
            type="text"
            className="sg-command-input"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={activeDescendant}
            placeholder={placeholder}
            value={query}
            disabled={exiting}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
          />
          <kbd className="sg-command-kbd">esc</kbd>
        </div>

        <div
          id={listId}
          role="listbox"
          aria-label={label}
          className="sg-command-list"
        >
          {filtered.length === 0 ? (
            <div className="sg-command-empty" role="presentation">
              {emptyMessage}
            </div>
          ) : (
            groups.map((g) => (
              <div
                key={g.group ?? "__ungrouped"}
                className="sg-command-group"
                role="presentation"
              >
                {g.group ? (
                  <div className="sg-command-group-label" role="presentation">
                    {g.group}
                  </div>
                ) : null}
                {g.items.map((item) => {
                  optionIndex += 1;
                  const index = optionIndex;
                  const active = index === activeIndex;
                  return (
                    <div
                      key={item.id}
                      id={`${listId}-opt-${item.id}`}
                      role="option"
                      aria-selected={active}
                      aria-disabled={item.disabled || undefined}
                      className={cn(
                        "sg-command-item",
                        active && "sg-command-item-active",
                        item.disabled && "sg-command-item-disabled",
                      )}
                      data-active={active || undefined}
                      onMouseEnter={() => {
                        if (!item.disabled) setActiveIndex(index);
                      }}
                      onClick={() => selectItem(item)}
                    >
                      {item.icon ? (
                        <span className="sg-command-item-icon" aria-hidden>
                          {item.icon}
                        </span>
                      ) : null}
                      <span className="sg-command-item-text">
                        <span className="sg-command-item-label">
                          {item.label}
                        </span>
                        {item.description ? (
                          <span className="sg-command-item-desc">
                            {item.description}
                          </span>
                        ) : null}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
