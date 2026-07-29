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
      extra: [PRESENCE],
    }),
    ui(
      "combobox",
      "Combobox",
      "Searchable single-select (type to filter).",
      "packages/ui/src/atoms/combobox.tsx",
      { extra: [PRESENCE] },
    ),
    ui(
      "multi-select",
      "Multi Select",
      "Multi value select with chips; menu stays open while picking.",
      "packages/ui/src/atoms/multi-select.tsx",
      { extra: [PRESENCE] },
    ),
    ui("tooltip", "Tooltip", "Frost tooltip on hover/focus.", "packages/ui/src/atoms/tooltip.tsx"),
    ui("alert", "Alert", "Inline callout — info / success / warning / danger.", "packages/ui/src/atoms/alert.tsx"),
    ui("label", "Label", "Form label with required mark.", "packages/ui/src/atoms/label.tsx"),
    ui("form-field", "FormField", "Label + control + hint/error layout.", "packages/ui/src/atoms/form-field.tsx"),
    ui("spinner", "Spinner", "Loading spinner.", "packages/ui/src/atoms/spinner.tsx"),
    ui("skeleton", "Skeleton", "Loading placeholder block.", "packages/ui/src/atoms/skeleton.tsx"),
    ui("separator", "Separator", "Horizontal or vertical rule.", "packages/ui/src/atoms/separator.tsx"),
    ui("card", "Card", "Solid | glass | elevated surfaces.", "packages/ui/src/molecules/card.tsx"),
    ui("tabs", "Tabs", "Pill / underline / segmented tabs + keyboard.", "packages/ui/src/molecules/tabs.tsx"),
    ui("modal", "Modal", "Portaled dialog, focus trap, enter/exit motion.", "packages/ui/src/molecules/modal.tsx", {
      deps: ["button"],
      extra: [PRESENCE],
    }),
    ui("toast", "Toast", "ToastProvider + useToast stack.", "packages/ui/src/molecules/toast.tsx", {
      deps: ["button"],
      extra: [PRESENCE],
    }),
    ui("popover", "Popover", "Anchored non-modal frost panel.", "packages/ui/src/molecules/popover.tsx", {
      extra: [PRESENCE],
    }),
    ui(
      "dropdown-menu",
      "Dropdown Menu",
      "Action menu with items API + keyboard.",
      "packages/ui/src/molecules/dropdown-menu.tsx",
      { deps: ["button"], extra: [PRESENCE] },
    ),
    ui("app-shell", "AppShell", "Header + optional sidebar layout.", "packages/ui/src/organisms/app-shell.tsx"),
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
