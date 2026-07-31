"use client";

import { OverlayDemo } from "@/components/overlay-demo";
import { ComponentStudio } from "@/components/playground/library/ComponentStudio";
import {
  getPlayground,
  hasPlayground,
} from "@/components/playground/library/manifest";
import { COMPONENT_DOCS } from "@/lib/docs";
import {
  applySoftglassTheme,
  readStoredSoftglassTheme,
  SOFTGLASS_THEMES,
  THEME_CHANGE_EVENT,
  type SoftglassThemeId,
} from "@/lib/themes";
import type { GalleryPageId } from "@/components/playground/catalog";
import {
  Accordion,
  Alert,
  AppShell,
  AppShellCollapseButton,
  AppShellMenuButton,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Combobox,
  CommandPalette,
  DatePicker,
  EmptyState,
  Input,
  List,
  ListItem,
  MultiSelect,
  PageHeader,
  Pagination,
  PasswordInput,
  SearchInput,
  Select,
  SettingsSection,
  ShellNav,
  ShellNavItem,
  Stat,
  Stepper,
  Switch,
  Text,
} from "@softglass/ui";
import { useEffect, useMemo, useState } from "react";

export function GalleryPageBody({
  pageId,
  onGo,
  studioId = null,
  onStudioId,
}: {
  pageId: GalleryPageId;
  onGo: (id: GalleryPageId) => void;
  studioId?: string | null;
  onStudioId?: (id: string | null) => void;
}) {
  switch (pageId) {
    case "welcome":
      return <WelcomePage onGo={onGo} />;
    case "install":
      return <InstallPage />;
    case "languages":
      return <LanguagesPage />;
    case "looks":
      return <LooksPage />;
    case "essentials":
      return <EssentialsPage />;
    case "forms":
      return <FormsPage />;
    case "compose":
      return <ComposePage />;
    case "app":
      return <AppPage />;
    case "library":
      return (
        <LibraryPage studioId={studioId} onStudioId={onStudioId ?? (() => {})} />
      );
    default:
      return null;
  }
}

