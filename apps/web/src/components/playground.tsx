"use client";

import { ControlsDemo } from "@/components/controls-demo";
import { LooksDemo } from "@/components/looks-demo";
import { OverlayDemo } from "@/components/overlay-demo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { COMPONENT_DOCS } from "@/lib/docs";
import { SOFTGLASS_THEMES } from "@/lib/themes";
import {
  Accordion,
  Alert,
  AppShell,
  AppShellCollapseButton,
  AppShellMenuButton,
  AspectRatio,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CharacterCount,
  Chip,
  CircularProgress,
  ClientOnly,
  CloseButton,
  Code,
  Collapsible,
  Combobox,
  CopyButton,
  DatePicker,
  EmptyState,
  Fieldset,
  FileField,
  HoverCard,
  Icon,
  Image,
  Input,
  Kbd,
  Link,
  List,
  ListItem,
  Meter,
  MultiSelect,
  NavLink,
  NumberInput,
  PageHeader,
  Pagination,
  PasswordInput,
  PinInput,
  Progress,
  Rating,
  ScrollArea,
  SearchInput,
  SegmentedControl,
  Separator,
  Sheet,
  ShellNav,
  ShellNavItem,
  Skeleton,
  SkipLink,
  Slider,
  Spinner,
  Stat,
  StatusDot,
  Stepper,
  TimeInput,
  ToggleGroup,
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarSpacer,
  Truncate,
  VisuallyHidden,
  ColorInput,
  ColorSwatch,
  CommandPalette,
  CountBadge,
  Heading,
  Highlight,
  LiveRegion,
  NativeDateInput,
  RangeSlider,
  SettingsSection,
  Switch,
  Text,
} from "@softglass/ui";
import { useEffect, useMemo, useState, type CSSProperties } from "react";

type SectionId =
  | "overview"
  | "start"
  | "looks"
  | "buttons"
  | "feedback"
  | "form-atoms"
  | "chrome"
  | "extras"
  | "disclosure-nav"
  | "surface"
  | "structure"
  | "form-polish"
  | "shell"
  | "patterns"
  | "quality"
  | "docs"
  | "overlays"
  | "controls";

type NavItem = {
  id: SectionId;
  label: string;
  icon: string;
  blurb: string;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

/** Product-oriented nav (not sprint IDs). One section mounts at a time. */
const NAV_GROUPS: NavGroup[] = [
  {
    label: "Start",
    items: [
      { id: "overview", label: "Overview", icon: "◆", blurb: "Pitch & kit map" },
      { id: "start", label: "Install", icon: "↓", blurb: "Tokens + UI in 3 steps" },
      { id: "looks", label: "Looks & motion", icon: "◌", blurb: "Design props language" },
    ],
  },
  {
    label: "Atoms",
    items: [
      { id: "buttons", label: "Button", icon: "▢", blurb: "Variants, looks, motion" },
      { id: "feedback", label: "Feedback", icon: "●", blurb: "Progress, status, alerts" },
      { id: "form-atoms", label: "Form controls", icon: "▭", blurb: "Slider, number, file…" },
      { id: "chrome", label: "Chrome", icon: "◇", blurb: "Link, chip, search fields" },
      { id: "extras", label: "More atoms", icon: "…", blurb: "Pin, rating, color, text…" },
    ],
  },
  {
    label: "Molecules",
    items: [
      {
        id: "disclosure-nav",
        label: "Disclosure & nav",
        icon: "≡",
        blurb: "Accordion, breadcrumb, pagination",
      },
      { id: "surface", label: "Surface", icon: "▣", blurb: "Empty, sheet, hover card" },
      { id: "structure", label: "Structure", icon: "▦", blurb: "Stepper, toolbar, list, stat" },
      {
        id: "form-polish",
        label: "Pickers & select",
        icon: "◷",
        blurb: "Date, multi, combobox async",
      },
      { id: "overlays", label: "Overlays", icon: "◫", blurb: "Modal, menu, toast" },
    ],
  },
  {
    label: "App",
    items: [
      { id: "shell", label: "App shell", icon: "⌂", blurb: "Collapse rail + mobile nav" },
      { id: "patterns", label: "Patterns", icon: "⌘", blurb: "Settings, command, auth" },
      { id: "quality", label: "Date range", icon: "◐", blurb: "DatePicker range mode" },
    ],
  },
  {
    label: "Reference",
    items: [
      { id: "docs", label: "API docs", icon: "☰", blurb: "Prop tables + examples" },
      { id: "controls", label: "Controls lab", icon: "⚙", blurb: "Dense control playground" },
    ],
  },
];

const ALL_NAV_ITEMS = NAV_GROUPS.flatMap((g) => g.items);

function findNavItem(id: SectionId): NavItem {
  return ALL_NAV_ITEMS.find((i) => i.id === id) ?? ALL_NAV_ITEMS[0]!;
}

/**
 * Single-section playground — only one heavy demo tree mounts at a time.
 * Nav is product-grouped (Start / Atoms / Molecules / App / Reference).
 */
export function Playground() {
  const [section, setSection] = useState<SectionId>("overview");
  const [docId, setDocId] = useState(COMPONENT_DOCS[0]!.id);
  const activeDoc = useMemo(
    () => COMPONENT_DOCS.find((d) => d.id === docId) ?? COMPONENT_DOCS[0]!,
    [docId],
  );
  const activeNav = findNavItem(section);

  const go = (id: SectionId) => {
    setSection(id);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, "");
    if (ALL_NAV_ITEMS.some((i) => i.id === raw)) {
      setSection(raw as SectionId);
    }
  }, []);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Cheap soft orbs — no filter:blur */}
      <div
        className="sg-blob"
        style={{
          width: 280,
          height: 280,
          top: -60,
          left: -40,
          ["--sg-blob-color" as string]: "var(--sg-accent)",
        }}
      />
      <div
        className="sg-blob"
        style={{
          width: 240,
          height: 240,
          top: 80,
          right: -30,
          ["--sg-blob-color" as string]: "var(--sg-ring)",
        }}
      />

      <AppShell
        mobileNavTitle="Playground"
        header={
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <AppShellMenuButton />
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    letterSpacing: "var(--sg-tracking-tight)",
                    fontSize: "var(--sg-text-lg)",
                  }}
                >
                  Softglass
                </div>
                <div
                  style={{
                    color: "var(--sg-fg-muted)",
                    fontSize: "var(--sg-text-xs)",
                  }}
                >
                  Playground · v1.5
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => go("patterns")}
              >
                Patterns
              </Button>
              <ThemeSwitcher />
            </div>
          </>
        }
        sidebar={
          <>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "0.5rem",
              }}
            >
              <div className="sg-shell-sidebar-collapse-hide">
                <Badge variant="accent" size="sm">
                  playground
                </Badge>
                <p
                  style={{
                    margin: "0.75rem 0 0",
                    fontSize: "var(--sg-text-sm)",
                    color: "var(--sg-fg-muted)",
                  }}
                >
                  Grouped by layer. One section at a time.
                </p>
              </div>
              <AppShellCollapseButton />
            </div>
            <div className="sg-playground-nav">
              {NAV_GROUPS.map((group) => (
                <div key={group.label} className="sg-playground-nav-group">
                  <p className="sg-playground-nav-label">{group.label}</p>
                  <ShellNav aria-label={group.label}>
                    {group.items.map((item) => (
                      <ShellNavItem
                        key={item.id}
                        href={`#${item.id}`}
                        icon={item.icon}
                        active={section === item.id}
                        onClick={(e) => {
                          e.preventDefault();
                          go(item.id);
                        }}
                      >
                        {item.label}
                      </ShellNavItem>
                    ))}
                  </ShellNav>
                </div>
              ))}
            </div>
          </>
        }
      >
        <div className="sg-playground-main">
          {section !== "overview" ? (
            <div className="sg-playground-section-bar">
              <div className="sg-playground-section-bar-meta">
                <Badge size="sm" variant="default">
                  {activeNav.icon} {NAV_GROUPS.find((g) =>
                    g.items.some((i) => i.id === section),
                  )?.label}
                </Badge>
                <div>
                  <p className="sg-playground-section-bar-title">
                    {activeNav.label}
                  </p>
                  <p className="sg-playground-section-bar-desc">
                    {activeNav.blurb}
                  </p>
                </div>
              </div>
              <div className="sg-playground-quick">
                <Button size="sm" variant="ghost" onClick={() => go("overview")}>
                  Overview
                </Button>
                <Button size="sm" variant="ghost" onClick={() => go("docs")}>
                  API
                </Button>
              </div>
            </div>
          ) : null}

          {section === "overview" ? (
            <OverviewSection
              onGoStart={() => go("start")}
              onGo={(id) => go(id)}
            />
          ) : null}
          {section === "start" ? <GetStartedSection /> : null}
          {section === "looks" ? <LooksDemo /> : null}
          {section === "buttons" ? <ButtonPropsSection /> : null}
          {section === "feedback" ? <FeedbackSection /> : null}
          {section === "form-atoms" ? <FormAtomsSection /> : null}
          {section === "chrome" ? <ChromeAtomsSection /> : null}
          {section === "extras" ? (
            <>
              <ShouldAtomsSection />
              <NiceAtomsSection />
            </>
          ) : null}
          {section === "disclosure-nav" ? <DisclosureNavSection /> : null}
          {section === "surface" ? <SurfaceSection /> : null}
          {section === "structure" ? <StructureSection /> : null}
          {section === "form-polish" ? <FormPolishSection /> : null}
          {section === "shell" ? <ShellSection /> : null}
          {section === "patterns" ? <PatternsSection /> : null}
          {section === "quality" ? <QualitySection /> : null}
          {section === "docs" ? (
            <DocsSection
              docId={docId}
              setDocId={setDocId}
              activeDoc={activeDoc}
            />
          ) : null}
          {section === "overlays" ? (
            <Card surface="glass" as="section">
              <CardHeader>
                <CardTitle>Overlays</CardTitle>
                <CardDescription>
                  Modal, menus, toast — only this section mounts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OverlayDemo />
              </CardContent>
            </Card>
          ) : null}
          {section === "controls" ? <ControlsDemo /> : null}
        </div>
      </AppShell>
    </div>
  );
}

