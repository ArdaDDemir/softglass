/**
 * Motion recipes — component-specific animation menus.
 * Parallel to `look` (visual surface). Always pair with `prefers-reduced-motion`.
 *
 * Defaults match the pre-motion global micro-interactions so existing UIs
 * keep the same feel when no prop is passed.
 */

/** Shared “off” token used on every control. */
export type MotionNone = "none";

export type ButtonMotion = MotionNone | "lift" | "press" | "sheen" | "ripple";

export type CheckboxMotion = MotionNone | "pop" | "draw" | "fade-in" | "bounce";

export type RadioMotion = MotionNone | "pop" | "dot-scale" | "ring-expand";

export type SwitchMotion = MotionNone | "snap" | "spring" | "elastic";

export type FieldMotion = MotionNone | "ring" | "underline-grow" | "glow";

export type SelectMotion = MotionNone | "fade" | "scale" | "slide-down";

export type TooltipMotion = MotionNone | "fade" | "scale" | "slide";

export type BadgeMotion = MotionNone | "pulse" | "pop-in" | "shimmer";

export type AvatarMotion = MotionNone | "lift" | "ring-pulse" | "status-ping";

/**
 * Tabs indicator + content enter.
 * - none: instant active swap
 * - fade: soft cross-fade on active chrome / content
 * - slide: moving pill or underline indicator (content still fades)
 */
export type TabsMotion = MotionNone | "fade" | "slide";

export type ModalMotion = MotionNone | "scale" | "fade" | "slide-up";

export type ToastMotion = MotionNone | "slide-in" | "pop";

export type CardMotion = MotionNone | "lift" | "glow-pulse";

/** Popover / DropdownMenu panel enter (same recipe set as Select menu). */
export type PopoverMotion = MotionNone | "fade" | "scale" | "slide-down";

export type DropdownMenuMotion = MotionNone | "fade" | "scale" | "slide-down";

/** ContextMenu panel — same recipes as DropdownMenu / Popover. */
export type ContextMenuMotion = MotionNone | "fade" | "scale" | "slide-down";

/** Defaults — preserve current product feel. */
export const MOTION_DEFAULTS = {
  button: "lift",
  checkbox: "pop",
  radio: "pop",
  switch: "spring",
  field: "ring",
  select: "scale",
  tooltip: "scale",
  badge: "none",
  avatar: "lift",
  tabs: "slide",
  modal: "scale",
  toast: "slide-in",
  card: "lift",
  popover: "scale",
  dropdownMenu: "scale",
  contextMenu: "scale",
} as const satisfies Record<string, string>;
