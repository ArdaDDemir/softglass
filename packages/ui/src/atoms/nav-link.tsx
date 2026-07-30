import { cn } from "../lib/cn";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export type NavLinkLook = "soft" | "solid" | "underline" | "pill";

export type NavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children?: ReactNode;
  /** Active route / current page. */
  active?: boolean;
  look?: NavLinkLook;
  /** Optional leading adornment. */
  leading?: ReactNode;
};

const lookClass: Record<NavLinkLook, string> = {
  soft: "",
  solid: "sg-nav-link-look-solid",
  underline: "sg-nav-link-look-underline",
  pill: "sg-nav-link-look-pill",
};

/**
 * Atom — NavLink
 * Navigation link with active state. Plain <a> (Next: wrap with next/link).
 */
export function NavLink({
  className,
  href,
  children,
  active = false,
  look = "soft",
  leading,
  ...props
}: NavLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "sg-nav-link",
        lookClass[look],
        active && "sg-nav-link-active",
        className,
      )}
      data-look={look}
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      {...props}
    >
      {leading ? (
        <span className="sg-nav-link-leading" aria-hidden="true">
          {leading}
        </span>
      ) : null}
      <span className="sg-nav-link-label">{children}</span>
    </a>
  );
}
