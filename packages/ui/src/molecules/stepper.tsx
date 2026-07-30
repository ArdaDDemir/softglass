"use client";

import { cn } from "../lib/cn";
import type { StepperLook } from "../lib/looks";
import {
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type { StepperLook };

export type StepperOrientation = "horizontal" | "vertical";

export type StepperStep = {
  value?: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
};

export type StepperProps = Omit<HTMLAttributes<HTMLElement>, "onChange"> & {
  steps: StepperStep[];
  /** 0-based active step. */
  activeStep?: number;
  defaultActiveStep?: number;
  onActiveStepChange?: (index: number) => void;
  orientation?: StepperOrientation;
  /**
   * soft · solid · outline · dots · pills
   * Visually distinct recipes (not color tints only).
   */
  look?: StepperLook;
  /** Click completed/current steps to jump. */
  interactive?: boolean;
  size?: "sm" | "md";
};

function clampIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return Math.min(Math.max(0, index), length - 1);
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="sg-stepper-check" aria-hidden>
      <path
        d="M3.5 8.2 6.4 11l6.1-7"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Molecule — Stepper
 * Wizard progress. Looks are structural recipes, not just tints.
 */
export function Stepper({
  className,
  steps,
  activeStep: activeProp,
  defaultActiveStep = 0,
  onActiveStepChange,
  orientation = "horizontal",
  look = "soft",
  interactive = false,
  size = "md",
  ...props
}: StepperProps) {
  const isControlled = activeProp !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultActiveStep);
  const active = clampIndex(
    isControlled ? activeProp! : uncontrolled,
    steps.length,
  );
  const progressPct =
    steps.length <= 1 ? 100 : (active / (steps.length - 1)) * 100;

  function go(index: number) {
    if (index < 0 || index >= steps.length) return;
    if (steps[index]?.disabled) return;
    if (!isControlled) setUncontrolled(index);
    onActiveStepChange?.(index);
  }

  return (
    <nav
      aria-label="Progress"
      className={cn("sg-stepper", className)}
      data-orientation={orientation}
      data-look={look}
      data-size={size === "md" ? undefined : size}
      style={
        {
          ["--sg-stepper-progress" as string]: `${progressPct}%`,
          ["--sg-stepper-count" as string]: String(Math.max(steps.length, 1)),
        } as CSSProperties
      }
      {...props}
    >
      {/* Track fill for dots / soft rail looks */}
      <div className="sg-stepper-track" aria-hidden="true">
        <div className="sg-stepper-track-fill" />
      </div>

      <ol className="sg-stepper-list">
        {steps.map((step, index) => {
          const status =
            index < active
              ? "complete"
              : index === active
                ? "current"
                : "upcoming";
          const clickable =
            interactive && !step.disabled && index <= active;

          return (
            <li
              key={step.value ?? String(index)}
              className="sg-stepper-item"
              data-status={status}
              data-disabled={step.disabled || undefined}
            >
              <button
                type="button"
                className="sg-stepper-trigger"
                disabled={!clickable}
                aria-current={status === "current" ? "step" : undefined}
                onClick={() => go(index)}
              >
                <span className="sg-stepper-indicator" aria-hidden="true">
                  {status === "complete" ? (
                    <CheckIcon />
                  ) : (
                    <span className="sg-stepper-num">{index + 1}</span>
                  )}
                </span>
                <span className="sg-stepper-text">
                  <span className="sg-stepper-label">{step.label}</span>
                  {step.description ? (
                    <span className="sg-stepper-description">
                      {step.description}
                    </span>
                  ) : null}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