function OverviewSection({
  onGoStart,
  onGo,
}: {
  onGoStart: () => void;
  onGo: (id: SectionId) => void;
}) {
  return (
    <>
      <Card surface="glass" as="section" hoverable>
        <CardHeader>
          <Badge variant="solid" size="sm">
            v1.5 · branch
          </Badge>
          <CardTitle
            style={{
              fontSize: "var(--sg-text-4xl)",
              maxWidth: "20ch",
              marginTop: "0.75rem",
            }}
          >
            Soft glass kit. Product shell included.
          </CardTitle>
          <CardDescription style={{ fontSize: "var(--sg-text-lg)", maxWidth: "52ch" }}>
            Four languages, one engine. v1.5 adds collapsible AppShell, PageHeader,
            SettingsSection, CommandPalette, and DatePicker range — browse by layer
            in the sidebar.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="primary" onClick={onGoStart}>
            Install
          </Button>
          <Button variant="secondary" onClick={() => onGo("shell")}>
            App shell
          </Button>
          <Button variant="ghost" onClick={() => onGo("patterns")}>
            Patterns
          </Button>
        </CardFooter>
      </Card>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "0.75rem",
        }}
      >
        {[
          { label: "Languages", value: "4" },
          { label: "Components", value: String(COMPONENT_DOCS.length) },
          { label: "Nav groups", value: String(NAV_GROUPS.length) },
          { label: "Perf", value: "1 section" },
        ].map((stat) => (
          <Card key={stat.label} surface="glass" padding="sm">
            <CardContent>
              <div
                style={{
                  fontSize: "var(--sg-text-2xl)",
                  fontWeight: 700,
                  letterSpacing: "var(--sg-tracking-tight)",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  color: "var(--sg-fg-muted)",
                  fontSize: "var(--sg-text-sm)",
                }}
              >
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card surface="solid" as="section">
        <CardHeader>
          <CardTitle>Jump in</CardTitle>
          <CardDescription>
            Product paths — not sprint labels. Pick a layer.
          </CardDescription>
        </CardHeader>
        <CardContent className="sg-playground-quick">
          {(
            [
              ["shell", "App shell"],
              ["patterns", "Patterns"],
              ["quality", "Date range"],
              ["disclosure-nav", "Disclosure"],
              ["overlays", "Overlays"],
              ["docs", "API docs"],
            ] as const
          ).map(([id, label]) => (
            <Button
              key={id}
              size="sm"
              variant="secondary"
              onClick={() => onGo(id)}
            >
              {label}
            </Button>
          ))}
        </CardContent>
      </Card>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "0.75rem",
        }}
      >
        {SOFTGLASS_THEMES.map((theme) => (
          <Card key={theme.id} surface="glass" padding="sm">
            <CardHeader>
              <Badge size="sm">{theme.id}</Badge>
              <CardTitle style={{ fontSize: "var(--sg-text-lg)" }}>
                {theme.name}
              </CardTitle>
              <CardDescription>{theme.tagline}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card surface="solid" as="section">
        <CardHeader>
          <CardTitle>Usage in 30 seconds</CardTitle>
        </CardHeader>
        <CardContent>
          <pre
            style={{
              margin: 0,
              padding: "1rem",
              borderRadius: "var(--sg-radius-sm)",
              background: "var(--sg-accent-soft)",
              overflow: "auto",
              fontSize: "var(--sg-text-sm)",
              lineHeight: 1.6,
            }}
          >{`import "@softglass/tokens";
import { Button } from "@softglass/ui";

<html data-softglass-theme="aurora">
  <Button variant="primary" size="lg" loading={false}>
    Ship it
  </Button>
</html>`}</pre>
        </CardContent>
      </Card>
    </>
  );
}

function GetStartedSection() {
  return (
    <>
      <Card surface="glass" as="section">
        <CardHeader>
          <Badge variant="accent" size="sm">
            consumer
          </Badge>
          <CardTitle>Get started — 3 steps</CardTitle>
          <CardDescription>
            Same path as <code>docs/GETTING-STARTED.md</code>. After npm publish
            you install from the registry; in this monorepo build UI first.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1rem" }}>
          {[
            {
              step: "1",
              title: "Install packages",
              code: `npm install @softglass/tokens @softglass/ui

# this monorepo:
npm install
npm run build:ui`,
            },
            {
              step: "2",
              title: "Import tokens + set language",
              code: `/* globals.css */
@import "@softglass/tokens";

// layout.tsx
<html data-softglass-theme="aurora">`,
            },
            {
              step: "3",
              title: "Use components",
              code: `import { Button, Card, Input } from "@softglass/ui";

<Card surface="glass">
  <Input label="Email" />
  <Button>Continue</Button>
</Card>`,
            },
          ].map((item) => (
            <div key={item.step}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <Badge size="sm" variant="solid">
                  {item.step}
                </Badge>
                <strong>{item.title}</strong>
              </div>
              <pre
                style={{
                  margin: 0,
                  padding: "1rem",
                  borderRadius: "var(--sg-radius-sm)",
                  background: "var(--sg-accent-soft)",
                  overflow: "auto",
                  fontSize: "var(--sg-text-sm)",
                  lineHeight: 1.6,
                }}
              >
                {item.code}
              </pre>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card surface="solid" as="section">
        <CardHeader>
          <CardTitle>Brand override (colors only)</CardTitle>
          <CardDescription>
            Never put product brand into shared language files — override in the
            app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre
            style={{
              margin: 0,
              padding: "1rem",
              borderRadius: "var(--sg-radius-sm)",
              background: "var(--sg-accent-soft)",
              overflow: "auto",
              fontSize: "var(--sg-text-sm)",
              lineHeight: 1.6,
            }}
          >{`[data-softglass-theme="aurora"] {
  --sg-accent: #0ea5e9;
  --sg-accent-hover: #0284c7;
}`}</pre>
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <CardTitle>Status helpers (v1)</CardTitle>
          <CardDescription>
            Alert, Skeleton, Spinner, Separator — empty / loading / status UI.
            Progress + StatusDot → sidebar “Progress · StatusDot”.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "0.75rem" }}>
          <Alert variant="info" title="Info">
            Soft callout for neutral guidance.
          </Alert>
          <Alert variant="success" title="Saved">
            Changes are stored.
          </Alert>
          <Alert variant="warning" title="Check contrast">
            Glass chrome is not for long body text.
          </Alert>
          <Alert variant="danger" title="Action failed">
            Try again or contact support.
          </Alert>
          <Separator />
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <Spinner label="Loading demo" />
            <Spinner size="lg" />
            <Skeleton width={120} height={14} />
            <Skeleton circle width={40} height={40} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

/** v1.3a — dedicated playground for Progress + StatusDot (not buried in Overview). */
function FeedbackSection() {
  const [value, setValue] = useState(42);

  return (
    <>
      <Card surface="glass" as="section">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.3a
          </Badge>
          <CardTitle>Progress</CardTitle>
          <CardDescription>
            <code>look</code>: soft · solid · glass · accent · striped ·{" "}
            <code>variant</code>: accent · success · warning · danger · muted
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1.25rem" }}>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "var(--sg-text-sm)",
                color: "var(--sg-fg-muted)",
              }}
            >
              <span>Interactive value</span>
              <span>{value}%</span>
            </div>
            <Progress value={value} label="Demo progress" look="soft" />
            <input
              type="range"
              min={0}
              max={100}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              aria-label="Progress value"
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ display: "grid", gap: "0.75rem" }}>
            <div style={{ fontSize: "var(--sg-text-sm)", color: "var(--sg-fg-muted)" }}>
              Looks
            </div>
            <Progress value={72} look="soft" label="soft" />
            <Progress value={48} look="solid" label="solid" />
            <Progress value={64} look="glass" label="glass" />
            <Progress value={80} look="accent" label="accent" />
            <Progress value={55} look="striped" label="striped" />
          </div>

          <div style={{ display: "grid", gap: "0.75rem" }}>
            <div style={{ fontSize: "var(--sg-text-sm)", color: "var(--sg-fg-muted)" }}>
              Variants (fill color)
            </div>
            <Progress value={70} variant="accent" label="accent" />
            <Progress value={70} variant="success" label="success" />
            <Progress value={70} variant="warning" label="warning" />
            <Progress value={70} variant="danger" label="danger" />
            <Progress value={70} variant="muted" label="muted" />
          </div>

          <div style={{ display: "grid", gap: "0.5rem" }}>
            <div style={{ fontSize: "var(--sg-text-sm)", color: "var(--sg-fg-muted)" }}>
              Indeterminate
            </div>
            <Progress label="Loading…" look="glass" />
            <Progress label="Striped load" look="striped" variant="success" />
          </div>
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.3a
          </Badge>
          <CardTitle>StatusDot</CardTitle>
          <CardDescription>
            <code>look</code>: soft · solid · outline · glow (+ status / pulse /
            color)
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1.25rem" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.25rem",
              alignItems: "center",
            }}
          >
            {(
              [
                ["online", "Online"],
                ["busy", "Busy"],
                ["away", "Away"],
                ["offline", "Offline"],
              ] as const
            ).map(([status, label]) => (
              <span
                key={status}
                style={{
                  display: "inline-flex",
                  gap: "0.45rem",
                  alignItems: "center",
                  fontSize: "var(--sg-text-sm)",
                }}
              >
                <StatusDot status={status} />
                {label}
              </span>
            ))}
          </div>

          <Separator />

          <div style={{ display: "grid", gap: "0.65rem" }}>
            <div style={{ fontSize: "var(--sg-text-sm)", color: "var(--sg-fg-muted)" }}>
              Looks (online)
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1.25rem",
                alignItems: "center",
              }}
            >
              {(
                [
                  ["soft", "soft"],
                  ["solid", "solid"],
                  ["outline", "outline"],
                  ["glow", "glow"],
                ] as const
              ).map(([look, label]) => (
                <span
                  key={look}
                  style={{
                    display: "inline-flex",
                    gap: "0.45rem",
                    alignItems: "center",
                    fontSize: "var(--sg-text-sm)",
                  }}
                >
                  <StatusDot status="online" look={look} pulse={look === "glow"} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gap: "0.65rem" }}>
            <div style={{ fontSize: "var(--sg-text-sm)", color: "var(--sg-fg-muted)" }}>
              Busy × looks
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
              <StatusDot status="busy" look="soft" pulse={false} label="soft busy" />
              <StatusDot status="busy" look="solid" pulse={false} label="solid busy" />
              <StatusDot status="busy" look="outline" pulse={false} label="outline busy" />
              <StatusDot status="busy" look="glow" pulse={false} label="glow busy" />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              alignItems: "center",
              padding: "0.75rem 1rem",
              borderRadius: "var(--sg-radius-md)",
              background: "var(--sg-surface-solid)",
              border: "1px solid var(--sg-border-subtle)",
            }}
          >
            <StatusDot status="online" look="glow" />
            <span style={{ fontSize: "var(--sg-text-sm)" }}>
              Ada Yılmaz · product design
            </span>
            <Badge size="sm" variant="success">
              live
            </Badge>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

