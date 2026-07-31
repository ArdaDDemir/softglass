"use client";

import type { ComponentPlayground } from "@/components/playground/library/manifest";
import {
  bool,
  boolControl,
  enumControl,
  num,
  numberControl,
  showcase,
  str,
  strip,
  textControl,
} from "@/components/playground/library/helpers";
import {
  Accordion,
  Breadcrumb,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Collapsible,
  EmptyState,
  List,
  ListItem,
  Pagination,
  Stat,
  Stepper,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarSpacer,
  type AccordionLook,
  type AccordionMotion,
  type AccordionType,
  type BreadcrumbLook,
  type BreadcrumbSize,
  type CardLook,
  type CardMotion,
  type CardPadding,
  type CardSurface,
  type CollapsibleLook,
  type CollapsibleMotion,
  type EmptyStateLook,
  type EmptyStateSize,
  type ListDensity,
  type ListLook,
  type PaginationLook,
  type PaginationSize,
  type StatLook,
  type StatTrend,
  type StepperLook,
  type StepperOrientation,
  type TabsLook,
  type TabsMotion,
  type ToolbarLook,
} from "@softglass/ui";

const ACCORDION_ITEMS = [
  {
    value: "one",
    trigger: "What is Softglass?",
    content: "An open soft-glass UI kit for Next.js.",
  },
  {
    value: "two",
    trigger: "Looks & motion",
    content: "First-class design props on every control.",
  },
  {
    value: "three",
    trigger: "Ownership",
    content: "shadcn-style — you own the code.",
  },
];

