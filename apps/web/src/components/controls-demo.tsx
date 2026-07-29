"use client";

import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Combobox,
  Input,
  MultiSelect,
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
  useToast,
} from "@softglass/ui";
import { useState } from "react";

const CITY_OPTIONS = [
  { value: "ist", label: "Istanbul" },
  { value: "ank", label: "Ankara" },
  { value: "izm", label: "Izmir" },
  { value: "ant", label: "Antalya" },
  { value: "brs", label: "Bursa" },
  { value: "ada", label: "Adana" },
];

const TAG_OPTIONS = [
  { value: "glass", label: "Glass" },
  { value: "soft", label: "Soft" },
  { value: "a11y", label: "A11y" },
  { value: "motion", label: "Motion" },
  { value: "tokens", label: "Tokens" },
  { value: "next", label: "Next.js" },
];

export function ControlsDemo() {
  const { toast } = useToast();
  const [glassChrome, setGlassChrome] = useState(true);
  const [language, setLanguage] = useState("aurora");
  const [plan, setPlan] = useState("pro");
  const [marketing, setMarketing] = useState(true);
  const [city, setCity] = useState("ist");
  const [tags, setTags] = useState<string[]>(["glass", "soft"]);

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <Card surface="glass" as="section" id="avatars">
        <CardHeader>
          <CardTitle>Avatar</CardTitle>
          <CardDescription>
            Soft pill faces — image or initials fallback. Group stacks overlap.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Avatar size="sm" fallback="Ada Lovelace" />
            <Avatar size="md" fallback="Grace Hopper" />
            <Avatar size="lg" fallback="Alan Turing" />
            <Avatar
              size="xl"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop"
              alt="Demo user"
              fallback="Demo User"
            />
            <AvatarGroup aria-label="Team">
              <Avatar fallback="A B" />
              <Avatar fallback="C D" />
              <Avatar fallback="E F" />
              <Avatar fallback="+3" />
            </AvatarGroup>
          </div>
        </CardContent>
      </Card>

      <Card surface="solid" as="section" id="forms-extra">
        <CardHeader>
          <CardTitle>Select · Combobox · MultiSelect · Switch · Input</CardTitle>
          <CardDescription>
            Select = pick. Combobox = type to filter. MultiSelect = chips.
            Input stays solid for typing contrast.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "1rem" }}>
          <Select
            label="Visual language"
            hint="Custom menu — not the browser default list."
            value={language}
            onValueChange={setLanguage}
            options={[
              { value: "aurora", label: "Aurora Glass" },
              { value: "obsidian", label: "Obsidian Gloss" },
              { value: "mist", label: "Mist Panel" },
              { value: "pearl", label: "Pearl Soft" },
            ]}
          />
          <Select
            label="Plan"
            placeholder="Choose a plan"
            defaultValue=""
            options={[
              { value: "starter", label: "Starter" },
              { value: "pro", label: "Pro" },
              { value: "team", label: "Team" },
            ]}
          />
          <Combobox
            label="City (Combobox)"
            hint="Type to filter — single value, options only."
            value={city}
            onValueChange={setCity}
            options={CITY_OPTIONS}
            placeholder="Search cities…"
          />
          <MultiSelect
            label="Tags (MultiSelect)"
            hint="Chips toggle; menu stays open. Max 4."
            value={tags}
            onValueChange={setTags}
            options={TAG_OPTIONS}
            maxSelected={4}
            placeholder="Pick tags…"
          />
          <div
            style={{
              display: "grid",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                fontSize: "var(--sg-text-xs)",
                color: "var(--sg-fg-muted)",
              }}
            >
              Same soft pill language as ghost buttons:
            </span>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.65rem",
                alignItems: "center",
              }}
            >
              <Button size="sm" variant="ghost">
                Ghost button
              </Button>
              <div style={{ width: "11rem" }}>
                <Select
                  size="sm"
                  placeholder="Small select"
                  options={[
                    { value: "a", label: "Option A" },
                    { value: "b", label: "Option B" },
                  ]}
                />
              </div>
            </div>
          </div>
          <Input label="Project name" placeholder="Softglass docs" />
          <Textarea
            label="Description"
            requiredMark
            placeholder="What is this project about?"
            rows={3}
            hint="Solid surface — easy to read while typing."
          />
          <Checkbox
            label="Email product tips"
            hint="Optional. Unsubscribe anytime."
            checked={marketing}
            onCheckedChange={setMarketing}
          />
          <RadioGroup
            name="billing"
            label="Billing plan"
            value={plan}
            onValueChange={setPlan}
          >
            <Radio value="starter" label="Starter" hint="Solo makers" />
            <Radio value="pro" label="Pro" hint="Growing teams" />
            <Radio value="team" label="Team" hint="Orgs & seats" />
          </RadioGroup>
          <Switch
            label="Glass chrome"
            hint="Nav and modals use frosted surfaces."
            checked={glassChrome}
            onCheckedChange={setGlassChrome}
          />
          <Switch
            label="Reduced motion"
            hint="Demo only — real apps should read prefers-reduced-motion."
            defaultChecked={false}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
            <Tooltip content="Saves language, plan, and chrome prefs">
              <Button
                type="button"
                onClick={() =>
                  toast({
                    title: `Saved · ${language} · ${plan}`,
                    description: [
                      glassChrome ? "Glass chrome on" : "Glass chrome off",
                      marketing ? "Tips on" : "Tips off",
                    ].join(" · "),
                    variant: "success",
                  })
                }
              >
                Save preferences
              </Button>
            </Tooltip>
            <Tooltip content="Destructive — demo only" placement="bottom">
              <Button type="button" variant="danger" size="sm">
                Danger tip
              </Button>
            </Tooltip>
          </div>
        </CardContent>
      </Card>

      <Card surface="glass-elevated" as="section" id="tabs">
        <CardHeader>
          <CardTitle>Tabs</CardTitle>
          <CardDescription>
            Pill tablist on glass. Active trigger uses solid accent.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tokens">Tokens</TabsTrigger>
              <TabsTrigger value="a11y">A11y</TabsTrigger>
              <TabsTrigger value="soon" disabled>
                Soon
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <p
                style={{
                  margin: 0,
                  color: "var(--sg-fg-muted)",
                  fontSize: "var(--sg-text-sm)",
                  lineHeight: 1.6,
                }}
              >
                Softglass keeps one component API across{" "}
                <Badge variant="accent">aurora</Badge>{" "}
                <Badge>obsidian</Badge> <Badge>mist</Badge>{" "}
                <Badge>pearl</Badge>. Switch the header theme to see tabs recolor.
              </p>
            </TabsContent>
            <TabsContent value="tokens">
              <p
                style={{
                  margin: 0,
                  color: "var(--sg-fg-muted)",
                  fontSize: "var(--sg-text-sm)",
                  lineHeight: 1.6,
                }}
              >
                Surfaces read <code>--sg-surface-glass</code>, accents read{" "}
                <code>--sg-accent</code>. Brand override = recolor those tokens.
              </p>
            </TabsContent>
            <TabsContent value="a11y">
              <p
                style={{
                  margin: 0,
                  color: "var(--sg-fg-muted)",
                  fontSize: "var(--sg-text-sm)",
                  lineHeight: 1.6,
                }}
              >
                Select is a custom frost listbox. Switch uses{" "}
                <code>role=&quot;switch&quot;</code>. Checkbox/radio use native
                inputs with custom faces.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