/** v1.3e — Nice atoms */
function NiceAtomsSection() {
  const [range, setRange] = useState<[number, number]>([25, 75]);
  const [view, setView] = useState<string | string[]>("grid");
  const [tags, setTags] = useState({ design: true, eng: false, ops: true });
  const [color, setColor] = useState("#7c3aed");
  const [swatch, setSwatch] = useState("#0ea5e9");
  const [date, setDate] = useState("2026-07-29");
  const [liveMsg, setLiveMsg] = useState("");

  return (
    <>
      <Card surface="glass" as="section">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.3e
          </Badge>
          <CardTitle>RangeSlider · ToggleGroup · CountBadge</CardTitle>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1.25rem" }}>
          <RangeSlider
            label="Price range"
            value={range}
            onValueChange={setRange}
            look="accent"
            hint={`${range[0]} – ${range[1]}`}
          />
          <ToggleGroup
            label="Layout"
            type="single"
            value={view as string}
            onValueChange={setView}
            options={[
              { value: "grid", label: "Grid" },
              { value: "list", label: "List" },
              { value: "board", label: "Board" },
            ]}
          />
          <ToggleGroup
            label="Filters multi"
            type="multiple"
            look="outline"
            defaultValue={["a", "c"]}
            options={[
              { value: "a", label: "A" },
              { value: "b", label: "B" },
              { value: "c", label: "C" },
            ]}
          />
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <Button variant="secondary" size="sm">
              Inbox <CountBadge count={3} look="solid" />
            </Button>
            <Button variant="secondary" size="sm">
              Alerts <CountBadge count={120} max={99} look="danger" />
            </Button>
            <CountBadge count={0} hideZero />
          </div>
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.3e
          </Badge>
          <CardTitle>Color · Chip variants · Text</CardTitle>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1.25rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
            {["#7c3aed", "#0ea5e9", "#22c55e", "#f59e0b", "#f43f5e"].map((c) => (
              <ColorSwatch
                key={c}
                color={c}
                selected={swatch === c}
                onClick={() => setSwatch(c)}
              />
            ))}
            <span style={{ fontSize: "var(--sg-text-sm)", color: "var(--sg-fg-muted)" }}>
              {swatch}
            </span>
          </div>
          <ColorInput label="Brand" value={color} onValueChange={setColor} look="soft" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {Object.entries(tags).map(([k, on]) => (
              <Chip
                key={k}
                variant="filter"
                selected={on}
                onSelectedChange={(v) => setTags((t) => ({ ...t, [k]: v }))}
              >
                {k}
              </Chip>
            ))}
            <Chip variant="check" defaultSelected>
              check chip
            </Chip>
          </div>
          <div style={{ display: "grid", gap: "0.5rem", maxWidth: 420 }}>
            <Heading level={3} size="lg">
              Softglass text
            </Heading>
            <Text tone="muted" size="sm">
              Search hit: <Highlight look="accent">glass</Highlight> morphism
            </Text>
            <Truncate lines={2} style={{ maxWidth: 280, fontSize: "var(--sg-text-sm)" }}>
              Long copy that will clamp after two lines so the layout stays tidy in dense cards and lists without wrapping forever.
            </Truncate>
          </div>
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.3e
          </Badge>
          <CardTitle>NativeDateInput · LiveRegion</CardTitle>
          <CardDescription>
            Date = Softglass day/month/year steppers (not OS picker). LiveRegion =
            visible status banner + aria-live.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1.25rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "flex-end" }}>
            <NativeDateInput
              label="soft"
              look="soft"
              value={date}
              onValueChange={(v) => {
                setDate(v);
                setLiveMsg(`Date set to ${v}`);
              }}
            />
            <NativeDateInput label="solid" look="solid" defaultValue="2026-01-15" />
            <NativeDateInput label="outline" look="outline" defaultValue="2026-03-01" />
            <NativeDateInput label="glass" look="glass" defaultValue="2026-12-24" />
          </div>
          <Text size="sm" tone="muted">
            ISO value: <Code look="accent">{date}</Code>
          </Text>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setLiveMsg(`Saved at ${new Date().toLocaleTimeString()}`)}
            >
              Soft status
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setLiveMsg("Project published successfully.")}
            >
              Success
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setLiveMsg("Check contrast on glass surfaces.")}
            >
              Warning
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setLiveMsg("")}>
              Clear
            </Button>
          </div>
          <LiveRegion
            look={
              liveMsg.includes("success")
                ? "success"
                : liveMsg.includes("contrast")
                  ? "warning"
                  : "info"
            }
            title={liveMsg ? "Live update" : undefined}
          >
            {liveMsg}
          </LiveRegion>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <LiveRegion look="success" title="Success" hideWhenEmpty={false}>
              Changes are stored.
            </LiveRegion>
            <LiveRegion look="glass" title="Glass" hideWhenEmpty={false}>
              Soft status on frost chrome.
            </LiveRegion>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

