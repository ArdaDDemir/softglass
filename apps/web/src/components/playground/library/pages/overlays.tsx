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
  Button,
  ContextMenu,
  DropdownMenu,
  HoverCard,
  Modal,
  Popover,
  Sheet,
  Text,
  Tooltip,
  useToast,
  type ContextMenuMotion,
  type DropdownMenuMotion,
  type DropdownMenuPlacement,
  type HoverCardMotion,
  type HoverCardPlacement,
  type ModalMotion,
  type ModalSize,
  type PopoverMotion,
  type PopoverPlacement,
  type SheetMotion,
  type SheetSide,
  type ToastMotion,
  type ToastVariant,
  type TooltipLook,
  type TooltipMotion,
  type TooltipPlacement,
} from "@softglass/ui";

const MENU_ITEMS = [
  { label: "Edit", onSelect: () => {} },
  { label: "Duplicate", onSelect: () => {} },
  { type: "separator" as const },
  { label: "Delete", destructive: true, onSelect: () => {} },
];

function ToastStage({
  variant,
  motion,
  title,
  description,
}: {
  variant: ToastVariant;
  motion: ToastMotion;
  title: string;
  description: string;
}) {
  const { toast } = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title,
          description,
          variant,
          motion,
        })
      }
    >
      Show toast
    </Button>
  );
}

