"use client";

import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
} from "@softglass/ui";
import { useState } from "react";

export function LooksDemo() {
  const [radioDot, setRadioDot] = useState("a");
  const [radioCard, setRadioCard] = useState("pro");
  const [radioChip, setRadioChip] = useState("day");

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <Card surface="glass" look="glow" as="section">
        <CardHeader>
          <Badge look="glow" variant="accent">
            looks + motion
          </Badge>
          <CardTitle>Design types + motion menus</CardTitle>
          <CardDescription>
            <code>look</code> = surface language. <code>motion</code> = how it
            moves (per-control menu). Reduced-motion disables recipes.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <CardTitle>Button · look</CardTitle>
          <CardDescription>
            solid · soft · glass · gradient · neon (+ variant)
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
          <Button look="solid">solid</Button>
          <Button look="soft">soft</Button>
          <Button look="glass">glass</Button>
          <Button look="gradient">gradient</Button>
          <Button look="neon">neon</Button>
          <Button look="gradient" variant="danger">
            gradient danger
          </Button>
          <Button look="neon" variant="danger">
            neon danger
          </Button>
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <CardTitle>Radio · 3 looks</CardTitle>
          <CardDescription>dot · card · chip</CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1.25rem" }}>
          <RadioGroup
            name="look-dot"
            label="Dot (classic)"
            look="dot"
            value={radioDot}
            onValueChange={setRadioDot}
          >
            <Radio value="a" label="Option A" />
            <Radio value="b" label="Option B" />
          </RadioGroup>

          <RadioGroup
            name="look-card"
            label="Card"
            look="card"
            value={radioCard}
            onValueChange={setRadioCard}
          >
            <Radio value="starter" label="Starter" hint="Solo" />
            <Radio value="pro" label="Pro" hint="Teams" />
            <Radio value="team" label="Enterprise" hint="Orgs" />
          </RadioGroup>

          <RadioGroup
            name="look-chip"
            label="Chip"
            look="chip"
            value={radioChip}
            onValueChange={setRadioChip}
          >
            <Radio value="day" label="Day" />
            <Radio value="week" label="Week" />
            <Radio value="month" label="Month" />
          </RadioGroup>
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <CardTitle>Checkbox · looks</CardTitle>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "0.75rem" }}>
          <Checkbox look="box" label="Box (classic)" defaultChecked />
          <Checkbox look="card" label="Card checkbox" hint="Full width row" />
          <Checkbox look="pill" label="Pill checkbox" defaultChecked />
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <CardTitle>Switch · looks</CardTitle>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "0.85rem" }}>
          <Switch look="track" label="Track (default)" defaultChecked />
          <Switch look="ios" label="iOS-style" defaultChecked />
          <Switch look="minimal" label="Minimal" defaultChecked />
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <CardTitle>Badge · Avatar · Tooltip</CardTitle>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <Badge look="soft">soft</Badge>
            <Badge look="solid">solid look</Badge>
            <Badge look="outline" variant="accent">
              outline
            </Badge>
            <Badge look="glow" variant="accent" dot>
              glow
            </Badge>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <Avatar look="circle" fallback="Ada L" />
            <Avatar look="rounded" fallback="Grace H" />
            <Avatar look="soft" fallback="Alan T" size="lg" />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
            <Tooltip content="Frost tip" look="frost">
              <Button size="sm" variant="ghost">
                frost tip
              </Button>
            </Tooltip>
            <Tooltip content="Solid tip" look="solid">
              <Button size="sm" variant="ghost">
                solid tip
              </Button>
            </Tooltip>
            <Tooltip content="Accent tip" look="accent" placement="bottom">
              <Button size="sm" variant="ghost">
                accent tip
              </Button>
            </Tooltip>
          </div>
        </CardContent>
      </Card>

      <Card surface="glass" as="section" style={{ overflow: "visible" }}>
        <CardHeader>
          <CardTitle>Field looks · Select looks</CardTitle>
          <CardDescription>
            One select per row so open menus are not cramped under the next card.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "0.85rem", overflow: "visible" }}>
          <Input look="solid" label="Solid" placeholder="Default field" />
          <Input look="underline" label="Underline" placeholder="Minimal line" />
          <Input look="filled" label="Filled" placeholder="Soft fill" />
          <Input look="ghost" label="Ghost" placeholder="Bare until focus" />
          <Textarea look="filled" label="Filled textarea" rows={2} />
          <Select
            look="solid"
            label="Select · solid"
            placeholder="solid select"
            options={[
              { value: "1", label: "One" },
              { value: "2", label: "Two" },
              { value: "3", label: "Three" },
            ]}
          />
          <Select
            look="soft"
            label="Select · soft"
            placeholder="soft select"
            options={[
              { value: "1", label: "One" },
              { value: "2", label: "Two" },
              { value: "3", label: "Three" },
            ]}
          />
          <Select
            look="glass"
            label="Select · glass"
            placeholder="glass select"
            options={[
              { value: "1", label: "One" },
              { value: "2", label: "Two" },
              { value: "3", label: "Three" },
            ]}
          />
          <Select
            look="gradient"
            label="Select · gradient"
            placeholder="gradient select"
            options={[
              { value: "1", label: "One" },
              { value: "2", label: "Two" },
              { value: "3", label: "Three" },
            ]}
          />
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <CardTitle>Tabs · look × motion</CardTitle>
          <CardDescription>
            Default motion is <code>slide</code> — indicator glides. Try fade /
            none.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1.25rem" }}>
          <Tabs defaultValue="a" look="pill" motion="slide">
            <TabsList>
              <TabsTrigger value="a">Pill A</TabsTrigger>
              <TabsTrigger value="b">Pill B</TabsTrigger>
              <TabsTrigger value="c">Pill C</TabsTrigger>
            </TabsList>
            <TabsContent value="a">Slide indicator (default).</TabsContent>
            <TabsContent value="b">Glides to this tab.</TabsContent>
            <TabsContent value="c">Still soft glass.</TabsContent>
          </Tabs>

          <Tabs defaultValue="a" look="underline" motion="slide">
            <TabsList>
              <TabsTrigger value="a">Underline</TabsTrigger>
              <TabsTrigger value="b">Second</TabsTrigger>
              <TabsTrigger value="c">Third</TabsTrigger>
            </TabsList>
            <TabsContent value="a">Sliding underline bar.</TabsContent>
            <TabsContent value="b">Docs-style chrome.</TabsContent>
            <TabsContent value="c">No hard cut.</TabsContent>
          </Tabs>

          <Tabs defaultValue="a" look="segmented" motion="fade">
            <TabsList>
              <TabsTrigger value="a">Fade A</TabsTrigger>
              <TabsTrigger value="b">Fade B</TabsTrigger>
              <TabsTrigger value="c">Fade C</TabsTrigger>
            </TabsList>
            <TabsContent value="a">motion=fade on segmented.</TabsContent>
            <TabsContent value="b">Soft color cross-fade.</TabsContent>
            <TabsContent value="c">No sliding pill.</TabsContent>
          </Tabs>

          <Tabs defaultValue="a" look="pill" motion="none">
            <TabsList>
              <TabsTrigger value="a">Instant</TabsTrigger>
              <TabsTrigger value="b">Swap</TabsTrigger>
            </TabsList>
            <TabsContent value="a">motion=none — instant.</TabsContent>
            <TabsContent value="b">Useful for reduced-feel UIs.</TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card surface="glass" as="section">
        <CardHeader>
          <CardTitle>Motion menus (research catalog)</CardTitle>
          <CardDescription>
            Each control has its own <code>motion</code> options — parallel to{" "}
            <code>look</code>.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1.25rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
            <Button motion="lift">lift</Button>
            <Button motion="press">press</Button>
            <Button motion="sheen" look="gradient">
              sheen
            </Button>
            <Button motion="ripple">ripple</Button>
            <Button motion="none">none</Button>
          </div>

          <div style={{ display: "grid", gap: "0.65rem" }}>
            <Checkbox look="box" motion="pop" label="checkbox · pop" defaultChecked />
            <Checkbox look="box" motion="draw" label="checkbox · draw" defaultChecked />
            <Checkbox look="box" motion="bounce" label="checkbox · bounce" />
            <Switch look="track" motion="spring" label="switch · spring" defaultChecked />
            <Switch look="track" motion="snap" label="switch · snap" />
            <Switch look="ios" motion="elastic" label="switch · elastic" defaultChecked />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "0.65rem",
            }}
          >
            <Input look="solid" motion="ring" label="field · ring" placeholder="Focus me" />
            <Input
              look="underline"
              motion="underline-grow"
              label="field · underline-grow"
              placeholder="Focus me"
            />
            <Input look="filled" motion="glow" label="field · glow" placeholder="Focus me" />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
            <Badge motion="pulse" variant="accent">
              pulse
            </Badge>
            <Badge motion="pop-in" variant="success">
              pop-in
            </Badge>
            <Badge motion="shimmer" variant="accent">
              shimmer
            </Badge>
            <Avatar motion="lift" fallback="Ada L" />
            <Avatar motion="status-ping" fallback="On Line" />
            <Avatar motion="ring-pulse" fallback="RP" look="soft" />
          </div>
        </CardContent>
      </Card>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "0.75rem",
        }}
      >
        <Card surface="glass" look="flat" padding="sm">
          <CardTitle style={{ fontSize: "1rem" }}>look=flat</CardTitle>
        </Card>
        <Card surface="glass" look="raised" padding="sm">
          <CardTitle style={{ fontSize: "1rem" }}>look=raised</CardTitle>
        </Card>
        <Card surface="glass" look="outline" padding="sm">
          <CardTitle style={{ fontSize: "1rem" }}>look=outline</CardTitle>
        </Card>
        <Card surface="glass" look="glow" padding="sm" hoverable>
          <CardTitle style={{ fontSize: "1rem" }}>look=glow</CardTitle>
        </Card>
      </div>
    </div>
  );
}
