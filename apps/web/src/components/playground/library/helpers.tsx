import type { ControlDef, ShowcaseDef } from "@/components/playground/library/manifest";
import type { ReactNode } from "react";

export function enumControl(
  prop: string,
  options: readonly string[],
  def: string,
  label?: string,
): ControlDef {
  return { kind: "enum", prop, options: [...options], default: def, label };
}

export function boolControl(
  prop: string,
  def = false,
  label?: string,
): ControlDef {
  return { kind: "boolean", prop, default: def, label };
}

export function textControl(
  prop: string,
  def: string,
  label?: string,
): ControlDef {
  return { kind: "text", prop, default: def, label };
}

export function numberControl(
  prop: string,
  def: number,
  label?: string,
  min?: number,
  max?: number,
  step?: number,
): ControlDef {
  return { kind: "number", prop, default: def, label, min, max, step };
}

export function strip(children: ReactNode): ReactNode {
  return <div className="sg-studio-strip">{children}</div>;
}

export function showcase(
  title: string,
  render: () => ReactNode,
): ShowcaseDef {
  return { title, render };
}

export function str(props: Record<string, unknown>, key: string, fallback = ""): string {
  const v = props[key];
  return v == null ? fallback : String(v);
}

export function bool(props: Record<string, unknown>, key: string): boolean {
  return Boolean(props[key]);
}

export function num(props: Record<string, unknown>, key: string, fallback = 0): number {
  const v = props[key];
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export const DEMO_OPTIONS = [
  { value: "aurora", label: "Aurora" },
  { value: "mist", label: "Mist" },
  { value: "pearl", label: "Pearl" },
  { value: "obsidian", label: "Obsidian" },
];

export const DEMO_MULTI = [
  { value: "design", label: "Design" },
  { value: "eng", label: "Engineering" },
  { value: "ops", label: "Ops" },
  { value: "sales", label: "Sales" },
];
