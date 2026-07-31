import { cn } from "../lib/cn";
import type { PageHeaderLook } from "../lib/looks";
import {
  Breadcrumb,
  type BreadcrumbItem,
  type BreadcrumbLook,
} from "./breadcrumb";
import type { HTMLAttributes, ReactNode } from "react";

export type { PageHeaderLook };

export type PageHeaderSize = "sm" | "md" | "lg";

export type PageHeaderProps = HTMLAttributes<HTMLElement> & {
  title: ReactNode;
  description?: ReactNode;
  /** When set, renders Softglass `Breadcrumb` above the title row. */
  breadcrumbs?: BreadcrumbItem[];
  /** Trailing actions (usually Button group). */
  actions?: ReactNode;
  /** plain | soft | solid | glass */
  look?: PageHeaderLook;
  size?: PageHeaderSize;
  /** Breadcrumb chrome when breadcrumbs are provided. */
  breadcrumbLook?: BreadcrumbLook;
  as?: "header" | "div" | "section";
};

/**
 * Molecule — PageHeader
 * Page chrome: optional crumbs, title, description, actions.
 * Does not own AppShell — place inside main content.
 */
export function PageHeader({
  className,
  title,
  description,
  breadcrumbs,
  actions,
  look = "plain",
  size = "md",
  breadcrumbLook = "plain",
  as: Comp = "header",
  ...props
}: PageHeaderProps) {
  const hasCrumbs = Boolean(breadcrumbs && breadcrumbs.length > 0);

  return (
    <Comp
      className={cn("sg-page-header", className)}
      data-look={look === "plain" ? undefined : look}
      data-size={size === "md" ? undefined : size}
      {...props}
    >
      {hasCrumbs ? (
        <Breadcrumb
          items={breadcrumbs!}
          look={breadcrumbLook}
          size={size === "lg" ? "md" : "sm"}
          className="sg-page-header-crumbs"
        />
      ) : null}

      <div className="sg-page-header-row">
        <div className="sg-page-header-text">
          <h1 className="sg-page-header-title">{title}</h1>
          {description ? (
            <p className="sg-page-header-description">{description}</p>
          ) : null}
        </div>
        {actions ? (
          <div className="sg-page-header-actions">{actions}</div>
        ) : null}
      </div>
    </Comp>
  );
}
