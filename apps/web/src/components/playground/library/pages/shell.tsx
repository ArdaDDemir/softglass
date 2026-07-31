"use client";

import type { ComponentPlayground } from "@/components/playground/library/manifest";
import {
  bool,
  boolControl,
  enumControl,
  showcase,
  str,
  strip,
  textControl,
} from "@/components/playground/library/helpers";
import {
  AppShell,
  AppShellCollapseButton,
  AppShellMenuButton,
  Button,
  CommandPalette,
  Input,
  PageHeader,
  SettingsSection,
  ShellNav,
  ShellNavItem,
  Switch,
  Text,
  type ModalMotion,
  type PageHeaderLook,
  type PageHeaderSize,
  type SettingsSectionLook,
} from "@softglass/ui";

const COMMAND_ITEMS = [
  {
    id: "new",
    label: "New project",
    description: "Create a Softglass app",
    group: "Actions",
    onSelect: () => {},
  },
  {
    id: "theme",
    label: "Toggle theme",
    group: "Actions",
    onSelect: () => {},
  },
  {
    id: "docs",
    label: "Open docs",
    description: "Component API",
    group: "Navigate",
    onSelect: () => {},
  },
  {
    id: "library",
    label: "Library",
    group: "Navigate",
    onSelect: () => {},
  },
];

export const shellPlaygrounds: ComponentPlayground[] = [
  {
    id: "appshell",
    title: "AppShell",
    controls: [
      boolControl("collapsed", false),
      textControl("mobileNavTitle", "Menu"),
    ],
    render: (p) => (
      <div style={{ width: "100%", maxWidth: 520, height: 280, overflow: "hidden", borderRadius: 16 }}>
        <AppShell
          collapsed={bool(p, "collapsed")}
          onCollapsedChange={() => {}}
          mobileNavTitle={str(p, "mobileNavTitle", "Menu")}
          header={
            <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "0.5rem 0.75rem" }}>
              <AppShellMenuButton />
              <Text size="sm" style={{ fontWeight: 600 }}>
                Softglass
              </Text>
              <div style={{ marginLeft: "auto" }}>
                <AppShellCollapseButton />
              </div>
            </div>
          }
          sidebar={
            <ShellNav aria-label="Demo">
              <ShellNavItem active>Home</ShellNavItem>
              <ShellNavItem>Library</ShellNavItem>
              <ShellNavItem>Settings</ShellNavItem>
            </ShellNav>
          }
        >
          <div style={{ padding: "0.75rem" }}>
            <Text size="sm">Main content area inside AppShell.</Text>
          </div>
        </AppShell>
      </div>
    ),
    showcases: [
      showcase("Chrome pieces", () =>
        strip(
          <>
            <Button size="sm" variant="outline">
              AppShellMenuButton
            </Button>
            <Button size="sm" variant="outline">
              AppShellCollapseButton
            </Button>
            <Button size="sm" variant="outline">
              ShellNavItem
            </Button>
          </>,
        ),
      ),
    ],
  },
  {
    id: "pageheader",
    title: "PageHeader",
    controls: [
      enumControl("size", ["sm", "md", "lg"], "md"),
      enumControl("look", ["plain", "soft", "solid", "glass"], "plain"),
      textControl("title", "Projects"),
      textControl("description", "Everything your team is shipping."),
      boolControl("withCrumbs", true),
    ],
    render: (p) => (
      <PageHeader
        size={str(p, "size") as PageHeaderSize}
        look={str(p, "look") as PageHeaderLook}
        title={str(p, "title")}
        description={str(p, "description")}
        breadcrumbs={
          bool(p, "withCrumbs")
            ? [
                { label: "Home", href: "#welcome" },
                { label: "Workspace", href: "#" },
                { label: "Projects" },
              ]
            : undefined
        }
        actions={
          <Button size="sm" variant="primary">
            New
          </Button>
        }
        style={{ width: "100%", maxWidth: 480 }}
      />
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["plain", "soft", "solid", "glass"] as const).map((look) => (
            <PageHeader
              key={look}
              look={look}
              size="sm"
              title={look}
              description="Header"
              style={{ width: 180 }}
            />
          )),
        ),
      ),
      showcase("Sizes", () =>
        strip(
          (["sm", "md", "lg"] as const).map((size) => (
            <PageHeader key={size} size={size} title={size} style={{ width: 140 }} />
          )),
        ),
      ),
    ],
  },
  {
    id: "settingssection",
    title: "SettingsSection",
    controls: [
      enumControl("look", ["soft", "solid", "glass", "plain"], "soft"),
      enumControl("density", ["comfortable", "compact"], "comfortable"),
      textControl("title", "Notifications"),
      textControl("description", "Choose how Softglass reaches you."),
    ],
    render: (p) => (
      <SettingsSection
        look={str(p, "look") as SettingsSectionLook}
        density={str(p, "density") as "comfortable" | "compact"}
        title={str(p, "title")}
        description={str(p, "description")}
        actions={
          <Button size="sm" variant="secondary">
            Save
          </Button>
        }
        style={{ width: "100%", maxWidth: 420 }}
      >
        <Switch label="Product updates" defaultChecked />
        <Switch label="Security alerts" defaultChecked />
        <Input label="Digest email" placeholder="you@team.com" />
      </SettingsSection>
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["soft", "solid", "glass", "plain"] as const).map((look) => (
            <SettingsSection
              key={look}
              look={look}
              title={look}
              density="compact"
              style={{ width: 180 }}
            >
              <Text size="sm">Body</Text>
            </SettingsSection>
          )),
        ),
      ),
    ],
  },
  {
    id: "commandpalette",
    title: "CommandPalette",
    controls: [
      boolControl("open", false),
      enumControl("motion", ["none", "scale", "fade", "slide-up"], "scale"),
      textControl("placeholder", "Type a command…"),
      textControl("emptyMessage", "No results"),
      textControl("label", "Command palette"),
    ],
    render: (p, { setProp }) => (
      <div>
        <Button size="sm" onClick={() => setProp("open", true)}>
          Open command palette
        </Button>
        <CommandPalette
          open={bool(p, "open")}
          onOpenChange={(open) => setProp("open", open)}
          items={COMMAND_ITEMS}
          motion={str(p, "motion") as ModalMotion}
          placeholder={str(p, "placeholder")}
          emptyMessage={str(p, "emptyMessage")}
          label={str(p, "label")}
        />
      </div>
    ),
    showcases: [
      showcase("Motion recipes", () =>
        strip(
          (["none", "scale", "fade", "slide-up"] as const).map((motion) => (
            <Button key={motion} size="sm" variant="outline">
              {motion}
            </Button>
          )),
        ),
      ),
    ],
  },
];
