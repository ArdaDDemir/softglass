import { cn } from "../lib/cn";
import type { EmptyStateLook } from "../lib/looks";
import type { HTMLAttributes, ReactNode } from "react";

export type { EmptyStateLook };

export type EmptyStateSize = "sm" | "md" | "lg";

export type EmptyStateProps = HTMLAttributes<HTMLElement> & {
  /** Optional leading icon / illustration node. */
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Primary / secondary actions (usually Button). */
  actions?: ReactNode;
  /** solid (default, long copy) | soft | outline */
  look?: EmptyStateLook;
  size?: EmptyStateSize;
  as?: "div" | "section" | "article";
};

/**
 * Molecule — EmptyState
 * Empty list / zero-data surface. Prefer solid look for readable body copy.
 */
export function EmptyState({
  className,
  icon,
  title,
  description,
  actions,
  look = "solid",
  size = "md",
  as: Comp = "div",
  ...props
}: EmptyStateProps) {
  return (
    <Comp
      className={cn("sg-empty-state", className)}
      data-look={look}
      data-size={size === "md" ? undefined : size}
      {...props}
    >
      {icon ? (
        <div className="sg-empty-state-icon" aria-hidden="true">
          {icon}
        </div>
      ) : null}
      <h3 className="sg-empty-state-title">{title}</h3>
      {description ? (
        <p className="sg-empty-state-description">{description}</p>
      ) : null}
      {actions ? <div className="sg-empty-state-actions">{actions}</div> : null}
    </Comp>
  );
}
