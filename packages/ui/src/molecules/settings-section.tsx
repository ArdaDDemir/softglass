import { cn } from "../lib/cn";
import type { SettingsSectionLook } from "../lib/looks";
import type { HTMLAttributes, ReactNode } from "react";

export type { SettingsSectionLook };

export type SettingsSectionProps = HTMLAttributes<HTMLElement> & {
  title: ReactNode;
  description?: ReactNode;
  /** Trailing header actions (Save, Reset…). */
  actions?: ReactNode;
  children?: ReactNode;
  /** soft frost (default) · solid · glass · plain flush */
  look?: SettingsSectionLook;
  density?: "comfortable" | "compact";
  as?: "section" | "div" | "article";
};

/**
 * Molecule — SettingsSection
 * Product settings group: title + description + form body.
 * Not a full settings router — compose multiple sections on a page.
 */
export function SettingsSection({
  className,
  title,
  description,
  actions,
  children,
  look = "soft",
  density = "comfortable",
  as: Comp = "section",
  ...props
}: SettingsSectionProps) {
  return (
    <Comp
      className={cn("sg-settings-section", className)}
      data-look={look === "soft" ? undefined : look}
      data-density={density === "comfortable" ? undefined : density}
      {...props}
    >
      <header className="sg-settings-section-header">
        <div className="sg-settings-section-heading">
          <h2 className="sg-settings-section-title">{title}</h2>
          {description ? (
            <p className="sg-settings-section-description">{description}</p>
          ) : null}
        </div>
        {actions ? (
          <div className="sg-settings-section-actions">{actions}</div>
        ) : null}
      </header>
      {children ? (
        <div className="sg-settings-section-body">{children}</div>
      ) : null}
    </Comp>
  );
}
