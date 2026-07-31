"use client";

import type { ComponentPlayground } from "@/components/playground/library/manifest";
import {
  Button,
  type ButtonLook,
  type ButtonMotion,
  type ButtonRounded,
  type ButtonSize,
  type ButtonVariant,
} from "@softglass/ui";

const VARIANTS: ButtonVariant[] = [
  "primary",
  "secondary",
  "ghost",
  "outline",
  "danger",
  "link",
];
const SIZES: ButtonSize[] = ["sm", "md", "lg"];
const LOOKS: ButtonLook[] = ["solid", "soft", "glass", "gradient", "neon"];
const MOTIONS: ButtonMotion[] = ["none", "lift", "press", "sheen", "ripple"];
const ROUNDEDS: ButtonRounded[] = ["pill", "soft", "md"];

const Star = () => <span aria-hidden>★</span>;

function liveProps(props: Record<string, unknown>) {
  const label = String(props.label ?? "Save changes");
  const iconOnly = Boolean(props.iconOnly);
  const withIcon = Boolean(props.withIcon);
  return {
    variant: props.variant as ButtonVariant,
    size: props.size as ButtonSize,
    look: props.look as ButtonLook,
    motion: props.motion as ButtonMotion,
    rounded: props.rounded as ButtonRounded,
    loading: Boolean(props.loading),
    fullWidth: Boolean(props.fullWidth),
    iconOnly,
    disabled: Boolean(props.disabled),
    leftIcon: withIcon || iconOnly ? <Star /> : undefined,
    children: iconOnly ? <Star /> : label,
  };
}

export const buttonPlayground: ComponentPlayground = {
  id: "button",
  title: "Button",
  controls: [
    {
      kind: "enum",
      prop: "variant",
      options: VARIANTS,
      default: "primary",
    },
    {
      kind: "enum",
      prop: "size",
      options: SIZES,
      default: "md",
    },
    {
      kind: "enum",
      prop: "look",
      options: LOOKS,
      default: "solid",
    },
    {
      kind: "enum",
      prop: "motion",
      options: MOTIONS,
      default: "lift",
    },
    {
      kind: "enum",
      prop: "rounded",
      options: ROUNDEDS,
      default: "pill",
    },
    {
      kind: "text",
      prop: "label",
      label: "Label",
      default: "Save changes",
    },
    { kind: "boolean", prop: "loading", default: false },
    { kind: "boolean", prop: "fullWidth", default: false },
    { kind: "boolean", prop: "iconOnly", default: false },
    { kind: "boolean", prop: "disabled", default: false },
    {
      kind: "boolean",
      prop: "withIcon",
      label: "leftIcon",
      default: true,
    },
  ],
  render: (props) => <Button {...liveProps(props)} />,
  showcases: [
    {
      title: "Variants",
      render: () => (
        <div className="sg-studio-strip">
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant} size="sm">
              {variant}
            </Button>
          ))}
        </div>
      ),
    },
    {
      title: "Sizes",
      render: () => (
        <div className="sg-studio-strip">
          {SIZES.map((size) => (
            <Button key={size} size={size}>
              {size}
            </Button>
          ))}
        </div>
      ),
    },
    {
      title: "Looks",
      render: () => (
        <div className="sg-studio-strip">
          {LOOKS.map((look) => (
            <Button key={look} look={look} size="sm">
              {look}
            </Button>
          ))}
        </div>
      ),
    },
    {
      title: "Motion",
      render: () => (
        <div className="sg-studio-strip">
          {MOTIONS.map((motion) => (
            <Button key={motion} motion={motion} size="sm" look="soft">
              {motion}
            </Button>
          ))}
        </div>
      ),
    },
    {
      title: "Rounded",
      render: () => (
        <div className="sg-studio-strip">
          {ROUNDEDS.map((rounded) => (
            <Button key={rounded} rounded={rounded} size="sm" variant="outline">
              {rounded}
            </Button>
          ))}
        </div>
      ),
    },
    {
      title: "Edges",
      render: () => (
        <div className="sg-studio-strip">
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button fullWidth>Full width label that wraps the stage</Button>
          <Button iconOnly aria-label="Favorite">
            <Star />
          </Button>
          <Button leftIcon={<Star />} rightIcon={<Star />}>
            Very long action label for overflow
          </Button>
        </div>
      ),
    },
  ],
};
