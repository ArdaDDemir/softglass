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
  CopyButton,
  EmptyState,
  Fieldset,
  FileField,
  HoverCard,
  Icon,
  Image,
  Input,
  Kbd,
  Link,
  ListItem,
  Meter,
  NavLink,
  NumberInput,
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
  StatusDot,
  TimeInput,
  ToggleGroup,
  Truncate,
  VisuallyHidden,
  ColorInput,
  ColorSwatch,
  CountBadge,
  Heading,
  Highlight,
  LiveRegion,
  NativeDateInput,
  RangeSlider,
  Text,
} from "@softglass/ui";
import { useMemo, useState, type CSSProperties } from "react";

type SectionId =
  | "overview"
  | "start"
  | "looks"
  | "buttons"
  | "feedback"
  | "form-atoms"
  | "chrome"
  | "should"
  | "nice"
  | "disclosure-nav"
  | "surface"
  | "docs"
  | "overlays"
  | "controls";

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "start", label: "Get started" },
  { id: "looks", label: "Looks · motion" },
  { id: "buttons", label: "Button props" },
  { id: "feedback", label: "Progress · StatusDot" },
  { id: "form-atoms", label: "Slider · Number · File" },
  { id: "chrome", label: "Link · Chip · Fields" },
  { id: "should", label: "Should · 1.3d" },
  { id: "nice", label: "Nice · 1.3e" },
  { id: "disclosure-nav", label: "1.4a · Disclosure & nav" },
  { id: "surface", label: "1.4b · Surface" },
  { id: "docs", label: "Docs / API" },
  { id: "overlays", label: "Modal · Menu · Toast" },
  { id: "controls", label: "Controls" },
];

/**
 * Single-section playground — only one heavy demo tree mounts at a time.
 * Huge win vs rendering every glass card on one endless page.
 */
export function Playground() {
  const [section, setSection] = useState<SectionId>("overview");
  const [docId, setDocId] = useState(COMPONENT_DOCS[0]!.id);
  const activeDoc = useMemo(
    () => COMPONENT_DOCS.find((d) => d.id === docId) ?? COMPONENT_DOCS[0]!,
    [docId],
  );

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
        header={
          <>
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
                v1.0 · soft glass · prop-friendly
              </div>
            </div>
            <ThemeSwitcher />
          </>
        }
        sidebar={
          <>
            <div>
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
                One section at a time keeps scroll smooth. Switch themes above.
              </p>
            </div>
            <ShellNav aria-label="Playground sections">
              {SECTIONS.map((item) => (
                <ShellNavItem
                  key={item.id}
                  href={`#${item.id}`}
                  active={section === item.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setSection(item.id);
                  }}
                >
                  {item.label}
                </ShellNavItem>
              ))}
            </ShellNav>
          </>
        }
      >
        <div style={{ display: "grid", gap: "1.25rem" }}>
          {section === "overview" ? (
            <OverviewSection onGoStart={() => setSection("start")} />
          ) : null}
          {section === "start" ? <GetStartedSection /> : null}
          {section === "looks" ? <LooksDemo /> : null}
          {section === "buttons" ? <ButtonPropsSection /> : null}
          {section === "feedback" ? <FeedbackSection /> : null}
          {section === "form-atoms" ? <FormAtomsSection /> : null}
          {section === "chrome" ? <ChromeAtomsSection /> : null}
          {section === "should" ? <ShouldAtomsSection /> : null}
          {section === "nice" ? <NiceAtomsSection /> : null}
          {section === "disclosure-nav" ? <DisclosureNavSection /> : null}
          {section === "surface" ? <SurfaceSection /> : null}
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
                <CardTitle>Modal + Toast</CardTitle>
                <CardDescription>
                  Only this section mounts — fewer glass trees = smoother UI.
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

function OverviewSection({ onGoStart }: { onGoStart: () => void }) {
  return (
    <>
      <Card surface="glass" as="section" hoverable>
        <CardHeader>
          <Badge variant="solid" size="sm">
            v1.0
          </Badge>
          <CardTitle
            style={{
              fontSize: "var(--sg-text-4xl)",
              maxWidth: "16ch",
              marginTop: "0.75rem",
            }}
          >
            Soft glass kit. Props first.
          </CardTitle>
          <CardDescription style={{ fontSize: "var(--sg-text-lg)", maxWidth: "52ch" }}>
            Install tokens + UI, set a language, pass props. Frost surfaces stay
            readable without stacking expensive backdrop blurs.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="primary" onClick={onGoStart}>
            Get started
          </Button>
          <Button variant="ghost" onClick={onGoStart}>
            Install steps
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
          { label: "Surfaces", value: "Frost-first" },
          { label: "Perf", value: "Sectioned" },
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
