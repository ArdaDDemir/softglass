"use client";

import {
  computeFloatingPosition,
  type FloatingAlign,
  type FloatingCoords,
  type FloatingPlacement,
  type FloatingSide,
} from "./floating";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type UseFloatingPortalOptions = {
  /** Interactive open (not exiting-only). */
  open: boolean;
  /** Presence mounted — keep positioning while exit plays. */
  mounted: boolean;
  triggerRef: RefObject<HTMLElement | null>;
  panelRef: RefObject<HTMLElement | null>;
  placement?: FloatingPlacement;
  align?: FloatingAlign;
  matchWidth?: boolean;
  gap?: number;
  flipMinSpace?: number;
};

/**
 * Portaled overlay positioning: fixed coords + scroll/resize updates.
 * Caller still renders via createPortal(…, document.body).
 */
export function useFloatingPortal({
  open,
  mounted,
  triggerRef,
  panelRef,
  placement = "auto",
  align = "start",
  matchWidth = false,
  gap = 6,
  flipMinSpace,
}: UseFloatingPortalOptions) {
  const [portalReady, setPortalReady] = useState(false);
  const [coords, setCoords] = useState<FloatingCoords>({
    top: 0,
    left: 0,
    side: "bottom",
  });

  useEffect(() => {
    setPortalReady(true);
  }, []);

  const update = useCallback(() => {
    const trigger = triggerRef.current;
    const panel = panelRef.current;
    if (!trigger || !panel) return;

    const tRect = trigger.getBoundingClientRect();
    const next = computeFloatingPosition({
      trigger: tRect,
      panelWidth: panel.offsetWidth || tRect.width,
      panelHeight: panel.offsetHeight,
      placement,
      align,
      matchWidth,
      gap,
      flipMinSpace,
    });
    setCoords(next);
  }, [
    align,
    flipMinSpace,
    gap,
    matchWidth,
    panelRef,
    placement,
    triggerRef,
  ]);

  useIsomorphicLayoutEffect(() => {
    if (!mounted || !portalReady) return;
    update();
    // Second frame: fonts / max-height may change measured size.
    const id = window.requestAnimationFrame(() => update());
    return () => window.cancelAnimationFrame(id);
  }, [mounted, open, portalReady, update]);

  useEffect(() => {
    if (!mounted || !portalReady) return;

    function onScrollOrResize() {
      update();
    }

    window.addEventListener("resize", onScrollOrResize);
    // Capture scroll on ancestors (overflow parents).
    window.addEventListener("scroll", onScrollOrResize, true);
    return () => {
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize, true);
    };
  }, [mounted, portalReady, update]);

  const floatingStyle: CSSProperties = {
    position: "fixed",
    top: coords.top,
    left: coords.left,
    ...(coords.width !== undefined ? { width: coords.width } : null),
    right: "auto",
    bottom: "auto",
    margin: 0,
  };

  return {
    portalReady,
    floatingStyle,
    side: coords.side as FloatingSide,
    update,
  };
}

/** True if event target is inside any of the given roots. */
export function eventInside(
  target: EventTarget | null,
  ...roots: Array<HTMLElement | null | undefined>
): boolean {
  if (!(target instanceof Node)) return false;
  return roots.some((root) => root?.contains(target));
}
