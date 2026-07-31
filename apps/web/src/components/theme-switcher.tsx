"use client";

import {
  applySoftglassTheme,
  DEFAULT_THEME,
  readStoredSoftglassTheme,
  SOFTGLASS_THEMES,
  THEME_CHANGE_EVENT,
  THEME_SHORT,
  type SoftglassThemeId,
} from "@/lib/themes";
import { Button } from "@softglass/ui";
import { useEffect, useState } from "react";

export type ThemeSwitcherProps = {
  /**
   * auto = short names on narrow screens, full names on desktop
   * compact = always short
   * full = always full theme name
   */
  density?: "auto" | "compact" | "full";
  className?: string;
};

/**
 * Softglass language switcher (6 languages: 3 light · 3 dark).
 */
export function ThemeSwitcher({
  density = "auto",
  className,
}: ThemeSwitcherProps) {
  const [theme, setTheme] = useState<SoftglassThemeId>(DEFAULT_THEME);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const next = readStoredSoftglassTheme();
    applySoftglassTheme(next);
    setTheme(next);
    setReady(true);

    function onExternal(e: Event) {
      const id = (e as CustomEvent<SoftglassThemeId>).detail;
      if (id) setTheme(id);
    }
    window.addEventListener(THEME_CHANGE_EVENT, onExternal);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, onExternal);
  }, []);

  function selectTheme(next: SoftglassThemeId) {
    setTheme(next);
    applySoftglassTheme(next);
  }

  return (
    <div
      className={["sg-theme-switcher", className].filter(Boolean).join(" ")}
      data-density={density}
      data-ready={ready || undefined}
      role="tablist"
      aria-label="Softglass visual language"
    >
      {SOFTGLASS_THEMES.map((item) => {
        const active = theme === item.id;
        const short = THEME_SHORT[item.id];
        return (
          <Button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={item.name}
            title={item.tagline}
            variant={active ? "primary" : "ghost"}
            size="sm"
            onClick={() => selectTheme(item.id)}
          >
            <span className="sg-theme-switcher-short">{short}</span>
            <span className="sg-theme-switcher-full">{item.name}</span>
          </Button>
        );
      })}
    </div>
  );
}
