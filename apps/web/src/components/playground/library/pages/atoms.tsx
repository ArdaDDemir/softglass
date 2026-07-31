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
  Alert,
  Avatar,
  Badge,
  Button,
  Chip,
  CircularProgress,
  CloseButton,
  Code,
  FormField,
  Input,
  Kbd,
  Link,
  Progress,
  Separator,
  Skeleton,
  SkipLink,
  Spinner,
  StatusDot,
  Text,
  VisuallyHidden,
  type AlertVariant,
  type AvatarLook,
  type AvatarMotion,
  type AvatarSize,
  type BadgeLook,
  type BadgeMotion,
  type BadgeSize,
  type BadgeVariant,
  type ChipLook,
  type ChipSize,
  type ChipVariant,
  type CircularProgressLook,
  type CircularProgressSize,
  type CircularProgressVariant,
  type CloseButtonLook,
  type CloseButtonSize,
  type CodeLook,
  type KbdLook,
  type KbdSize,
  type LinkLook,
  type ProgressLook,
  type ProgressSize,
  type ProgressVariant,
  type SkipLinkLook,
  type SkipLinkPlacement,
  type SpinnerSize,
  type StatusDotLook,
  type StatusDotSize,
  type StatusDotStatus,
} from "@softglass/ui";

const SIZES = ["sm", "md", "lg"] as const;

