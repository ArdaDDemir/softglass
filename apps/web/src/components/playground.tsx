"use client";

import { ControlsDemo } from "@/components/controls-demo";
import { LooksDemo } from "@/components/looks-demo";
import { OverlayDemo } from "@/components/overlay-demo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { COMPONENT_DOCS } from "@/lib/docs";
import { SOFTGLASS_THEMES } from "@/lib/themes";
import {
  Alert,
  AppShell,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Separator,
  ShellNav,
  ShellNavItem,
  Skeleton,
  Spinner,
} from "@softglass/ui";
import { useMemo, useState } from "react";

type SectionId =
  | "overview"
  | "start"
  | "looks"
  | "buttons"
  | "docs"
  | "overlays"
  | "controls";

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "start", label: "Get started" },
  { id: "looks", label: "Looks · motion" },
  { id: "buttons", label: "Button props" },
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
            Alert, Skeleton, Spinner, Separator — for empty/loading/status UI.
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
