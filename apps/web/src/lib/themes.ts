export const SOFTGLASS_THEMES = [
  {
    id: "aurora",
    name: "Aurora Glass",
    tagline: "Calm pastel glass — eye-friendly default",
    bestFor: "SaaS, education, wellness",
  },
  {
    id: "obsidian",
    name: "Obsidian Gloss",
    tagline: "Dark premium glass with specular rims",
    bestFor: "AI tools, music, night UIs",
  },
  {
    id: "mist",
    name: "Mist Panel",
    tagline: "Structural frosted chrome for dense apps",
    bestFor: "Admin, B2B workspace",
  },
  {
    id: "pearl",
    name: "Pearl Soft",
    tagline: "Warm cream glass for consumer brands",
    bestFor: "Shop, lifestyle, landings",
  },
] as const;

export type SoftglassThemeId = (typeof SOFTGLASS_THEMES)[number]["id"];

export const DEFAULT_THEME: SoftglassThemeId = "aurora";

export const THEME_STORAGE_KEY = "softglass-theme";