/** v1.3d — Should atoms */
function ShouldAtomsSection() {
  const [range, setRange] = useState("week");
  const [pct, setPct] = useState(62);
  const [pin, setPin] = useState("");
  const [bio, setBio] = useState("Softglass is soft.");
  const [nav, setNav] = useState("home");
  const [selectedRow, setSelectedRow] = useState("a");
  const [time, setTime] = useState("09:30");
  const [stars, setStars] = useState(4);
  const [storage] = useState(68);

  return (
    <>
      <Card surface="glass" as="section">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.3d
          </Badge>
          <CardTitle>Fieldset · Icon · Image · Meter</CardTitle>
          <CardDescription>
            Grouping + media + read-only bar. Icon is a wrapper only (no pack).
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1.25rem" }}>
          <Fieldset legend="Account" look="soft">
            <Input label="Name" defaultValue="Ada" />
          </Fieldset>

          <div style={{ display: "grid", gap: "1rem" }}>
            <div
              style={{
                fontSize: "var(--sg-text-sm)",
                color: "var(--sg-fg-muted)",
              }}
            >
              TimeInput — Softglass HH:mm (not native OS picker). Value:{" "}
              <Code look="accent">{time}</Code>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "flex-end" }}>
              <TimeInput
                label="soft 24h"
                look="soft"
                value={time}
                onValueChange={setTime}
              />
              <TimeInput label="solid" look="solid" defaultValue="14:00" />
              <TimeInput label="outline" look="outline" defaultValue="08:45" />
              <TimeInput label="glass" look="glass" defaultValue="18:20" />
              <TimeInput
                label="12h + AM/PM"
                look="soft"
                hourCycle={12}
                minuteStep={5}
                defaultValue="09:30"
              />
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem", alignItems: "center" }}>
            <Icon look="soft" label="Soft">✦</Icon>
            <Icon look="solid" label="Solid">✦</Icon>
            <Icon look="outline" label="Outline">✦</Icon>
            <Icon look="ghost" size="lg" label="Ghost">
              ✦
            </Icon>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", maxWidth: 420 }}>
            <Image
              look="soft"
              aspectRatio="16 / 10"
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80"
              alt="Abstract soft"
            />
            <Image look="outline" aspectRatio="16 / 10" alt="Broken" fallback="?" />
          </div>
          <Meter label="Storage" value={storage} look="soft" variant="accent" />
          <Meter label="Health" value={82} look="striped" variant="success" />
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.3d
          </Badge>
          <CardTitle>Rating · ScrollArea · AspectRatio · ClientOnly</CardTitle>
          <CardDescription>
            Rating: SVG stars in a soft shell · looks soft/solid/outline/glass/glow ·
            colors gold/accent/rose
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1.25rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", alignItems: "center" }}>
            <Rating
              value={stars}
              onValueChange={setStars}
              look="soft"
              color="gold"
              showValue
              caption="Rate"
              label="Product rating"
            />
            <Rating value={4} look="solid" color="accent" showValue label="Accent solid" />
            <Rating value={5} look="glow" color="rose" label="Rose glow" />
            <Rating value={3} readOnly look="outline" label="Read only outline" />
            <Rating value={2} look="glass" size="lg" showValue label="Glass large" />
          </div>
          <ScrollArea maxHeight={120} look="soft">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} style={{ padding: "0.35rem 0.25rem", fontSize: "var(--sg-text-sm)" }}>
                Scroll row {i + 1}
              </div>
            ))}
          </ScrollArea>
          <AspectRatio ratio="21 / 9" style={{ maxWidth: 420, borderRadius: 12, overflow: "hidden" }}>
            <Image
              src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
              alt="Gradient"
              rounded="none"
            />
          </AspectRatio>
          <ClientOnly fallback={<Badge size="sm">SSR fallback…</Badge>}>
            <Badge variant="success" size="sm">
              Client mounted
            </Badge>
          </ClientOnly>
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.3d
          </Badge>
          <CardTitle>PinInput</CardTitle>
          <CardDescription>
            OTP cells — paste + arrows. Looks: solid · soft · outline · glass.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1.25rem" }}>
          <PinInput
            label="Code"
            length={6}
            value={pin}
            onValueChange={setPin}
            look="solid"
            hint={pin.length === 6 ? `Complete: ${pin}` : "Type or paste 6 digits."}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "flex-end" }}>
            <PinInput length={4} look="soft" defaultValue="12" label="soft" />
            <PinInput length={4} look="outline" label="outline" />
            <PinInput length={4} look="glass" label="glass" />
          </div>
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.3d
          </Badge>
          <CardTitle>NavLink · ListItem</CardTitle>
          <CardDescription>
            Nav looks: soft · solid · underline · pill · List: soft · solid · outline · ghost
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1.25rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {(
              [
                ["home", "Home", "soft"],
                ["docs", "Docs", "solid"],
                ["api", "API", "underline"],
                ["blog", "Blog", "pill"],
              ] as const
            ).map(([id, label, look]) => (
              <NavLink
                key={id}
                href={`#${id}`}
                look={look}
                active={nav === id}
                onClick={(e) => {
                  e.preventDefault();
                  setNav(id);
                }}
              >
                {label}
              </NavLink>
            ))}
          </div>
          <div style={{ display: "grid", gap: "0.5rem", maxWidth: 480 }}>
            <ListItem
              look="soft"
              interactive
              selected={selectedRow === "a"}
              onClick={() => setSelectedRow("a")}
              leading={<Avatar fallback="AY" size="sm" />}
              title="Ada Yılmaz"
              description="Product design · online"
              trailing={<StatusDot status="online" />}
            />
            <ListItem
              look="solid"
              interactive
              selected={selectedRow === "b"}
              onClick={() => setSelectedRow("b")}
              leading={<Avatar fallback="MK" size="sm" />}
              title="Mert Kaya"
              description="Engineering"
              trailing={<Badge size="sm">Pro</Badge>}
            />
            <ListItem
              look="outline"
              title="Outline row"
              description="Not interactive"
              trailing={<CharacterCount value={12} max={100} />}
            />
            <ListItem look="ghost" title="Ghost row" description="Minimal chrome" />
          </div>
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.3d
          </Badge>
          <CardTitle>CopyButton · CharacterCount</CardTitle>
          <CardDescription>
            Copy looks: soft · solid · outline · ghost · Count: muted / solid / danger over max
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1rem", maxWidth: 480 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <CopyButton value="npm i @softglass/ui" look="soft" />
            <CopyButton value="hello" look="solid">
              Copy hello
            </CopyButton>
            <CopyButton value="outline" look="outline" />
            <CopyButton value="ghost" look="ghost" />
          </div>
          <div className="sg-field">
            <label className="sg-field-label" htmlFor="bio-demo">
              Bio
            </label>
            <textarea
              id="bio-demo"
              className="sg-textarea"
              value={bio}
              maxLength={undefined}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <CharacterCount value={bio.length} max={40} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.3d
          </Badge>
          <CardTitle>CircularProgress</CardTitle>
          <CardDescription>
            <code>look</code>: soft · solid · glass · accent ·{" "}
            <code>variant</code>: accent · success · warning · danger · muted
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1.25rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", alignItems: "center" }}>
            <CircularProgress value={pct} look="soft" label="soft" />
            <CircularProgress value={pct} look="solid" label="solid" />
            <CircularProgress value={pct} look="glass" label="glass" />
            <CircularProgress value={pct} look="accent" variant="success" label="accent+success" />
            <CircularProgress label="indeterminate" look="glass" />
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={pct}
            onChange={(e) => setPct(Number(e.target.value))}
            aria-label="Circular progress value"
            style={{ width: "100%", maxWidth: 320 }}
          />
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.3d
          </Badge>
          <CardTitle>SegmentedControl</CardTitle>
          <CardDescription>
            Radiogroup + ok tuşları. Looks: soft · solid · outline · glass.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1rem" }}>
          <SegmentedControl
            label="soft"
            look="soft"
            value={range}
            onValueChange={setRange}
            options={[
              { value: "day", label: "Day" },
              { value: "week", label: "Week" },
              { value: "month", label: "Month" },
            ]}
          />
          <SegmentedControl
            label="solid"
            look="solid"
            defaultValue="comfy"
            options={[
              { value: "compact", label: "Compact" },
              { value: "comfy", label: "Comfy" },
              { value: "spacious", label: "Spacious" },
            ]}
          />
          <SegmentedControl
            label="outline"
            look="outline"
            size="sm"
            defaultValue="pro"
            options={[
              { value: "free", label: "Free" },
              { value: "pro", label: "Pro" },
              { value: "team", label: "Team", disabled: true },
            ]}
          />
          <SegmentedControl
            label="glass"
            look="glass"
            defaultValue="a"
            options={[
              { value: "a", label: "Aurora" },
              { value: "o", label: "Obsidian" },
              { value: "m", label: "Mist" },
            ]}
          />
          <div style={{ fontSize: "var(--sg-text-sm)", color: "var(--sg-fg-muted)" }}>
            Selected range: <Code look="accent">{range}</Code>
          </div>
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.3d
          </Badge>
          <CardTitle>Kbd · Code</CardTitle>
          <CardDescription>
            Kbd looks: soft · solid · outline · glass · Code: soft · solid · accent · muted
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
            <Kbd look="soft">⌘</Kbd>
            <Kbd look="soft">K</Kbd>
            <Kbd look="solid">Shift</Kbd>
            <Kbd look="outline">Esc</Kbd>
            <Kbd look="glass" size="lg">
              Enter
            </Kbd>
          </div>
          <p style={{ margin: 0, fontSize: "var(--sg-text-sm)" }}>
            soft <Code look="soft">npm i</Code> · solid{" "}
            <Code look="solid">@softglass/ui</Code> · accent{" "}
            <Code look="accent">Button</Code> · muted{" "}
            <Code look="muted">optional</Code>
          </p>
          <Code block look="solid">{`import { SkipLink } from "@softglass/ui";`}</Code>
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.3d
          </Badge>
          <CardTitle>SkipLink</CardTitle>
          <CardDescription>
            Prod: sadece focus’ta görünür. Demo: <code>alwaysVisible</code> + looks /
            placement. Clip-hide (overflow yutmaz).
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1rem" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.65rem",
              alignItems: "center",
            }}
          >
            <SkipLink
              href="#playground-main"
              alwaysVisible
              look="solid"
              style={{ position: "static", transform: "none" }}
            >
              solid
            </SkipLink>
            <SkipLink
              href="#playground-main"
              alwaysVisible
              look="soft"
              style={{ position: "static", transform: "none" }}
            >
              soft
            </SkipLink>
            <SkipLink
              href="#playground-main"
              alwaysVisible
              look="outline"
              style={{ position: "static", transform: "none" }}
            >
              outline
            </SkipLink>
            <SkipLink
              href="#playground-main"
              alwaysVisible
              look="glass"
              style={{ position: "static", transform: "none" }}
            >
              glass
            </SkipLink>
          </div>
          <p style={{ margin: 0, fontSize: "var(--sg-text-sm)", color: "var(--sg-fg-muted)" }}>
            Placement demos are fixed to the viewport — use Tab to find the hidden one
            below (no alwaysVisible).
          </p>
          <SkipLink href="#playground-main" look="solid" placement="start">
            Skip to playground main (focus-only)
          </SkipLink>
          <div
            id="playground-main"
            tabIndex={-1}
            style={{
              marginTop: "0.25rem",
              padding: "0.75rem 1rem",
              borderRadius: "var(--sg-radius-sm)",
              border: "1px dashed var(--sg-border-subtle)",
              fontSize: "var(--sg-text-sm)",
            }}
          >
            #playground-main landing spot
          </div>
        </CardContent>
      </Card>
    </>
  );
}

