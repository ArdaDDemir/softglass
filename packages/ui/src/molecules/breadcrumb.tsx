import { cn } from "../lib/cn";
import { Link } from "../atoms/link";
import type { BreadcrumbLook } from "../lib/looks";
import type { HTMLAttributes, ReactNode } from "react";

export type { BreadcrumbLook };

export type BreadcrumbItem = {
  label: ReactNode;
  /** When set, renders Softglass `Link`. Last item usually omits href (current). */
  href?: string;
};

export type BreadcrumbSize = "sm" | "md";

export type BreadcrumbProps = HTMLAttributes<HTMLElement> & {
  items: BreadcrumbItem[];
  /** Between crumbs. Default “/”. */
  separator?: ReactNode;
  size?: BreadcrumbSize;
  /** plain | soft (tray) | pill (chip crumbs) */
  look?: BreadcrumbLook;
};

/**
 * Molecule — Breadcrumb
 * Path trail. Reuses `Link` for navigable crumbs; last item is current page.
 */
export function Breadcrumb({
  className,
  items,
  separator = "/",
  size = "md",
  look = "plain",
  ...props
}: BreadcrumbProps) {
  if (items.length === 0) return null;

  const sep = look === "pill" ? separator === "/" ? "·" : separator : separator;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("sg-breadcrumb", className)}
      data-size={size === "md" ? undefined : size}
      data-look={look === "plain" ? undefined : look}
      {...props}
    >
      <ol className="sg-breadcrumb-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const current = isLast || !item.href;

          return (
            <li key={index} className="sg-breadcrumb-item">
              {index > 0 ? (
                <span className="sg-breadcrumb-separator" aria-hidden="true">
                  {sep}
                </span>
              ) : null}
              {current ? (
                <span
                  className="sg-breadcrumb-page"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href!}
                  look={look === "pill" ? "subtle" : "muted"}
                  className="sg-breadcrumb-link"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
