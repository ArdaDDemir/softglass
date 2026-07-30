import { cn } from "../lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

export type LiveRegionLook =
  | "soft"
  | "solid"
  | "glass"
  | "info"
  | "success"
  | "warning"
  | "danger";

export type LiveRegionProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  /** polite (default) | assertive */
  politeness?: "polite" | "assertive" | "off";
  /**
   * Visually hide but keep for screen readers.
   * Default false — Softglass status pill is visible when there is content.
   */
  visuallyHidden?: boolean;
  atomic?: boolean;
  look?: LiveRegionLook;
  /** Optional leading title. */
  title?: ReactNode;
  /** Hide the whole control when children are empty. Default true. */
  hideWhenEmpty?: boolean;
};

const lookClass: Record<LiveRegionLook, string> = {
  soft: "",
  solid: "sg-live-look-solid",
  glass: "sg-live-look-glass",
  info: "sg-live-look-info",
  success: "sg-live-look-success",
  warning: "sg-live-look-warning",
  danger: "sg-live-look-danger",
};

function isEmpty(children: ReactNode) {
  if (children === null || children === undefined || children === false) {
    return true;
  }
  if (typeof children === "string" && children.trim() === "") return true;
  return false;
}

/**
 * Atom — LiveRegion
 * aria-live status. Softglass visible banner by default; set visuallyHidden for SR-only.
 */
export function LiveRegion({
  className,
  children,
  politeness = "polite",
  visuallyHidden = false,
  atomic = true,
  look = "soft",
  title,
  hideWhenEmpty = true,
  ...props
}: LiveRegionProps) {
  const empty = isEmpty(children) && !title;
  if (hideWhenEmpty && empty) {
    return (
      <div
        className={cn("sg-visually-hidden")}
        role="status"
        aria-live={politeness}
        aria-atomic={atomic}
      />
    );
  }

  return (
    <div
      className={cn(
        "sg-live-region",
        !visuallyHidden && "sg-live-region-visible",
        !visuallyHidden && lookClass[look],
        visuallyHidden && "sg-visually-hidden",
        className,
      )}
      data-look={look}
      role={politeness === "assertive" ? "alert" : "status"}
      aria-live={politeness}
      aria-atomic={atomic}
      {...props}
    >
      {!visuallyHidden ? (
        <span className="sg-live-region-marker" aria-hidden="true" />
      ) : null}
      <div className="sg-live-region-body">
        {title ? <div className="sg-live-region-title">{title}</div> : null}
        {children ? <div className="sg-live-region-message">{children}</div> : null}
      </div>
    </div>
  );
}
