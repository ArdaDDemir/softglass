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
import { ThemeBuilderPage } from "@/components/playground/theme-builder";
import {
  Accordion,
  Alert,
  AppShell,
  AppShellCollapseButton,
  AppShellMenuButton,
  useAppShell,
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
  DataTable,
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
  type DataTableColumn,
  type DataTableSortState,
} from "@softglass/ui";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

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
    case "theme":
      return <ThemeBuilderPage />;
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
            open design system · v1.8
          </Badge>
          <CardTitle className="sg-gallery-hero-title">
            Soft glass UI. You own the code.
          </CardTitle>
          <CardDescription className="sg-gallery-hero-desc">
            Softglass is a kit of tokens + React components for Next.js. Six
            languages, live Theme Builder, product App shell, and a Component
            Studio for every export — MIT, shadcn-style ownership.
          </CardDescription>
        </CardHeader>
        <CardFooter className="sg-gallery-chip-row">
          <Button variant="primary" onClick={() => onGo("install")}>
            Start with install
          </Button>
          <Button variant="secondary" onClick={() => onGo("languages")}>
            See languages
          </Button>
          <Button variant="secondary" look="soft" onClick={() => onGo("theme")}>
            Theme Builder
          </Button>
        </CardFooter>
      </Card>

      <div className="sg-gallery-stat-grid">
        {[
          { k: "6", v: "Languages" },
          { k: String(COMPONENT_DOCS.length), v: "Documented parts" },
          { k: "MIT", v: "License" },
          { k: "10", v: "Tour pages" },
        ].map((s) => (
          <Card key={s.v} surface="solid" padding="sm">
            <CardContent>
              <div className="sg-gallery-stat-value">{s.k}</div>
              <div className="sg-gallery-stat-label">{s.v}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="sg-welcome-feature-grid">
        <Card surface="solid" as="section" className="sg-welcome-theme-cta">
          <CardHeader>
            <Badge size="sm" variant="accent" look="soft">
              brand
            </Badge>
            <CardTitle>Theme Builder</CardTitle>
            <CardDescription>
              Language is the dialect. Brand is your accent. Recolor live, copy
              CSS, or share a{" "}
              <code style={{ fontSize: "0.9em" }}>#theme?…</code> link.
            </CardDescription>
          </CardHeader>
          <CardFooter className="sg-gallery-chip-row">
            <Button variant="primary" size="sm" onClick={() => onGo("theme")}>
              Open Theme Builder
            </Button>
          </CardFooter>
        </Card>

        <Card surface="solid" as="section">
          <CardHeader>
            <Badge size="sm" variant="solid" look="soft">
              product
            </Badge>
            <CardTitle>App shell</CardTitle>
            <CardDescription>
              Mini inventory product: AppShell · DataTable · settings · command
              palette — one working screen, not loose demos.
            </CardDescription>
          </CardHeader>
          <CardFooter className="sg-gallery-chip-row">
            <Button variant="primary" size="sm" onClick={() => onGo("app")}>
              Open App
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onGo("library")}
            >
              Component Studio
            </Button>
          </CardFooter>
        </Card>
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
              ["theme", "3 · Theme"],
              ["essentials", "4 · Essentials"],
              ["app", "5 · App shell"],
              ["library", "6 · Library"],
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
        Product-facing Softglass tour — real components, one page at a time,
        phone-friendly. Install from npm when you are ready to ship.
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

type InventoryRow = {
  id: string;
  name: string;
  sku: string;
  stock: number;
  status: "in_stock" | "low" | "out";
};

const INVENTORY_SEED: InventoryRow[] = Array.from({ length: 48 }, (_, i) => {
  const statuses: InventoryRow["status"][] = ["in_stock", "low", "out"];
  const status = statuses[i % 3]!;
  return {
    id: `inv-${i + 1}`,
    name: `Softglass SKU ${String(i + 1).padStart(2, "0")}`,
    sku: `SG-${String(1000 + i)}`,
    stock: status === "out" ? 0 : status === "low" ? 2 + (i % 5) : 12 + (i % 40),
    status,
  };
});

function inventoryStatusBadge(status: InventoryRow["status"]): ReactNode {
  if (status === "in_stock") {
    return (
      <Badge size="sm" variant="success" look="soft">
        In stock
      </Badge>
    );
  }
  if (status === "low") {
    return (
      <Badge size="sm" variant="warning" look="soft">
        Low
      </Badge>
    );
  }
  return (
    <Badge size="sm" variant="danger" look="soft">
      Out
    </Badge>
  );
}

const INVENTORY_COLUMNS: DataTableColumn<InventoryRow>[] = [
  { id: "name", header: "Product", accessor: "name", sortable: true },
  { id: "sku", header: "SKU", accessor: "sku", sortable: true, width: 110 },
  {
    id: "stock",
    header: "Stock",
    accessor: "stock",
    sortable: true,
    align: "end",
    width: 80,
  },
  {
    id: "status",
    header: "Status",
    sortable: true,
    sortValue: (row) => row.status,
    cell: (row) => inventoryStatusBadge(row.status),
    width: 100,
  },
];

type AppSection = "inventory" | "settings";

/** Inventory main — lives inside AppShell (PageHeader + filter + DataTable + Pagination) */
function InventoryPanel({
  onToast,
}: {
  onToast?: (message: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sort, setSort] = useState<DataTableSortState>({
    columnId: "name",
    direction: "asc",
  });
  const pageSize = 8;

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return INVENTORY_SEED;
    return INVENTORY_SEED.filter(
      (row) =>
        row.name.toLowerCase().includes(needle) ||
        row.sku.toLowerCase().includes(needle) ||
        row.status.includes(needle),
    );
  }, [query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const pageRows = useMemo(
    () => filtered.slice((safePage - 1) * pageSize, safePage * pageSize),
    [filtered, safePage, pageSize],
  );

  useEffect(() => {
    setPage(1);
  }, [query]);

  return (
    <>
      <PageHeader
        size="sm"
        look="soft"
        title="Inventory"
        description={`${filtered.length} products · ${selectedIds.length} selected`}
        breadcrumbs={[
          { label: "App", href: "#app" },
          { label: "Inventory" },
        ]}
        actions={
          <>
            <Button
              size="sm"
              variant="secondary"
              onClick={() =>
                onToast?.(
                  selectedIds.length
                    ? `Export ${selectedIds.length} selected (demo)`
                    : "Export all (demo)",
                )
              }
            >
              Export
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={() => onToast?.("New product (demo)")}
            >
              New product
            </Button>
          </>
        }
      />

      <div className="sg-gallery-chip-row" style={{ alignItems: "flex-end" }}>
        <div style={{ flex: "1 1 12rem", minWidth: 0, maxWidth: 280 }}>
          <SearchInput
            label="Filter"
            placeholder="Name, SKU, status…"
            value={query}
            onValueChange={setQuery}
          />
        </div>
        <Badge size="sm">
          page {safePage}/{pageCount}
        </Badge>
        {selectedIds.length > 0 ? (
          <Badge size="sm" variant="solid">
            {selectedIds.length} selected
          </Badge>
        ) : null}
      </div>

      <DataTable
        data={pageRows}
        columns={INVENTORY_COLUMNS}
        look="soft"
        density="comfortable"
        stickyHeader
        selectionMode="multiple"
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        getRowLabel={(row) => row.name}
        sort={sort}
        onSortChange={setSort}
        clientSort
        emptyTitle="No products match"
        emptyDescription="Try another filter or clear the search."
        aria-label="Inventory products"
        maxHeight={280}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
        }}
      >
        <Text size="sm" tone="muted">
          Showing {(safePage - 1) * pageSize + (pageRows.length ? 1 : 0)}–
          {(safePage - 1) * pageSize + pageRows.length} of {filtered.length}
        </Text>
        <Pagination
          page={safePage}
          pageCount={pageCount}
          onPageChange={setPage}
          size="sm"
        />
      </div>
    </>
  );
}

function SettingsPanel({
  name,
  onNameChange,
  onSave,
  saved,
}: {
  name: string;
  onNameChange: (value: string) => void;
  onSave: () => void;
  saved: boolean;
}) {
  return (
    <>
      <PageHeader
        size="sm"
        look="soft"
        title="Settings"
        description="Workspace preferences for this mini product."
        breadcrumbs={[
          { label: "App", href: "#app" },
          { label: "Settings" },
        ]}
      />
      <SettingsSection
        title="Workspace"
        description="SettingsSection groups form fields under a clear title."
        actions={
          <Button size="sm" variant="primary" onClick={onSave}>
            {saved ? "Saved" : "Save"}
          </Button>
        }
        look="soft"
      >
        <Input
          label="Workspace name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
        <Text size="sm" tone="muted">
          Changes stay in this session only (gallery demo).
        </Text>
      </SettingsSection>
    </>
  );
}

/** Closes mobile Sheet when a nav item is chosen (must render under AppShell). */
function AppNav({
  section,
  onSection,
}: {
  section: AppSection;
  onSection: (next: AppSection) => void;
}) {
  const { setMobileNavOpen } = useAppShell();

  function go(next: AppSection) {
    onSection(next);
    setMobileNavOpen(false);
  }

  return (
    <>
      <div
        className="sg-shell-sidebar-collapse-hide"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "0.65rem",
        }}
      >
        <Text size="sm" style={{ fontWeight: 600 }}>
          Softglass
        </Text>
        <AppShellCollapseButton />
      </div>
      <ShellNav aria-label="Product sections">
        <ShellNavItem
          href="#app-inventory"
          active={section === "inventory"}
          icon="◆"
          onClick={(e) => {
            e.preventDefault();
            go("inventory");
          }}
        >
          Inventory
        </ShellNavItem>
        <ShellNavItem
          href="#app-settings"
          active={section === "settings"}
          icon="◎"
          onClick={(e) => {
            e.preventDefault();
            go("settings");
          }}
        >
          Settings
        </ShellNavItem>
      </ShellNav>
    </>
  );
}

