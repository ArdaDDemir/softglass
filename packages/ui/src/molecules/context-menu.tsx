"use client";

import { cn } from "../lib/cn";
import { MOTION_DEFAULTS, type ContextMenuMotion } from "../lib/motion";
import { exitDurationForMotion, usePresence } from "../lib/presence";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type TouchEvent as ReactTouchEvent,
} from "react";

export type { ContextMenuMotion };

/** Same item shape as DropdownMenu — learn once. */
export type ContextMenuItem = {
  type?: "item";
  id?: string;
  label: ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  shortcut?: string;
};

export type ContextMenuSeparator = {
  type: "separator";
  id?: string;
};

export type ContextMenuLabel = {
  type: "label";
  id?: string;
  label: ReactNode;
};

export type ContextMenuEntry =
  | ContextMenuItem
  | ContextMenuSeparator
  | ContextMenuLabel;

export type ContextMenuProps = {
  /**
   * Surface that owns the context gesture (right-click / long-press).
   * Not a dropdown trigger button — wrap the area that should open the menu.
   */
  children: ReactNode;
  items: ContextMenuEntry[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Menu enter motion — same recipes as DropdownMenu. */
  motion?: ContextMenuMotion;
  disabled?: boolean;
  /** Long-press delay for touch (ms). Default 500. */
  longPressMs?: number;
  className?: string;
  contentClassName?: string;
  "aria-label"?: string;
};

const MENU_EST_WIDTH = 200;
const MENU_EST_HEIGHT = 240;
const VIEWPORT_PAD = 8;
const MOVE_CANCEL_PX = 10;

function isActionItem(entry: ContextMenuEntry): entry is ContextMenuItem {
  return entry.type !== "separator" && entry.type !== "label";
}

function clampPosition(clientX: number, clientY: number) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let x = clientX;
  let y = clientY;

  if (x + MENU_EST_WIDTH > vw - VIEWPORT_PAD) {
    x = Math.max(VIEWPORT_PAD, vw - MENU_EST_WIDTH - VIEWPORT_PAD);
  }
  if (y + MENU_EST_HEIGHT > vh - VIEWPORT_PAD) {
    y = Math.max(VIEWPORT_PAD, vh - MENU_EST_HEIGHT - VIEWPORT_PAD);
  }
  if (x < VIEWPORT_PAD) x = VIEWPORT_PAD;
  if (y < VIEWPORT_PAD) y = VIEWPORT_PAD;

  return { x, y };
}

/**
 * Molecule — ContextMenu
 * Right-click / long-press action menu. Same `items` language as DropdownMenu;
 * positioned at the pointer (fixed), not under a button.
 */
