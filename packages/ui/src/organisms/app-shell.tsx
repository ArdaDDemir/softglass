"use client";

import { Button } from "../atoms/button";
import { cn } from "../lib/cn";
import { Sheet } from "../molecules/sheet";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";

const DESKTOP_MQ = "(min-width: 900px)";

export type AppShellProps = HTMLAttributes<HTMLDivElement> & {
  /** Sticky top chrome (usually glass). */
  header?: ReactNode;
  /** Sidebar content — desktop rail + mobile Sheet body. */
  sidebar?: ReactNode;
  children?: ReactNode;
  /** Controlled desktop collapse (icon rail). Desktop only. */
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Controlled mobile navigation drawer. */
  mobileNavOpen?: boolean;
  defaultMobileNavOpen?: boolean;
  onMobileNavOpenChange?: (open: boolean) => void;
  /** Title for the mobile Sheet. */
  mobileNavTitle?: ReactNode;
};

type AppShellContextValue = {
  collapsed: boolean;
  setCollapsed: (next: boolean) => void;
  toggleCollapsed: () => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (next: boolean) => void;
  toggleMobileNav: () => void;
  isDesktop: boolean;
  /** False until matchMedia has run on the client (avoids SSR/hydration split). */
  layoutReady: boolean;
  hasSidebar: boolean;
};

const AppShellContext = createContext<AppShellContextValue | null>(null);

/** Access AppShell collapse / mobile nav state from chrome controls. */
export function useAppShell(): AppShellContextValue {
  const ctx = useContext(AppShellContext);
  if (!ctx) {
    throw new Error("useAppShell must be used within AppShell");
  }
  return ctx;
}

/**
 * Desktop breakpoint via matchMedia.
 * SSR + first client paint: layoutReady=false so we do not mount rail vs Sheet
 * until after hydration (avoids Next.js structural mismatch on mobile).
 */
function useDesktopMedia(): { isDesktop: boolean; layoutReady: boolean } {
  const [isDesktop, setIsDesktop] = useState(false);
  const [layoutReady, setLayoutReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const sync = () => setIsDesktop(mq.matches);
    sync();
    setLayoutReady(true);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return { isDesktop, layoutReady };
}

/**
 * Organism — AppShell
 * Responsive layout: header + optional sidebar + main.
 * Desktop: collapsible sticky rail. Mobile: same sidebar slot in a left Sheet.
 */
export function AppShell({
  className,
  header,
  sidebar,
  children,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  mobileNavOpen: mobileOpenProp,
  defaultMobileNavOpen = false,
  onMobileNavOpenChange,
  mobileNavTitle = "Navigation",
  ...props
}: AppShellProps) {
  const { isDesktop, layoutReady } = useDesktopMedia();
  const hasSidebar = sidebar != null;

  const [collapsedUncontrolled, setCollapsedUncontrolled] =
    useState(defaultCollapsed);
  const collapsed = collapsedProp ?? collapsedUncontrolled;

  const setCollapsed = useCallback(
    (next: boolean) => {
      if (collapsedProp === undefined) setCollapsedUncontrolled(next);
      onCollapsedChange?.(next);
    },
    [collapsedProp, onCollapsedChange],
  );

  const toggleCollapsed = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed, setCollapsed]);

  const [mobileUncontrolled, setMobileUncontrolled] = useState(
    defaultMobileNavOpen,
  );
  const mobileNavOpen = mobileOpenProp ?? mobileUncontrolled;

  const setMobileNavOpen = useCallback(
    (next: boolean) => {
      if (mobileOpenProp === undefined) setMobileUncontrolled(next);
      onMobileNavOpenChange?.(next);
    },
    [mobileOpenProp, onMobileNavOpenChange],
  );

  const toggleMobileNav = useCallback(() => {
    setMobileNavOpen(!mobileNavOpen);
  }, [mobileNavOpen, setMobileNavOpen]);

  // Leave mobile drawer when crossing to desktop.
  useEffect(() => {
    if (isDesktop && mobileNavOpen) setMobileNavOpen(false);
  }, [isDesktop, mobileNavOpen, setMobileNavOpen]);

  const ctx: AppShellContextValue = {
    collapsed,
    setCollapsed,
    toggleCollapsed,
    mobileNavOpen,
    setMobileNavOpen,
    toggleMobileNav,
    isDesktop,
    layoutReady,
    hasSidebar,
  };

  // Only mount rail/Sheet after client media query — SSR + first paint match.
  const showDesktopRail = hasSidebar && layoutReady && isDesktop;
  const showMobileSheet = hasSidebar && layoutReady && !isDesktop;

  return (
    <AppShellContext.Provider value={ctx}>
      <div
        className={cn(
          "sg-shell",
          hasSidebar && "sg-shell-with-sidebar",
          className,
        )}
        data-collapsed={hasSidebar && collapsed ? "true" : undefined}
        data-layout-ready={layoutReady ? "true" : undefined}
        {...props}
      >
        {showDesktopRail ? (
          <aside
            className={cn("sg-shell-sidebar", "sg-surface-glass")}
            data-collapsed={collapsed ? "true" : undefined}
          >
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

      {showMobileSheet ? (
        <Sheet
          open={mobileNavOpen}
          onOpenChange={setMobileNavOpen}
          title={mobileNavTitle}
          side="left"
          panelClassName="sg-shell-mobile-panel"
        >
          <div className="sg-shell-mobile-nav">{sidebar}</div>
        </Sheet>
      ) : null}
    </AppShellContext.Provider>
  );
}

export type AppShellMenuButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Accessible name. Default "Open navigation". */
  label?: string;
};

