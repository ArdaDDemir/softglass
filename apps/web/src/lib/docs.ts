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
    id: "combobox",
    name: "Combobox",
    layer: "atom",
    summary:
      "Searchable single-select. Local filter or async via onSearch + loading.",
    importLine: 'import { Combobox } from "@softglass/ui";',
    example: `<Combobox
  label="City"
  options={cities}
  value={city}
  onValueChange={setCity}
  onSearch={setQuery}
  loading={busy}
  placeholder="Search…"
/>`,
    props: [
      {
        name: "options",
        type: "SelectOption[]",
        description: "Same shape as Select.",
      },
      {
        name: "value / onValueChange",
        type: "string / (v: string) => void",
        description: "Controlled selection.",
      },
      {
        name: "filterOption",
        type: "(option, query) => boolean",
        description: "Local filter (skipped when onSearch is set).",
      },
      {
        name: "onSearch",
        type: "(query: string) => void",
        description: "Debounced async search hook.",
      },
      {
        name: "loading / loadingMessage",
        type: "boolean / string",
        description: "Async empty-state while searching.",
      },
      {
        name: "emptyMessage",
        type: "string",
        default: '"No matches"',
        description: "Empty filter state.",
      },
    ],
  },
  {
    id: "multi-select",
    name: "MultiSelect",
    layer: "atom",
    summary:
      "Multi chips + body portal. Filter-in-menu narrows options (default on).",
    importLine: 'import { MultiSelect } from "@softglass/ui";',
    example: `<MultiSelect
  label="Tags"
  options={tags}
  value={selected}
  onValueChange={setSelected}
  filterable
  maxSelected={4}
/>`,
    props: [
      {
        name: "value",
        type: "string[]",
        description: "Controlled selected values.",
      },
      {
        name: "onValueChange",
        type: "(value: string[]) => void",
        description: "Fires on toggle / chip remove.",
      },
      {
        name: "filterable",
        type: "boolean",
        default: "true",
        description: "Show filter input inside the menu.",
      },
      {
        name: "maxSelected",
        type: "number",
        description: "Soft cap — extra options disable when full.",
      },
    ],
  },
  {
    id: "date-picker",
    name: "DatePicker",
    layer: "atom",
    summary:
      "Single ISO date. Day/month/year grids. Panel is body-portaled with flip/clamp (Select language).",
    importLine: 'import { DatePicker } from "@softglass/ui";',
    example: `<DatePicker
  label="Launch date"
  value={date}
  onValueChange={setDate}
  placement="auto"
/>`,
    props: [
      {
        name: "value / defaultValue",
        type: "string (YYYY-MM-DD)",
        description: "Controlled or uncontrolled ISO date.",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "Fires with ISO date on pick.",
      },
      {
        name: "label / hint / error",
        type: "ReactNode",
        description: "Same field meta as Input / Select.",
      },
      {
        name: "min / max",
        type: "string (YYYY-MM-DD)",
        description: "Inclusive bounds; out-of-range days disabled.",
      },
      {
        name: "motion",
        type: '"none" | "fade" | "scale" | "slide-down"',
        default: '"scale"',
        description: "Calendar panel enter/exit.",
      },
      {
        name: "placement",
        type: '"auto" | "bottom" | "top"',
        default: '"auto"',
        description: "Panel side relative to trigger.",
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
    id: "dropdown-menu",
    name: "DropdownMenu",
    layer: "molecule",
    summary:
      "Action menu (not value pick — use Select). Frost panel, keyboard arrows, destructive items. Pass a Button as trigger (props merge; no nested buttons).",
    importLine: 'import { DropdownMenu, Button } from "@softglass/ui";',
    example: `<DropdownMenu
  trigger={<Button variant="outline">Actions</Button>}
  items={[
    { label: "Edit", onSelect: () => {} },
    { type: "separator" },
    { label: "Delete", destructive: true, onSelect: () => {} },
  ]}
/>`,
    props: [
      {
        name: "trigger",
        type: "ReactNode",
        description: "Prefer a single Button element; ARIA + click are merged in.",
      },
      {
        name: "items",
        type: "DropdownMenuEntry[]",
        description: "item | separator | label entries.",
      },
      {
        name: "open / defaultOpen / onOpenChange",
        type: "controlled or uncontrolled",
        description: "Optional controlled open state.",
      },
      {
        name: "placement",
        type: '"auto" | "bottom" | "top"',
        default: '"auto"',
        description: "Panel side strategy.",
      },
      {
        name: "align",
        type: '"start" | "center" | "end"',
        default: '"start"',
        description: "Horizontal alignment to trigger.",
      },
      {
        name: "motion",
        type: '"none" | "fade" | "scale" | "slide-down"',
        default: '"scale"',
        description: "Enter/exit panel motion (usePresence).",
      },
    ],
  },
  {
    id: "context-menu",
    name: "ContextMenu",
    layer: "molecule",
    summary:
      "Right-click / long-press action menu. Same items language as DropdownMenu; opens at the pointer (fixed), not under a button.",
    importLine: 'import { ContextMenu } from "@softglass/ui";',
    example: `<ContextMenu
  items={[
    { label: "Open", onSelect: () => {} },
    { type: "separator" },
    { label: "Delete", destructive: true, onSelect: () => {} },
  ]}
>
  <div>Right-click me</div>
</ContextMenu>`,
    props: [
      {
        name: "children",
        type: "ReactNode",
        description: "Surface that receives contextmenu + long-press.",
      },
      {
        name: "items",
        type: "ContextMenuEntry[]",
        description: "Same shape as DropdownMenu: item | separator | label.",
      },
      {
        name: "open / defaultOpen / onOpenChange",
        type: "controlled or uncontrolled",
        description: "Optional controlled open state.",
      },
      {
        name: "motion",
        type: '"none" | "fade" | "scale" | "slide-down"',
        default: '"scale"',
        description: "Enter/exit panel motion (usePresence).",
      },
      {
        name: "longPressMs",
        type: "number",
        default: "500",
        description: "Touch long-press delay before open.",
      },
      {
        name: "disabled",
        type: "boolean",
        description: "Ignores right-click and long-press.",
      },
    ],
  },
  {
    id: "popover",
    name: "Popover",
    layer: "molecule",
    summary:
      "Free-form frost panel anchored to a trigger. Escape + outside click. Non-modal (no focus trap) — use Modal for blocking dialogs.",
    importLine: 'import { Popover, Button } from "@softglass/ui";',
    example: `<Popover trigger={<Button>Info</Button>} aria-label="Details">
  <p>Any content — text, form bits, links.</p>
</Popover>`,
    props: [
      {
        name: "trigger",
        type: "ReactNode",
        description: "Click target that toggles the panel.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Panel body.",
      },
      {
        name: "open / defaultOpen / onOpenChange",
        type: "controlled or uncontrolled",
        description: "Optional controlled open state.",
      },
      {
        name: "placement",
        type: '"auto" | "bottom" | "top"',
        default: '"auto"',
        description: "Panel side strategy.",
      },
      {
        name: "align",
        type: '"start" | "center" | "end"',
        default: '"start"',
        description: "Horizontal alignment.",
      },
      {
        name: "motion",
        type: '"none" | "fade" | "scale" | "slide-down"',
        default: '"scale"',
        description: "Enter recipe.",
      },
      {
        name: "closeOnOutside / closeOnEscape",
        type: "boolean",
        default: "true",
        description: "Dismiss behavior.",
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
    id: "progress",
    name: "Progress",
    layer: "atom",
    summary:
      "Linear progress bar — set value for determinate, omit for indeterminate.",
    importLine: 'import { Progress } from "@softglass/ui";',
    example: `<Progress value={64} label="Upload" />
<Progress size="sm" />`,
    props: [
      {
        name: "value",
        type: "number | null",
        description: "Current value. Omit / null → indeterminate animation.",
      },
      {
        name: "max",
        type: "number",
        default: "100",
        description: "Upper bound for value.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Track thickness.",
      },
      {
        name: "look",
        type: '"soft" | "solid" | "glass" | "accent" | "striped"',
        default: '"soft"',
        description: "Track / fill chrome language.",
      },
      {
        name: "variant",
        type: '"accent" | "success" | "warning" | "danger" | "muted"',
        default: '"accent"',
        description: "Semantic fill color.",
      },
      {
        name: "label",
        type: "string",
        default: '"Progress"',
        description: "Accessible name (aria-label).",
      },
    ],
  },
  {
    id: "status-dot",
    name: "StatusDot",
    layer: "atom",
    summary:
      "Tiny presence indicator — semantic statuses or a custom color.",
    importLine: 'import { StatusDot } from "@softglass/ui";',
    example: `<StatusDot status="online" look="glow" />
<StatusDot status="busy" look="outline" pulse={false} />
<StatusDot color="#6366f1" look="solid" label="Custom" />`,
    props: [
      {
        name: "status",
        type: '"online" | "busy" | "offline" | "away"',
        default: '"online"',
        description: "Semantic color (success / danger / muted / warning).",
      },
      {
        name: "look",
        type: '"soft" | "solid" | "outline" | "glow"',
        default: '"soft"',
        description: "Dot chrome (ring / hollow / glow).",
      },
      {
        name: "color",
        type: "string",
        description: "CSS color override (wins over status fill).",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Dot diameter.",
      },
      {
        name: "pulse",
        type: "boolean",
        default: "true when status=online",
        description: "Soft ping ring.",
      },
      {
        name: "label",
        type: "string",
        description: "Screen reader name (defaults from status).",
      },
    ],
  },
  {
    id: "slider",
    name: "Slider",
    layer: "atom",
    summary: "Single-value range with field meta. Arrow keys work (native range).",
    importLine: 'import { Slider } from "@softglass/ui";',
    example: `<Slider
  label="Opacity"
  value={40}
  onValueChange={setOpacity}
  min={0}
  max={100}
  step={1}
/>`,
    props: [
      {
        name: "value / defaultValue",
        type: "number",
        description: "Controlled or uncontrolled value.",
      },
      {
        name: "onValueChange",
        type: "(value: number) => void",
        description: "Fires on drag / keyboard change.",
      },
      {
        name: "min / max / step",
        type: "number",
        default: "0 / 100 / 1",
        description: "Range bounds and increment.",
      },
      {
        name: "label / hint / error",
        type: "ReactNode",
        description: "Field meta (same language as Input).",
      },
      {
        name: "showValue",
        type: "boolean",
        default: "true",
        description: "Show numeric value next to label.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Track thickness / thumb size.",
      },
      {
        name: "look",
        type: '"soft" | "solid" | "glass" | "accent"',
        default: '"soft"',
        description: "Track / thumb visual language.",
      },
    ],
  },
  {
    id: "number-input",
    name: "NumberInput",
    layer: "atom",
    summary: "Numeric field with +/− steppers, min/max/step, field meta.",
    importLine: 'import { NumberInput } from "@softglass/ui";',
    example: `<NumberInput
  label="Quantity"
  value={qty}
  onValueChange={setQty}
  min={1}
  max={99}
  step={1}
/>`,
    props: [
      {
        name: "value / defaultValue",
        type: "number | null",
        description: "Empty field → null.",
      },
      {
        name: "onValueChange",
        type: "(value: number | null) => void",
        description: "Controlled updates.",
      },
      {
        name: "min / max / step",
        type: "number",
        default: "step=1",
        description: "Bounds + stepper delta.",
      },
      {
        name: "hideSteppers",
        type: "boolean",
        default: "false",
        description: "Hide custom +/− buttons.",
      },
      {
        name: "look",
        type: '"soft" | "solid" | "outline" | "ghost"',
        default: '"soft"',
        description: "Shell + stepper visual language.",
      },
      {
        name: "label / hint / error",
        type: "ReactNode",
        description: "Field meta.",
      },
    ],
  },
  {
    id: "file-field",
    name: "FileField",
    layer: "atom",
    summary:
      "Solid file picker with basic name list. No upload / cloud backend.",
    importLine: 'import { FileField } from "@softglass/ui";',
    example: `<FileField
  label="Avatar"
  accept="image/*"
  onFilesChange={setFiles}
  hint="PNG or JPG, max ~2MB (you enforce)."
/>`,
    props: [
      {
        name: "files / onFilesChange",
        type: "File[] / (files: File[]) => void",
        description: "Controlled list of selected File objects.",
      },
      {
        name: "multiple",
        type: "boolean",
        default: "false",
        description: "Allow more than one file.",
      },
      {
        name: "accept",
        type: "string",
        description: "Native accept filter (e.g. image/*).",
      },
      {
        name: "buttonLabel / emptyLabel",
        type: "string",
        description: "Trigger + empty summary copy.",
      },
      {
        name: "clearable",
        type: "boolean",
        default: "true",
        description: "Show remove / clear controls.",
      },
      {
        name: "look",
        type: '"solid" | "soft" | "dashed" | "ghost"',
        default: '"solid"',
        description: "Trigger surface language (dashed ≈ dropzone chrome, no upload).",
      },
      {
        name: "label / hint / error",
        type: "ReactNode",
        description: "Field meta.",
      },
    ],
  },
  {
    id: "link",
    name: "Link",
    layer: "atom",
    summary: "Text link. Plain <a href> — wrap with next/link in App Router as needed.",
    importLine: 'import { Link } from "@softglass/ui";',
    example: `<Link href="/docs">Docs</Link>
<Link href="https://example.com" external>External</Link>`,
    props: [
      {
        name: "href",
        type: "string",
        description: "Required destination.",
      },
      {
        name: "external",
        type: "boolean",
        default: "false",
        description: "target=_blank + rel=noopener noreferrer + ↗ cue.",
      },
      {
        name: "look",
        type: '"accent" | "muted" | "subtle" | "underline"',
        default: '"accent"',
        description: "Text style language.",
      },
    ],
  },
  {
    id: "chip",
    name: "Chip",
    layer: "atom",
    summary: "Selectable and/or removable pill for filters and tags.",
    importLine: 'import { Chip } from "@softglass/ui";',
    example: `<Chip selected onSelectedChange={setOn}>Aurora</Chip>
<Chip removable onRemove={remove}>Tag</Chip>`,
    props: [
      {
        name: "selected / onSelectedChange",
        type: "boolean / (v: boolean) => void",
        description: "Toggle selection (aria-pressed).",
      },
      {
        name: "removable / onRemove",
        type: "boolean / () => void",
        description: "Dismiss control (CloseButton).",
      },
      {
        name: "look",
        type: '"soft" | "solid" | "outline" | "glass" | "glow"',
        default: '"soft"',
        description: "Visual language.",
      },
      {
        name: "interactive",
        type: "boolean",
        default: "true",
        description: "False → static tag (still can remove).",
      },
    ],
  },
  {
    id: "close-button",
    name: "CloseButton",
    layer: "atom",
    summary: "Shared dismiss control for Chip and chrome.",
    importLine: 'import { CloseButton } from "@softglass/ui";',
    example: `<CloseButton look="soft" onClick={onClose} label="Dismiss" />`,
    props: [
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Hit target size.",
      },
      {
        name: "look",
        type: '"ghost" | "soft" | "solid" | "danger"',
        default: '"ghost"',
        description: "Chrome language.",
      },
      {
        name: "label",
        type: "string",
        default: '"Close"',
        description: "aria-label.",
      },
    ],
  },
  {
    id: "password-input",
    name: "PasswordInput",
    layer: "atom",
    summary: "Password field with Show / Hide + multi-look shells.",
    importLine: 'import { PasswordInput } from "@softglass/ui";',
    example: `<PasswordInput label="Password" look="soft" requiredMark />`,
    props: [
      {
        name: "look",
        type: '"soft" | "solid" | "glass" | "outline" | "ghost"',
        default: '"soft"',
        description: "Shell language.",
      },
      {
        name: "revealed / onRevealedChange",
        type: "boolean / (v: boolean) => void",
        description: "Controlled visibility of characters.",
      },
      {
        name: "label / hint / error",
        type: "ReactNode",
        description: "Field meta (same as Input).",
      },
    ],
  },
  {
    id: "search-input",
    name: "SearchInput",
    layer: "atom",
    summary: "Free-text search with clear + multi-look shells. Not Combobox.",
    importLine: 'import { SearchInput } from "@softglass/ui";',
    example: `<SearchInput
  label="Search"
  look="soft"
  value={q}
  onValueChange={setQ}
/>`,
    props: [
      {
        name: "look",
        type: '"soft" | "solid" | "glass" | "outline" | "ghost"',
        default: '"soft"',
        description: "Shell language.",
      },
      {
        name: "value / onValueChange",
        type: "string / (v: string) => void",
        description: "Controlled text.",
      },
      {
        name: "clearable",
        type: "boolean",
        default: "true",
        description: "Show clear control when non-empty.",
      },
      {
        name: "label / hint / error",
        type: "ReactNode",
        description: "Field meta.",
      },
    ],
  },
  {
    id: "visually-hidden",
    name: "VisuallyHidden",
    layer: "atom",
    summary: "Hide content visually; keep it for assistive tech.",
    importLine: 'import { VisuallyHidden } from "@softglass/ui";',
    example: `<button type="button">
  <VisuallyHidden>Close dialog</VisuallyHidden>
  <span aria-hidden>×</span>
</button>`,
    props: [
      {
        name: "as",
        type: '"span" | "div" | "legend"',
        default: '"span"',
        description: "Element type.",
      },
    ],
  },
  {
    id: "circular-progress",
    name: "CircularProgress",
    layer: "atom",
    summary: "Ring progress — value or indeterminate spin.",
    importLine: 'import { CircularProgress } from "@softglass/ui";',
    example: `<CircularProgress value={72} label="Upload" />
<CircularProgress label="Loading" />`,
    props: [
      {
        name: "value",
        type: "number | null",
        description: "Omit → indeterminate.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Ring diameter.",
      },
      {
        name: "variant",
        type: '"accent" | "success" | "warning" | "danger" | "muted"',
        default: '"accent"',
        description: "Stroke color.",
      },
      {
        name: "showValue",
        type: "boolean",
        default: "true",
        description: "Center percent when determinate.",
      },
    ],
  },
  {
    id: "segmented-control",
    name: "SegmentedControl",
    layer: "atom",
    summary: "Single-select segmented buttons (role=radiogroup).",
    importLine: 'import { SegmentedControl } from "@softglass/ui";',
    example: `<SegmentedControl
  label="Range"
  value={v}
  onValueChange={setV}
  options={[
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
  ]}
/>`,
    props: [
      {
        name: "options",
        type: "{ value, label, disabled? }[]",
        description: "Segments.",
      },
      {
        name: "value / onValueChange",
        type: "string / (v: string) => void",
        description: "Controlled selection.",
      },
      {
        name: "look",
        type: '"soft" | "solid" | "outline"',
        default: '"soft"',
        description: "Track language.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Density.",
      },
    ],
  },
  {
    id: "kbd",
    name: "Kbd",
    layer: "atom",
    summary: "Keyboard key glyph.",
    importLine: 'import { Kbd } from "@softglass/ui";',
    example: `Press <Kbd>⌘</Kbd> <Kbd>K</Kbd>`,
    props: [
      {
        name: "size",
        type: '"sm" | "md"',
        default: '"md"',
        description: "Key size.",
      },
    ],
  },
  {
    id: "code",
    name: "Code",
    layer: "atom",
    summary: "Inline or block monospace — not a highlighter.",
    importLine: 'import { Code } from "@softglass/ui";',
    example: `<Code>npm i @softglass/ui</Code>
<Code block>{\`const x = 1;\`}</Code>`,
    props: [
      {
        name: "block",
        type: "boolean",
        default: "false",
        description: "Pre-like block.",
      },
    ],
  },
  {
    id: "skip-link",
    name: "SkipLink",
    layer: "atom",
    summary: "Skip to content — off-screen until focused.",
    importLine: 'import { SkipLink } from "@softglass/ui";',
    example: `<SkipLink href="#main" />`,
    props: [
      {
        name: "href",
        type: "string",
        default: '"#main"',
        description: "Target id.",
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
  {
    id: "collapsible",
    name: "Collapsible",
    layer: "molecule",
    summary:
      "Single disclosure panel — open / defaultOpen / onOpenChange + trigger body.",
    importLine: 'import { Collapsible } from "@softglass/ui";',
    example: `<Collapsible
  trigger="Gizlilik notu"
  defaultOpen={false}
  look="soft"
>
  Bu paneli sadece gerekince aç.
</Collapsible>`,
    props: [
      {
        name: "trigger",
        type: "ReactNode",
        description: "Button label / node.",
      },
      {
        name: "open / defaultOpen / onOpenChange",
        type: "boolean / boolean / (open: boolean) => void",
        description: "Controlled or uncontrolled open state.",
      },
      {
        name: "look",
        type: '"soft" | "solid" | "glass" | "outline" | "ghost"',
        default: '"soft"',
        description: "Surface language (frost card → flush list).",
      },
      {
        name: "motion",
        type: '"none" | "fade" | "height"',
        default: '"height"',
        description: "Open motion recipe (height uses CSS grid collapse).",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Locks the trigger.",
      },
    ],
  },
  {
    id: "accordion",
    name: "Accordion",
    layer: "molecule",
    summary:
      "FAQ-style panels via items[] — type single | multiple (Select/Dropdown language).",
    importLine: 'import { Accordion } from "@softglass/ui";',
    example: `<Accordion
  type="single"
  defaultValue="a"
  look="soft"
  items={[
    { value: "a", trigger: "What is Softglass?", content: "A soft-glass kit." },
    { value: "b", trigger: "Is it free?", content: "MIT." },
  ]}
/>`,
    props: [
      {
        name: "items",
        type: "{ value, trigger, content, disabled? }[]",
        description: "Panel definitions (items API first).",
      },
      {
        name: "type",
        type: '"single" | "multiple"',
        default: '"single"',
        description: "One open panel vs many.",
      },
      {
        name: "value / defaultValue / onValueChange",
        type: "string | string[]",
        description: "Controlled or uncontrolled open values.",
      },
      {
        name: "collapsible",
        type: "boolean",
        default: "true",
        description: "When type=single, allow closing the open item.",
      },
      {
        name: "look",
        type: '"soft" | "solid" | "glass" | "outline" | "ghost"',
        default: '"soft"',
        description: "Surface language.",
      },
      {
        name: "motion",
        type: '"none" | "fade" | "height"',
        default: '"height"',
        description: "Panel open motion.",
      },
    ],
  },
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    layer: "molecule",
    summary:
      "Path trail. Navigable crumbs reuse Link; last item is current page.",
    importLine: 'import { Breadcrumb } from "@softglass/ui";',
    example: `<Breadcrumb
  look="soft"
  items={[
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs" },
    { label: "Accordion" },
  ]}
/>
<Breadcrumb look="pill" items={…} />`,
    props: [
      {
        name: "items",
        type: "{ label, href? }[]",
        description: "Crumbs. Omit href on current page.",
      },
      {
        name: "look",
        type: '"plain" | "soft" | "pill"',
        default: '"plain"',
        description: "plain path · soft tray · pill chips.",
      },
      {
        name: "separator",
        type: "ReactNode",
        default: '"/"',
        description: "Between crumbs (pill defaults to · when /).",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        default: '"md"',
        description: "Type scale.",
      },
    ],
  },
  {
    id: "pagination",
    name: "Pagination",
    layer: "molecule",
    summary:
      "Known total pages — page / pageCount / onPageChange (compact or numbered).",
    importLine: 'import { Pagination } from "@softglass/ui";',
    example: `<Pagination
  page={page}
  pageCount={12}
  onPageChange={setPage}
  look="soft"
/>
<Pagination page={page} pageCount={12} onPageChange={setPage} look="glass" compact />`,
    props: [
      {
        name: "page",
        type: "number",
        description: "1-based current page.",
      },
      {
        name: "pageCount",
        type: "number",
        description: "Total pages.",
      },
      {
        name: "onPageChange",
        type: "(page: number) => void",
        description: "Fires when user picks a page.",
      },
      {
        name: "compact",
        type: "boolean",
        default: "false",
        description: "Prev/next + status only.",
      },
      {
        name: "siblingCount",
        type: "number",
        default: "1",
        description: "Pages around current in full mode.",
      },
      {
        name: "look",
        type: '"soft" | "solid" | "ghost" | "glass"',
        default: '"soft"',
        description: "soft/glass = pill tray; solid = loose buttons.",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        default: '"md"',
        description: "Control density.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Locks all controls.",
      },
    ],
  },
  {
    id: "empty-state",
    name: "EmptyState",
    layer: "molecule",
    summary:
      "Zero-data surface — icon / title / description / actions. Solid default for readable copy.",
    importLine: 'import { EmptyState, Button } from "@softglass/ui";',
    example: `<EmptyState
  icon={<span>📁</span>}
  title="Henüz proje yok"
  description="İlk projeni oluşturarak başla."
  actions={<Button>Create project</Button>}
  look="solid"
/>`,
    props: [
      {
        name: "icon",
        type: "ReactNode",
        description: "Optional leading mark.",
      },
      {
        name: "title",
        type: "ReactNode",
        description: "Primary empty message.",
      },
      {
        name: "description",
        type: "ReactNode",
        description: "Supporting copy.",
      },
      {
        name: "actions",
        type: "ReactNode",
        description: "CTA row (usually Button).",
      },
      {
        name: "look",
        type: '"solid" | "soft" | "outline"',
        default: '"solid"',
        description: "Surface language.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Padding / type scale.",
      },
    ],
  },
  {
    id: "sheet",
    name: "Sheet",
    layer: "molecule",
    summary:
      "Edge panel (Drawer alias in docs) — portal + usePresence + focus trap.",
    importLine: 'import { Sheet, Button } from "@softglass/ui";',
    example: `<Sheet
  open={open}
  onOpenChange={setOpen}
  title="Settings"
  side="right"
  description="Account preferences"
>
  …
</Sheet>`,
    props: [
      {
        name: "open / onOpenChange",
        type: "boolean / (open: boolean) => void",
        description: "Controlled open state.",
      },
      {
        name: "title",
        type: "ReactNode",
        description: "Dialog title (required for a11y).",
      },
      {
        name: "side",
        type: '"left" | "right" | "bottom"',
        default: '"right"',
        description: "Edge placement.",
      },
      {
        name: "motion",
        type: '"none" | "slide" | "fade"',
        default: '"slide"',
        description: "Enter / exit recipe.",
      },
      {
        name: "description / footer / children",
        type: "ReactNode",
        description: "Optional regions.",
      },
      {
        name: "closeOnBackdrop / closeOnEscape",
        type: "boolean",
        default: "true",
        description: "Dismiss behavior.",
      },
    ],
  },
  {
    id: "hover-card",
    name: "HoverCard",
    layer: "molecule",
    summary:
      "Delayed preview (Popover family) — openDelay / closeDelay + body portal.",
    importLine: 'import { HoverCard, Avatar } from "@softglass/ui";',
    example: `<HoverCard
  trigger={<a href="#u">@ada</a>}
  openDelay={280}
  closeDelay={160}
>
  <strong>Ada Lovelace</strong>
  <p>Mathematician</p>
</HoverCard>`,
    props: [
      {
        name: "trigger",
        type: "ReactNode",
        description: "Hover / focus target.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Preview body.",
      },
      {
        name: "openDelay / closeDelay",
        type: "number",
        default: "280 / 160",
        description: "Milliseconds.",
      },
      {
        name: "placement / align",
        type: "auto|top|bottom / start|center|end",
        description: "Floating placement (portal).",
      },
      {
        name: "motion",
        type: '"none" | "fade" | "scale" | "slide-down"',
        default: '"scale"',
        description: "Panel enter recipe.",
      },
    ],
  },
  {
    id: "stepper",
    name: "Stepper",
    layer: "molecule",
    summary:
      "Wizard step indicator — steps[] + activeStep (0-based). Optional interactive jump.",
    importLine: 'import { Stepper } from "@softglass/ui";',
    example: `<Stepper
  activeStep={step}
  onActiveStepChange={setStep}
  interactive
  steps={[
    { label: "Details", description: "Name & plan" },
    { label: "Team" },
    { label: "Review" },
  ]}
/>`,
    props: [
      {
        name: "steps",
        type: "{ label, description?, value?, disabled? }[]",
        description: "Step definitions.",
      },
      {
        name: "activeStep / defaultActiveStep / onActiveStepChange",
        type: "number",
        description: "0-based active index.",
      },
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        default: '"horizontal"',
        description: "Layout axis.",
      },
      {
        name: "interactive",
        type: "boolean",
        default: "false",
        description: "Click completed/current to jump.",
      },
      {
        name: "look",
        type: '"soft" | "solid" | "outline" | "dots" | "pills"',
        default: '"soft"',
        description: "Structural recipe (not tint-only).",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        default: '"md"',
        description: "Indicator density.",
      },
    ],
  },
  {
    id: "toolbar",
    name: "Toolbar",
    layer: "molecule",
    summary: "Action strip — compose SearchInput, Button, Badge. Look recipes include accent rail.",
    importLine: 'import { Toolbar, ToolbarGroup, ToolbarSpacer, ToolbarSeparator } from "@softglass/ui";',
    example: `<Toolbar look="accent">
  <ToolbarGroup inset>
    <SearchInput placeholder="Search…" />
  </ToolbarGroup>
  <ToolbarSpacer />
  <ToolbarGroup>
    <Badge>3</Badge>
    <ToolbarSeparator />
    <Button size="sm">New</Button>
  </ToolbarGroup>
</Toolbar>`,
    props: [
      {
        name: "look",
        type: '"soft" | "solid" | "glass" | "ghost" | "accent"',
        default: '"soft"',
        description: "Strip chrome recipe.",
      },
      {
        name: "align",
        type: '"start" | "between" | "end"',
        default: '"between"',
        description: "Main cluster justification.",
      },
      {
        name: "ToolbarGroup / Spacer / Separator",
        type: "subcomponents",
        description: "inset group, flex spacer, vertical rule.",
      },
    ],
  },
  {
    id: "list",
    name: "List",
    layer: "molecule",
    summary: "Host for ListItem atoms — density / dividers / looks. Does not re-skin rows.",
    importLine: 'import { List, ListItem } from "@softglass/ui";',
    example: `<List look="inset" dividers>
  <ListItem title="Alpha" selected />
  <ListItem title="Beta" />
</List>`,
    props: [
      {
        name: "look",
        type: '"soft" | "solid" | "outline" | "ghost" | "inset"',
        default: '"soft"',
        description: "Host surface recipe.",
      },
      {
        name: "density",
        type: '"comfortable" | "compact" | "relaxed"',
        default: '"comfortable"',
        description: "Row padding.",
      },
      {
        name: "dividers",
        type: "boolean",
        default: "false",
        description: "Hairlines between children.",
      },
      {
        name: "as",
        type: '"div" | "ul" | "ol"',
        default: '"div"',
        description: "Default div for ListItem rows.",
      },
    ],
  },
  {
    id: "stat",
    name: "Stat",
    layer: "molecule",
    summary: "KPI metric tile — label / value / hint / trend; accent rail look.",
    importLine: 'import { Stat } from "@softglass/ui";',
    example: `<Stat
  look="accent"
  icon={<span>◎</span>}
  label="Revenue"
  value="$12.4k"
  hint="Last 30 days"
  trend="up"
  trendLabel="+8%"
/>`,
    props: [
      {
        name: "label / value",
        type: "ReactNode",
        description: "Primary metric.",
      },
      {
        name: "icon / hint",
        type: "ReactNode",
        description: "Optional mark and secondary line.",
      },
      {
        name: "trend / trendLabel",
        type: '"up"|"down"|"flat" / ReactNode',
        description: "Optional trend chip.",
      },
      {
        name: "look",
        type: '"solid" | "soft" | "glass" | "outline" | "accent"',
        default: '"solid"',
        description: "Tile surface recipe.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Type / padding scale.",
      },
    ],
  },
];