export function ContextMenu({
  children,
  items,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  motion = MOTION_DEFAULTS.contextMenu,
  disabled,
  longPressMs = 500,
  className,
  contentClassName,
  "aria-label": ariaLabel = "Context menu",
}: ContextMenuProps) {
  const reactId = useId();
  const menuId = `sg-context-${reactId}`;
  const isControlled = openProp !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = isControlled ? Boolean(openProp) : uncontrolled;

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [highlight, setHighlight] = useState(-1);
  const highlightRef = useRef(highlight);
  highlightRef.current = highlight;
  const { mounted: menuMounted, exiting: menuExiting, state: menuState } =
    usePresence(open, { durationMs: exitDurationForMotion(motion) });

  const targetRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<number | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  /** Skip the synthetic click that follows a long-press open. */
  const suppressClickRef = useRef(false);

  const actionIndexes = useMemo(
    () =>
      items
        .map((entry, index) => ({ entry, index }))
        .filter(({ entry }) => isActionItem(entry) && !entry.disabled)
        .map(({ index }) => index),
    [items],
  );

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const clearLongPress = useCallback(() => {
    if (longPressTimer.current !== null) {
      window.clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    touchStart.current = null;
  }, []);

  const focusTarget = useCallback(() => {
    targetRef.current?.focus({ preventScroll: true });
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setHighlight(-1);
  }, [setOpen]);

  const openAt = useCallback(
    (clientX: number, clientY: number) => {
      if (disabled) return;
      setCoords(clampPosition(clientX, clientY));
      setHighlight(actionIndexes[0] ?? -1);
      setOpen(true);
    },
    [actionIndexes, disabled, setOpen],
  );

  const moveHighlight = useCallback(
    (delta: number) => {
      if (actionIndexes.length === 0) return;
      setHighlight((current) => {
        const pos = actionIndexes.indexOf(current);
        const nextPos =
          pos === -1
            ? delta > 0
              ? 0
              : actionIndexes.length - 1
            : (pos + delta + actionIndexes.length) % actionIndexes.length;
        return actionIndexes[nextPos]!;
      });
    },
    [actionIndexes],
  );

  const selectIndex = useCallback(
    (index: number) => {
      const entry = items[index];
      if (!entry || !isActionItem(entry) || entry.disabled) return;
      entry.onSelect?.();
      close();
      focusTarget();
    },
    [close, focusTarget, items],
  );

  useEffect(() => {
    return () => clearLongPress();
  }, [clearLongPress]);

  useEffect(() => {
    if (!open || menuExiting) return;

    function onPointerDown(event: MouseEvent) {
      if (!listRef.current?.contains(event.target as Node)) {
        close();
      }
    }

    function onDocKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        focusTarget();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        moveHighlight(1);
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        moveHighlight(-1);
        return;
      }
      if (event.key === "Home" && actionIndexes[0] !== undefined) {
        event.preventDefault();
        setHighlight(actionIndexes[0]);
        return;
      }
      if (event.key === "End") {
        event.preventDefault();
        const last = actionIndexes[actionIndexes.length - 1];
        if (last !== undefined) setHighlight(last);
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        const current = highlightRef.current;
        if (current >= 0) {
          event.preventDefault();
          selectIndex(current);
        }
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onDocKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onDocKeyDown);
    };
  }, [
    actionIndexes,
    close,
    focusTarget,
    menuExiting,
    moveHighlight,
    open,
    selectIndex,
  ]);

  useEffect(() => {
    if (!open || menuExiting || highlight < 0) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${highlight}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [highlight, open, menuExiting]);

  function onContextMenu(event: ReactMouseEvent) {
    if (disabled) return;
    event.preventDefault();
    event.stopPropagation();
    openAt(event.clientX, event.clientY);
  }

  function onTouchStart(event: ReactTouchEvent) {
    if (disabled) return;
    const touch = event.touches[0];
    if (!touch) return;
    clearLongPress();
    touchStart.current = { x: touch.clientX, y: touch.clientY };
    longPressTimer.current = window.setTimeout(() => {
      const start = touchStart.current;
      if (!start) return;
      suppressClickRef.current = true;
      openAt(start.x, start.y);
      clearLongPress();
    }, longPressMs);
  }

  function onTouchMove(event: ReactTouchEvent) {
    const start = touchStart.current;
    const touch = event.touches[0];
    if (!start || !touch) return;
    const dx = Math.abs(touch.clientX - start.x);
    const dy = Math.abs(touch.clientY - start.y);
    if (dx > MOVE_CANCEL_PX || dy > MOVE_CANCEL_PX) {
      clearLongPress();
    }
  }

  function onTouchEnd() {
    clearLongPress();
  }

  function onClickCapture(event: ReactMouseEvent) {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  }

  return (
    <div className={cn("sg-context-root", className)}>
      <div
        ref={targetRef}
        className="sg-context-target"
        tabIndex={disabled ? undefined : -1}
        data-disabled={disabled || undefined}
        data-open={open || undefined}
        onContextMenu={onContextMenu}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        onClickCapture={onClickCapture}
      >
        {children}
      </div>

      {menuMounted ? (
        <div
          ref={listRef}
          id={menuId}
          role="menu"
          aria-label={ariaLabel}
          className={cn(
            "sg-menu-content",
            "sg-context-menu-content",
            contentClassName,
          )}
          data-motion={motion}
          data-state={menuState}
          style={{ left: coords.x, top: coords.y }}
          tabIndex={-1}
        >
          {items.map((entry, index) => {
            if (entry.type === "separator") {
              return (
                <div
                  key={entry.id ?? `sep-${index}`}
                  role="separator"
                  className="sg-menu-separator"
                />
              );
            }

            if (entry.type === "label") {
              return (
                <div
                  key={entry.id ?? `label-${index}`}
                  className="sg-menu-label"
                  role="presentation"
                >
                  {entry.label}
                </div>
              );
            }

            const item = entry;
            const highlighted = index === highlight;

            return (
              <button
                key={item.id ?? `item-${index}`}
                type="button"
                role="menuitem"
                data-index={index}
                className="sg-menu-item"
                data-highlighted={highlighted || undefined}
                data-destructive={item.destructive || undefined}
                disabled={item.disabled}
                onMouseEnter={() => {
                  if (!item.disabled) setHighlight(index);
                }}
                onClick={() => selectIndex(index)}
              >
                <span className="sg-menu-item-label">{item.label}</span>
                {item.shortcut ? (
                  <span className="sg-menu-item-shortcut">{item.shortcut}</span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
