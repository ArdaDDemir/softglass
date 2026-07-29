/**
 * Viewport-aware floating coordinates for portaled overlays.
 * No Floating UI dependency — pure getBoundingClientRect math.
 */

export type FloatingSide = "top" | "bottom";
export type FloatingAlign = "start" | "center" | "end";
export type FloatingPlacement = "auto" | FloatingSide;

export type FloatingCoords = {
  top: number;
  left: number;
  side: FloatingSide;
  /** When matchWidth, panel width equals trigger (clamped to viewport). */
  width?: number;
};

export type ComputeFloatingArgs = {
  trigger: DOMRect;
  /** Measured panel size (offsetWidth / offsetHeight). */
  panelWidth: number;
  panelHeight: number;
  placement?: FloatingPlacement;
  align?: FloatingAlign;
  /** Gap between trigger and panel (px). */
  gap?: number;
  /** Viewport padding (px). */
  pad?: number;
  /**
   * Stretch panel to trigger width (Select / Combobox / MultiSelect).
   * When true, `align` is ignored for horizontal placement.
   */
  matchWidth?: boolean;
  /** Preferred flip threshold when placement is auto. */
  flipMinSpace?: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

/**
 * Resolve fixed top/left for a panel relative to a trigger rect.
 * Flips top/bottom when needed; clamps left/right into the viewport.
 */
export function computeFloatingPosition({
  trigger,
  panelWidth,
  panelHeight,
  placement = "auto",
  align = "start",
  gap = 6,
  pad = 8,
  matchWidth = false,
  flipMinSpace,
}: ComputeFloatingArgs): FloatingCoords {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
  const vh = typeof window !== "undefined" ? window.innerHeight : 768;

  const width = matchWidth
    ? clamp(trigger.width, 0, Math.max(0, vw - pad * 2))
    : panelWidth;

  const height = panelHeight > 0 ? panelHeight : flipMinSpace ?? 220;

  const spaceBelow = vh - trigger.bottom - gap;
  const spaceAbove = trigger.top - gap;

  let side: FloatingSide;
  if (placement === "top") side = "top";
  else if (placement === "bottom") side = "bottom";
  else {
    const minSpace = flipMinSpace ?? Math.min(height, 220);
    side =
      spaceBelow < minSpace && spaceAbove > spaceBelow ? "top" : "bottom";
  }

  // If chosen side still overflows badly, prefer the roomier side.
  if (placement === "auto") {
    if (side === "bottom" && spaceBelow < height && spaceAbove > spaceBelow) {
      side = "top";
    } else if (side === "top" && spaceAbove < height && spaceBelow > spaceAbove) {
      side = "bottom";
    }
  }

  let top =
    side === "bottom" ? trigger.bottom + gap : trigger.top - height - gap;

  // Keep panel inside vertical viewport when possible.
  top = clamp(top, pad, Math.max(pad, vh - height - pad));

  let left: number;
  if (matchWidth) {
    left = trigger.left;
  } else if (align === "center") {
    left = trigger.left + trigger.width / 2 - width / 2;
  } else if (align === "end") {
    left = trigger.right - width;
  } else {
    left = trigger.left;
  }

  left = clamp(left, pad, Math.max(pad, vw - width - pad));

  return matchWidth
    ? { top, left, side, width }
    : { top, left, side };
}
