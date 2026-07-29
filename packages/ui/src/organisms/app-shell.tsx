import { cn } from "../lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

export type AppShellProps = HTMLAttributes<HTMLDivElement> & {
  /** Sticky top chrome (usually glass). */
  header?: ReactNode;
  /** Desktop sticky sidebar (hidden under 900px). */
  sidebar?: ReactNode;
  children?: ReactNode;
};

/**
 * Organism — AppShell
 * Responsive layout: header + optional sidebar + main.
 * Surfaces (glass/solid) are decided by the slots you pass in.
 */
export function AppShell({
  className,
  header,
  sidebar,
  children,
  ...props
}: AppShellProps) {
  return (
    <div
      className={cn(
        "sg-shell",
        sidebar && "sg-shell-with-sidebar",
        className,
      )}
      {...props}
    >
      {sidebar ? (
        <aside className={cn("sg-shell-sidebar", "sg-surface-glass")}>
          {sidebar}
        </aside>
      ) : null}

      {header ? (
        <header className="sg-shell-header">
          <div className={cn("sg-shell-header-inner", "sg-surface-glass")}>
            {header}
          </div>
        </header>
      ) : null}

      <main className="sg-shell-main">
        <div className="sg-shell-main-inner">{children}</div>
      </main>
    </div>
  );
}

export type ShellNavItemProps = HTMLAttributes<HTMLAnchorElement> & {
  href?: string;
  active?: boolean;
  children?: ReactNode;
};

export function ShellNav({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("sg-shell-nav", className)} {...props}>
      {children}
    </nav>
  );
}

export function ShellNavItem({
  className,
  href = "#",
  active = false,
  children,
  ...props
}: ShellNavItemProps) {
  return (
    <a
      href={href}
      className={cn("sg-shell-nav-item", className)}
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}
