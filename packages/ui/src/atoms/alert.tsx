import { cn } from "../lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  variant?: AlertVariant;
  title?: ReactNode;
  /** Optional leading icon / marker. */
  icon?: ReactNode;
  children?: ReactNode;
};

const variantClass: Record<AlertVariant, string> = {
  info: "sg-alert-info",
  success: "sg-alert-success",
  warning: "sg-alert-warning",
  danger: "sg-alert-danger",
};

/**
 * Atom — Alert (callout)
 * Inline banner for status messages. Uses role="status" for non-danger,
 * role="alert" for danger (assertive).
 */
export function Alert({
  className,
  variant = "info",
  title,
  icon,
  children,
  ...props
}: AlertProps) {
  const assertive = variant === "danger";

  return (
    <div
      className={cn("sg-alert", variantClass[variant], className)}
      role={assertive ? "alert" : "status"}
      {...props}
    >
      {icon ? (
        <span className="sg-alert-icon" aria-hidden="true">
          {icon}
        </span>
      ) : (
        <span className="sg-alert-marker" aria-hidden="true" />
      )}
      <div className="sg-alert-body">
        {title ? <div className="sg-alert-title">{title}</div> : null}
        {children ? <div className="sg-alert-content">{children}</div> : null}
      </div>
    </div>
  );
}