/** v1.3c — Link, Chip, CloseButton, Password, Search, VisuallyHidden */
function ChromeAtomsSection() {
  const [tags, setTags] = useState(["Aurora", "Mist", "Pearl"]);
  const [filters, setFilters] = useState<Record<string, boolean>>({
    open: true,
    draft: false,
    archived: false,
  });
  const [query, setQuery] = useState("soft glass");
  const [password, setPassword] = useState("hunter2");

  return (
    <>
      <Card surface="glass" as="section">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.3c
          </Badge>
          <CardTitle>Link</CardTitle>
          <CardDescription>
            Plain <code>&lt;a href&gt;</code> — Next apps can wrap with{" "}
            <code>next/link</code>. Looks: accent · muted · subtle · underline.
          </CardDescription>
        </CardHeader>
        <CardContent
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem 1.5rem",
            alignItems: "center",
          }}
        >
          <Link href="#chrome">In-app anchor</Link>
          <Link href="https://github.com/ArdaDDemir/softglass" external>
            External repo
          </Link>
          <Link href="#docs" look="muted">
            muted
          </Link>
          <Link href="#docs" look="subtle">
            subtle
          </Link>
          <Link href="#docs" look="underline">
            underline
          </Link>
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.3c
          </Badge>
          <CardTitle>Chip</CardTitle>
          <CardDescription>
            Tıkla = seç. × = sil. Looks: soft · solid · outline · glass · glow.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1.25rem" }}>
          <div>
            <div
              style={{
                fontSize: "var(--sg-text-sm)",
                color: "var(--sg-fg-muted)",
                marginBottom: "0.5rem",
              }}
            >
              Selectable filters (toggle works)
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
              {Object.entries(filters).map(([key, on]) => (
                <Chip
                  key={key}
                  selected={on}
                  onSelectedChange={(next) =>
                    setFilters((f) => ({ ...f, [key]: next }))
                  }
                >
                  {key}
                </Chip>
              ))}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "var(--sg-text-sm)",
                color: "var(--sg-fg-muted)",
                marginBottom: "0.5rem",
              }}
            >
              Removable tags (× works)
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  interactive={false}
                  removable
                  look="outline"
                  onRemove={() => setTags((t) => t.filter((x) => x !== tag))}
                  removeLabel={`Remove ${tag}`}
                >
                  {tag}
                </Chip>
              ))}
              {tags.length === 0 ? (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setTags(["Aurora", "Mist", "Pearl"])}
                >
                  Reset tags
                </Button>
              ) : null}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "var(--sg-text-sm)",
                color: "var(--sg-fg-muted)",
                marginBottom: "0.5rem",
              }}
            >
              Looks (same height, × aligned)
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
              {(
                ["soft", "solid", "outline", "glass", "glow"] as const
              ).map((look) => (
                <Chip key={look} look={look} removable onRemove={() => undefined}>
                  {look}
                </Chip>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
            <span style={{ fontSize: "var(--sg-text-sm)", color: "var(--sg-fg-muted)" }}>
              CloseButton
            </span>
            <CloseButton look="ghost" label="ghost" />
            <CloseButton look="soft" label="soft" />
            <CloseButton look="solid" label="solid" />
            <CloseButton look="danger" label="danger" />
          </div>
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.3c
          </Badge>
          <CardTitle>PasswordInput · SearchInput</CardTitle>
          <CardDescription>
            Gerçek Input shell. Show/Hide + Clear çalışır. Looks: solid · soft ·
            glass · underline · filled · ghost.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1.25rem", maxWidth: 480 }}>
          <PasswordInput
            label="Password (solid)"
            look="solid"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            hint="Show → characters; Hide → dots."
            requiredMark
          />
          <PasswordInput label="soft" look="soft" defaultValue="demo-pass" />
          <PasswordInput label="glass" look="glass" defaultValue="demo-pass" />
          <PasswordInput label="underline" look="underline" defaultValue="demo-pass" />
          <PasswordInput label="ghost" look="ghost" defaultValue="demo-pass" />
          <Separator />
          <SearchInput
            label="Search (solid)"
            look="solid"
            value={query}
            onValueChange={setQuery}
            placeholder="Type then Clear…"
            hint={`Live value: “${query || "empty"}”`}
          />
          <SearchInput label="soft" look="soft" defaultValue="soft query" />
          <SearchInput label="glass" look="glass" defaultValue="glass query" />
          <SearchInput label="filled" look="filled" defaultValue="filled query" />
          <SearchInput label="ghost" look="ghost" defaultValue="ghost query" />
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <CardTitle>VisuallyHidden</CardTitle>
          <CardDescription>
            Screen-reader only label — visual UI can stay icon-only.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="ghost" iconOnly aria-label={undefined}>
            <VisuallyHidden>Dismiss notification</VisuallyHidden>
            <span aria-hidden="true">×</span>
          </Button>
          <p
            style={{
              margin: "0.75rem 0 0",
              fontSize: "var(--sg-text-sm)",
              color: "var(--sg-fg-muted)",
            }}
          >
            Inspect with a screen reader / a11y tree — visible label is hidden.
          </p>
        </CardContent>
      </Card>
    </>
  );
}

/** v1.3b — Slider + NumberInput + FileField */
function FormAtomsSection() {
  const [opacity, setOpacity] = useState(42);
  const [qty, setQty] = useState<number | null>(3);
  const [files, setFiles] = useState<File[]>([]);
  const [filesDashed, setFilesDashed] = useState<File[]>([]);

  return (
    <>
      <Card surface="glass" as="section">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.3b
          </Badge>
          <CardTitle>Slider</CardTitle>
          <CardDescription>
            <code>look</code>: soft · solid · glass · accent (+ size / error).
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1.25rem" }}>
          <Slider
            label="soft (default)"
            value={opacity}
            onValueChange={setOpacity}
            min={0}
            max={100}
            look="soft"
          />
          <Slider label="solid" defaultValue={55} look="solid" />
          <Slider label="glass" defaultValue={40} look="glass" size="lg" />
          <Slider label="accent" defaultValue={72} look="accent" />
          <Slider
            label="error state"
            defaultValue={10}
            min={0}
            max={50}
            look="soft"
            error="Must be at least 15 for this demo."
          />
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.3b
          </Badge>
          <CardTitle>NumberInput</CardTitle>
          <CardDescription>
            <code>look</code>: soft · solid · outline · ghost.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1.25rem", maxWidth: 440 }}>
          <NumberInput
            label="soft (default)"
            value={qty}
            onValueChange={setQty}
            min={0}
            max={12}
            look="soft"
            hint="Frost shell + accent circles."
          />
          <NumberInput
            label="solid"
            defaultValue={4}
            min={0}
            max={20}
            look="solid"
          />
          <NumberInput
            label="outline"
            defaultValue={2}
            min={0}
            max={9}
            look="outline"
          />
          <NumberInput
            label="ghost"
            defaultValue={1}
            min={0}
            max={9}
            look="ghost"
          />
          <NumberInput
            label="No steppers"
            defaultValue={8}
            hideSteppers
            hint="Plain solid field (look ignored on plain)."
          />
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.3b
          </Badge>
          <CardTitle>FileField</CardTitle>
          <CardDescription>
            <code>look</code>: solid · soft · dashed · ghost — still no upload.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1.5rem", maxWidth: 520 }}>
          <FileField
            label="solid (default)"
            files={files}
            onFilesChange={setFiles}
            multiple
            look="solid"
            accept="image/*,.pdf,.txt"
            buttonLabel="Browse"
            hint="Row trigger + list."
          />
          <FileField
            label="soft"
            look="soft"
            accept="image/*"
            buttonLabel="Pick image"
            emptyLabel="Frost surface"
          />
          <FileField
            label="dashed"
            files={filesDashed}
            onFilesChange={setFilesDashed}
            multiple
            look="dashed"
            buttonLabel="Drop or browse"
            emptyLabel="Click to choose files (visual dropzone chrome only)"
          />
          <FileField
            label="ghost"
            look="ghost"
            buttonLabel="Attach file"
            emptyLabel="Link-style picker"
          />
        </CardContent>
      </Card>
    </>
  );
}

function ButtonPropsSection() {
  const [loading, setLoading] = useState(false);

  return (
    <Card surface="glass" as="section">
      <CardHeader>
        <CardTitle>Button — prop playground</CardTitle>
        <CardDescription>
          People love props. Try variant, size, rounded, loading, fullWidth, icons.
        </CardDescription>
      </CardHeader>
      <CardContent style={{ display: "grid", gap: "1rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
          <Button variant="primary">primary</Button>
          <Button variant="secondary">secondary</Button>
          <Button variant="ghost">ghost</Button>
          <Button variant="outline">outline</Button>
          <Button variant="danger">danger</Button>
          <Button variant="link">link</Button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
          <Button look="solid">look solid</Button>
          <Button look="soft">look soft</Button>
          <Button look="glass">look glass</Button>
          <Button look="gradient">look gradient</Button>
          <Button look="neon">look neon</Button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem", alignItems: "center" }}>
          <Button size="sm">sm</Button>
          <Button size="md">md</Button>
          <Button size="lg">lg</Button>
          <Button rounded="soft" variant="secondary">
            rounded soft
          </Button>
          <Button rounded="md" variant="outline">
            rounded md
          </Button>
          <Button iconOnly variant="ghost" aria-label="star">
            ★
          </Button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
          <Button leftIcon={<span>↑</span>}>leftIcon</Button>
          <Button rightIcon={<span>→</span>}>rightIcon</Button>
          <Button
            loading={loading}
            onClick={() => {
              setLoading(true);
              window.setTimeout(() => setLoading(false), 1500);
            }}
          >
            {loading ? "Saving…" : "Click for loading"}
          </Button>
          <Button disabled>disabled</Button>
        </div>
        <Button fullWidth variant="primary">
          fullWidth primary
        </Button>
        <Input
          label="Works next to buttons"
          placeholder="Solid field"
          requiredMark
          leftAddon="@"
          hint="Forms stay solid; chrome stays frost."
        />
      </CardContent>
    </Card>
  );
}

/** v1.4a — disclosure + nav molecules (Collapsible, Accordion, Breadcrumb, Pagination). */
const DISCLOSURE_FAQ = [
  {
    value: "what",
    trigger: "What is Softglass?",
    content:
      "A soft-glass UI kit: tokens + React atoms/molecules for Next.js.",
  },
  {
    value: "free",
    trigger: "Is it free?",
    content: "Yes — MIT. Publish only from personal npm ardaddemir.",
  },
  {
    value: "portal",
    trigger: "Does Accordion use a portal?",
    content: "No — disclosure stays in flow. Overlays (Sheet, Popover) do.",
    disabled: true,
  },
] as const;

const CRUMB_PATH = [
  { label: "Home", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Accordion" },
];

const LOOK_CHIP: CSSProperties = {
  fontSize: "var(--sg-text-xs)",
  color: "var(--sg-fg-muted)",
};

/** v1.4d — DatePicker portal + MultiSelect filter + Combobox async. */
function FormPolishSection() {
  const [date, setDate] = useState("");
  const [tags, setTags] = useState<string[]>(["react"]);
  const [city, setCity] = useState("");
  const [asyncOpts, setAsyncOpts] = useState<
    { value: string; label: string }[]
  >([]);
  const [asyncLoading, setAsyncLoading] = useState(false);

  const manyOptions = Array.from({ length: 28 }, (_, i) => ({
    value: `t${i}`,
    label:
      i === 0
        ? "react"
        : i === 1
          ? "typescript"
          : i === 2
            ? "design-system"
            : `tag-${i + 1}`,
  }));

  return (
    <>
      <Card surface="solid" as="section" id="section-datepicker-portal">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.4d
          </Badge>
          <CardTitle>DatePicker · body portal</CardTitle>
          <CardDescription>
            Panel mounts on <code>document.body</code> with flip/clamp. Scroll
            the box — calendar stays positioned.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            style={{
              maxHeight: 180,
              overflow: "auto",
              padding: "1rem",
              borderRadius: "var(--sg-radius-md)",
              border: "1px solid var(--sg-border-subtle)",
              background: "var(--sg-surface-frost)",
            }}
          >
            <p style={{ marginTop: 0, color: "var(--sg-fg-muted)", fontSize: "var(--sg-text-sm)" }}>
              Scrollable container (portal proof)
            </p>
            <div style={{ height: 120 }} />
            <DatePicker
              label="Due date"
              value={date}
              onValueChange={setDate}
              placement="auto"
            />
            <div style={{ height: 200 }} />
          </div>
        </CardContent>
      </Card>

      <Card surface="solid" as="section" id="section-multiselect-filter">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.4d
          </Badge>
          <CardTitle>MultiSelect · filter-in-menu</CardTitle>
          <CardDescription>20+ options — type in the menu to narrow.</CardDescription>
        </CardHeader>
        <CardContent>
          <MultiSelect
            label="Tags"
            options={manyOptions}
            value={tags}
            onValueChange={setTags}
            filterable
            filterPlaceholder="Filter tags…"
          />
        </CardContent>
      </Card>

      <Card surface="solid" as="section" id="section-combobox-async">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.4d
          </Badge>
          <CardTitle>Combobox · async skeleton</CardTitle>
          <CardDescription>
            <code>onSearch</code> + <code>loading</code> — fake delay demo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Combobox
            label="City (async)"
            options={asyncOpts}
            value={city}
            onValueChange={setCity}
            loading={asyncLoading}
            loadingMessage="Searching…"
            searchDebounceMs={250}
            emptyMessage="Type to search…"
            onSearch={(q) => {
              const query = q.trim();
              if (!query) {
                setAsyncOpts([]);
                setAsyncLoading(false);
                return;
              }
              setAsyncLoading(true);
              window.setTimeout(() => {
                setAsyncOpts([
                  { value: `${query}-1`, label: `${query} City` },
                  { value: `${query}-2`, label: `${query} Harbor` },
                  { value: `${query}-3`, label: `${query} Hills` },
                ]);
                setAsyncLoading(false);
              }, 400);
            }}
          />
        </CardContent>
      </Card>
    </>
  );
}

/** v1.5a — AppShell depth + PageHeader */
function ShellSection() {
  const [headerLook, setHeaderLook] = useState<
    "plain" | "soft" | "solid" | "glass"
  >("soft");
  const [demoCollapsed, setDemoCollapsed] = useState(false);
  const [demoMobile, setDemoMobile] = useState(false);

  const lookHint: Record<typeof headerLook, string> = {
    plain: "Flush — no pad, no border, no fill",
    soft: "Frost tray + inset gloss",
    solid: "Opaque panel + drop shadow",
    glass: "Translucent blur + accent rim (see stage)",
  };

  return (
    <>
      <Card surface="solid" as="section" id="section-appshell-15a">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.5a
          </Badge>
          <CardTitle>AppShell · collapse + mobile drawer</CardTitle>
          <CardDescription>
            Mini frame below is a <strong>second</strong> AppShell — toggle
            collapse and watch the rail + main width change. Outer playground
            shell also supports « collapse and mobile hamburger.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "0.75rem" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <Button
              size="sm"
              variant={demoCollapsed ? "primary" : "secondary"}
              onClick={() => setDemoCollapsed((v) => !v)}
            >
              {demoCollapsed ? "Expand rail" : "Collapse rail"}
            </Button>
            <Button
              size="sm"
              variant={demoMobile ? "primary" : "secondary"}
              onClick={() => setDemoMobile((v) => !v)}
            >
              {demoMobile ? "Close mobile nav" : "Open mobile nav"}
            </Button>
            <Badge variant={demoCollapsed ? "accent" : "default"} size="sm">
              collapsed: {demoCollapsed ? "true" : "false"}
            </Badge>
            <Badge variant={demoMobile ? "accent" : "default"} size="sm">
              mobileOpen: {demoMobile ? "true" : "false"}
            </Badge>
          </div>

          <AppShell
            className="sg-shell-demo"
            collapsed={demoCollapsed}
            onCollapsedChange={setDemoCollapsed}
            mobileNavOpen={demoMobile}
            onMobileNavOpenChange={setDemoMobile}
            mobileNavTitle="Demo menu"
            header={
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <AppShellMenuButton />
                  <strong style={{ fontSize: "var(--sg-text-sm)" }}>
                    Mini app
                  </strong>
                </div>
                <Badge size="sm" variant="default">
                  main grows when rail collapses
                </Badge>
              </>
            }
            sidebar={
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <AppShellCollapseButton />
                </div>
                <ShellNav aria-label="Demo nav">
                  <ShellNavItem href="#d-home" active icon="⌂">
                    Home
                  </ShellNavItem>
                  <ShellNavItem href="#d-projects" icon="◆">
                    Projects
                  </ShellNavItem>
                  <ShellNavItem href="#d-settings" icon="◎">
                    Settings
                  </ShellNavItem>
                </ShellNav>
              </>
            }
          >
            <div
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "var(--sg-radius-md)",
                border: "1px dashed var(--sg-border-frost)",
                background: "var(--sg-accent-soft)",
                fontSize: "var(--sg-text-sm)",
              }}
            >
              Content pane. Collapse → sidebar becomes icon rail, this area
              widens.
            </div>
          </AppShell>
        </CardContent>
      </Card>

      <Card surface="solid" as="section" id="section-pageheader">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.5a
          </Badge>
          <CardTitle>PageHeader · looks</CardTitle>
          <CardDescription>
            Switch looks — each recipe is a different chrome (flush / frost /
            solid lift / glass blur). Stage behind helps glass read.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {(["plain", "soft", "solid", "glass"] as const).map((look) => (
              <Button
                key={look}
                size="sm"
                variant={headerLook === look ? "primary" : "secondary"}
                onClick={() => setHeaderLook(look)}
              >
                {look}
              </Button>
            ))}
            <Badge variant="accent" size="sm">
              look: {headerLook}
            </Badge>
          </div>
          <Text tone="muted" size="sm">
            {lookHint[headerLook]}
          </Text>

          {/* Colorful stage so glass/soft contrast is obvious */}
          <div
            style={{
              position: "relative",
              padding: "1.25rem",
              borderRadius: "var(--sg-radius-lg)",
              border: "1px solid var(--sg-border-frost)",
              overflow: "hidden",
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--sg-accent) 28%, transparent), color-mix(in srgb, var(--sg-ring) 22%, transparent) 45%, color-mix(in srgb, var(--sg-success) 18%, transparent))",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: "auto -20% -30% auto",
                width: 180,
                height: 180,
                borderRadius: "50%",
                background: "color-mix(in srgb, var(--sg-accent) 40%, transparent)",
                filter: "blur(2px)",
                pointerEvents: "none",
              }}
            />
            <PageHeader
              look={headerLook}
              title="Projects"
              description="Manage workspaces and invites for your team."
              breadcrumbs={[
                { label: "Home", href: "#" },
                { label: "Workspace", href: "#" },
                { label: "Projects" },
              ]}
              actions={
                <>
                  <Button size="sm" variant="secondary">
                    Export
                  </Button>
                  <Button size="sm" variant="primary">
                    New project
                  </Button>
                </>
              }
              style={{ marginBottom: 0, position: "relative" }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "0.5rem",
            }}
          >
            {(["plain", "soft", "solid", "glass"] as const).map((look) => (
              <button
                key={look}
                type="button"
                onClick={() => setHeaderLook(look)}
                style={{
                  textAlign: "left",
                  cursor: "pointer",
                  padding: 0,
                  border:
                    headerLook === look
                      ? "2px solid var(--sg-accent)"
                      : "1px solid var(--sg-border-frost)",
                  borderRadius: "var(--sg-radius-md)",
                  background: "transparent",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "0.5rem",
                    background:
                      "linear-gradient(135deg, color-mix(in srgb, var(--sg-accent) 18%, transparent), color-mix(in srgb, var(--sg-ring) 14%, transparent))",
                    minHeight: 72,
                  }}
                >
                  <PageHeader
                    size="sm"
                    look={look}
                    title={look}
                    style={{ marginBottom: 0 }}
                  />
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

/** v1.5b — SettingsSection + CommandPalette + recipes */
function PatternsSection() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [lastCmd, setLastCmd] = useState<string>("—");
  const [emailNotif, setEmailNotif] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [displayName, setDisplayName] = useState("Arda");
  const [authEmail, setAuthEmail] = useState("");
  const [sectionLook, setSectionLook] = useState<
    "soft" | "solid" | "glass" | "plain"
  >("soft");

  const commands = [
    {
      id: "nav-home",
      label: "Go to Home",
      description: "Dashboard overview",
      group: "Navigation",
      icon: "⌂",
      keywords: "dashboard",
    },
    {
      id: "nav-settings",
      label: "Open Settings",
      description: "Profile & preferences",
      group: "Navigation",
      icon: "◎",
      keywords: "prefs profile",
    },
    {
      id: "theme-toggle",
      label: "Toggle theme",
      description: "Cycle Aurora / Obsidian",
      group: "Appearance",
      icon: "◐",
    },
    {
      id: "new-project",
      label: "New project",
      description: "Create a workspace",
      group: "Actions",
      icon: "+",
      keywords: "create",
    },
    {
      id: "copy-id",
      label: "Copy workspace ID",
      group: "Actions",
      icon: "⎘",
      keywords: "clipboard",
    },
  ];

  return (
    <>
      <Card surface="solid" as="section" id="section-command-palette">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.5b
          </Badge>
          <CardTitle>CommandPalette · minimal</CardTitle>
          <CardDescription>
            Search + list + ↑↓ Enter. No fuzzy ranking library — substring
            filter only.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "0.75rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
            <Button variant="primary" onClick={() => setCmdOpen(true)}>
              Open command palette
            </Button>
            <Kbd>⌘</Kbd>
            <span style={{ color: "var(--sg-fg-muted)", fontSize: "var(--sg-text-sm)" }}>
              + K (wire yourself)
            </span>
            <Badge variant="default" size="sm">
              last: {lastCmd}
            </Badge>
          </div>
          <CommandPalette
            open={cmdOpen}
            onOpenChange={setCmdOpen}
            items={commands}
            onSelect={(item) => setLastCmd(item.label)}
          />
        </CardContent>
      </Card>

      <Card surface="solid" as="section" id="section-settings">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.5b
          </Badge>
          <CardTitle>SettingsSection</CardTitle>
          <CardDescription>
            Title + description + actions + form body. Look strip for chrome.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {(["soft", "solid", "glass", "plain"] as const).map((look) => (
              <Button
                key={look}
                size="sm"
                variant={sectionLook === look ? "primary" : "secondary"}
                onClick={() => setSectionLook(look)}
              >
                {look}
              </Button>
            ))}
          </div>

          <div
            style={{
              padding: sectionLook === "glass" || sectionLook === "plain" ? "1rem" : 0,
              borderRadius: "var(--sg-radius-lg)",
              background:
                sectionLook === "glass" || sectionLook === "plain"
                  ? "linear-gradient(135deg, color-mix(in srgb, var(--sg-accent) 22%, transparent), color-mix(in srgb, var(--sg-ring) 16%, transparent))"
                  : "transparent",
            }}
          >
            <SettingsSection
              look={sectionLook}
              title="Profile"
              description="How your name appears across Softglass workspaces."
              actions={
                <Button size="sm" variant="primary">
                  Save
                </Button>
              }
            >
              <Input
                label="Display name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <Input label="Handle" defaultValue="@arda" hint="Public username" />
            </SettingsSection>
          </div>

          <SettingsSection
            look="solid"
            title="Notifications"
            description="Email and product updates."
            density="compact"
          >
            <Switch
              label="Email digests"
              checked={emailNotif}
              onCheckedChange={setEmailNotif}
            />
            <Switch
              label="Marketing"
              checked={marketing}
              onCheckedChange={setMarketing}
              hint="Occasional tips — optional."
            />
          </SettingsSection>
        </CardContent>
      </Card>

      <Card surface="glass" as="section" id="section-auth-recipe">
        <CardHeader>
          <Badge variant="accent" size="sm">
            recipe
          </Badge>
          <CardTitle>Auth recipe (compose only)</CardTitle>
          <CardDescription>
            Not a new component — PageHeader + Card + fields. Copy the pattern.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1rem", maxWidth: 420 }}>
          <PageHeader
            size="sm"
            look="plain"
            title="Sign in"
            description="Welcome back to Softglass."
            style={{ marginBottom: 0 }}
          />
          <Card surface="solid">
            <CardContent style={{ display: "grid", gap: "0.85rem", paddingTop: "1.1rem" }}>
              <Input
                label="Email"
                type="email"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="you@studio.dev"
              />
              <PasswordInput label="Password" autoComplete="current-password" />
              <Button variant="primary" fullWidth>
                Continue
              </Button>
              <Text tone="muted" size="sm" style={{ textAlign: "center" }}>
                No account? <Link href="#">Create one</Link>
              </Text>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </>
  );
}

/** v1.5c — Date range + quality notes */
function QualitySection() {
  const [range, setRange] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  const [single, setSingle] = useState("2026-07-15");

  return (
    <>
      <Card surface="solid" as="section" id="section-date-range">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.5c
          </Badge>
          <CardTitle>DatePicker · range</CardTitle>
          <CardDescription>
            Click start, then end. If end is before start, values swap. Span
            highlights on the grid; single mode unchanged.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1rem", maxWidth: 360 }}>
          <DatePicker
            mode="range"
            label="Trip dates"
            rangeValue={range}
            onRangeValueChange={setRange}
            hint={
              range.start && range.end
                ? `ISO ${range.start} → ${range.end}`
                : "Pick two days"
            }
          />
          <DatePicker
            label="Single (control)"
            value={single}
            onValueChange={setSingle}
            hint="mode=single default — still works"
          />
          <Alert variant="info" title="Not in 1.5c">
            Time range, multi-month dual calendar, locale packs, and typing into
            the field stay deferred.
          </Alert>
        </CardContent>
      </Card>

      <Card surface="glass" as="section" id="section-quality-notes">
        <CardHeader>
          <Badge variant="accent" size="sm">
            quality
          </Badge>
          <CardTitle>1.5 checklist</CardTitle>
          <CardDescription>
            Shell · patterns · date range shipped on branch. Publish = separate
            1.5.0 checklist.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "0.5rem" }}>
          <Text size="sm">✓ AppShell collapse + mobile Sheet</Text>
          <Text size="sm">✓ PageHeader looks</Text>
          <Text size="sm">✓ SettingsSection + CommandPalette</Text>
          <Text size="sm">✓ DatePicker range mode</Text>
          <Text size="sm" tone="muted">
            Next session: version bump · CHANGELOG final · npm publish · tag
          </Text>
        </CardContent>
      </Card>
    </>
  );
}

