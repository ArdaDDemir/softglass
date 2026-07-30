"use client";

import { cn } from "../lib/cn";
import type { AccordionLook } from "../lib/looks";
import { MOTION_DEFAULTS, type AccordionMotion } from "../lib/motion";
import {
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type { AccordionLook, AccordionMotion };

export type AccordionItem = {
  value: string;
  trigger: ReactNode;
  content: ReactNode;
  disabled?: boolean;
};

export type AccordionType = "single" | "multiple";

export type AccordionProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  items: AccordionItem[];
  /** single = one panel; multiple = many open */
  type?: AccordionType;
  /**
   * Controlled value:
   * - single → string ("" when none)
   * - multiple → string[]
   */
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  /**
   * When `type="single"`, allow closing the open item (value → "").
   * Default true.
   */
  collapsible?: boolean;
  /** soft | solid | glass | outline */
  look?: AccordionLook;
  /** none | fade | height */
  motion?: AccordionMotion;
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <span
      className="sg-accordion-chevron-wrap"
      data-open={open || undefined}
      aria-hidden="true"
    >
      <svg className="sg-accordion-chevron" viewBox="0 0 20 20" fill="none">
        <path
          d="M5.5 7.75 10 12.25l4.5-4.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function normalizeDefault(
  type: AccordionType,
  defaultValue?: string | string[],
): string | string[] {
  if (type === "multiple") {
    if (Array.isArray(defaultValue)) return defaultValue;
    if (typeof defaultValue === "string" && defaultValue) return [defaultValue];
    return [];
  }
  if (typeof defaultValue === "string") return defaultValue;
  if (Array.isArray(defaultValue)) return defaultValue[0] ?? "";
  return "";
}

function isOpen(
  type: AccordionType,
  current: string | string[],
  itemValue: string,
): boolean {
  if (type === "multiple") {
    return Array.isArray(current) && current.includes(itemValue);
  }
  return current === itemValue;
}

/**
 * Molecule — Accordion
 * Items API first (Select / Dropdown language). Single or multiple open panels.
 */
export function Accordion({
  className,
  items,
  type = "single",
  value: valueProp,
  defaultValue,
  onValueChange,
  collapsible = true,
  look = "soft",
  motion = MOTION_DEFAULTS.accordion,
  ...props
}: AccordionProps) {
  const baseId = useId();
  const isControlled = valueProp !== undefined;
  const [uncontrolled, setUncontrolled] = useState(() =>
    normalizeDefault(type, defaultValue),
  );
  const current = isControlled ? valueProp : uncontrolled;

  function commit(next: string | string[]) {
    if (!isControlled) setUncontrolled(next);
    onValueChange?.(next);
  }

  function toggle(itemValue: string, disabled?: boolean) {
    if (disabled) return;

    if (type === "multiple") {
      const list = Array.isArray(current) ? current : [];
      const next = list.includes(itemValue)
        ? list.filter((v) => v !== itemValue)
        : [...list, itemValue];
      commit(next);
      return;
    }

    const open = current === itemValue;
    if (open) {
      if (collapsible) commit("");
      return;
    }
    commit(itemValue);
  }

  return (
    <div
      className={cn("sg-accordion", className)}
      data-look={look}
      data-motion={motion}
      data-type={type}
      {...props}
    >
      {items.map((item) => {
        const open = isOpen(type, current, item.value);
        const triggerId = `${baseId}-trigger-${item.value}`;
        const panelId = `${baseId}-panel-${item.value}`;

        return (
          <div
            key={item.value}
            className="sg-accordion-item"
            data-state={open ? "open" : "closed"}
            data-disabled={item.disabled || undefined}
          >
            <h3 className="sg-accordion-heading">
              <button
                type="button"
                id={triggerId}
                className="sg-accordion-trigger"
                aria-expanded={open}
                aria-controls={panelId}
                disabled={item.disabled}
                data-state={open ? "open" : "closed"}
                onClick={() => toggle(item.value, item.disabled)}
              >
                <span className="sg-accordion-trigger-label">{item.trigger}</span>
                <ChevronIcon open={open} />
              </button>
            </h3>
            {/* Closed panels stay out of layout — no continuous grid animation */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="sg-accordion-panel"
              data-state={open ? "open" : "closed"}
              hidden={!open}
            >
              <div className="sg-accordion-content">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
