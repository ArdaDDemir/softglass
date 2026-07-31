"use client";

import {
  applySoftglassTheme,
  readStoredSoftglassTheme,
  SOFTGLASS_THEMES,
  THEME_CHANGE_EVENT,
  type SoftglassThemeId,
} from "@/lib/themes";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ColorInput,
  Input,
  Text,
} from "@softglass/ui";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";

const BRAND_STORAGE_KEY = "softglass-brand-draft";

export type BrandColors = {
  accent: string;
  accentHover: string;
  accentFg: string;
  accentSoft: string;
  ring: string;
  success: string;
  warning: string;
  danger: string;
};

const DEFAULT_BRAND: BrandColors = {
  accent: "#7c3aed",
  accentHover: "#6d28d9",
  accentFg: "#ffffff",
  accentSoft: "rgba(124, 58, 237, 0.12)",
  ring: "#8b5cf6",
  success: "#059669",
  warning: "#d97706",
  danger: "#dc2626",
};

function clampByte(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)));
}

function parseHex(hex: string): { r: number; g: number; b: number } | null {
  const raw = hex.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(raw)) return null;
  return {
    r: Number.parseInt(raw.slice(0, 2), 16),
    g: Number.parseInt(raw.slice(2, 4), 16),
    b: Number.parseInt(raw.slice(4, 6), 16),
  };
}

function toHex(r: number, g: number, b: number): string {
  return `#${[r, g, b]
    .map((c) => clampByte(c).toString(16).padStart(2, "0"))
    .join("")}`;
}

/** Darken hex for hover (simple mix toward black). */
function darkenHex(hex: string, amount = 0.12): string {
  const rgb = parseHex(hex);
  if (!rgb) return hex;
  return toHex(
    rgb.r * (1 - amount),
    rgb.g * (1 - amount),
    rgb.b * (1 - amount),
  );
}