/** v1.4c — Stepper + Toolbar + List + Stat (look switchers, structural recipes). */
function StructureSection() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState("alpha");
  const [query, setQuery] = useState("");
  const [stepLook, setStepLook] = useState<
    "soft" | "solid" | "outline" | "dots" | "pills"
  >("dots");
  const [toolLook, setToolLook] = useState<
    "soft" | "solid" | "glass" | "ghost" | "accent"
  >("soft");
  const [listLook, setListLook] = useState<
    "soft" | "solid" | "outline" | "ghost" | "inset"
  >("soft");
  const [statLook, setStatLook] = useState<
    "solid" | "soft" | "glass" | "outline" | "accent"
  >("accent");

  const steps = [
    { label: "Details", description: "Name & plan" },
    { label: "Team", description: "Invite" },
    { label: "Review", description: "Confirm" },
  ];

  const lookBtn = (
    looks: readonly string[],
    current: string,
    set: (v: string) => void,
  ) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
      {looks.map((look) => (
        <Button
          key={look}
          size="sm"
          variant={current === look ? "primary" : "secondary"}
          onClick={() => set(look)}
        >
          {look}
        </Button>
      ))}
    </div>
  );

  return (
    <>
      <Card surface="solid" as="section" id="section-stepper">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.4c
          </Badge>
          <CardTitle>Stepper</CardTitle>
          <CardDescription>
            Looks are recipes: soft rail · solid card · outline · dots progress ·
            pills chips
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1rem" }}>
          {lookBtn(
            ["soft", "solid", "outline", "dots", "pills"],
            stepLook,
            (v) => setStepLook(v as typeof stepLook),
          )}
          <div style={LOOK_CHIP}>look = {stepLook}</div>
          <Stepper
            key={stepLook}
            steps={steps}
            activeStep={step}
            onActiveStepChange={setStep}
            interactive
            look={stepLook}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <Button
              size="sm"
              variant="secondary"
              disabled={step <= 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              Back
            </Button>
            <Button
              size="sm"
              disabled={step >= steps.length - 1}
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            >
              Next
            </Button>
            <span style={{ fontSize: "var(--sg-text-sm)", color: "var(--sg-fg-muted)" }}>
              {step + 1}/{steps.length} · {steps[step]?.label}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card surface="solid" as="section" id="section-toolbar">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.4c
          </Badge>
          <CardTitle>Toolbar</CardTitle>
          <CardDescription>
            soft · solid · glass · ghost · accent (left rail)
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "0.85rem" }}>
          {lookBtn(
            ["soft", "solid", "glass", "ghost", "accent"],
            toolLook,
            (v) => setToolLook(v as typeof toolLook),
          )}
          <Toolbar look={toolLook}>
            <ToolbarGroup inset={toolLook === "soft" || toolLook === "glass"}>
              <SearchInput
                value={query}
                onValueChange={setQuery}
                placeholder="Search projects…"
                aria-label="Search projects"
              />
            </ToolbarGroup>
            <ToolbarSpacer />
            <ToolbarGroup>
              <Badge variant="accent" size="sm">
                3
              </Badge>
              <ToolbarSeparator />
              <Button size="sm" variant="secondary">
                Export
              </Button>
              <Button size="sm">New</Button>
            </ToolbarGroup>
          </Toolbar>
        </CardContent>
      </Card>

      <Card surface="solid" as="section" id="section-list">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.4c
          </Badge>
          <CardTitle>List</CardTitle>
          <CardDescription>
            Host looks: soft · solid · outline · ghost · inset — ListItem atom.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "0.85rem" }}>
          {lookBtn(
            ["soft", "solid", "outline", "ghost", "inset"],
            listLook,
            (v) => setListLook(v as typeof listLook),
          )}
          <List look={listLook} dividers={listLook !== "ghost"}>
            {(
              [
                ["alpha", "Alpha", "Primary workspace"],
                ["beta", "Beta", "Staging"],
                ["gamma", "Gamma", "Archive"],
              ] as const
            ).map(([id, title, description]) => (
              <ListItem
                key={id}
                title={title}
                description={description}
                selected={selected === id}
                onClick={() => setSelected(id)}
                trailing={
                  selected === id ? <Badge size="sm">active</Badge> : null
                }
              />
            ))}
          </List>
        </CardContent>
      </Card>

      <Card surface="solid" as="section" id="section-stat">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.4c
          </Badge>
          <CardTitle>Stat</CardTitle>
          <CardDescription>
            solid · soft · glass · outline · accent rail — switch applies to all
            tiles
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "0.85rem" }}>
          {lookBtn(
            ["solid", "soft", "glass", "outline", "accent"],
            statLook,
            (v) => setStatLook(v as typeof statLook),
          )}
          <div
            style={{
              display: "grid",
              gap: "0.75rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(11rem, 1fr))",
            }}
          >
            <Stat
              look={statLook}
              icon={<span>◎</span>}
              label="Revenue"
              value="$12.4k"
              hint="Last 30 days"
              trend="up"
              trendLabel="+8%"
            />
            <Stat
              look={statLook}
              icon={<span>◉</span>}
              label="Active users"
              value="1,284"
              hint="Weekly active"
              trend="flat"
              trendLabel="0%"
            />
            <Stat
              look={statLook}
              icon={<span>◌</span>}
              label="Churn"
              value="2.1%"
              hint="Month over month"
              trend="down"
              trendLabel="-0.4%"
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

