import { cn } from "../lib/cn";
import type {
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from "react";

export type ListItemLook = "soft" | "solid" | "outline" | "ghost";

export type ListItemProps = HTMLAttributes<HTMLDivElement> & {
  title?: ReactNode;
  description?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  look?: ListItemLook;
  /** Interactive row (button semantics via role=button if onClick). */
  interactive?: boolean;
  disabled?: boolean;
  selected?: boolean;
  children?: ReactNode;
};

const lookClass: Record<ListItemLook, string> = {
  soft: "",
  solid: "sg-list-item-look-solid",
  outline: "sg-list-item-look-outline",
  ghost: "sg-list-item-look-ghost",
};

/**
 * Atom — ListItem
 * Leading / title / description / trailing row. Not a full virtual list.
 */
export function ListItem({
  className,
  title,
  description,
  leading,
  trailing,
  look = "soft",
  interactive = false,
  disabled = false,
  selected = false,
  children,
  onClick,
  ...props
}: ListItemProps) {
  const clickable = interactive || Boolean(onClick);

  return (
    <div
      className={cn(
        "sg-list-item",
        lookClass[look],
        clickable && "sg-list-item-interactive",
        selected && "sg-list-item-selected",
        disabled && "sg-list-item-disabled",
        className,
      )}
      data-look={look}
      data-selected={selected || undefined}
      data-disabled={disabled || undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable && !disabled ? 0 : undefined}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      onKeyDown={
        clickable && !disabled
          ? (e: KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.(e as unknown as MouseEvent<HTMLDivElement>);
              }
            }
          : undefined
      }
      {...props}
    >
      {leading ? (
        <div className="sg-list-item-leading" aria-hidden={!title}>
          {leading}
        </div>
      ) : null}
      <div className="sg-list-item-body">
        {title ? <div className="sg-list-item-title">{title}</div> : null}
        {description ? (
          <div className="sg-list-item-description">{description}</div>
        ) : null}
        {children}
      </div>
      {trailing ? <div className="sg-list-item-trailing">{trailing}</div> : null}
    </div>
  );
}
