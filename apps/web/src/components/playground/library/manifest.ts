import type { ReactNode } from "react";
import { atomPlaygrounds } from "@/components/playground/library/pages/atoms";
import { buttonPlayground } from "@/components/playground/library/pages/button";
import { dataTablePlayground } from "@/components/playground/library/pages/datatable";
import { fieldPlaygrounds } from "@/components/playground/library/pages/fields";
import { moleculePlaygrounds } from "@/components/playground/library/pages/molecules";
import { overlayPlaygrounds } from "@/components/playground/library/pages/overlays";
import { shellPlaygrounds } from "@/components/playground/library/pages/shell";

export type ControlDef =
  | {
      kind: "enum";
      prop: string;
      label?: string;
      options: string[];
      default: string;
    }
  | {
      kind: "boolean";
      prop: string;
      label?: string;
      default: boolean;
    }
  | {
      kind: "text";
      prop: string;
      label?: string;
      default: string;
    }
  | {
      kind: "number";
      prop: string;
      label?: string;
      default: number;
      min?: number;
      max?: number;
      step?: number;
    };

export type ShowcaseDef = {
  title: string;
  render: () => ReactNode;
};

export type PlaygroundRenderApi = {
  setProp: (prop: string, value: unknown) => void;
};

export type ComponentPlayground = {
  /** Matches COMPONENT_DOCS.id */
  id: string;
  title: string;
  render: (props: Record<string, unknown>, api: PlaygroundRenderApi) => ReactNode;
  controls: ControlDef[];
  showcases: ShowcaseDef[];
};

/** All Component Studio playgrounds (1.6 — full docs coverage). */
export const PLAYGROUNDS: ComponentPlayground[] = [
  buttonPlayground,
  dataTablePlayground,
  ...atomPlaygrounds,
  ...fieldPlaygrounds,
  ...moleculePlaygrounds,
  ...overlayPlaygrounds,
  ...shellPlaygrounds,
];

const byId = new Map(PLAYGROUNDS.map((p) => [p.id, p]));

export function getPlayground(
  id: string | null | undefined,
): ComponentPlayground | undefined {
  if (!id) return undefined;
  return byId.get(id);
}

export function hasPlayground(id: string): boolean {
  return byId.has(id);
}

/** ids registered in studio (for coverage checks). */
export function playgroundIds(): string[] {
  return PLAYGROUNDS.map((p) => p.id);
}
