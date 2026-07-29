"use client";

import { cn } from "../lib/cn";
import type { TabsLook } from "../lib/looks";
import { MOTION_DEFAULTS, type TabsMotion } from "../lib/motion";
import {
  createContext,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";

export type { TabsLook, TabsMotion };

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
  look: TabsLook;
  motion: TabsMotion;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string) {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Tabs>`);
  }
  return ctx;
}

export type TabsProps = HTMLAttributes<HTMLDivElement> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Design for the list: pill | underline | segmented */
  look?: TabsLook;
  /**
   * Indicator / content motion:
   * none | fade | slide (sliding pill or underline)
   */
  motion?: TabsMotion;
  children?: ReactNode;
};

/**
 * Molecule — Tabs
 * Soft pill list; accent active trigger. Controlled or uncontrolled.
 * `motion="slide"` moves a shared indicator between triggers.
 */
export function Tabs({
  className,
  value,
  defaultValue = "",
  onValueChange,
  look = "pill",
  motion = MOTION_DEFAULTS.tabs,
  children,
  ...props
}: TabsProps) {
  const baseId = useId();
  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const current = isControlled ? value : uncontrolled;

  const ctx = useMemo<TabsContextValue>(
    () => ({
      value: current,
      baseId,
      look,
      motion,
      setValue: (next) => {
        if (!isControlled) setUncontrolled(next);
        onValueChange?.(next);
      },
    }),
    [current, baseId, isControlled, onValueChange, look, motion],
  );

  return (
    <div
      className={cn("sg-tabs", className)}
      data-look={look}
      data-motion={motion}
      {...props}
    >
      <TabsContext.Provider value={ctx}>{children}</TabsContext.Provider>
    </div>
  );
}

export type TabsListProps = HTMLAttributes<HTMLDivElement>;

export function TabsList({ className, children, onKeyDown, ...props }: TabsListProps) {
  const { look, motion, value, setValue } = useTabsContext("TabsList");
  const listRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    ready: false,
  });

  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list || motion !== "slide") {
      setIndicator((prev) => ({ ...prev, ready: false }));
      return;
    }

    const active = list.querySelector<HTMLElement>(
      '.sg-tabs-trigger[data-active="true"]',
    );
    if (!active) {
      setIndicator((prev) => ({ ...prev, ready: false }));
      return;
    }

    setIndicator({
      x: active.offsetLeft,
      y: active.offsetTop,
      width: active.offsetWidth,
      height: active.offsetHeight,
      ready: true,
    });
  }, [motion]);

  useLayoutEffect(() => {
    measure();
  }, [measure, value, look, children]);

  useLayoutEffect(() => {
    if (motion !== "slide") return;
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(() => measure());
    ro.observe(list);
    for (const child of list.querySelectorAll(".sg-tabs-trigger")) {
      ro.observe(child);
    }
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, motion, children]);

  const indicatorStyle: CSSProperties | undefined =
    motion === "slide" && indicator.ready
      ? ({
          ["--sg-tabs-ix" as string]: `${indicator.x}px`,
          ["--sg-tabs-iy" as string]: `${indicator.y}px`,
          ["--sg-tabs-iw" as string]: `${indicator.width}px`,
          ["--sg-tabs-ih" as string]: `${indicator.height}px`,
          opacity: 1,
        } as CSSProperties)
      : motion === "slide"
        ? { opacity: 0 }
        : undefined;

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const list = listRef.current;
    if (!list) return;

    const triggers = Array.from(
      list.querySelectorAll<HTMLButtonElement>(
        ".sg-tabs-trigger:not([disabled])",
      ),
    );
    if (triggers.length === 0) return;

    const currentIndex = triggers.findIndex(
      (el) => el === document.activeElement,
    );
    if (currentIndex < 0) return;

    let nextIndex = currentIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      nextIndex = (currentIndex + 1) % triggers.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
    } else if (event.key === "Home") {
      event.preventDefault();
      nextIndex = 0;
    } else if (event.key === "End") {
      event.preventDefault();
      nextIndex = triggers.length - 1;
    } else {
      return;
    }

    const next = triggers[nextIndex]!;
    next.focus();
    const explicit = next.dataset.tabValue;
    if (explicit) setValue(explicit);
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      className={cn("sg-tabs-list", className)}
      data-look={look === "pill" ? undefined : look}
      data-motion={motion}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {motion === "slide" ? (
        <span
          className="sg-tabs-indicator"
          aria-hidden
          style={indicatorStyle}
        />
      ) : null}
      {children}
    </div>
  );
}

export type TabsTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
};

export function TabsTrigger({
  className,
  value,
  children,
  disabled,
  ...props
}: TabsTriggerProps) {
  const { value: current, setValue, baseId } = useTabsContext("TabsTrigger");
  const active = current === value;

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-controls={`${baseId}-panel-${value}`}
      aria-selected={active}
      tabIndex={active ? 0 : -1}
      data-active={active || undefined}
      data-tab-value={value}
      disabled={disabled}
      className={cn("sg-tabs-trigger", className)}
      onClick={() => setValue(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export type TabsContentProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  forceMount?: boolean;
};

export function TabsContent({
  className,
  value,
  forceMount = false,
  children,
  ...props
}: TabsContentProps) {
  const { value: current, baseId, motion } = useTabsContext("TabsContent");
  const active = current === value;

  if (!active && !forceMount) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      hidden={!active}
      tabIndex={0}
      className={cn("sg-tabs-content", className)}
      data-motion={motion}
      {...props}
    >
      {children}
    </div>
  );
}
