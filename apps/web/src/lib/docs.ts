export type PropDoc = {
  name: string;
  type: string;
  default?: string;
  description: string;
};

export type ComponentDoc = {
  id: string;
  name: string;
  layer: "atom" | "molecule" | "organism";
  summary: string;
  importLine: string;
  example: string;
  props: PropDoc[];
};

export const COMPONENT_DOCS: ComponentDoc[] = [
  {
    id: "button",
    name: "Button",
    layer: "atom",
    summary:
      "Primary actions use solid accent. Ghost uses frost chrome. Supports loading, icons, full width.",
    importLine: 'import { Button } from "@softglass/ui";',
    example: `<Button variant="primary" size="md" leftIcon={<span>★</span>}>
  Save
</Button>
<Button variant="ghost" loading>Wait</Button>
<Button variant="outline" fullWidth>Full width</Button>`,
    props: [
      {
        name: "variant",
        type: '"primary" | "secondary" | "ghost" | "outline" | "danger" | "link"',
        default: '"primary"',
        description: "Visual style of the button.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Height and type scale.",
      },
      {
        name: "rounded",
        type: '"pill" | "soft" | "md"',
        default: '"pill"',
        description: "Corner radius language.",
      },
      {
        name: "look",
        type: '"solid" | "soft" | "glass" | "gradient" | "neon"',
        default: '"solid"',
        description: "Design language (works with variant).",
      },
      {
        name: "fullWidth",
        type: "boolean",
        default: "false",
        description: "Stretch to container width.",
      },
      {
        name: "loading",
        type: "boolean",
        default: "false",
        description: "Spinner + disabled interaction.",
      },
      {
        name: "leftIcon",
        type: "ReactNode",
        description: "Icon before the label.",
      },
      {
        name: "rightIcon",
        type: "ReactNode",
        description: "Icon after the label.",
      },
      {
        name: "iconOnly",
        type: "boolean",
        default: "false",
        description: "Square control for a single icon.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Native disabled state.",
      },
      {
        name: "type",
        type: '"button" | "submit" | "reset"',
        default: '"button"',
        description: "HTML button type.",
      },
      {
        name: "onClick",
        type: "MouseEventHandler",
        description: "Click handler.",
      },
      {
        name: "className",
        type: "string",
        description: "Extra class names.",
      },
    ],
  },
  {
    id: "input",
    name: "Input",
    layer: "atom",
    summary:
      "Solid field for readable forms. Label, hint, error, required mark, addons.",
    importLine: 'import { Input } from "@softglass/ui";',
    example: `<Input
  label="Email"
  type="email"
  requiredMark
  hint="We never share your email."
  leftAddon="@"
/>
<Input label="Name" error="Too short" />`,
    props: [
      {
        name: "label",
        type: "ReactNode",
        description: "Visible label linked via htmlFor.",
      },
      {
        name: "hint",
        type: "ReactNode",
        description: "Helper text under the field.",
      },
      {
        name: "error",
        type: "ReactNode",
        description: "Error message; sets aria-invalid.",
      },
      {
        name: "requiredMark",
        type: "boolean",
        default: "false",
        description: "Shows a red asterisk on the label.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Control size.",
      },
      {
        name: "fullWidth",
        type: "boolean",
        default: "true",
        description: "Width 100%.",
      },
      {
        name: "leftAddon",
        type: "ReactNode",
        description: "Prefix chrome inside the field.",
      },
      {
        name: "rightAddon",
        type: "ReactNode",
        description: "Suffix chrome inside the field.",
      },
      {
        name: "disabled",
        type: "boolean",
        description: "Native disabled.",
      },
      {
        name: "placeholder",
        type: "string",
        description: "Placeholder text.",
      },
      {
        name: "type",
        type: "string",
        default: '"text"',
        description: "Native input type.",
      },
    ],
  },
  {
    id: "badge",
    name: "Badge",
    layer: "atom",
    summary: "Soft pill labels with semantic colors, sizes, optional status dot.",
    importLine: 'import { Badge } from "@softglass/ui";',
    example: `<Badge variant="success" dot>Live</Badge>
<Badge variant="accent" size="sm">v0.1</Badge>`,
    props: [
      {
        name: "variant",
        type: '"default" | "accent" | "solid" | "success" | "warning" | "danger"',
        default: '"default"',
        description: "Color language.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Padding / type size.",
      },
      {
        name: "dot",
        type: "boolean",
        default: "false",
        description: "Leading status dot.",
      },
    ],
  },
  {
    id: "card",
    name: "Card",
    layer: "molecule",
    summary:
      "Surface container. Frost by default (fast). blur prop enables true glass.",
    importLine: 'import { Card, CardHeader, CardTitle } from "@softglass/ui";',
    example: `<Card surface="glass" padding="md" hoverable>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
</Card>`,
    props: [
      {
        name: "surface",
        type: '"solid" | "glass" | "glass-elevated"',
        default: '"glass"',
        description: "Material of the card shell.",
      },
      {
        name: "blur",
        type: "boolean",
        default: "false",
        description: "Live backdrop-filter (expensive — use sparingly).",
      },
      {
        name: "padding",
        type: '"none" | "sm" | "md" | "lg"',
        default: '"md"',
        description: "Inner spacing.",
      },
      {
        name: "hoverable",
        type: "boolean",
        default: "false",
        description: "Lift shadow on hover.",
      },
      {
        name: "clickable",
        type: "boolean",
        default: "false",
        description: "Pointer cursor for card-as-button patterns.",
      },
      {
        name: "as",
        type: '"article" | "div" | "section"',
        default: '"article"',
        description: "Rendered HTML element.",
      },
    ],
  },
  {
    id: "select",
    name: "Select",
    layer: "atom",
    summary:
      "Custom frost dropdown (not native OS list). Controlled via value / onValueChange.",
    importLine: 'import { Select } from "@softglass/ui";',
    example: `<Select
  label="Plan"
  placeholder="Choose…"
  options={[
    { value: "pro", label: "Pro" },
    { value: "team", label: "Team" },
  ]}
  onValueChange={setPlan}
/>`,
    props: [
      {
        name: "options",
        type: "SelectOption[]",
        description: "Required list of { value, label, disabled? }.",
      },
      {
        name: "value",
        type: "string",
        description: "Controlled value.",
      },
      {
        name: "defaultValue",
        type: "string",
        description: "Uncontrolled initial value.",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "Preferred change handler.",
      },
      {
        name: "placeholder",
        type: "string",
        default: '"Select…"',
        description: "Shown when nothing selected.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Trigger size.",
      },
      {
        name: "label / hint / error",
        type: "ReactNode",
        description: "Field meta like Input.",
      },
      {
        name: "disabled",
        type: "boolean",
        description: "Disable the control.",
      },
      {
        name: "name",
        type: "string",
        description: "Hidden input for native forms.",
      },
      {
        name: "placement",
        type: '"auto" | "bottom" | "top"',
        default: '"auto"',
        description: "Menu placement strategy.",
      },
    ],
  },
  {
    id: "switch",
    name: "Switch",
    layer: "atom",
    summary: "Accessible toggle with optional label + hint.",
    importLine: 'import { Switch } from "@softglass/ui";',
    example: `<Switch
  label="Glass chrome"
  hint="Nav uses frost surfaces."
  checked={on}
  onCheckedChange={setOn}
/>`,
    props: [
      {
        name: "checked",
        type: "boolean",
        description: "Controlled checked state.",
      },
      {
        name: "defaultChecked",
        type: "boolean",
        description: "Uncontrolled initial state.",
      },
      {
        name: "onCheckedChange",
        type: "(checked: boolean) => void",
        description: "Fires when toggled.",
      },
      {
        name: "label",
        type: "ReactNode",
        description: "Text next to the switch.",
      },
      {
        name: "hint",
        type: "ReactNode",
        description: "Secondary line under label.",
      },
      {
        name: "disabled",
        type: "boolean",
        description: "Disable interaction.",
      },
    ],
  },
  {
    id: "modal",
    name: "Modal",
    layer: "molecule",
    summary:
      "Controlled frost dialog portaled to document.body (viewport center, above sticky chrome). Escape + backdrop close + focus restore.",
    importLine: 'import { Modal, Button } from "@softglass/ui";',
    example: `<Modal
  open={open}
  onOpenChange={setOpen}
  title="Invite"
  description="Send a seat to your team."
  footer={<Button onClick={() => setOpen(false)}>Close</Button>}
>
  <Input label="Email" />
</Modal>`,
    props: [
      {
        name: "open",
        type: "boolean",
        description: "Controlled visibility.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Called when open state should change.",
      },
      {
        name: "title",
        type: "ReactNode",
        description: "Dialog title (required for a11y).",
      },
      {
        name: "description",
        type: "ReactNode",
        description: "Optional supporting text.",
      },
      {
        name: "footer",
        type: "ReactNode",
        description: "Action row.",
      },
      {
        name: "size",
        type: '"md" | "lg"',
        default: '"md"',
        description: "Panel width.",
      },
      {
        name: "closeOnBackdrop",
        type: "boolean",
        default: "true",
        description: "Click outside to close.",
      },
      {
        name: "closeOnEscape",
        type: "boolean",
        default: "true",
        description: "Escape key closes.",
      },
    ],
  },
  {
    id: "toast",
    name: "Toast",
    layer: "molecule",
    summary:
      "Wrap app in ToastProvider, then call useToast().toast(...). Viewport is portaled to body with a tight stack shadow.",
    importLine: 'import { ToastProvider, useToast } from "@softglass/ui";',
    example: `// layout
<ToastProvider>{children}</ToastProvider>

// client
const { toast } = useToast();
toast({ title: "Saved", variant: "success", description: "All good." });`,
    props: [
      {
        name: "title",
        type: "string",
        description: "Toast heading (required).",
      },
      {
        name: "description",
        type: "string",
        description: "Optional body.",
      },
      {
        name: "variant",
        type: '"default" | "success" | "warning" | "danger"',
        default: '"default"',
        description: "Border/semantic accent.",
      },
      {
        name: "duration",
        type: "number",
        default: "4200",
        description: "Auto-dismiss ms. 0 = sticky.",
      },
      {
        name: "position (Provider)",
        type: '"top-right" | "bottom-right" | "bottom-center"',
        default: '"bottom-right"',
        description: "Viewport placement.",
      },
    ],
  },
  {
    id: "tabs",
    name: "Tabs",
    layer: "molecule",
    summary:
      "Frost tab list. look = chrome; motion = indicator (default slide).",
    importLine: 'import { Tabs, TabsList, TabsTrigger, TabsContent } from "@softglass/ui";',
    example: `<Tabs defaultValue="a" look="pill" motion="slide">
  <TabsList>
    <TabsTrigger value="a">A</TabsTrigger>
    <TabsTrigger value="b">B</TabsTrigger>
  </TabsList>
  <TabsContent value="a">Panel A</TabsContent>
</Tabs>`,
    props: [
      {
        name: "value / defaultValue",
        type: "string",
        description: "Controlled or uncontrolled active tab.",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "Fires when tab changes.",
      },
      {
        name: "look",
        type: '"pill" | "underline" | "segmented"',
        default: '"pill"',
        description: "List chrome design.",
      },
      {
        name: "motion",
        type: '"none" | "fade" | "slide"',
        default: '"slide"',
        description: "Indicator / content motion. slide = moving pill or underline.",
      },
      {
        name: "TabsTrigger.value",
        type: "string",
        description: "Tab id (required).",
      },
      {
        name: "TabsContent.value",
        type: "string",
        description: "Panel id matching a trigger.",
      },
      {
        name: "forceMount",
        type: "boolean",
        default: "false",
        description: "Keep inactive panels mounted (hidden).",
      },
    ],
  },
  {
    id: "avatar",
    name: "Avatar",
    layer: "atom",
    summary: "Image with initials fallback. Group stacks with overlap.",
    importLine: 'import { Avatar, AvatarGroup } from "@softglass/ui";',
    example: `<Avatar size="lg" fallback="Ada Lovelace" />
<AvatarGroup>
  <Avatar fallback="A B" />
  <Avatar fallback="C D" />
</AvatarGroup>`,
    props: [
      {
        name: "src",
        type: "string | null",
        description: "Image URL.",
      },
      {
        name: "alt",
        type: "string",
        description: "Image alt text.",
      },
      {
        name: "fallback",
        type: "ReactNode | string",
        description: "Shown if no image; string → initials.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        default: '"md"',
        description: "Avatar diameter.",
      },
    ],
  },
  {
    id: "appshell",
    name: "AppShell",
    layer: "organism",
    summary: "Responsive header + optional sidebar + main content.",
    importLine: 'import { AppShell, ShellNav, ShellNavItem } from "@softglass/ui";',
    example: `<AppShell
  header={<>Logo</>}
  sidebar={<ShellNav><ShellNavItem active href="#">Home</ShellNavItem></ShellNav>}
>
  {children}
</AppShell>`,
    props: [
      {
        name: "header",
        type: "ReactNode",
        description: "Sticky top chrome content.",
      },
      {
        name: "sidebar",
        type: "ReactNode",
        description: "Desktop sidebar (≥900px).",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Main content.",
      },
    ],
  },
  {
    id: "checkbox",
    name: "Checkbox",
    layer: "atom",
    summary: "Frost checkbox with label/hint. Controlled or uncontrolled.",
    importLine: 'import { Checkbox } from "@softglass/ui";',
    example: `<Checkbox
  label="Email me tips"
  hint="Optional product updates."
  defaultChecked
  onCheckedChange={setOn}
/>`,
    props: [
      {
        name: "checked",
        type: "boolean",
        description: "Controlled checked state.",
      },
      {
        name: "defaultChecked",
        type: "boolean",
        description: "Uncontrolled initial state.",
      },
      {
        name: "onCheckedChange",
        type: "(checked: boolean) => void",
        description: "Fires when toggled.",
      },
      {
        name: "label",
        type: "ReactNode",
        description: "Primary label text.",
      },
      {
        name: "hint",
        type: "ReactNode",
        description: "Secondary helper line.",
      },
      {
        name: "disabled",
        type: "boolean",
        description: "Disable interaction.",
      },
      {
        name: "name / value",
        type: "string",
        description: "Native form attributes.",
      },
    ],
  },
  {
    id: "radio",
    name: "Radio / RadioGroup",
    layer: "atom",
    summary: "Frost radio + group that injects name/checked into children.",
    importLine: 'import { Radio, RadioGroup } from "@softglass/ui";',
    example: `<RadioGroup
  name="plan"
  label="Plan"
  defaultValue="pro"
  onValueChange={setPlan}
>
  <Radio value="starter" label="Starter" />
  <Radio value="pro" label="Pro" hint="Most popular" />
  <Radio value="team" label="Team" />
</RadioGroup>`,
    props: [
      {
        name: "RadioGroup.name",
        type: "string",
        description: "Shared radio name (required).",
      },
      {
        name: "RadioGroup.value / defaultValue",
        type: "string",
        description: "Controlled or uncontrolled selection.",
      },
      {
        name: "RadioGroup.onValueChange",
        type: "(value: string) => void",
        description: "Fires when selection changes.",
      },
      {
        name: "RadioGroup.label",
        type: "ReactNode",
        description: "Fieldset legend.",
      },
      {
        name: "Radio.value",
        type: "string",
        description: "Option value (required).",
      },
      {
        name: "Radio.label / hint",
        type: "ReactNode",
        description: "Option copy.",
      },
    ],
  },
  {
    id: "textarea",
    name: "Textarea",
    layer: "atom",
    summary: "Solid multi-line field with label/hint/error like Input.",
    importLine: 'import { Textarea } from "@softglass/ui";',
    example: `<Textarea
  label="Bio"
  requiredMark
  placeholder="Tell us about your product…"
  rows={4}
  hint="Markdown not supported yet."
/>`,
    props: [
      {
        name: "label / hint / error",
        type: "ReactNode",
        description: "Field meta.",
      },
      {
        name: "requiredMark",
        type: "boolean",
        default: "false",
        description: "Red asterisk on label.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Min height / type size.",
      },
      {
        name: "autoSize",
        type: "boolean",
        default: "false",
        description: "Content-sized where supported; no manual resize.",
      },
      {
        name: "fullWidth",
        type: "boolean",
        default: "true",
        description: "Width 100%.",
      },
      {
        name: "rows",
        type: "number",
        description: "Native rows attribute.",
      },
    ],
  },
  {
    id: "tooltip",
    name: "Tooltip",
    layer: "atom",
    summary: "Short frost tip on hover/focus. Keep content brief.",
    importLine: 'import { Tooltip, Button } from "@softglass/ui";',
    example: `<Tooltip content="Deletes the project" placement="top">
  <Button variant="danger" size="sm">Delete</Button>
</Tooltip>`,
    props: [
      {
        name: "content",
        type: "ReactNode",
        description: "Tooltip body (required).",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Trigger element.",
      },
      {
        name: "placement",
        type: '"top" | "bottom"',
        default: '"top"',
        description: "Tooltip side.",
      },
      {
        name: "delayMs",
        type: "number",
        default: "80",
        description: "Open delay.",
      },
      {
        name: "enabled",
        type: "boolean",
        default: "true",
        description: "Turn tooltip off without removing markup.",
      },
    ],
  },
  {
    id: "alert",
    name: "Alert",
    layer: "atom",
    summary: "Inline callout banner. Danger uses role=alert; others role=status.",
    importLine: 'import { Alert } from "@softglass/ui";',
    example: `<Alert variant="warning" title="Check contrast">
  Prefer solid surfaces for long form text.
</Alert>`,
    props: [
      {
        name: "variant",
        type: '"info" | "success" | "warning" | "danger"',
        default: '"info"',
        description: "Semantic tone.",
      },
      {
        name: "title",
        type: "ReactNode",
        description: "Optional bold heading.",
      },
      {
        name: "icon",
        type: "ReactNode",
        description: "Optional leading icon (replaces color marker).",
      },
    ],
  },
  {
    id: "skeleton",
    name: "Skeleton",
    layer: "atom",
    summary: "Shimmer placeholder while content loads.",
    importLine: 'import { Skeleton } from "@softglass/ui";',
    example: `<Skeleton height={14} />
<Skeleton circle width={40} height={40} />`,
    props: [
      {
        name: "width / height",
        type: "number | string",
        description: "Size (number = px).",
      },
      {
        name: "circle",
        type: "boolean",
        default: "false",
        description: "Avatar-style circle.",
      },
      {
        name: "rounded",
        type: '"sm" | "md" | "lg" | "full"',
        default: '"md"',
        description: "Corner radius when not circle.",
      },
    ],
  },
  {
    id: "spinner",
    name: "Spinner",
    layer: "atom",
    summary: "Standalone loading indicator with accessible label.",
    importLine: 'import { Spinner } from "@softglass/ui";',
    example: `<Spinner label="Loading projects" size="md" />`,
    props: [
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Visual size.",
      },
      {
        name: "label",
        type: "string",
        default: '"Loading"',
        description: "Screen reader label.",
      },
    ],
  },
  {
    id: "separator",
    name: "Separator",
    layer: "atom",
    summary: "Soft hairline divider for cards and forms.",
    importLine: 'import { Separator } from "@softglass/ui";',
    example: `<Separator />
<Separator orientation="vertical" />`,
    props: [
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        default: '"horizontal"',
        description: "Axis of the line.",
      },
      {
        name: "decorative",
        type: "boolean",
        default: "true",
        description: "When true, no separator role (pure visual).",
      },
    ],
  },
  {
    id: "form-field",
    name: "FormField / Label",
    layer: "atom",
    summary: "Compose custom controls with label + hint + error layout.",
    importLine: 'import { FormField, Label } from "@softglass/ui";',
    example: `<FormField label="Plan" hint="Billed monthly" htmlFor="plan">
  <select id="plan">…</select>
</FormField>`,
    props: [
      {
        name: "label / hint / error",
        type: "ReactNode",
        description: "Field meta.",
      },
      {
        name: "htmlFor",
        type: "string",
        description: "Associates the label with a control id.",
      },
      {
        name: "requiredMark",
        type: "boolean",
        default: "false",
        description: "Asterisk on label.",
      },
    ],
  },
];
