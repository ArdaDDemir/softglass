"use client";

import {
  DEFAULT_THEME,
  SOFTGLASS_THEMES,
  THEME_STORAGE_KEY,
  type SoftglassThemeId,
} from "@/lib/themes";
import { Button } from "@softglass/ui";
import { useEffect, useState } from "react";

function isThemeId(value: string | null): value is SoftglassThemeId {
  return SOFTGLASS_THEMES.some((theme) => theme.id === value);
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<SoftglassThemeId>(DEFAULT_THEME);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    const next = isThemeId(stored) ? stored : DEFAULT_THEME;
    document.documentElement.setAttribute("data-softglass-theme", next);
    setTheme(next);
    setReady(true);
  }, []);

  function selectTheme(next: SoftglassThemeId) {
    setTheme(next);
    document.documentElement.setAttribute("data-softglass-theme", next);
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  }

  return (
    <div
      className="sg-surface-glass-elevated"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        padding: "0.5rem",
        borderRadius: "var(--sg-radius-pill)",
        opacity: ready ? 1 : 0.7,
      }}
      role="tablist"
      aria-label="Softglass visual language"
    >
      {SOFTGLASS_THEMES.map((item) => {
        const active = theme === item.id;
        return (
          <Button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            variant={active ? "primary" : "ghost"}
            size="sm"
            onClick={() => selectTheme(item.id)}
          >
            {item.name}
          </Button>
        );
      })}
    </div>
  );
}