function softRgba(hex: string, alpha = 0.12): string {
  const rgb = parseHex(hex);
  if (!rgb) return `rgba(124, 58, 237, ${alpha})`;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

/** Normalize computed colors (browser may return 8-digit hex) to rgba/hex for export. */
function normalizeCssColor(value: string, fallback: string): string {
  const v = value.trim();
  if (!v) return fallback;
  // #RRGGBBAA → rgba
  const hex8 = v.match(/^#([0-9a-fA-F]{8})$/);
  if (hex8) {
    const h = hex8[1]!;
    const r = Number.parseInt(h.slice(0, 2), 16);
    const g = Number.parseInt(h.slice(2, 4), 16);
    const b = Number.parseInt(h.slice(4, 6), 16);
    const a = Number.parseInt(h.slice(6, 8), 16) / 255;
    return `rgba(${r}, ${g}, ${b}, ${Math.round(a * 100) / 100})`;
  }
  if (parseHex(v) || v.startsWith("rgb") || v.startsWith("hsl")) return v;
  return fallback;
}

function brandToCssVars(brand: BrandColors): CSSProperties {
  return {
    ["--sg-accent" as string]: brand.accent,
    ["--sg-accent-hover" as string]: brand.accentHover,
    ["--sg-accent-fg" as string]: brand.accentFg,
    ["--sg-accent-soft" as string]: brand.accentSoft,
    ["--sg-ring" as string]: brand.ring,
    ["--sg-ring-soft" as string]: softRgba(brand.ring, 0.25),
    ["--sg-success" as string]: brand.success,
    ["--sg-warning" as string]: brand.warning,
    ["--sg-danger" as string]: brand.danger,
  };
}

function brandToExportCss(themeId: SoftglassThemeId, brand: BrandColors): string {
  return `[data-softglass-theme="${themeId}"] {
  --sg-accent: ${brand.accent};
  --sg-accent-hover: ${brand.accentHover};
  --sg-accent-fg: ${brand.accentFg};
  --sg-accent-soft: ${brand.accentSoft};
  --sg-ring: ${brand.ring};
  --sg-ring-soft: ${softRgba(brand.ring, 0.25)};
  --sg-success: ${brand.success};
  --sg-warning: ${brand.warning};
  --sg-danger: ${brand.danger};
}`;
}

function readCssVar(name: string, fallback: string): string {
  if (typeof document === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

function readBrandFromDocument(): BrandColors {
  const accent = normalizeCssColor(
    readCssVar("--sg-accent", DEFAULT_BRAND.accent),
    DEFAULT_BRAND.accent,
  );
  return {
    accent,
    accentHover: normalizeCssColor(
      readCssVar("--sg-accent-hover", DEFAULT_BRAND.accentHover),
      DEFAULT_BRAND.accentHover,
    ),
    accentFg: normalizeCssColor(
      readCssVar("--sg-accent-fg", DEFAULT_BRAND.accentFg),
      DEFAULT_BRAND.accentFg,
    ),
    accentSoft: normalizeCssColor(
      readCssVar("--sg-accent-soft", DEFAULT_BRAND.accentSoft),
      softRgba(accent),
    ),
    ring: normalizeCssColor(
      readCssVar("--sg-ring", DEFAULT_BRAND.ring),
      DEFAULT_BRAND.ring,
    ),
    success: normalizeCssColor(
      readCssVar("--sg-success", DEFAULT_BRAND.success),
      DEFAULT_BRAND.success,
    ),
    warning: normalizeCssColor(
      readCssVar("--sg-warning", DEFAULT_BRAND.warning),
      DEFAULT_BRAND.warning,
    ),
    danger: normalizeCssColor(
      readCssVar("--sg-danger", DEFAULT_BRAND.danger),
      DEFAULT_BRAND.danger,
    ),
  };
}

function applyBrandToDocument(brand: BrandColors | null) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const keys = [
    "--sg-accent",
    "--sg-accent-hover",
    "--sg-accent-fg",
    "--sg-accent-soft",
    "--sg-ring",
    "--sg-ring-soft",
    "--sg-success",
    "--sg-warning",
    "--sg-danger",
  ] as const;

  if (!brand) {
    for (const key of keys) root.style.removeProperty(key);
    return;
  }

  root.style.setProperty("--sg-accent", brand.accent);
  root.style.setProperty("--sg-accent-hover", brand.accentHover);
  root.style.setProperty("--sg-accent-fg", brand.accentFg);
  root.style.setProperty("--sg-accent-soft", brand.accentSoft);
  root.style.setProperty("--sg-ring", brand.ring);
  root.style.setProperty("--sg-ring-soft", softRgba(brand.ring, 0.25));
  root.style.setProperty("--sg-success", brand.success);
  root.style.setProperty("--sg-warning", brand.warning);
  root.style.setProperty("--sg-danger", brand.danger);
}

function loadDraft(): BrandColors | null {
  try {
    const raw = window.localStorage.getItem(BRAND_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<BrandColors>;
    return { ...DEFAULT_BRAND, ...parsed };
  } catch {
    return null;
  }
}

function saveDraft(brand: BrandColors) {
  try {
    window.localStorage.setItem(BRAND_STORAGE_KEY, JSON.stringify(brand));
  } catch {
    /* private mode */
  }
}

function stripHash(color: string): string {
  return color.trim().replace(/^#/, "");
}

function withHash(hex: string): string {
  const bare = stripHash(hex);
  return bare.startsWith("#") ? bare : `#${bare}`;
}

/** Encode brand + language into hash query: #theme?lang=aurora&a=7c3aed&… */
export function buildThemeShareHash(
  themeId: SoftglassThemeId,
  brand: BrandColors,
): string {
  const p = new URLSearchParams();
  p.set("lang", themeId);
  p.set("a", stripHash(brand.accent));
  p.set("h", stripHash(brand.accentHover));
  p.set("fg", stripHash(brand.accentFg));
  p.set("r", stripHash(brand.ring));
  p.set("s", stripHash(brand.success));
  p.set("w", stripHash(brand.warning));
  p.set("d", stripHash(brand.danger));
  return `#theme?${p.toString()}`;
}

export function parseThemeShareHash(rawHash: string): {
  themeId: SoftglassThemeId | null;
  brand: Partial<BrandColors> | null;
} {
  const hash = rawHash.replace(/^#/, "").trim();
  if (!hash.startsWith("theme")) {
    return { themeId: null, brand: null };
  }
  const qIndex = hash.indexOf("?");
  if (qIndex < 0) return { themeId: null, brand: null };
  const params = new URLSearchParams(hash.slice(qIndex + 1));
  const lang = params.get("lang");
  const themeId =
    lang && SOFTGLASS_THEMES.some((t) => t.id === lang)
      ? (lang as SoftglassThemeId)
      : null;

  const pick = (key: string): string | undefined => {
    const v = params.get(key);
    if (!v) return undefined;
    // Accept 6-digit hex (with or without #)
    if (/^#?[0-9a-fA-F]{6}$/.test(v)) return withHash(v);
    return undefined;
  };

  const accent = pick("a");
  const brand: Partial<BrandColors> = {};
  if (accent) {
    brand.accent = accent;
    brand.accentSoft = softRgba(accent);
  }
  const hover = pick("h");
  if (hover) brand.accentHover = hover;
  const fg = pick("fg");
  if (fg) brand.accentFg = fg;
  const ring = pick("r");
  if (ring) brand.ring = ring;
  const success = pick("s");
  if (success) brand.success = success;
  const warning = pick("w");
  if (warning) brand.warning = warning;
  const danger = pick("d");
  if (danger) brand.danger = danger;

  const hasBrand = Object.keys(brand).length > 0;
  return { themeId, brand: hasBrand ? brand : null };
}

function writeThemeShareHash(themeId: SoftglassThemeId, brand: BrandColors) {
  if (typeof window === "undefined") return;
  const next = buildThemeShareHash(themeId, brand);
  if (window.location.hash === next) return;
  window.history.replaceState(null, "", next);
}

/**
 * Softglass Theme Builder — brand lab (language + accent overrides).
 * Gallery page body for #theme · share: #theme?lang=…&a=…
 */
export function ThemeBuilderPage() {
  const [themeId, setThemeId] = useState<SoftglassThemeId>("aurora");
  const [brand, setBrand] = useState<BrandColors>(DEFAULT_BRAND);
  const [galleryApplied, setGalleryApplied] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "ok" | "err">("idle");
  const [linkState, setLinkState] = useState<"idle" | "ok" | "err">("idle");
  const [hydrated, setHydrated] = useState(false);

  // Hydrate: share URL → localStorage draft → document defaults
  useEffect(() => {
    const shared = parseThemeShareHash(window.location.hash);
    const storedTheme = readStoredSoftglassTheme();
    const nextTheme = shared.themeId ?? storedTheme;
    setThemeId(nextTheme);
    if (shared.themeId) {
      applySoftglassTheme(shared.themeId);
    }

    requestAnimationFrame(() => {
      const fromDoc = readBrandFromDocument();
      const draft = loadDraft();
      if (shared.brand) {
        const accent = shared.brand.accent ?? fromDoc.accent;
        setBrand({
          ...fromDoc,
          ...shared.brand,
          accentHover:
            shared.brand.accentHover ??
            (shared.brand.accent ? darkenHex(shared.brand.accent) : fromDoc.accentHover),
          accentSoft:
            shared.brand.accentSoft ??
            (shared.brand.accent ? softRgba(shared.brand.accent) : fromDoc.accentSoft),
          ring: shared.brand.ring ?? shared.brand.accent ?? fromDoc.ring,
          accent,
        });
      } else {
        setBrand(draft ?? fromDoc);
      }
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    function onExternal(e: Event) {
      const id = (e as CustomEvent<SoftglassThemeId>).detail;
      if (!id) return;
      setThemeId(id);
      requestAnimationFrame(() => {
        if (!galleryApplied) {
          const next = readBrandFromDocument();
          const draft = loadDraft();
          // Shared URL brand wins over empty re-sample
          const shared = parseThemeShareHash(window.location.hash);
          if (shared.brand && shared.themeId === id) return;
          if (!draft) setBrand(next);
        }
      });
    }
    window.addEventListener(THEME_CHANGE_EVENT, onExternal);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, onExternal);
  }, [galleryApplied]);

  useEffect(() => {
    if (!hydrated) return;
    saveDraft(brand);
    writeThemeShareHash(themeId, brand);
  }, [brand, themeId, hydrated]);

  const exportCss = useMemo(
    () => brandToExportCss(themeId, brand),
    [brand, themeId],
  );
  const previewStyle = useMemo(() => brandToCssVars(brand), [brand]);
  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}${window.location.pathname}${buildThemeShareHash(themeId, brand)}`;
  }, [brand, themeId]);

  const setField = useCallback(
    <K extends keyof BrandColors>(key: K, value: string) => {
      setBrand((prev) => {
        const next = { ...prev, [key]: value };
        if (key === "accent" && parseHex(value)) {
          next.accentHover = darkenHex(value);
          next.accentSoft = softRgba(value);
          next.ring = value;
        }
        return next;
      });
    },
    [],
  );

  function pickLanguage(id: SoftglassThemeId) {
    setThemeId(id);
    applySoftglassTheme(id);
    requestAnimationFrame(() => {
      const fromDoc = readBrandFromDocument();
      setBrand((prev) => ({
        ...fromDoc,
        accent: prev.accent,
        accentHover: darkenHex(prev.accent),
        accentSoft: softRgba(prev.accent),
        accentFg: prev.accentFg,
        ring: prev.accent,
      }));
    });
  }

  function resetBrand() {
    applyBrandToDocument(null);
    setGalleryApplied(false);
    try {
      window.localStorage.removeItem(BRAND_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    requestAnimationFrame(() => {
      setBrand(readBrandFromDocument());
    });
  }

  function applyToGallery() {
    applyBrandToDocument(brand);
    setGalleryApplied(true);
  }

  async function copyCss() {
    try {
      await navigator.clipboard.writeText(exportCss);
      setCopyState("ok");
      window.setTimeout(() => setCopyState("idle"), 1600);
    } catch {
      setCopyState("err");
      window.setTimeout(() => setCopyState("idle"), 2000);
    }
  }

  async function copyShareLink() {
    try {
      const url =
        typeof window !== "undefined"
          ? `${window.location.origin}${window.location.pathname}${buildThemeShareHash(themeId, brand)}`
          : shareUrl;
      await navigator.clipboard.writeText(url);
      setLinkState("ok");
      window.setTimeout(() => setLinkState("idle"), 1600);
    } catch {
      setLinkState("err");
      window.setTimeout(() => setLinkState("idle"), 2000);
    }
  }

  const themeMeta = SOFTGLASS_THEMES.find((t) => t.id === themeId);

  return (
    <div className="sg-gallery-stack">
      <Alert variant="info" title="Language vs brand">
        <strong>Language</strong> is the Softglass dialect (surfaces, glass).{" "}
        <strong>Brand</strong> is your accent + semantics — override CSS
        variables, keep the engine.
      </Alert>

      <Card surface="solid" as="section">
        <CardHeader>
          <CardTitle>Base language</CardTitle>
          <CardDescription>
            Pick a dialect, then recolor the brand. Active:{" "}
            <strong>{themeMeta?.name ?? themeId}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="sg-gallery-chip-row">
          {SOFTGLASS_THEMES.map((theme) => (
            <Button
              key={theme.id}
              size="sm"
              variant={themeId === theme.id ? "primary" : "secondary"}
              onClick={() => pickLanguage(theme.id)}
            >
              {theme.id}
            </Button>
          ))}
        </CardContent>
      </Card>

      <div className="sg-theme-builder-grid">
        <Card surface="solid" as="section">
          <CardHeader>
            <CardTitle>Brand colors</CardTitle>
            <CardDescription>
              Accent drives hover/soft/ring automatically. Semantics are
              independent.
            </CardDescription>
          </CardHeader>
          <CardContent className="sg-theme-builder-fields">
            <ColorInput
              label="Accent"
              look="soft"
              value={brand.accent}
              onValueChange={(v) => setField("accent", v)}
            />
            <ColorInput
              label="Accent hover"
              look="soft"
              value={brand.accentHover}
              onValueChange={(v) => setField("accentHover", v)}
            />
            <ColorInput
              label="Accent foreground"
              look="soft"
              value={brand.accentFg}
              onValueChange={(v) => setField("accentFg", v)}
            />
            <ColorInput
              label="Ring"
              look="soft"
              value={brand.ring}
              onValueChange={(v) => setField("ring", v)}
            />
            <ColorInput
              label="Success"
              look="soft"
              value={brand.success}
              onValueChange={(v) => setField("success", v)}
            />
            <ColorInput
              label="Warning"
              look="soft"
              value={brand.warning}
              onValueChange={(v) => setField("warning", v)}
            />
            <ColorInput
              label="Danger"
              look="soft"
              value={brand.danger}
              onValueChange={(v) => setField("danger", v)}
            />
            <div className="sg-theme-builder-soft">
              <Text size="sm" tone="muted">
                Soft accent (auto)
              </Text>
              <code className="sg-theme-builder-soft-code">
                {brand.accentSoft}
              </code>
            </div>
          </CardContent>
          <CardFooter className="sg-gallery-chip-row">
            <Button size="sm" variant="secondary" onClick={resetBrand}>
              Reset
            </Button>
            <Button size="sm" variant="primary" onClick={applyToGallery}>
              Apply to gallery
            </Button>
            <Button
              size="sm"
              variant="secondary"
              look="soft"
              onClick={() => void copyShareLink()}
            >
              {linkState === "ok"
                ? "Link copied"
                : linkState === "err"
                  ? "Copy failed"
                  : "Copy share link"}
            </Button>
            {galleryApplied ? (
              <Badge size="sm" variant="success" look="soft">
                applied
              </Badge>
            ) : null}
          </CardFooter>
        </Card>

        <Card surface="solid" as="section" className="sg-theme-builder-preview-card">
          <CardHeader>
            <CardTitle>Live preview</CardTitle>
            <CardDescription>
              Scoped CSS variables — edit without committing until Apply.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="sg-theme-builder-preview" style={previewStyle}>
              <div className="sg-gallery-chip-row">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="primary" look="soft">
                  Soft
                </Button>
                <Button variant="primary" look="glass">
                  Glass
                </Button>
              </div>
              <div className="sg-gallery-chip-row">
                <Badge variant="accent" look="soft">
                  Accent
                </Badge>
                <Badge variant="success" look="soft">
                  Success
                </Badge>
                <Badge variant="warning" look="soft">
                  Warning
                </Badge>
                <Badge variant="danger" look="soft">
                  Danger
                </Badge>
              </div>
              <Alert variant="info" title="Brand check">
                Accent and semantics should stay readable on this language’s
                surfaces.
              </Alert>
              <Input
                label="Sample field"
                placeholder="Your product name"
                defaultValue="Softglass"
              />
              <Card surface="glass" padding="sm">
                <CardContent>
                  <Text size="sm">
                    Glass chrome with brand accent on actions — keep long text on
                    solid.
                  </Text>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card surface="solid" as="section">
        <CardHeader>
          <CardTitle>Export CSS</CardTitle>
          <CardDescription>
            Paste into your app after the Softglass tokens import. Language id:{" "}
            <code>{themeId}</code>
          </CardDescription>
        </CardHeader>
        <CardContent className="sg-gallery-stack-tight">
          <pre className="sg-gallery-code sg-theme-builder-export">{exportCss}</pre>
          <div className="sg-gallery-chip-row">
            <Button size="sm" variant="primary" onClick={() => void copyCss()}>
              {copyState === "ok"
                ? "Copied"
                : copyState === "err"
                  ? "Copy failed"
                  : "Copy CSS"}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => void copyShareLink()}
            >
              {linkState === "ok"
                ? "Link copied"
                : linkState === "err"
                  ? "Copy failed"
                  : "Copy share link"}
            </Button>
            <Text size="sm" tone="muted">
              Draft autosaves · share via{" "}
              <code style={{ fontSize: "0.85em" }}>#theme?lang=…&a=…</code>
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