export const moleculePlaygrounds: ComponentPlayground[] = [
  {
    id: "card",
    title: "Card",
    controls: [
      enumControl("surface", ["solid", "glass", "glass-elevated"], "solid"),
      enumControl("look", ["flat", "raised", "outline", "glow"], "raised"),
      enumControl("motion", ["none", "lift", "glow-pulse"], "lift"),
      enumControl("padding", ["none", "sm", "md", "lg"], "md"),
      boolControl("hoverable", true),
      textControl("title", "Softglass"),
      textControl("description", "Glass chrome with solid content."),
    ],
    render: (p) => (
      <Card
        surface={str(p, "surface") as CardSurface}
        look={str(p, "look") as CardLook}
        motion={str(p, "motion") as CardMotion}
        padding={str(p, "padding") as CardPadding}
        hoverable={bool(p, "hoverable")}
        style={{ maxWidth: 360, width: "100%" }}
      >
        <CardHeader>
          <CardTitle>{str(p, "title")}</CardTitle>
          <CardDescription>{str(p, "description")}</CardDescription>
        </CardHeader>
        <CardContent>
          Live stage card — surface, look, and motion combine freely.
        </CardContent>
        <CardFooter>
          <Button size="sm">Action</Button>
        </CardFooter>
      </Card>
    ),
    showcases: [
      showcase("Surfaces", () =>
        strip(
          (["solid", "glass", "glass-elevated"] as const).map((surface) => (
            <Card key={surface} surface={surface} padding="sm" style={{ width: 140 }}>
              <CardHeader>
                <CardTitle style={{ fontSize: "var(--sg-text-sm)" }}>{surface}</CardTitle>
              </CardHeader>
            </Card>
          )),
        ),
      ),
      showcase("Looks", () =>
        strip(
          (["flat", "raised", "outline", "glow"] as const).map((look) => (
            <Card key={look} look={look} padding="sm" style={{ width: 120 }}>
              <CardContent>{look}</CardContent>
            </Card>
          )),
        ),
      ),
    ],
  },
  {
    id: "tabs",
    title: "Tabs",
    controls: [
      enumControl("look", ["pill", "underline", "segmented"], "pill"),
      enumControl("motion", ["none", "fade", "slide"], "slide"),
      enumControl("value", ["overview", "api", "a11y"], "overview"),
    ],
    render: (p) => (
      <Tabs
        value={str(p, "value", "overview")}
        look={str(p, "look") as TabsLook}
        motion={str(p, "motion") as TabsMotion}
        style={{ width: "100%", maxWidth: 420 }}
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="a11y">A11y</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Tour the surface language.</TabsContent>
        <TabsContent value="api">Props stay stable across themes.</TabsContent>
        <TabsContent value="a11y">Keyboard and focus are first-class.</TabsContent>
      </Tabs>
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["pill", "underline", "segmented"] as const).map((look) => (
            <Tabs key={look} look={look} defaultValue="a">
              <TabsList>
                <TabsTrigger value="a">{look}</TabsTrigger>
                <TabsTrigger value="b">B</TabsTrigger>
              </TabsList>
            </Tabs>
          )),
        ),
      ),
    ],
  },
  {
    id: "collapsible",
    title: "Collapsible",
    controls: [
      enumControl("look", ["soft", "solid", "glass", "outline", "ghost"], "soft"),
      enumControl("motion", ["none", "fade", "height"], "height"),
      boolControl("open", true),
      textControl("trigger", "Details"),
      textControl("body", "Hidden content expands with height motion."),
    ],
    render: (p) => (
      <Collapsible
        open={bool(p, "open")}
        look={str(p, "look") as CollapsibleLook}
        motion={str(p, "motion") as CollapsibleMotion}
        trigger={str(p, "trigger")}
        style={{ width: "100%", maxWidth: 360 }}
      >
        {str(p, "body")}
      </Collapsible>
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["soft", "solid", "glass", "outline", "ghost"] as const).map((look) => (
            <Collapsible key={look} look={look} trigger={look} defaultOpen>
              Panel {look}
            </Collapsible>
          )),
        ),
      ),
    ],
  },
  {
    id: "accordion",
    title: "Accordion",
    controls: [
      enumControl("type", ["single", "multiple"], "single"),
      enumControl("look", ["soft", "solid", "glass", "outline", "ghost"], "soft"),
      enumControl("motion", ["none", "fade", "height"], "height"),
      boolControl("collapsible", true),
    ],
    render: (p) => (
      <Accordion
        items={ACCORDION_ITEMS}
        type={str(p, "type") as AccordionType}
        look={str(p, "look") as AccordionLook}
        motion={str(p, "motion") as AccordionMotion}
        collapsible={bool(p, "collapsible")}
        defaultValue="one"
        style={{ width: "100%", maxWidth: 420 }}
      />
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["soft", "solid", "outline"] as const).map((look) => (
            <Accordion
              key={look}
              look={look}
              items={ACCORDION_ITEMS.slice(0, 2)}
              defaultValue="one"
              style={{ width: 200 }}
            />
          )),
        ),
      ),
    ],
  },
  {
    id: "breadcrumb",
    title: "Breadcrumb",
    controls: [
      enumControl("size", ["sm", "md"], "md"),
      enumControl("look", ["plain", "soft", "pill"], "plain"),
    ],
    render: (p) => (
      <Breadcrumb
        size={str(p, "size") as BreadcrumbSize}
        look={str(p, "look") as BreadcrumbLook}
        items={[
          { label: "Gallery", href: "#welcome" },
          { label: "Library", href: "#library" },
          { label: "Button" },
        ]}
      />
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["plain", "soft", "pill"] as const).map((look) => (
            <Breadcrumb
              key={look}
              look={look}
              items={[
                { label: "Home", href: "#" },
                { label: look },
              ]}
            />
          )),
        ),
      ),
    ],
  },
  {
    id: "pagination",
    title: "Pagination",
    controls: [
      numberControl("page", 2, "page", 1, 12, 1),
      numberControl("pageCount", 8, "pageCount", 1, 20, 1),
      enumControl("size", ["sm", "md"], "sm"),
      enumControl("look", ["soft", "solid", "ghost", "glass"], "soft"),
      boolControl("compact", false),
      boolControl("disabled", false),
    ],
    render: (p) => (
      <Pagination
        page={num(p, "page", 2)}
        pageCount={num(p, "pageCount", 8)}
        onPageChange={() => {}}
        size={str(p, "size") as PaginationSize}
        look={str(p, "look") as PaginationLook}
        compact={bool(p, "compact")}
        disabled={bool(p, "disabled")}
      />
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["soft", "solid", "ghost", "glass"] as const).map((look) => (
            <Pagination
              key={look}
              look={look}
              page={2}
              pageCount={5}
              onPageChange={() => {}}
              size="sm"
            />
          )),
        ),
      ),
      showcase("Compact", () => (
        <Pagination page={3} pageCount={10} onPageChange={() => {}} compact />
      )),
    ],
  },
  {
    id: "empty-state",
    title: "EmptyState",
    controls: [
      enumControl("size", ["sm", "md", "lg"], "md"),
      enumControl("look", ["solid", "soft", "outline"], "soft"),
      textControl("title", "Nothing here yet"),
      textControl("description", "Create your first item to fill this space."),
    ],
    render: (p) => (
      <EmptyState
        size={str(p, "size") as EmptyStateSize}
        look={str(p, "look") as EmptyStateLook}
        title={str(p, "title")}
        description={str(p, "description")}
        actions={<Button size="sm">Create</Button>}
        style={{ width: "100%", maxWidth: 360 }}
      />
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["solid", "soft", "outline"] as const).map((look) => (
            <EmptyState
              key={look}
              look={look}
              size="sm"
              title={look}
              description="Empty"
              style={{ width: 160 }}
            />
          )),
        ),
      ),
    ],
  },
  {
    id: "stepper",
    title: "Stepper",
    controls: [
      numberControl("index", 1, "activeStep", 0, 3, 1),
      enumControl("orientation", ["horizontal", "vertical"], "horizontal"),
      enumControl("look", ["soft", "solid", "outline", "dots", "pills"], "soft"),
    ],
    render: (p) => (
      <Stepper
        activeStep={num(p, "index", 1)}
        orientation={str(p, "orientation") as StepperOrientation}
        look={str(p, "look") as StepperLook}
        steps={[
          { label: "Account" },
          { label: "Profile" },
          { label: "Team" },
          { label: "Done" },
        ]}
        style={{ width: "100%", maxWidth: 420 }}
      />
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["soft", "solid", "dots", "pills"] as const).map((look) => (
            <Stepper
              key={look}
              look={look}
              activeStep={1}
              steps={[{ label: "A" }, { label: "B" }, { label: "C" }]}
              style={{ width: 200 }}
            />
          )),
        ),
      ),
    ],
  },
  {
    id: "toolbar",
    title: "Toolbar",
    controls: [
      enumControl("look", ["soft", "solid", "glass", "ghost", "accent"], "soft"),
    ],
    render: (p) => (
      <Toolbar look={str(p, "look") as ToolbarLook} aria-label="Editor" style={{ width: "100%" }}>
        <ToolbarGroup>
          <Button size="sm" variant="ghost">
            Undo
          </Button>
          <Button size="sm" variant="ghost">
            Redo
          </Button>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          <Button size="sm" variant="secondary">
            Bold
          </Button>
          <Button size="sm" variant="secondary">
            Italic
          </Button>
        </ToolbarGroup>
        <ToolbarSpacer />
        <Button size="sm">Save</Button>
      </Toolbar>
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["soft", "solid", "glass", "ghost", "accent"] as const).map((look) => (
            <Toolbar key={look} look={look} aria-label={look}>
              <Button size="sm" variant="ghost">
                {look}
              </Button>
            </Toolbar>
          )),
        ),
      ),
    ],
  },
  {
    id: "list",
    title: "List",
    controls: [
      enumControl("density", ["comfortable", "compact", "relaxed"], "comfortable"),
      enumControl("look", ["soft", "solid", "outline", "ghost", "inset"], "soft"),
    ],
    render: (p) => (
      <List
        density={str(p, "density") as ListDensity}
        look={str(p, "look") as ListLook}
        style={{ width: "100%", maxWidth: 360 }}
      >
        <ListItem title="Aurora language" />
        <ListItem title="Mist language" />
        <ListItem title="Pearl language" selected />
        <ListItem title="Archived" disabled />
      </List>
    ),
    showcases: [
      showcase("Density", () =>
        strip(
          (["comfortable", "compact", "relaxed"] as const).map((density) => (
            <List key={density} density={density} style={{ width: 140 }}>
              <ListItem title={density} />
              <ListItem title="Item" />
            </List>
          )),
        ),
      ),
    ],
  },
  {
    id: "stat",
    title: "Stat",
    controls: [
      enumControl("look", ["solid", "soft", "glass", "outline", "accent"], "soft"),
      enumControl("trend", ["up", "down", "flat"], "up"),
      textControl("label", "MRR"),
      textControl("value", "$42.8k"),
      textControl("trendLabel", "+12%"),
      textControl("hint", "vs last month"),
    ],
    render: (p) => (
      <Stat
        look={str(p, "look") as StatLook}
        trend={str(p, "trend") as StatTrend}
        label={str(p, "label")}
        value={str(p, "value")}
        trendLabel={str(p, "trendLabel")}
        hint={str(p, "hint") || undefined}
        style={{ width: 200 }}
      />
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["solid", "soft", "glass", "outline", "accent"] as const).map((look) => (
            <Stat
              key={look}
              look={look}
              label={look}
              value="128"
              trend="up"
              trendLabel="+4"
            />
          )),
        ),
      ),
      showcase("Trends", () =>
        strip(
          (["up", "down", "flat"] as const).map((trend) => (
            <Stat
              key={trend}
              trend={trend}
              label={trend}
              value="64"
              trendLabel="2%"
            />
          )),
        ),
      ),
    ],
  },
];
