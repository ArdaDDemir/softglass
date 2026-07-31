"use client";

import type { ComponentPlayground } from "@/components/playground/library/manifest";
import type { ComponentDoc } from "@/lib/docs";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  SegmentedControl,
  Switch,
  Text,
} from "@softglass/ui";
import { useCallback, useMemo, useState } from "react";

type ComponentStudioProps = {
  doc: ComponentDoc;
  playground?: ComponentPlayground;
  onBack: () => void;
};

function defaultsFromControls(
  playground: ComponentPlayground | undefined,
): Record<string, unknown> {
  if (!playground) return {};
  const out: Record<string, unknown> = {};
  for (const c of playground.controls) {
    out[c.prop] = c.default;
  }
  return out;
}

export function ComponentStudio({
  doc,
  playground,
  onBack,
}: ComponentStudioProps) {
  const [values, setValues] = useState<Record<string, unknown>>(() =>
    defaultsFromControls(playground),
  );

  const setProp = useCallback((prop: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [prop]: value }));
  }, []);

  const stage = useMemo(() => {
    if (!playground) return null;
    return playground.render(values, { setProp });
  }, [playground, values, setProp]);

  return (
    <div className="sg-studio">
      <div className="sg-studio-subhead">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="sg-studio-back"
        >
          ← Library
        </Button>
        <div className="sg-studio-title-row">
          <h2 className="sg-studio-name">{doc.name}</h2>
          <Badge size="sm" variant="default">
            {doc.layer}
          </Badge>
          {playground ? (
            <Badge size="sm" variant="solid">
              live
            </Badge>
          ) : (
            <Badge size="sm" variant="default" look="outline">
              docs
            </Badge>
          )}
        </div>
        <Text size="sm" tone="muted" className="sg-studio-summary">
          {doc.summary}
        </Text>
      </div>

      {playground ? (
        <>
          <Card surface="solid" as="section" padding="md" className="sg-studio-stage-card">
            <CardHeader>
              <CardTitle style={{ fontSize: "var(--sg-text-base)" }}>
                Live stage
              </CardTitle>
              <CardDescription>
                Controls update this instance immediately.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="sg-studio-stage" data-fullwidth={String(Boolean(values.fullWidth))}>
                {stage}
              </div>
            </CardContent>
          </Card>

          <Card surface="solid" as="section" padding="md">
            <CardHeader>
              <CardTitle style={{ fontSize: "var(--sg-text-base)" }}>
                Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="sg-studio-controls">
              {playground.controls.map((control) => (
                <ControlRow
                  key={control.prop}
                  control={control}
                  value={values[control.prop]}
                  onChange={(v) => setProp(control.prop, v)}
                />
              ))}
            </CardContent>
          </Card>

          <section className="sg-studio-showcases" aria-label="Showcase strips">
            {playground.showcases.map((strip) => (
              <Card key={strip.title} surface="solid" as="article" padding="sm">
                <CardHeader>
                  <CardTitle style={{ fontSize: "var(--sg-text-sm)" }}>
                    {strip.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>{strip.render()}</CardContent>
              </Card>
            ))}
          </section>
        </>
      ) : (
        <Card surface="glass" as="section" padding="md">
          <CardHeader>
            <CardTitle style={{ fontSize: "var(--sg-text-base)" }}>
              Playground coming soon
            </CardTitle>
            <CardDescription>
              Live controls for {doc.name} land in a later 1.6 sprint. Prop docs
              below are ready now.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <DocsPanel doc={doc} />
    </div>
  );
}

function ControlRow({
  control,
  value,
  onChange,
}: {
  control: ComponentPlayground["controls"][number];
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const label = control.label ?? control.prop;

  if (control.kind === "enum") {
    return (
      <div className="sg-studio-control">
        <span className="sg-studio-control-label">{label}</span>
        <SegmentedControl
          size="sm"
          look="soft"
          label={label}
          options={control.options.map((o) => ({ value: o, label: o }))}
          value={String(value ?? control.default)}
          onValueChange={onChange}
          fullWidth
        />
      </div>
    );
  }

  if (control.kind === "boolean") {
    return (
      <div className="sg-studio-control sg-studio-control-bool">
        <Switch
          label={label}
          checked={Boolean(value)}
          onCheckedChange={onChange}
        />
      </div>
    );
  }

  if (control.kind === "number") {
    return (
      <div className="sg-studio-control">
        <Input
          label={label}
          type="number"
          min={control.min}
          max={control.max}
          step={control.step ?? 1}
          value={String(value ?? control.default)}
          onChange={(e) => {
            const n = Number(e.target.value);
            onChange(Number.isFinite(n) ? n : control.default);
          }}
        />
      </div>
    );
  }

  return (
    <div className="sg-studio-control">
      <Input
        label={label}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function DocsPanel({ doc }: { doc: ComponentDoc }) {
  return (
    <Card surface="solid" as="section" padding="md" className="sg-studio-docs">
      <CardHeader>
        <CardTitle style={{ fontSize: "var(--sg-text-base)" }}>Docs</CardTitle>
        <CardDescription>From COMPONENT_DOCS · import + props</CardDescription>
      </CardHeader>
      <CardContent className="sg-studio-docs-body">
        <code className="sg-gallery-import">{doc.importLine}</code>
        {doc.example ? (
          <pre className="sg-gallery-code sg-studio-example">{doc.example}</pre>
        ) : null}
        <div className="sg-studio-props" role="table" aria-label={`${doc.name} props`}>
          <div className="sg-studio-props-head" role="row">
            <span role="columnheader">Prop</span>
            <span role="columnheader">Type</span>
            <span role="columnheader">Default</span>
            <span role="columnheader">Description</span>
          </div>
          {doc.props.map((p) => (
            <div key={p.name} className="sg-studio-props-row" role="row">
              <code role="cell">{p.name}</code>
              <span role="cell" className="sg-studio-props-type">
                {p.type}
              </span>
              <span role="cell" className="sg-studio-props-default">
                {p.default ?? "—"}
              </span>
              <span role="cell">{p.description}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