/** v1.4b — EmptyState + Sheet + HoverCard (single live instances). */
function SurfaceSection() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetSide, setSheetSide] = useState<"left" | "right" | "bottom">(
    "right",
  );
  const [emptyLook, setEmptyLook] = useState<"solid" | "soft" | "outline">(
    "solid",
  );

  return (
    <>
      <Card surface="solid" as="section" id="section-empty-state">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.4b
          </Badge>
          <CardTitle>EmptyState</CardTitle>
          <CardDescription>
            solid · soft · outline — zero-data CTA surface.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "0.85rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {(["solid", "soft", "outline"] as const).map((look) => (
              <Button
                key={look}
                size="sm"
                variant={emptyLook === look ? "primary" : "secondary"}
                onClick={() => setEmptyLook(look)}
              >
                {look}
              </Button>
            ))}
          </div>
          <EmptyState
            look={emptyLook}
            icon={<span aria-hidden>📁</span>}
            title="Henüz proje yok"
            description="İlk projeni oluştur; Softglass solid surface uzun metin için."
            actions={
              <>
                <Button size="sm">Create project</Button>
                <Button size="sm" variant="ghost">
                  Import
                </Button>
              </>
            }
          />
        </CardContent>
      </Card>

      <Card surface="solid" as="section" id="section-sheet">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.4b
          </Badge>
          <CardTitle>Sheet</CardTitle>
          <CardDescription>
            Edge panel — left · right · bottom. Escape / backdrop closes.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "0.85rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {(["right", "left", "bottom"] as const).map((side) => (
              <Button
                key={side}
                size="sm"
                variant={sheetSide === side ? "primary" : "secondary"}
                onClick={() => setSheetSide(side)}
              >
                {side}
              </Button>
            ))}
          </div>
          <Button onClick={() => setSheetOpen(true)}>Open settings sheet</Button>
          <Sheet
            open={sheetOpen}
            onOpenChange={setSheetOpen}
            side={sheetSide}
            title="Settings"
            description="Account preferences (demo)"
            footer={
              <>
                <Button variant="ghost" onClick={() => setSheetOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setSheetOpen(false)}>Save</Button>
              </>
            }
          >
            <div style={{ display: "grid", gap: "0.75rem" }}>
              <Input label="Display name" defaultValue="Ada" />
              <Input label="Email" defaultValue="ada@example.com" />
              <p style={{ margin: 0, color: "var(--sg-fg-muted)", fontSize: "var(--sg-text-sm)" }}>
                Sheet = Modal kardeşi: portal, presence, focus trap, body scroll
                lock. Drawer adı docs alias.
              </p>
            </div>
          </Sheet>
        </CardContent>
      </Card>

      <Card surface="solid" as="section" id="section-hover-card">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.4b
          </Badge>
          <CardTitle>HoverCard</CardTitle>
          <CardDescription>
            Delayed preview on link / avatar. openDelay 280 · closeDelay 160.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", alignItems: "center" }}>
          <HoverCard
            trigger={
              <Link href="#ada" look="accent">
                @ada
              </Link>
            }
            aria-label="Ada preview"
          >
            <div style={{ display: "grid", gap: "0.35rem" }}>
              <div style={{ display: "flex", gap: "0.65rem", alignItems: "center" }}>
                <Avatar fallback="AL" size="sm" />
                <strong>Ada Lovelace</strong>
              </div>
              <p style={{ margin: 0, color: "var(--sg-fg-muted)" }}>
                Mathematician · first programmer
              </p>
            </div>
          </HoverCard>

          <HoverCard
            trigger={<Avatar fallback="SG" size="md" />}
            openDelay={200}
            closeDelay={120}
            aria-label="Softglass preview"
          >
            <div style={{ display: "grid", gap: "0.25rem" }}>
              <strong>Softglass</strong>
              <span style={{ color: "var(--sg-fg-muted)" }}>v1.4 surface molecules</span>
            </div>
          </HoverCard>
        </CardContent>
      </Card>
    </>
  );
}

