/**
 * Generates root registry.json (GitHub + shadcn build source of truth).
 * Paths are repo-root relative. Targets preserve softglass folder layout
 * so relative imports (../lib/cn) keep working after install.
 *
 * Run: node scripts/generate-registry.mjs
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const LIB = [
  file("packages/ui/src/lib/cn.ts", "registry:lib"),
  file("packages/ui/src/lib/looks.ts", "registry:lib"),
  file("packages/ui/src/lib/motion.ts", "registry:lib"),
];

const PRESENCE = file("packages/ui/src/lib/presence.ts", "registry:lib");
const FLOATING = file("packages/ui/src/lib/floating.ts", "registry:lib");
const FLOATING_HOOK = file(
  "packages/ui/src/lib/use-floating-portal.ts",
  "registry:lib",
);

function file(path, type, extra = {}) {
  const target = path
    .replace(/^packages\/ui\/src\//, "components/softglass/")
    .replace(/^packages\/tokens\/src\//, "styles/softglass/");
  return { path, type, target, ...extra };
}

function ui(name, title, description, srcPath, opts = {}) {
  const { deps = [], extra = [] } = opts;
  return {
    name,
    type: "registry:ui",
    title,
    description,
    registryDependencies: ["tokens", ...deps],
    files: [file(srcPath, "registry:ui"), ...LIB, ...extra],
  };
}

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "softglass",
  homepage: "https://github.com/ArdaDDemir/softglass",
  items: [
    {
      name: "tokens",
      type: "registry:style",
      title: "Softglass Tokens",
      description:
        "CSS engine + 4 languages (Aurora, Obsidian, Mist, Pearl), looks and motion recipes.",
      files: [
        file("packages/tokens/src/base.css", "registry:style"),
        file("packages/tokens/src/themes/aurora.css", "registry:style"),
        file("packages/tokens/src/themes/obsidian.css", "registry:style"),
        file("packages/tokens/src/themes/mist.css", "registry:style"),
        file("packages/tokens/src/themes/pearl.css", "registry:style"),
        file("packages/tokens/src/looks-and-motion.css", "registry:style"),
        file("packages/tokens/src/motion-recipes.css", "registry:style"),
        file("packages/tokens/src/index.css", "registry:style"),
      ],
    },
    ui("button", "Button", "Soft pill button — primary solid, ghost glass.", "packages/ui/src/atoms/button.tsx"),
    ui("input", "Input", "Solid-surface input with label, hint, and error.", "packages/ui/src/atoms/input.tsx"),
    ui("textarea", "Textarea", "Multi-line field matching Input language.", "packages/ui/src/atoms/textarea.tsx"),
    ui("badge", "Badge", "Soft pill badge with semantic variants.", "packages/ui/src/atoms/badge.tsx"),
    ui("avatar", "Avatar", "Soft avatar with image or initials + group.", "packages/ui/src/atoms/avatar.tsx"),
    ui("switch", "Switch", "Accessible soft glass switch.", "packages/ui/src/atoms/switch.tsx"),
    ui("checkbox", "Checkbox", "Soft checkbox with looks + motion.", "packages/ui/src/atoms/checkbox.tsx"),
    ui("radio", "Radio", "Radio + RadioGroup with looks.", "packages/ui/src/atoms/radio.tsx"),
    ui("select", "Select", "Custom glass listbox (not native OS menu).", "packages/ui/src/atoms/select.tsx", {
      extra: [PRESENCE, FLOATING, FLOATING_HOOK],
    }),
    ui(
      "combobox",
      "Combobox",
      "Searchable single-select (type to filter).",
      "packages/ui/src/atoms/combobox.tsx",
      { extra: [PRESENCE, FLOATING, FLOATING_HOOK] },
    ),
    ui(
      "multi-select",
      "Multi Select",
      "Multi value select with chips; menu stays open while picking.",
      "packages/ui/src/atoms/multi-select.tsx",
      { extra: [PRESENCE, FLOATING, FLOATING_HOOK] },
    ),
    ui(
      "date-picker",
      "Date Picker",
      "Single ISO date calendar — body portal + flip/clamp panel.",
      "packages/ui/src/atoms/date-picker.tsx",
      { extra: [PRESENCE, FLOATING, FLOATING_HOOK] },
    ),
    ui("tooltip", "Tooltip", "Frost tooltip on hover/focus.", "packages/ui/src/atoms/tooltip.tsx"),
    ui("alert", "Alert", "Inline callout — info / success / warning / danger.", "packages/ui/src/atoms/alert.tsx"),
    ui("label", "Label", "Form label with required mark.", "packages/ui/src/atoms/label.tsx"),
    ui("form-field", "FormField", "Label + control + hint/error layout.", "packages/ui/src/atoms/form-field.tsx"),
    ui("spinner", "Spinner", "Loading spinner.", "packages/ui/src/atoms/spinner.tsx"),
    ui("skeleton", "Skeleton", "Loading placeholder block.", "packages/ui/src/atoms/skeleton.tsx"),
    ui("separator", "Separator", "Horizontal or vertical rule.", "packages/ui/src/atoms/separator.tsx"),
    ui(
      "progress",
      "Progress",
      "Linear progress — determinate value or indeterminate.",
      "packages/ui/src/atoms/progress.tsx",
    ),
    ui(
      "status-dot",
      "Status Dot",
      "Presence indicator — online / busy / offline / away + custom color.",
      "packages/ui/src/atoms/status-dot.tsx",
    ),
    ui(
      "slider",
      "Slider",
      "Single-value range with label / hint / error.",
      "packages/ui/src/atoms/slider.tsx",
    ),
    ui(
      "number-input",
      "Number Input",
      "Numeric field with steppers + field meta.",
      "packages/ui/src/atoms/number-input.tsx",
    ),
    ui(
      "file-field",
      "File Field",
      "Solid file picker with basic name list (no upload).",
      "packages/ui/src/atoms/file-field.tsx",
    ),
    ui(
      "visually-hidden",
      "Visually Hidden",
      "A11y helper — hide visually, keep for screen readers.",
      "packages/ui/src/atoms/visually-hidden.tsx",
    ),
    ui(
      "close-button",
      "Close Button",
      "Shared dismiss control for chips and chrome.",
      "packages/ui/src/atoms/close-button.tsx",
    ),
    ui(
      "link",
      "Link",
      "Text link — href + optional external.",
      "packages/ui/src/atoms/link.tsx",
    ),
    ui(
      "chip",
      "Chip",
      "Selectable / removable pill (uses CloseButton).",
      "packages/ui/src/atoms/chip.tsx",
      { deps: ["close-button"] },
    ),
    ui(
      "password-input",
      "Password Input",
      "Password field with show / hide toggle.",
      "packages/ui/src/atoms/password-input.tsx",
    ),
    ui(
      "search-input",
      "Search Input",
      "Free-text search with clear (not Combobox).",
      "packages/ui/src/atoms/search-input.tsx",
      { deps: ["close-button"] },
    ),
    ui(
      "circular-progress",
      "Circular Progress",
      "Ring progress — determinate or indeterminate.",
      "packages/ui/src/atoms/circular-progress.tsx",
    ),
    ui(
      "segmented-control",
      "Segmented Control",
      "Single-select segmented buttons (radiogroup).",
      "packages/ui/src/atoms/segmented-control.tsx",
    ),
    ui("kbd", "Kbd", "Keyboard key glyph.", "packages/ui/src/atoms/kbd.tsx"),
    ui("code", "Code", "Inline or block monospace code.", "packages/ui/src/atoms/code.tsx"),
    ui(
      "skip-link",
      "Skip Link",
      "Skip to content — visible on focus.",
      "packages/ui/src/atoms/skip-link.tsx",
    ),
    ui(
      "pin-input",
      "Pin Input",
      "OTP / PIN cells with paste + keyboard.",
      "packages/ui/src/atoms/pin-input.tsx",
    ),
    ui(
      "nav-link",
      "Nav Link",
      "Navigation link with active state.",
      "packages/ui/src/atoms/nav-link.tsx",
    ),
    ui(
      "list-item",
      "List Item",
      "Leading / title / trailing row.",
      "packages/ui/src/atoms/list-item.tsx",
    ),
    ui(
      "copy-button",
      "Copy Button",
      "Copy to clipboard with brief feedback.",
      "packages/ui/src/atoms/copy-button.tsx",
    ),
    ui(
      "character-count",
      "Character Count",
      "Field helper value or value/max.",
      "packages/ui/src/atoms/character-count.tsx",
    ),
    ui("fieldset", "Fieldset", "Group related controls with legend.", "packages/ui/src/atoms/fieldset.tsx"),
    ui("icon", "Icon", "Icon wrapper only — no icon pack.", "packages/ui/src/atoms/icon.tsx"),
    ui("image", "Image", "Framed image with fallback.", "packages/ui/src/atoms/image.tsx"),
    ui("meter", "Meter", "Read-only scalar bar.", "packages/ui/src/atoms/meter.tsx"),
    ui("time-input", "Time Input", "HH:mm native time skin (no TZ).", "packages/ui/src/atoms/time-input.tsx"),
    ui("client-only", "Client Only", "Render children after client mount.", "packages/ui/src/atoms/client-only.tsx"),
    ui("scroll-area", "Scroll Area", "Light overflow region.", "packages/ui/src/atoms/scroll-area.tsx"),
    ui("rating", "Rating", "Star rating control.", "packages/ui/src/atoms/rating.tsx"),
    ui("aspect-ratio", "Aspect Ratio", "Lock child to aspect box.", "packages/ui/src/atoms/aspect-ratio.tsx"),
    ui("range-slider", "Range Slider", "Dual-thumb range control.", "packages/ui/src/atoms/range-slider.tsx"),
    ui("toggle-group", "Toggle Group", "Single or multi select button group.", "packages/ui/src/atoms/toggle-group.tsx"),
    ui("count-badge", "Count Badge", "Compact numeric pill.", "packages/ui/src/atoms/count-badge.tsx"),
    ui("color-swatch", "Color Swatch", "Clickable color chip.", "packages/ui/src/atoms/color-swatch.tsx"),
    ui("color-input", "Color Input", "Simple color picker + hex text.", "packages/ui/src/atoms/color-input.tsx"),
    ui("highlight", "Highlight", "Inline mark for emphasis.", "packages/ui/src/atoms/highlight.tsx"),
    ui("truncate", "Truncate", "Ellipsis overflow text.", "packages/ui/src/atoms/truncate.tsx"),
    ui("live-region", "Live Region", "aria-live status container.", "packages/ui/src/atoms/live-region.tsx"),
    ui("native-date-input", "Native Date Input", "Skinned native date field.", "packages/ui/src/atoms/native-date-input.tsx"),
    ui("text", "Text / Heading", "Lightweight text helpers.", "packages/ui/src/atoms/text.tsx"),
    ui("card", "Card", "Solid | glass | elevated surfaces.", "packages/ui/src/molecules/card.tsx"),
    ui("tabs", "Tabs", "Pill / underline / segmented tabs + keyboard.", "packages/ui/src/molecules/tabs.tsx"),
    ui(
      "collapsible",
      "Collapsible",
      "Single disclosure panel — open / defaultOpen / onOpenChange.",
      "packages/ui/src/molecules/collapsible.tsx",
    ),
    ui(
      "accordion",
      "Accordion",
      "Single or multiple panels via items[] API.",
      "packages/ui/src/molecules/accordion.tsx",
    ),
    ui(
      "breadcrumb",
      "Breadcrumb",
      "Path trail — reuses Link; last item is current page.",
      "packages/ui/src/molecules/breadcrumb.tsx",
      { deps: ["link"] },
    ),
    ui(
      "pagination",
      "Pagination",
      "Page / pageCount / onPageChange — compact or full list.",
      "packages/ui/src/molecules/pagination.tsx",
    ),
    ui(
      "empty-state",
      "Empty State",
      "Zero-data surface — icon / title / description / actions.",
      "packages/ui/src/molecules/empty-state.tsx",
    ),
    ui(
      "sheet",
      "Sheet",
      "Edge panel (Drawer) — left | right | bottom; portal + presence.",
      "packages/ui/src/molecules/sheet.tsx",
      { deps: ["button"], extra: [PRESENCE] },
    ),
    ui(
      "hover-card",
      "Hover Card",
      "Delayed preview panel — open/close delay; Popover family.",
      "packages/ui/src/molecules/hover-card.tsx",
      { extra: [PRESENCE, FLOATING, FLOATING_HOOK] },
    ),
    ui(
      "stepper",
      "Stepper",
      "Wizard step indicator — steps[] + activeStep.",
      "packages/ui/src/molecules/stepper.tsx",
    ),
    ui(
      "toolbar",
      "Toolbar",
      "Action strip shell — compose Search / Button / Badge.",
      "packages/ui/src/molecules/toolbar.tsx",
    ),
    ui(
      "list",
      "List",
      "ListItem host — density / dividers / looks.",
      "packages/ui/src/molecules/list.tsx",
      { deps: ["list-item"] },
    ),
    ui(
      "stat",
      "Stat",
      "Metric tile — label / value / hint / trend.",
      "packages/ui/src/molecules/stat.tsx",
    ),
    ui("modal", "Modal", "Portaled dialog, focus trap, enter/exit motion.", "packages/ui/src/molecules/modal.tsx", {
      deps: ["button"],
      extra: [PRESENCE],
    }),
    ui("toast", "Toast", "ToastProvider + useToast stack.", "packages/ui/src/molecules/toast.tsx", {
      deps: ["button"],
      extra: [PRESENCE],
    }),
    ui("popover", "Popover", "Anchored non-modal frost panel.", "packages/ui/src/molecules/popover.tsx", {
      extra: [PRESENCE, FLOATING, FLOATING_HOOK],
    }),
    ui(
      "dropdown-menu",
      "Dropdown Menu",
      "Action menu with items API + keyboard.",
      "packages/ui/src/molecules/dropdown-menu.tsx",
      { deps: ["button"], extra: [PRESENCE, FLOATING, FLOATING_HOOK] },
    ),
    ui(
      "context-menu",
      "Context Menu",
      "Right-click / long-press action menu (same items language as DropdownMenu).",
      "packages/ui/src/molecules/context-menu.tsx",
      { extra: [PRESENCE] },
    ),
    ui(
      "app-shell",
      "AppShell",
      "Header + collapsible sidebar + mobile Sheet nav.",
      "packages/ui/src/organisms/app-shell.tsx",
      { deps: ["button", "sheet"] },
    ),
    ui(
      "page-header",
      "Page Header",
      "Page chrome: breadcrumbs, title, description, actions.",
      "packages/ui/src/molecules/page-header.tsx",
      { deps: ["breadcrumb"] },
    ),
    ui(
      "settings-section",
      "Settings Section",
      "Settings group: title, description, actions, form body.",
      "packages/ui/src/molecules/settings-section.tsx",
    ),
    ui(
      "command-palette",
      "Command Palette",
      "Minimal command palette: search + list + keyboard select.",
      "packages/ui/src/molecules/command-palette.tsx",
      { extra: [PRESENCE] },
    ),
  ],
};

const outRoot = join(root, "registry.json");
const outLegacy = join(root, "registry", "registry.json");

writeFileSync(outRoot, JSON.stringify(registry, null, 2) + "\n", "utf8");
// Legacy path kept in sync for docs that still point at registry/
writeFileSync(outLegacy, JSON.stringify(registry, null, 2) + "\n", "utf8");

console.log(
  `Wrote registry.json (${registry.items.length} items) → root + registry/registry.json`,
);