export const atomPlaygrounds: ComponentPlayground[] = [
  {
    id: "badge",
    title: "Badge",
    controls: [
      enumControl("variant", ["default", "accent", "solid", "success", "warning", "danger"], "accent"),
      enumControl("size", SIZES, "md"),
      enumControl("look", ["soft", "solid", "outline", "glow"], "soft"),
      enumControl("motion", ["none", "pulse", "pop-in", "shimmer"], "none"),
      textControl("label", "New"),
    ],
    render: (p) => (
      <Badge
        variant={str(p, "variant") as BadgeVariant}
        size={str(p, "size") as BadgeSize}
        look={str(p, "look") as BadgeLook}
        motion={str(p, "motion") as BadgeMotion}
      >
        {str(p, "label", "New")}
      </Badge>
    ),
    showcases: [
      showcase("Variants", () =>
        strip(
          (["default", "accent", "solid", "success", "warning", "danger"] as const).map((v) => (
            <Badge key={v} variant={v}>
              {v}
            </Badge>
          )),
        ),
      ),
      showcase("Looks", () =>
        strip(
          (["soft", "solid", "outline", "glow"] as const).map((look) => (
            <Badge key={look} look={look}>
              {look}
            </Badge>
          )),
        ),
      ),
      showcase("Sizes", () =>
        strip(SIZES.map((size) => (
          <Badge key={size} size={size}>
            {size}
          </Badge>
        ))),
      ),
    ],
  },
  {
    id: "avatar",
    title: "Avatar",
    controls: [
      enumControl("size", ["sm", "md", "lg", "xl"], "md"),
      enumControl("look", ["circle", "rounded", "soft"], "circle"),
      enumControl("motion", ["none", "lift", "ring-pulse", "status-ping"], "lift"),
      textControl("fallback", "SG"),
      textControl("src", ""),
    ],
    render: (p) => (
      <Avatar
        size={str(p, "size") as AvatarSize}
        look={str(p, "look") as AvatarLook}
        motion={str(p, "motion") as AvatarMotion}
        fallback={str(p, "fallback", "SG")}
        src={str(p, "src") || null}
        alt="Avatar"
      />
    ),
    showcases: [
      showcase("Sizes", () =>
        strip(
          (["sm", "md", "lg", "xl"] as const).map((size) => (
            <Avatar key={size} size={size} fallback={size} />
          )),
        ),
      ),
      showcase("Looks", () =>
        strip(
          (["circle", "rounded", "soft"] as const).map((look) => (
            <Avatar key={look} look={look} fallback="A" />
          )),
        ),
      ),
    ],
  },
  {
    id: "alert",
    title: "Alert",
    controls: [
      enumControl("variant", ["info", "success", "warning", "danger"], "info"),
      textControl("title", "Heads up"),
      textControl("body", "Something soft happened in the system."),
    ],
    render: (p) => (
      <Alert variant={str(p, "variant") as AlertVariant} title={str(p, "title")}>
        {str(p, "body")}
      </Alert>
    ),
    showcases: [
      showcase("Variants", () => (
        <div className="sg-studio-strip" style={{ flexDirection: "column", alignItems: "stretch" }}>
          {(["info", "success", "warning", "danger"] as const).map((variant) => (
            <Alert key={variant} variant={variant} title={variant}>
              Sample {variant} message.
            </Alert>
          ))}
        </div>
      )),
    ],
  },
  {
    id: "spinner",
    title: "Spinner",
    controls: [
      enumControl("size", SIZES, "md"),
      textControl("label", "Loading"),
    ],
    render: (p) => (
      <Spinner size={str(p, "size") as SpinnerSize} label={str(p, "label") || undefined} />
    ),
    showcases: [
      showcase("Sizes", () =>
        strip(SIZES.map((size) => <Spinner key={size} size={size} label={size} />)),
      ),
    ],
  },
  {
    id: "skeleton",
    title: "Skeleton",
    controls: [
      enumControl("shape", ["text", "rect", "circle"], "text"),
      numberControl("width", 180, "width px", 40, 400, 10),
      numberControl("height", 16, "height px", 8, 120, 2),
    ],
    render: (p) => {
      const shape = str(p, "shape", "text");
      const w = num(p, "width", 180);
      const h = num(p, "height", 16);
      if (shape === "circle") {
        return <Skeleton style={{ width: h, height: h, borderRadius: 999 }} />;
      }
      return (
        <Skeleton
          style={{
            width: w,
            height: shape === "rect" ? Math.max(h, 48) : h,
            borderRadius: shape === "rect" ? 12 : 6,
          }}
        />
      );
    },
    showcases: [
      showcase("Patterns", () =>
        strip(
          <>
            <Skeleton style={{ width: 120, height: 14 }} />
            <Skeleton style={{ width: 80, height: 80, borderRadius: 999 }} />
            <Skeleton style={{ width: 160, height: 64, borderRadius: 12 }} />
          </>,
        ),
      ),
    ],
  },
  {
    id: "separator",
    title: "Separator",
    controls: [
      enumControl("orientation", ["horizontal", "vertical"], "horizontal"),
      boolControl("decorative", true),
    ],
    render: (p) => (
      <div
        style={{
          width: str(p, "orientation") === "vertical" ? 48 : "100%",
          height: str(p, "orientation") === "vertical" ? 80 : undefined,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Separator
          orientation={str(p, "orientation") as "horizontal" | "vertical"}
          decorative={bool(p, "decorative")}
        />
      </div>
    ),
    showcases: [
      showcase("Orientations", () =>
        strip(
          <>
            <div style={{ width: 160 }}>
              <Separator orientation="horizontal" />
            </div>
            <div style={{ height: 48, display: "flex" }}>
              <Separator orientation="vertical" />
            </div>
          </>,
        ),
      ),
    ],
  },
  {
    id: "progress",
    title: "Progress",
    controls: [
      numberControl("value", 48, "value", 0, 100, 1),
      numberControl("max", 100, "max", 1, 100, 1),
      enumControl("size", SIZES, "md"),
      enumControl("variant", ["accent", "success", "warning", "danger", "muted"], "accent"),
      enumControl("look", ["soft", "solid", "glass", "accent", "striped"], "soft"),
      boolControl("indeterminate", false),
    ],
    render: (p) => (
      <div style={{ width: "100%", maxWidth: 320 }}>
        <Progress
          value={bool(p, "indeterminate") ? null : num(p, "value", 48)}
          max={num(p, "max", 100)}
          size={str(p, "size") as ProgressSize}
          variant={str(p, "variant") as ProgressVariant}
          look={str(p, "look") as ProgressLook}
        />
      </div>
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["soft", "solid", "glass", "accent", "striped"] as const).map((look) => (
            <div key={look} style={{ width: 120 }}>
              <Progress value={60} look={look} size="sm" />
            </div>
          )),
        ),
      ),
      showcase("Variants", () =>
        strip(
          (["accent", "success", "warning", "danger", "muted"] as const).map((variant) => (
            <div key={variant} style={{ width: 100 }}>
              <Progress value={70} variant={variant} size="sm" />
            </div>
          )),
        ),
      ),
    ],
  },
  {
    id: "status-dot",
    title: "StatusDot",
    controls: [
      enumControl("status", ["online", "offline", "busy", "away"], "online"),
      enumControl("size", SIZES, "md"),
      enumControl("look", ["soft", "solid", "outline", "glow"], "soft"),
      boolControl("pulse", false),
      textControl("label", "Status"),
    ],
    render: (p) => (
      <StatusDot
        status={str(p, "status") as StatusDotStatus}
        size={str(p, "size") as StatusDotSize}
        look={str(p, "look") as StatusDotLook}
        pulse={bool(p, "pulse")}
        label={str(p, "label") || undefined}
      />
    ),
    showcases: [
      showcase("Statuses", () =>
        strip(
          (["online", "offline", "busy", "away"] as const).map((status) => (
            <StatusDot key={status} status={status} label={status} />
          )),
        ),
      ),
    ],
  },
  {
    id: "circular-progress",
    title: "CircularProgress",
    controls: [
      numberControl("value", 62, "value", 0, 100, 1),
      enumControl("size", SIZES, "md"),
      enumControl("variant", ["accent", "success", "warning", "danger", "muted"], "accent"),
      enumControl("look", ["soft", "solid", "glass", "accent"], "soft"),
      boolControl("indeterminate", false),
    ],
    render: (p) => (
      <CircularProgress
        value={bool(p, "indeterminate") ? null : num(p, "value", 62)}
        size={str(p, "size") as CircularProgressSize}
        variant={str(p, "variant") as CircularProgressVariant}
        look={str(p, "look") as CircularProgressLook}
      />
    ),
    showcases: [
      showcase("Sizes", () =>
        strip(SIZES.map((size) => <CircularProgress key={size} size={size} value={55} />)),
      ),
      showcase("Variants", () =>
        strip(
          (["accent", "success", "warning", "danger", "muted"] as const).map((variant) => (
            <CircularProgress key={variant} variant={variant} value={70} size="sm" />
          )),
        ),
      ),
    ],
  },
  {
    id: "link",
    title: "Link",
    controls: [
      enumControl("look", ["accent", "muted", "subtle", "underline"], "accent"),
      textControl("label", "Open docs"),
      textControl("href", "#"),
    ],
    render: (p) => (
      <Link href={str(p, "href", "#")} look={str(p, "look") as LinkLook}>
        {str(p, "label", "Open docs")}
      </Link>
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["accent", "muted", "subtle", "underline"] as const).map((look) => (
            <Link key={look} href="#" look={look}>
              {look}
            </Link>
          )),
        ),
      ),
    ],
  },
  {
    id: "chip",
    title: "Chip",
    controls: [
      enumControl("size", SIZES, "md"),
      enumControl("look", ["soft", "solid", "outline", "glass", "glow"], "soft"),
      enumControl("variant", ["default", "filter", "check"], "default"),
      boolControl("selected", false),
      boolControl("disabled", false),
      textControl("label", "Filter"),
    ],
    render: (p) => (
      <Chip
        size={str(p, "size") as ChipSize}
        look={str(p, "look") as ChipLook}
        variant={str(p, "variant") as ChipVariant}
        selected={bool(p, "selected")}
        disabled={bool(p, "disabled")}
      >
        {str(p, "label", "Filter")}
      </Chip>
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["soft", "solid", "outline", "glass", "glow"] as const).map((look) => (
            <Chip key={look} look={look}>
              {look}
            </Chip>
          )),
        ),
      ),
      showcase("Selected", () =>
        strip(
          <>
            <Chip selected>On</Chip>
            <Chip>Off</Chip>
            <Chip variant="check" selected>
              Check
            </Chip>
          </>,
        ),
      ),
    ],
  },
  {
    id: "close-button",
    title: "CloseButton",
    controls: [
      enumControl("size", SIZES, "md"),
      enumControl("look", ["ghost", "soft", "solid", "danger"], "ghost"),
      textControl("label", "Close"),
      boolControl("disabled", false),
    ],
    render: (p) => (
      <CloseButton
        size={str(p, "size") as CloseButtonSize}
        look={str(p, "look") as CloseButtonLook}
        label={str(p, "label", "Close")}
        disabled={bool(p, "disabled")}
      />
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["ghost", "soft", "solid", "danger"] as const).map((look) => (
            <CloseButton key={look} look={look} label={look} />
          )),
        ),
      ),
      showcase("Sizes", () =>
        strip(SIZES.map((size) => <CloseButton key={size} size={size} label={size} />)),
      ),
    ],
  },
  {
    id: "kbd",
    title: "Kbd",
    controls: [
      enumControl("size", SIZES, "md"),
      enumControl("look", ["soft", "solid", "outline", "glass"], "soft"),
      textControl("label", "⌘K"),
    ],
    render: (p) => (
      <Kbd size={str(p, "size") as KbdSize} look={str(p, "look") as KbdLook}>
        {str(p, "label", "⌘K")}
      </Kbd>
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["soft", "solid", "outline", "glass"] as const).map((look) => (
            <Kbd key={look} look={look}>
              Esc
            </Kbd>
          )),
        ),
      ),
    ],
  },
  {
    id: "code",
    title: "Code",
    controls: [
      enumControl("look", ["soft", "solid", "accent", "muted"], "soft"),
      boolControl("block", false),
      textControl("label", "npm i @softglass/ui"),
    ],
    render: (p) => (
      <Code look={str(p, "look") as CodeLook} block={bool(p, "block")}>
        {str(p, "label")}
      </Code>
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["soft", "solid", "accent", "muted"] as const).map((look) => (
            <Code key={look} look={look}>
              {look}
            </Code>
          )),
        ),
      ),
      showcase("Block", () => (
        <Code block look="solid">
          import {"{ Button }"} from &quot;@softglass/ui&quot;;
        </Code>
      )),
    ],
  },
  {
    id: "skip-link",
    title: "SkipLink",
    controls: [
      enumControl("look", ["solid", "soft", "outline", "glass"], "solid"),
      enumControl("placement", ["start", "center", "end"], "start"),
      textControl("label", "Skip to content"),
      textControl("href", "#gallery-main"),
      boolControl("alwaysVisible", true),
    ],
    render: (p) => (
      <div style={{ position: "relative", minHeight: 72, width: "100%" }}>
        <Text size="sm" tone="muted">
          Focus or enable alwaysVisible to see the skip link.
        </Text>
        <SkipLink
          href={str(p, "href", "#gallery-main")}
          look={str(p, "look") as SkipLinkLook}
          placement={str(p, "placement") as SkipLinkPlacement}
          alwaysVisible={bool(p, "alwaysVisible")}
        >
          {str(p, "label", "Skip to content")}
        </SkipLink>
      </div>
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["solid", "soft", "outline", "glass"] as const).map((look) => (
            <Badge key={look} size="sm">
              look={look}
            </Badge>
          )),
        ),
      ),
    ],
  },
  {
    id: "visually-hidden",
    title: "VisuallyHidden",
    controls: [textControl("label", "Screen-reader only label")],
    render: (p) => (
      <div>
        <Button>
          Visible
          <VisuallyHidden>{str(p, "label")}</VisuallyHidden>
        </Button>
        <Text size="sm" tone="muted" style={{ marginTop: 8 }}>
          Hidden text is in the accessibility tree only.
        </Text>
      </div>
    ),
    showcases: [
      showcase("Pattern", () =>
        strip(
          <Button iconOnly aria-label="Settings">
            ⚙<VisuallyHidden>Settings</VisuallyHidden>
          </Button>,
        ),
      ),
    ],
  },
  {
    id: "form-field",
    title: "FormField",
    controls: [
      textControl("label", "Project name"),
      textControl("hint", "Shown under the control"),
      textControl("error", ""),
      boolControl("requiredMark", true),
    ],
    render: (p) => (
      <FormField
        label={str(p, "label")}
        hint={str(p, "hint") || undefined}
        error={str(p, "error") || undefined}
        requiredMark={bool(p, "requiredMark")}
      >
        <Input placeholder="softglass" fullWidth />
      </FormField>
    ),
    showcases: [
      showcase("States", () =>
        strip(
          <>
            <FormField label="OK" hint="Hint">
              <Input defaultValue="ok" />
            </FormField>
            <FormField label="Error" error="Required">
              <Input error="Required" />
            </FormField>
          </>,
        ),
      ),
    ],
  },
];
