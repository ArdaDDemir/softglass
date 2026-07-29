"use client";

import { Button } from "../atoms/button";
import { cn } from "../lib/cn";
import { MOTION_DEFAULTS, type ToastMotion } from "../lib/motion";
import { exitDurationForMotion } from "../lib/presence";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

export type ToastVariant = "default" | "success" | "warning" | "danger";
export type { ToastMotion };

export type ToastInput = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  /** Auto dismiss ms. Default 4200. Set 0 to keep until closed. */
  duration?: number;
  /** Enter motion override for this toast */
  motion?: ToastMotion;
};

type ToastItem = ToastInput & {
  id: string;
  leaving?: boolean;
  motion?: ToastMotion;
};

type ToastContextValue = {
  toast: (input: ToastInput) => string;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const variantClass: Record<ToastVariant, string> = {
  default: "",
  success: "sg-toast-success",
  warning: "sg-toast-warning",
  danger: "sg-toast-danger",
};

export type ToastProviderProps = {
  children: ReactNode;
  position?: "top-right" | "bottom-right" | "bottom-center";
  /** Default enter motion for toasts */
  motion?: ToastMotion;
};

/**
 * Molecule system — Toast
 * Glass notifications via `useToast().toast({ title, description, variant })`.
 * Stack reflows with gap; leave uses presence-style delay matched to CSS exit.
 */
export function ToastProvider({
  children,
  position = "bottom-right",
  motion = MOTION_DEFAULTS.toast,
}: ToastProviderProps) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dismiss = useCallback(
    (id: string) => {
      let leaveMs = exitDurationForMotion(motion);

      setItems((current) => {
        const target = current.find((item) => item.id === id);
        if (!target || target.leaving) {
          leaveMs = -1;
          return current;
        }
        leaveMs = exitDurationForMotion(target.motion ?? motion);
        return current.map((item) =>
          item.id === id ? { ...item, leaving: true } : item,
        );
      });

      if (leaveMs < 0) return;

      window.setTimeout(() => {
        setItems((current) => current.filter((item) => item.id !== id));
      }, leaveMs);
    },
    [motion],
  );

  const toast = useCallback(
    (input: ToastInput) => {
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `toast-${Date.now()}-${Math.random().toString(16).slice(2)}`;

      const duration = input.duration ?? 4200;
      setItems((current) => [
        ...current,
        {
          id,
          title: input.title,
          description: input.description,
          variant: input.variant ?? "default",
          duration,
          motion: input.motion ?? motion,
        },
      ]);

      if (duration > 0) {
        window.setTimeout(() => dismiss(id), duration);
      }

      return id;
    },
    [dismiss, motion],
  );

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  const positionClass =
    position === "top-right"
      ? "sg-toast-viewport-top-right"
      : position === "bottom-center"
        ? "sg-toast-viewport-bottom-center"
        : "sg-toast-viewport-bottom-right";

  const viewport =
    mounted &&
    createPortal(
      <ol
        className={cn("sg-toast-viewport", positionClass)}
        data-position={position}
        aria-live="polite"
        aria-relevant="additions text"
        aria-atomic="false"
      >
        {items.map((item, index) => (
          <li
            key={item.id}
            className={cn(
              "sg-toast",
              "sg-surface-frost-toast",
              variantClass[item.variant ?? "default"],
            )}
            data-leaving={item.leaving || undefined}
            data-motion={item.motion ?? motion}
            data-stack-index={index}
            style={
              {
                ["--sg-toast-i" as string]: String(index),
              } as CSSProperties
            }
          >
            <div>
              <p className="sg-toast-title">{item.title}</p>
              {item.description ? (
                <p className="sg-toast-description">{item.description}</p>
              ) : null}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              iconOnly
              className="sg-toast-close"
              aria-label="Dismiss notification"
              disabled={item.leaving}
              onClick={() => dismiss(item.id)}
            >
              ×
            </Button>
          </li>
        ))}
      </ol>,
      document.body,
    );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {viewport}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within <ToastProvider>");
  }
  return ctx;
}
