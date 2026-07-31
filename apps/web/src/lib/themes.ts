export const SOFTGLASS_THEMES = [
  {
    id: "aurora",
    name: "Aurora Glass",
    tagline: "Calm pastel glass — eye-friendly default",
    bestFor: "SaaS, education, wellness",
    scheme: "light" as const,
  },
  {
    id: "mist",
    name: "Mist Panel",
    tagline: "Structural frosted chrome for dense apps",
    bestFor: "Admin, B2B workspace",
    scheme: "light" as const,
  },
  {
    id: "pearl",
    name: "Pearl Soft",
    tagline: "Warm cream glass for consumer brands",
    bestFor: "Shop, lifestyle, landings",
    scheme: "light" as const,
  },
  {
    id: "obsidian",
    name: "Obsidian Gloss",
    tagline: "Dark premium glass with specular rims",
    bestFor: "AI tools, music, night UIs",
    scheme: "dark" as const,
  },
  {
    id: "noir",
    name: "Noir Velvet",
    tagline: "Deep black glass, rose accent — cinema night",
    bestFor: "Fashion, media, premium dark products",
    scheme: "dark" as const,
  },
  {
    id: "ember",
    name: "Ember Dusk",
    tagline: "Warm charcoal glass, amber accent",
    bestFor: "Analytics, night dashboards, cozy tools",
    scheme: "dark" as const,
  },
] as const;

export type SoftglassThemeId = (typeof SOFTGLASS_THEMES)[number]["id"];

export const DEFAULT_THEME: SoftglassThemeId = "aurora";

export const THEME_STORAGE_KEY = "softglass-theme";

/** Short chip labels for compact switchers (mobile header). */
export const THEME_SHORT: Record<SoftglassThemeId, string> = {
  aurora: "Aurora",
  mist: "Mist",
  pearl: "Pearl",
  obsidian: "Obsidian",
  noir: "Noir",
  ember: "Ember",
};

export function isSoftglassThemeId(
  value: string | null | undefined,
): value is SoftglassThemeId {
  return SOFTGLASS_THEMES.some((theme) => theme.id === value);
}

export const THEME_CHANGE_EVENT = "softglass-theme-change";

/** Apply language on <html> + persist. Safe no-op on server. */
export function applySoftglassTheme(id: SoftglassThemeId) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-softglass-theme", id);
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, id);
  } catch {
    /* private mode */
  }
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: id }));
}

export function readStoredSoftglassTheme(): SoftglassThemeId {
  if (typeof window === "undefined") return DEFAULT_THEME;
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isSoftglassThemeId(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}