/** Header control — opens the mobile sidebar Sheet (hidden on desktop). */
export function AppShellMenuButton({
  className,
  label = "Open navigation",
  type = "button",
  onClick,
  ...props
}: AppShellMenuButtonProps) {
  const { toggleMobileNav, isDesktop, layoutReady, hasSidebar, mobileNavOpen } =
    useAppShell();

  if (!hasSidebar || !layoutReady || isDesktop) return null;

  return (
    <Button
      type={type}
      variant="ghost"
      size="sm"
      iconOnly
      className={cn("sg-shell-menu-btn", className)}
      aria-label={label}
      aria-expanded={mobileNavOpen}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) toggleMobileNav();
      }}
    >
      <span className="sg-shell-menu-icon" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </Button>
  );
}

export type AppShellCollapseButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Accessible name when expanded. */
    collapseLabel?: string;
    /** Accessible name when collapsed. */
    expandLabel?: string;
  };

/** Sidebar control — toggles desktop icon rail (hidden on mobile). */
export function AppShellCollapseButton({
  className,
  collapseLabel = "Collapse sidebar",
  expandLabel = "Expand sidebar",
  type = "button",
  onClick,
  ...props
}: AppShellCollapseButtonProps) {
  const { collapsed, toggleCollapsed, isDesktop, layoutReady, hasSidebar } =
    useAppShell();

  if (!hasSidebar || !layoutReady || !isDesktop) return null;

  return (
    <Button
      type={type}
      variant="ghost"
      size="sm"
      iconOnly
      className={cn("sg-shell-collapse-btn", className)}
      aria-label={collapsed ? expandLabel : collapseLabel}
      aria-pressed={collapsed}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) toggleCollapsed();
      }}
    >
      <span className="sg-shell-collapse-icon" aria-hidden="true">
        {collapsed ? "»" : "«"}
      </span>
    </Button>
  );
}

export type ShellNavItemProps = HTMLAttributes<HTMLAnchorElement> & {
  href?: string;
  active?: boolean;
  /** Leading mark — preferred when the shell is collapsed. */
  icon?: ReactNode;
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
  icon,
  children,
  ...props
}: ShellNavItemProps) {
  const glyphId = useId();
  const labelText =
    typeof children === "string" || typeof children === "number"
      ? String(children)
      : undefined;
  const glyph = labelText?.trim().charAt(0) || "·";

  return (
    <a
      href={href}
      className={cn("sg-shell-nav-item", className)}
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      {...props}
    >
      {icon ? (
        <span className="sg-shell-nav-icon" aria-hidden="true">
          {icon}
        </span>
      ) : (
        <span
          className="sg-shell-nav-glyph"
          aria-hidden="true"
          data-for={glyphId}
        >
          {glyph}
        </span>
      )}
      <span className="sg-shell-nav-label" id={glyphId}>
        {children}
      </span>
    </a>
  );
}