export const overlayPlaygrounds: ComponentPlayground[] = [
  {
    id: "modal",
    title: "Modal",
    controls: [
      boolControl("open", false),
      enumControl("size", ["md", "lg"], "md"),
      enumControl("motion", ["none", "scale", "fade", "slide-up"], "scale"),
      textControl("title", "Invite teammate"),
      textControl("description", "Send a seat to your team."),
      boolControl("closeOnBackdrop", true),
    ],
    render: (p, { setProp }) => (
      <div>
        <Button size="sm" onClick={() => setProp("open", true)}>
          Open modal
        </Button>
        <Modal
          open={bool(p, "open")}
          onOpenChange={(open) => setProp("open", open)}
          size={str(p, "size") as ModalSize}
          motion={str(p, "motion") as ModalMotion}
          title={str(p, "title")}
          description={str(p, "description")}
          closeOnBackdrop={bool(p, "closeOnBackdrop")}
          footer={
            <Button size="sm" onClick={() => setProp("open", false)}>
              Done
            </Button>
          }
        >
          Modal body content lives here.
        </Modal>
      </div>
    ),
    showcases: [
      showcase("Sizes", () =>
        strip(
          (["md", "lg"] as const).map((size) => (
            <Button key={size} size="sm" variant="outline">
              size={size}
            </Button>
          )),
        ),
      ),
      showcase("Motion", () =>
        strip(
          (["none", "scale", "fade", "slide-up"] as const).map((motion) => (
            <Button key={motion} size="sm" variant="secondary">
              {motion}
            </Button>
          )),
        ),
      ),
    ],
  },
  {
    id: "sheet",
    title: "Sheet",
    controls: [
      boolControl("open", false),
      enumControl("side", ["left", "right", "bottom"], "right"),
      enumControl("motion", ["none", "slide", "fade"], "slide"),
      textControl("title", "Filters"),
      textControl("description", "Narrow the library results."),
    ],
    render: (p, { setProp }) => (
      <div>
        <Button size="sm" onClick={() => setProp("open", true)}>
          Open sheet
        </Button>
        <Sheet
          open={bool(p, "open")}
          onOpenChange={(open) => setProp("open", open)}
          side={str(p, "side") as SheetSide}
          motion={str(p, "motion") as SheetMotion}
          title={str(p, "title")}
          description={str(p, "description")}
        >
          Sheet panel body.
        </Sheet>
      </div>
    ),
    showcases: [
      showcase("Sides", () =>
        strip(
          (["left", "right", "bottom"] as const).map((side) => (
            <Button key={side} size="sm" variant="outline">
              {side}
            </Button>
          )),
        ),
      ),
    ],
  },
  {
    id: "popover",
    title: "Popover",
    controls: [
      enumControl("placement", ["auto", "bottom", "top"], "auto"),
      enumControl("align", ["start", "center", "end"], "start"),
      enumControl("motion", ["none", "fade", "scale", "slide-down"], "scale"),
      textControl("label", "Details"),
    ],
    render: (p) => (
      <Popover
        trigger={<Button>{str(p, "label", "Details")}</Button>}
        placement={str(p, "placement") as PopoverPlacement}
        align={str(p, "align") as "start" | "center" | "end"}
        motion={str(p, "motion") as PopoverMotion}
        aria-label="Details"
      >
        Any content — text, form bits, links.
      </Popover>
    ),
    showcases: [
      showcase("Placement", () =>
        strip(
          (["auto", "bottom", "top"] as const).map((placement) => (
            <Popover
              key={placement}
              placement={placement}
              trigger={<Button size="sm" variant="outline">{placement}</Button>}
            >
              Popover {placement}
            </Popover>
          )),
        ),
      ),
    ],
  },
  {
    id: "dropdown-menu",
    title: "DropdownMenu",
    controls: [
      enumControl("placement", ["auto", "bottom", "top"], "auto"),
      enumControl("align", ["start", "center", "end"], "start"),
      enumControl("motion", ["none", "fade", "scale", "slide-down"], "scale"),
    ],
    render: (p) => (
      <DropdownMenu
        trigger={<Button variant="outline">Actions</Button>}
        items={MENU_ITEMS}
        placement={str(p, "placement") as DropdownMenuPlacement}
        align={str(p, "align") as "start" | "center" | "end"}
        motion={str(p, "motion") as DropdownMenuMotion}
      />
    ),
    showcases: [
      showcase("Align", () =>
        strip(
          (["start", "center", "end"] as const).map((align) => (
            <DropdownMenu
              key={align}
              align={align}
              trigger={
                <Button size="sm" variant="secondary">
                  {align}
                </Button>
              }
              items={MENU_ITEMS}
            />
          )),
        ),
      ),
    ],
  },
  {
    id: "context-menu",
    title: "ContextMenu",
    controls: [
      enumControl("motion", ["none", "fade", "scale", "slide-down"], "scale"),
    ],
    render: (p) => (
      <ContextMenu items={MENU_ITEMS} motion={str(p, "motion") as ContextMenuMotion}>
        <div
          style={{
            padding: "2rem",
            borderRadius: 12,
            border: "1px dashed var(--sg-border-frost)",
            textAlign: "center",
            minWidth: 200,
          }}
        >
          Right-click / long-press here
        </div>
      </ContextMenu>
    ),
    showcases: [
      showcase("Motion", () =>
        strip(
          (["none", "fade", "scale", "slide-down"] as const).map((motion) => (
            <ContextMenu key={motion} motion={motion as ContextMenuMotion} items={MENU_ITEMS}>
              <Button size="sm" variant="ghost">
                {motion}
              </Button>
            </ContextMenu>
          )),
        ),
      ),
    ],
  },
  {
    id: "tooltip",
    title: "Tooltip",
    controls: [
      enumControl("placement", ["top", "bottom"], "top"),
      enumControl("look", ["frost", "solid", "accent"], "frost"),
      enumControl("motion", ["none", "fade", "scale", "slide"], "scale"),
      textControl("content", "Helpful hint"),
      textControl("label", "Hover me"),
    ],
    render: (p) => (
      <Tooltip
        content={str(p, "content")}
        placement={str(p, "placement") as TooltipPlacement}
        look={str(p, "look") as TooltipLook}
        motion={str(p, "motion") as TooltipMotion}
      >
        <Button size="sm" variant="secondary">
          {str(p, "label", "Hover me")}
        </Button>
      </Tooltip>
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["frost", "solid", "accent"] as const).map((look) => (
            <Tooltip key={look} look={look} content={look}>
              <Button size="sm" variant="outline">
                {look}
              </Button>
            </Tooltip>
          )),
        ),
      ),
    ],
  },
  {
    id: "hover-card",
    title: "HoverCard",
    controls: [
      enumControl("placement", ["auto", "bottom", "top"], "auto"),
      enumControl("align", ["start", "center", "end"], "start"),
      enumControl("motion", ["none", "fade", "scale", "slide-down"], "scale"),
    ],
    render: (p) => (
      <HoverCard
        trigger={<Button variant="ghost">@softglass</Button>}
        placement={str(p, "placement") as HoverCardPlacement}
        align={str(p, "align") as "start" | "center" | "end"}
        motion={str(p, "motion") as HoverCardMotion}
      >
        <Text size="sm">Softglass UI — open design system for Next.js.</Text>
      </HoverCard>
    ),
    showcases: [
      showcase("Placement", () =>
        strip(
          (["auto", "bottom", "top"] as const).map((placement) => (
            <HoverCard
              key={placement}
              placement={placement}
              trigger={
                <Button size="sm" variant="outline">
                  {placement}
                </Button>
              }
            >
              Preview card
            </HoverCard>
          )),
        ),
      ),
    ],
  },
  {
    id: "toast",
    title: "Toast",
    controls: [
      enumControl("variant", ["default", "success", "warning", "danger"], "default"),
      enumControl("motion", ["none", "slide-in", "pop"], "slide-in"),
      textControl("title", "Saved"),
      textControl("description", "Your changes are live."),
    ],
    render: (p) => (
      <ToastStage
        variant={str(p, "variant") as ToastVariant}
        motion={str(p, "motion") as ToastMotion}
        title={str(p, "title", "Saved")}
        description={str(p, "description")}
      />
    ),
    showcases: [
      showcase("Variants", () =>
        strip(
          (["default", "success", "warning", "danger"] as const).map((variant) => (
            <ToastVariantButton key={variant} variant={variant} />
          )),
        ),
      ),
    ],
  },
];

function ToastVariantButton({ variant }: { variant: ToastVariant }) {
  const { toast } = useToast();
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => toast({ title: variant, variant })}
    >
      {variant}
    </Button>
  );
}