/** One live instance per molecule — look switcher, no N× glass stack. */
function DisclosureNavSection() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [page, setPage] = useState(2);
  const [accLook, setAccLook] = useState<
    "soft" | "solid" | "glass" | "outline" | "ghost"
  >("soft");
  const [colLook, setColLook] = useState<
    "soft" | "solid" | "glass" | "outline" | "ghost"
  >("soft");
  const [crumbLook, setCrumbLook] = useState<"plain" | "soft" | "pill">("soft");
  const [pagLook, setPagLook] = useState<"soft" | "solid" | "ghost" | "glass">(
    "soft",
  );

  return (
    <>
      <Card surface="solid" as="section" id="section-accordion">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.4a
          </Badge>
          <CardTitle>Accordion</CardTitle>
          <CardDescription>
            Tek instance + look switcher (5× kopya yok). Edge: disabled item.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "0.85rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {(["soft", "solid", "glass", "outline", "ghost"] as const).map(
              (look) => (
                <Button
                  key={look}
                  size="sm"
                  variant={accLook === look ? "primary" : "secondary"}
                  onClick={() => setAccLook(look)}
                >
                  {look}
                </Button>
              ),
            )}
          </div>
          <div style={LOOK_CHIP}>look = {accLook}</div>
          <Accordion
            key={accLook}
            type="single"
            defaultValue="what"
            look={accLook}
            items={[...DISCLOSURE_FAQ]}
          />
        </CardContent>
      </Card>

      <Card surface="solid" as="section" id="section-collapsible">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.4a
          </Badge>
          <CardTitle>Collapsible</CardTitle>
          <CardDescription>
            Controlled panel + one edge (disabled). Look switcher.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "0.85rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {(["soft", "solid", "glass", "outline", "ghost"] as const).map(
              (look) => (
                <Button
                  key={look}
                  size="sm"
                  variant={colLook === look ? "primary" : "secondary"}
                  onClick={() => setColLook(look)}
                >
                  {look}
                </Button>
              ),
            )}
          </div>
          <Collapsible
            key={colLook}
            trigger="Gizlilik notu"
            open={privacyOpen}
            onOpenChange={setPrivacyOpen}
            look={colLook}
          >
            Glass chrome is for chrome, not long body copy. Prefer solid for
            dense text.
          </Collapsible>
          <Collapsible trigger="Disabled edge" disabled look={colLook}>
            Hidden when disabled.
          </Collapsible>
        </CardContent>
      </Card>

      <Card surface="solid" as="section" id="section-breadcrumb">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.4a
          </Badge>
          <CardTitle>Breadcrumb</CardTitle>
          <CardDescription>
            plain · soft · pill — single path, switch look.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "0.85rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {(["plain", "soft", "pill"] as const).map((look) => (
              <Button
                key={look}
                size="sm"
                variant={crumbLook === look ? "primary" : "secondary"}
                onClick={() => setCrumbLook(look)}
              >
                {look}
              </Button>
            ))}
          </div>
          <Breadcrumb
            look={crumbLook}
            separator={crumbLook === "plain" ? "/" : "›"}
            items={CRUMB_PATH}
          />
        </CardContent>
      </Card>

      <Card surface="solid" as="section" id="section-pagination">
        <CardHeader>
          <Badge variant="accent" size="sm">
            v1.4a
          </Badge>
          <CardTitle>Pagination</CardTitle>
          <CardDescription>
            soft · solid · ghost · glass — one list + compact edge.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "0.85rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {(["soft", "solid", "ghost", "glass"] as const).map((look) => (
              <Button
                key={look}
                size="sm"
                variant={pagLook === look ? "primary" : "secondary"}
                onClick={() => setPagLook(look)}
              >
                {look}
              </Button>
            ))}
          </div>
          <div style={LOOK_CHIP}>
            page {page} / 10 · look = {pagLook}
          </div>
          <Pagination
            page={page}
            pageCount={10}
            onPageChange={setPage}
            look={pagLook}
          />
          <Pagination
            page={page}
            pageCount={5}
            onPageChange={setPage}
            compact
            look={pagLook}
            size="sm"
          />
        </CardContent>
      </Card>
    </>
  );
}

function DocsSection({
  docId,
  setDocId,
  activeDoc,
}: {
  docId: string;
  setDocId: (id: string) => void;
  activeDoc: (typeof COMPONENT_DOCS)[number];
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "minmax(140px, 200px) 1fr",
      }}
      className="docs-layout"
    >
      <Card surface="glass" padding="sm" as="nav" aria-label="Components">
        <div style={{ display: "grid", gap: "0.25rem" }}>
          {COMPONENT_DOCS.map((doc) => (
            <Button
              key={doc.id}
              size="sm"
              variant={docId === doc.id ? "primary" : "ghost"}
              fullWidth
              onClick={() => setDocId(doc.id)}
              style={{ justifyContent: "flex-start" }}
            >
              {doc.name}
            </Button>
          ))}
        </div>
      </Card>

      <Card surface="solid" as="section">
        <CardHeader>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <Badge size="sm">{activeDoc.layer}</Badge>
            <Badge variant="accent" size="sm">
              {activeDoc.id}
            </Badge>
          </div>
          <CardTitle style={{ marginTop: "0.5rem" }}>{activeDoc.name}</CardTitle>
          <CardDescription>{activeDoc.summary}</CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1rem" }}>
          <pre
            style={{
              margin: 0,
              padding: "0.85rem 1rem",
              borderRadius: "var(--sg-radius-sm)",
              background: "var(--sg-accent-soft)",
              overflow: "auto",
              fontSize: "var(--sg-text-sm)",
            }}
          >
            {activeDoc.importLine}
          </pre>
          <pre
            style={{
              margin: 0,
              padding: "0.85rem 1rem",
              borderRadius: "var(--sg-radius-sm)",
              background: "var(--sg-accent-soft)",
              overflow: "auto",
              fontSize: "var(--sg-text-sm)",
              lineHeight: 1.55,
            }}
          >
            {activeDoc.example}
          </pre>

          <div style={{ overflow: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "var(--sg-text-sm)",
              }}
            >
              <thead>
                <tr>
                  {["Prop", "Type", "Default", "Description"].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "0.5rem 0.6rem",
                        borderBottom: "1px solid var(--sg-border-subtle)",
                        color: "var(--sg-fg-muted)",
                        fontWeight: 600,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeDoc.props.map((prop) => (
                  <tr key={prop.name}>
                    <td
                      style={{
                        padding: "0.55rem 0.6rem",
                        borderBottom: "1px solid var(--sg-border-subtle)",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {prop.name}
                    </td>
                    <td
                      style={{
                        padding: "0.55rem 0.6rem",
                        borderBottom: "1px solid var(--sg-border-subtle)",
                        color: "var(--sg-fg-muted)",
                        fontFamily: "ui-monospace, monospace",
                        fontSize: "0.75rem",
                      }}
                    >
                      {prop.type}
                    </td>
                    <td
                      style={{
                        padding: "0.55rem 0.6rem",
                        borderBottom: "1px solid var(--sg-border-subtle)",
                        color: "var(--sg-fg-subtle)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {prop.default ?? "—"}
                    </td>
                    <td
                      style={{
                        padding: "0.55rem 0.6rem",
                        borderBottom: "1px solid var(--sg-border-subtle)",
                      }}
                    >
                      {prop.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