function WelcomePage({ onGo }: { onGo: (id: GalleryPageId) => void }) {
  return (
    <div className="sg-gallery-stack">
      <Card surface="glass" as="section" hoverable>
        <CardHeader>
          <Badge variant="solid" size="sm">
            open design system
          </Badge>
          <CardTitle className="sg-gallery-hero-title">
            Soft glass UI. You own the code.
          </CardTitle>
          <CardDescription className="sg-gallery-hero-desc">
            Softglass is a kit of tokens + React components for Next.js. Six
            languages (three dark), recolor the brand, compose product screens —
            MIT, shadcn-style ownership.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="primary" onClick={() => onGo("install")}>
            Start with install
          </Button>
          <Button variant="secondary" onClick={() => onGo("languages")}>
            See languages
          </Button>
        </CardFooter>
      </Card>

      <div className="sg-gallery-stat-grid">
        {[
          { k: "6", v: "Languages" },
          { k: String(COMPONENT_DOCS.length), v: "Documented parts" },
          { k: "MIT", v: "License" },
          { k: "9", v: "Tour pages" },
        ].map((s) => (
          <Card key={s.v} surface="solid" padding="sm">
            <CardContent>
              <div className="sg-gallery-stat-value">{s.k}</div>
              <div className="sg-gallery-stat-label">{s.v}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card surface="solid" as="section">
        <CardHeader>
          <CardTitle>How to use this gallery</CardTitle>
          <CardDescription>
            Walk left → right with <strong>Next</strong>, dots, or arrow keys.
            On mobile open <strong>Pages</strong> for the full map.
          </CardDescription>
        </CardHeader>
        <CardContent className="sg-gallery-chip-row">
          {(
            [
              ["install", "1 · Install"],
              ["languages", "2 · Languages"],
              ["essentials", "3 · Essentials"],
              ["app", "4 · App shell"],
              ["library", "5 · Library"],
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

      <Alert variant="info" title="Not a Storybook farm">
        This is a product-facing tour of Softglass — real components, one page at
        a time, so the kit stays fast on phones.
      </Alert>
    </div>
  );
}

function InstallPage() {
  return (
    <div className="sg-gallery-stack">
      {[
        {
          n: "1",
          t: "Install packages",
          c: `npm install @softglass/tokens @softglass/ui`,
        },
        {
          n: "2",
          t: "Import tokens + set language",
          c: `/* globals.css */
@import "@softglass/tokens";

/* layout */
<html data-softglass-theme="aurora">`,
        },
        {
          n: "3",
          t: "Use components",
          c: `import { Button, Card, Input } from "@softglass/ui";

<Card surface="glass">
  <Input label="Email" />
  <Button variant="primary">Continue</Button>
</Card>`,
        },
      ].map((step) => (
        <Card key={step.n} surface="solid" as="section">
          <CardHeader>
            <Badge variant="accent" size="sm">
              step {step.n}
            </Badge>
            <CardTitle>{step.t}</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="sg-gallery-code">{step.c}</pre>
          </CardContent>
        </Card>
      ))}
      <Alert variant="success" title="Monorepo tip">
        In this repo run <code>npm run build:ui</code> then{" "}
        <code>npm run dev</code> so the playground uses local packages.
      </Alert>
    </div>
  );
}

function LanguagesPage() {
  const [active, setActive] = useState<SoftglassThemeId>("aurora");

  useEffect(() => {
    setActive(readStoredSoftglassTheme());
    function onExternal(e: Event) {
      const id = (e as CustomEvent<SoftglassThemeId>).detail;
      if (id) setActive(id);
    }
    window.addEventListener(THEME_CHANGE_EVENT, onExternal);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, onExternal);
  }, []);

  function pick(id: SoftglassThemeId) {
    setActive(id);
    applySoftglassTheme(id);
  }

  return (
    <div className="sg-gallery-stack">
      <Text tone="muted" size="sm">
        Tap a language card (or the chips in the header). Same components —
        different surface recipes. Active:{" "}
        <strong>{SOFTGLASS_THEMES.find((t) => t.id === active)?.name}</strong>
      </Text>
      <div className="sg-gallery-lang-grid" role="listbox" aria-label="Languages">
        {SOFTGLASS_THEMES.map((theme) => {
          const selected = active === theme.id;
          return (
            <button
              key={theme.id}
              type="button"
              role="option"
              aria-selected={selected}
              className="sg-gallery-lang-card"
              data-active={selected || undefined}
              onClick={() => pick(theme.id)}
            >
              <div className="sg-gallery-lang-card-head">
                <Badge size="sm" variant={selected ? "accent" : "default"}>
                  {theme.id}
                </Badge>
                <Badge size="sm" variant="default">
                  {theme.scheme}
                </Badge>
                {selected ? (
                  <Badge size="sm" variant="success">
                    active
                  </Badge>
                ) : null}
              </div>
              <strong className="sg-gallery-lang-card-title">{theme.name}</strong>
              <span className="sg-gallery-lang-card-tagline">{theme.tagline}</span>
              <span className="sg-gallery-lang-card-best">
                Best for: {theme.bestFor}
              </span>
              <div className="sg-gallery-swatches" aria-hidden>
                <span className="sg-gallery-swatch" data-slot="accent" />
                <span className="sg-gallery-swatch" data-slot="soft" />
                <span className="sg-gallery-swatch" data-slot="solid" />
              </div>
            </button>
          );
        })}
      </div>
      <pre className="sg-gallery-code">{`[data-softglass-theme="aurora"] {
  --sg-accent: #0ea5e9; /* brand override */
}`}</pre>
    </div>
  );
}

function LooksPage() {
  const [look, setLook] = useState<"solid" | "soft" | "glass" | "gradient" | "neon">(
    "soft",
  );
  const [motion, setMotion] = useState<"none" | "lift" | "press" | "sheen">(
    "lift",
  );

  return (
    <div className="sg-gallery-stack">
      <Alert variant="info" title="Design props">
        Prefer <code>look</code> and <code>motion</code> over one-off CSS. Glass
        = chrome; solid = long readable content.
      </Alert>

      <Card surface="solid" as="section">
        <CardHeader>
          <CardTitle>Button · look</CardTitle>
          <CardDescription>
            Same variant, different chrome recipes.
          </CardDescription>
        </CardHeader>
        <CardContent className="sg-gallery-stack-tight">
          <div className="sg-gallery-chip-row">
            {(["solid", "soft", "glass", "gradient", "neon"] as const).map(
              (l) => (
                <Button
                  key={l}
                  size="sm"
                  variant={look === l ? "primary" : "secondary"}
                  onClick={() => setLook(l)}
                >
                  {l}
                </Button>
              ),
            )}
          </div>
          <div className="sg-gallery-chip-row">
            <Button variant="primary" look={look}>
              Primary · {look}
            </Button>
            <Button variant="secondary" look={look}>
              Secondary
            </Button>
            <Button variant="outline" look={look}>
              Outline
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card surface="solid" as="section">
        <CardHeader>
          <CardTitle>Button · motion</CardTitle>
          <CardDescription>Hover / press recipes (try on desktop).</CardDescription>
        </CardHeader>
        <CardContent className="sg-gallery-stack-tight">
          <div className="sg-gallery-chip-row">
            {(["none", "lift", "press", "sheen"] as const).map((m) => (
              <Button
                key={m}
                size="sm"
                variant={motion === m ? "primary" : "secondary"}
                onClick={() => setMotion(m)}
              >
                {m}
              </Button>
            ))}
          </div>
          <Button variant="primary" look="soft" motion={motion}>
            motion=&quot;{motion}&quot;
          </Button>
        </CardContent>
      </Card>

      <Card surface="solid" as="section">
        <CardHeader>
          <CardTitle>Surfaces</CardTitle>
          <CardDescription>
            Card surface prop — glass for chrome, solid for copy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="sg-gallery-surface-row">
            <Card surface="glass" padding="sm">
              <CardContent>
                <Text size="sm">
                  <strong>glass</strong> — frosted chrome
                </Text>
              </CardContent>
            </Card>
            <Card surface="solid" padding="sm">
              <CardContent>
                <Text size="sm">
                  <strong>solid</strong> — readable body
                </Text>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function EssentialsPage() {
  const [email, setEmail] = useState("");
  return (
    <div className="sg-gallery-stack">
      <Card surface="solid" as="section">
        <CardHeader>
          <CardTitle>Actions</CardTitle>
          <CardDescription>Primary, secondary, ghost, danger.</CardDescription>
        </CardHeader>
        <CardContent className="sg-gallery-chip-row">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="danger" size="sm">
            Danger
          </Button>
          <Button variant="primary" loading>
            Loading
          </Button>
        </CardContent>
      </Card>

      <Card surface="solid" as="section">
        <CardHeader>
          <CardTitle>Field + card</CardTitle>
          <CardDescription>
            Solid card for forms — glass is decorative chrome only.
          </CardDescription>
        </CardHeader>
        <CardContent className="sg-gallery-stack-tight">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@studio.dev"
          />
          <PasswordInput label="Password" />
          <div className="sg-gallery-chip-row">
            <Badge variant="accent">accent</Badge>
            <Badge variant="success">success</Badge>
            <Badge variant="warning">warning</Badge>
          </div>
          <Button variant="primary" fullWidth>
            Continue
          </Button>
        </CardContent>
      </Card>

      <div className="sg-gallery-stat-grid">
        <Stat label="Projects" value="128" trend="up" trendLabel="+12%" look="soft" />
        <Stat label="Latency" value="42ms" hint="p95" look="glass" />
      </div>
    </div>
  );
}

function FormsPage() {
  const [date, setDate] = useState("");
  const [range, setRange] = useState({ start: "", end: "" });
  const [on, setOn] = useState(true);
  const [framework, setFramework] = useState("next");
  const [city, setCity] = useState("");
  const [tags, setTags] = useState<string[]>(["react"]);

  const cityOptions = [
    { value: "ist", label: "Istanbul" },
    { value: "ank", label: "Ankara" },
    { value: "izm", label: "Izmir" },
    { value: "ber", label: "Berlin" },
    { value: "ams", label: "Amsterdam" },
  ];

  const tagOptions = [
    { value: "react", label: "react" },
    { value: "next", label: "next" },
    { value: "tokens", label: "tokens" },
    { value: "a11y", label: "a11y" },
    { value: "glass", label: "glass" },
    { value: "forms", label: "forms" },
  ];

  return (
    <div className="sg-gallery-stack">
      <Card surface="solid" as="section">
        <CardHeader>
          <CardTitle>Select · Combobox · MultiSelect</CardTitle>
          <CardDescription>
            Portaled menus. MultiSelect filters inside the list.
          </CardDescription>
        </CardHeader>
        <CardContent className="sg-gallery-stack-tight">
          <Select
            label="Framework"
            value={framework}
            onValueChange={setFramework}
            options={[
              { value: "next", label: "Next.js" },
              { value: "remix", label: "Remix" },
              { value: "vite", label: "Vite SPA" },
            ]}
          />
          <Combobox
            label="City"
            options={cityOptions}
            value={city}
            onValueChange={setCity}
            placeholder="Type to filter…"
          />
          <MultiSelect
            label="Tags"
            options={tagOptions}
            value={tags}
            onValueChange={setTags}
            filterable
            filterPlaceholder="Filter tags…"
          />
          <Switch label="Email digests" checked={on} onCheckedChange={setOn} />
        </CardContent>
      </Card>

      <Card surface="solid" as="section">
        <CardHeader>
          <CardTitle>Date — single & range</CardTitle>
          <CardDescription>
            Range: start then end. <code>onRangeValueChange</code> when both set.
          </CardDescription>
        </CardHeader>
        <CardContent className="sg-gallery-stack-tight">
          <DatePicker label="Due date" value={date} onValueChange={setDate} />
          <DatePicker
            mode="range"
            label="Trip"
            rangeValue={range}
            onRangeValueChange={setRange}
            hint={
              range.start && range.end
                ? `${range.start} → ${range.end}`
                : "Two clicks"
            }
          />
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <CardTitle>Search field</CardTitle>
        </CardHeader>
        <CardContent>
          <SearchInput label="Search library" placeholder="Button, Sheet…" />
        </CardContent>
      </Card>
    </div>
  );
}

function ComposePage() {
  const [step, setStep] = useState(0);
  const [page, setPage] = useState(2);

  return (
    <div className="sg-gallery-stack">
      <Card surface="solid" as="section">
        <CardHeader>
          <CardTitle>Disclosure</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion
            type="single"
            defaultValue="a"
            items={[
              {
                value: "a",
                trigger: "What is a molecule?",
                content:
                  "A composed piece (Sheet, Accordion) built from atoms and shared look tokens.",
              },
              {
                value: "b",
                trigger: "When to use solid?",
                content:
                  "Long copy, forms, and dense lists — glass is for chrome, not paragraphs.",
              },
            ]}
          />
        </CardContent>
      </Card>

      <Card surface="solid" as="section">
        <CardHeader>
          <CardTitle>Stepper · list · pagination</CardTitle>
        </CardHeader>
        <CardContent className="sg-gallery-stack-tight">
          <Stepper
            steps={[
              { label: "Details" },
              { label: "Theme" },
              { label: "Ship" },
            ]}
            activeStep={step}
            onActiveStepChange={setStep}
            interactive
            look="dots"
          />
          <List look="soft" density="compact">
            <ListItem title="Aurora" description="Default language" selected />
            <ListItem title="Obsidian" description="Dark premium" />
            <ListItem title="Mist" description="Dense apps" />
          </List>
          <Pagination page={page} pageCount={6} onPageChange={setPage} size="sm" />
        </CardContent>
      </Card>

      <EmptyState
        title="No projects yet"
        description="Create one to see Softglass layout patterns in a real product."
        actions={<Button size="sm">New project</Button>}
        look="soft"
      />

      <Card surface="glass" as="section">
        <CardHeader>
          <CardTitle>Overlays</CardTitle>
          <CardDescription>Modal + toast live demo</CardDescription>
        </CardHeader>
        <CardContent>
          <OverlayDemo />
        </CardContent>
      </Card>
    </div>
  );
}

function AppPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [cmd, setCmd] = useState(false);
  const [last, setLast] = useState("—");
  const [name, setName] = useState("Studio");

  const items = useMemo(
    () => [
      { id: "home", label: "Go home", group: "Nav", icon: "⌂" },
      { id: "settings", label: "Open settings", group: "Nav", icon: "◎" },
      { id: "theme", label: "Toggle theme", group: "Appearance", icon: "◐" },
    ],
    [],
  );

  return (
    <div className="sg-gallery-stack">
      <Card surface="solid" as="section">
        <CardHeader>
          <CardTitle>AppShell (live mini)</CardTitle>
          <CardDescription>
            Collapse the rail on desktop. On a narrow screen use the menu
            button — same nav in a left Sheet.
          </CardDescription>
        </CardHeader>
        <CardContent className="sg-gallery-stack-tight">
          <div className="sg-gallery-chip-row">
            <Button
              size="sm"
              variant={collapsed ? "primary" : "secondary"}
              onClick={() => setCollapsed((v) => !v)}
            >
              {collapsed ? "Expand" : "Collapse"}
            </Button>
            <Badge size="sm">collapsed: {String(collapsed)}</Badge>
          </div>
          <AppShell
            className="sg-shell-demo"
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
            mobileNavTitle="Demo"
            header={
              <>
                <div className="sg-gallery-chip-row">
                  <AppShellMenuButton />
                  <strong>Mini product</strong>
                </div>
                <Badge size="sm" variant="default">
                  Softglass
                </Badge>
              </>
            }
            sidebar={
              <>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <AppShellCollapseButton />
                </div>
                <ShellNav>
                  <ShellNavItem href="#h" active icon="⌂">
                    Home
                  </ShellNavItem>
                  <ShellNavItem href="#p" icon="◆">
                    Projects
                  </ShellNavItem>
                  <ShellNavItem href="#s" icon="◎">
                    Settings
                  </ShellNavItem>
                </ShellNav>
              </>
            }
          >
            <PageHeader
              size="sm"
              look="soft"
              title="Projects"
              description="PageHeader sits in main — not in the shell chrome."
              breadcrumbs={[
                { label: "Home", href: "#" },
                { label: "Projects" },
              ]}
              actions={
                <Button size="sm" variant="primary">
                  New
                </Button>
              }
              style={{ marginBottom: "0.75rem" }}
            />
            <Text size="sm" tone="muted">
              Main content grows when the rail collapses.
            </Text>
          </AppShell>
        </CardContent>
      </Card>

      <SettingsSection
        title="Workspace"
        description="SettingsSection groups form fields under a clear title."
        actions={
          <Button size="sm" variant="primary">
            Save
          </Button>
        }
        look="soft"
      >
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </SettingsSection>

      <Card surface="solid" as="section">
        <CardHeader>
          <CardTitle>Command palette</CardTitle>
          <CardDescription>
            Minimal: search + list + keyboard. Wire ⌘K yourself.
          </CardDescription>
        </CardHeader>
        <CardContent className="sg-gallery-chip-row">
          <Button variant="primary" onClick={() => setCmd(true)}>
            Open palette
          </Button>
          <Badge size="sm">last: {last}</Badge>
          <CommandPalette
            open={cmd}
            onOpenChange={setCmd}
            items={items}
            onSelect={(i) => setLast(i.label)}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function LibraryPage({
  studioId,
  onStudioId,
}: {
  studioId: string | null;
  onStudioId: (id: string | null) => void;
}) {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const activeDoc = useMemo(
    () =>
      studioId
        ? COMPONENT_DOCS.find((d) => d.id === studioId) ?? null
        : null,
    [studioId],
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return COMPONENT_DOCS;
    return COMPONENT_DOCS.filter(
      (d) =>
        d.name.toLowerCase().includes(needle) ||
        d.summary.toLowerCase().includes(needle) ||
        d.layer.includes(needle) ||
        d.id.includes(needle),
    );
  }, [q]);

  if (studioId) {
    if (!activeDoc) {
      return (
        <div className="sg-gallery-stack">
          <EmptyState
            title="Unknown component"
            description={`No docs entry for “${studioId}”.`}
            actions={
              <Button size="sm" variant="secondary" onClick={() => onStudioId(null)}>
                ← Library
              </Button>
            }
          />
        </div>
      );
    }
    return (
      <ComponentStudio
        key={studioId}
        doc={activeDoc}
        playground={getPlayground(studioId)}
        onBack={() => onStudioId(null)}
      />
    );
  }

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const slice = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="sg-gallery-stack">
      <SearchInput
        label="Search components"
        value={q}
        onValueChange={(v) => {
          setQ(v);
          setPage(1);
        }}
        placeholder="Sheet, Button, DatePicker…"
      />
      <Text size="sm" tone="muted">
        {filtered.length} match{filtered.length === 1 ? "" : "es"} · page{" "}
        {safePage} of {pageCount} · open a card for Component Studio
      </Text>

      <div className="sg-gallery-lib-grid">
        {slice.map((doc) => {
          const live = hasPlayground(doc.id);
          return (
            <button
              key={doc.id}
              type="button"
              className="sg-gallery-lib-card"
              onClick={() => onStudioId(doc.id)}
            >
              <Card surface="solid" as="article" padding="sm">
                <CardHeader>
                  <div className="sg-gallery-chip-row">
                    <Badge size="sm" variant="default">
                      {doc.layer}
                    </Badge>
                    {live ? (
                      <Badge size="sm" variant="solid">
                        studio
                      </Badge>
                    ) : null}
                  </div>
                  <CardTitle style={{ fontSize: "var(--sg-text-lg)" }}>
                    {doc.name}
                  </CardTitle>
                  <CardDescription>{doc.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  <code className="sg-gallery-import">{doc.importLine}</code>
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No matches"
          description="Try another keyword or clear the search."
          actions={
            <Button size="sm" variant="secondary" onClick={() => setQ("")}>
              Clear
            </Button>
          }
        />
      ) : (
        <Pagination
          page={safePage}
          pageCount={pageCount}
          onPageChange={setPage}
          size="sm"
          look="soft"
        />
      )}
    </div>
  );
}
