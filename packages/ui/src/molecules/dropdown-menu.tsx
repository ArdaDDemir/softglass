"use client";

import { cn } from "../lib/cn";
import { MOTION_DEFAULTS, type DropdownMenuMotion } from "../lib/motion";
import { exitDurationForMotion, usePresence } from "../lib/presence";
import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactElement,
  type ReactNode,
} from "react";

export type DropdownMenuPlacement = "auto" | "bottom" | "top";
export type DropdownMenuAlign = "start" | "center" | "end";
export type { DropdownMenuMotion };

export type DropdownMenuItem = {
  type?: "item";
  id?: string;
  label: ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  shortcut?: string;
};

export type DropdownMenuSeparator = {
  type: "separator";
  id?: string;
};

export type DropdownMenuLabel = {
  type: "label";
  id?: string;
  label: ReactNode;
};

export type DropdownMenuEntry =
  | DropdownMenuItem
  | DropdownMenuSeparator
  | DropdownMenuLabel;

export type DropdownMenuProps = {
  /**
   * Trigger control. Prefer a single element (`Button`) — props are merged
   * (aria-expanded, click). Plain text is wrapped in a minimal button.
   */
  trigger: ReactNode;
  items: DropdownMenuEntry[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: DropdownMenuPlacement;
  align?: DropdownMenuAlign;
  /** Menu enter motion: none | fade | scale | slide-down */
  motion?: DropdownMenuMotion;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  "aria-label"?: string;
};

function isActionItem(entry: DropdownMenuEntry): entry is DropdownMenuItem {
  return entry.type !== "separator" && entry.type !== "label";
}

type TriggerElProps = {
  onClick?: (event: React.MouseEvent) => void;
  onKeyDown?: (event: ReactKeyboardEvent) => void;
  disabled?: boolean;
  className?: string;
  "aria-haspopup"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  "data-open"?: string | boolean;
};

/**
 * Molecule — DropdownMenu
 * Action menu (not value-select — use Select). Frost panel + keyboard nav.
 */
export function DropdownMenu({
  trigger,
  items,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placement = "auto",
  align = "start",
  motion = MOTION_DEFAULTS.dropdownMenu,
  disabled,
  className,
  contentClassName,
  "aria-label": ariaLabel = "Menu",
}: DropdownMenuProps) {
  const reactId = useId();
  const menuId = `sg-menu-${reactId}`;
  const isControlled = openProp !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = isControlled ? Boolean(openProp) : uncontrolled;

  const [side, setSide] = useState<"bottom" | "top">("bottom");
  const [highlight, setHighlight] = useState(-1);
  const { mounted: menuMounted, exiting: menuExiting, state: menuState } =
    usePresence(open, { durationMs: exitDurationForMotion(motion) });

  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

  const focusTrigger = useCallback(() => {
    const el = rootRef.current?.querySelector<HTMLElement>(
      '[aria-haspopup="menu"]',
    );
    el?.focus();
  }, []);

  const resolveSide = useCallback(() => {
    if (placement === "top") return "top" as const;
    if (placement === "bottom") return "bottom" as const;
    const el = rootRef.current?.querySelector<HTMLElement>(
      '[aria-haspopup="menu"]',
    );
    if (!el) return "bottom" as const;
    const rect = el.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    return spaceBelow < 220 && rect.top > spaceBelow ? "top" : "bottom";
  }, [placement]);

  const close = useCallback(() => {
    setOpen(false);
    setHighlight(-1);
  }, [setOpen]);

  const openMenu = useCallback(() => {
    if (disabled) return;
    setSide(resolveSide());
    setHighlight(actionIndexes[0] ?? -1);
    setOpen(true);
  }, [actionIndexes, disabled, resolveSide, setOpen]);

  useEffect(() => {
    if (!open || menuExiting) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        close();
      }
    }

    function onDocKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        focusTrigger();
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onDocKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onDocKeyDown);
    };
  }, [close, focusTrigger, open, menuExiting]);

  useEffect(() => {
    if (!open || menuExiting || highlight < 0) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${highlight}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [highlight, open, menuExiting]);

  function moveHighlight(delta: number) {
    if (actionIndexes.length === 0) return;
    const pos = actionIndexes.indexOf(highlight);
    const nextPos =
      pos === -1
        ? delta > 0
          ? 0
          : actionIndexes.length - 1
        : (pos + delta + actionIndexes.length) % actionIndexes.length;
    setHighlight(actionIndexes[nextPos]!);
  }

  function selectIndex(index: number) {
    const entry = items[index];
    if (!entry || !isActionItem(entry) || entry.disabled) return;
    entry.onSelect?.();
    close();
    focusTrigger();
  }

  function onTriggerKeyDown(event: ReactKeyboardEvent) {
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
        if (event.key === "ArrowUp" && actionIndexes.length) {
          setHighlight(actionIndexes[actionIndexes.length - 1]!);
        }
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
      if (actionIndexes[0] !== undefined) setHighlight(actionIndexes[0]);
    }
    if (event.key === "End" && open) {
      event.preventDefault();
      const last = actionIndexes[actionIndexes.length - 1];
      if (last !== undefined) setHighlight(last);
    }
  }

  function onTriggerClick() {
    if (disabled) return;
    if (open) close();
    else openMenu();
  }

  const triggerAria = {
    "aria-haspopup": "menu" as const,
    "aria-expanded": open,
    "aria-controls": menuId,
    "data-open": open ? true : undefined,
  };

  let triggerNode: ReactNode;
  if (isValidElement(trigger)) {
    const el = trigger as ReactElement<TriggerElProps>;
    triggerNode = cloneElement(el, {
      ...triggerAria,
      disabled: disabled || el.props.disabled,
      className: cn(el.props.className, "sg-menu-trigger"),
      onClick: (event: React.MouseEvent) => {
        el.props.onClick?.(event);
        if (!event.defaultPrevented) onTriggerClick();
      },
      onKeyDown: (event: ReactKeyboardEvent) => {
        el.props.onKeyDown?.(event);
        if (!event.defaultPrevented) onTriggerKeyDown(event);
      },
    });
  } else {
    triggerNode = (
      <button
        type="button"
        className="sg-menu-trigger sg-menu-trigger-fallback"
        disabled={disabled}
        {...triggerAria}
        onClick={onTriggerClick}
        onKeyDown={onTriggerKeyDown}
      >
        {trigger}
      </button>
    );
  }

  return (
    <div className={cn("sg-menu-root", className)} ref={rootRef}>
      {triggerNode}

      {menuMounted ? (
        <div
          ref={listRef}
          id={menuId}
          role="menu"
          aria-label={ariaLabel}
          className={cn("sg-menu-content", contentClassName)}
          data-placement={side}
          data-align={align}
          data-motion={motion}
          data-state={menuState}
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