/**
 * 1.7c + completion — full mini product app:
 * AppShell · working nav · inventory DataTable · settings · command palette.
 */
function AppPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [section, setSection] = useState<AppSection>("inventory");
  const [cmd, setCmd] = useState(false);
  const [last, setLast] = useState("—");
  const [workspaceName, setWorkspaceName] = useState("Softglass Studio");
  const [saved, setSaved] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);

  const notify = useCallback((message: string) => {
    setFlash(message);
    setLast(message);
    window.setTimeout(() => setFlash(null), 2200);
  }, []);

  const paletteItems = useMemo(
    () => [
      {
        id: "inventory",
        label: "Go to inventory",
        group: "Nav",
        icon: "◆",
      },
      {
        id: "settings",
        label: "Open settings",
        group: "Nav",
        icon: "◎",
      },
      {
        id: "new",
        label: "New product",
        group: "Actions",
        icon: "+",
      },
      {
        id: "export",
        label: "Export inventory",
        group: "Actions",
        icon: "↓",
      },
    ],
    [],
  );

  function onPaletteSelect(id: string, label: string) {
    setLast(label);
    if (id === "inventory") setSection("inventory");
    else if (id === "settings") setSection("settings");
    else if (id === "new") {
      setSection("inventory");
      notify("New product (demo)");
    } else if (id === "export") {
      setSection("inventory");
      notify("Export all (demo)");
    }
  }

  return (
    <div className="sg-gallery-stack">
      <Card surface="solid" as="section" className="sg-app-live-card">
        <CardHeader>
          <div className="sg-gallery-chip-row">
            <Badge size="sm" variant="accent" look="soft">
              live product
            </Badge>
            <Badge size="sm">
              {section === "inventory" ? "Inventory" : "Settings"}
            </Badge>
            {flash ? (
              <Badge size="sm" variant="success" look="soft">
                {flash}
              </Badge>
            ) : null}
          </div>
          <CardTitle>Mini product · AppShell</CardTitle>
          <CardDescription>
            Working nav · inventory table · settings · command palette. Collapse
            the rail or open the menu on a narrow screen.
          </CardDescription>
        </CardHeader>
        <CardContent className="sg-gallery-stack-tight">
          <div className="sg-gallery-chip-row">
            <Button
              size="sm"
              variant={collapsed ? "primary" : "secondary"}
              onClick={() => setCollapsed((v) => !v)}
            >
              {collapsed ? "Expand rail" : "Collapse rail"}
            </Button>
            <Button
              size="sm"
              variant={section === "inventory" ? "primary" : "secondary"}
              onClick={() => setSection("inventory")}
            >
              Inventory
            </Button>
            <Button
              size="sm"
              variant={section === "settings" ? "primary" : "secondary"}
              onClick={() => setSection("settings")}
            >
              Settings
            </Button>
            <Button size="sm" variant="secondary" onClick={() => setCmd(true)}>
              ⌘K palette
            </Button>
          </div>

          <AppShell
            className="sg-shell-demo-app"
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
            mobileNavTitle={workspaceName}
            header={
              <>
                <div className="sg-gallery-chip-row">
                  <AppShellMenuButton />
                  <strong>{workspaceName}</strong>
                </div>
                <div className="sg-gallery-chip-row">
                  <Button
                    size="sm"
                    variant="secondary"
                    look="soft"
                    onClick={() => setCmd(true)}
                  >
                    Search…
                  </Button>
                  <Badge size="sm" variant="default">
                    Softglass
                  </Badge>
                </div>
              </>
            }
            sidebar={<AppNav section={section} onSection={setSection} />}
          >
            {section === "inventory" ? (
              <InventoryPanel onToast={notify} />
            ) : (
              <SettingsPanel
                name={workspaceName}
                onNameChange={(v) => {
                  setWorkspaceName(v);
                  setSaved(false);
                }}
                onSave={() => {
                  setSaved(true);
                  notify(`Saved “${workspaceName}”`);
                }}
                saved={saved}
              />
            )}
          </AppShell>

          <CommandPalette
            open={cmd}
            onOpenChange={setCmd}
            items={paletteItems}
            onSelect={(item) => onPaletteSelect(item.id, item.label)}
          />
        </CardContent>
      </Card>

      <Text size="sm" tone="muted">
        Studio deep-dive:{" "}
        <a href="#library/datatable">#library/datatable</a> · brand lab:{" "}
        <a href="#theme">#theme</a>
      </Text>
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
