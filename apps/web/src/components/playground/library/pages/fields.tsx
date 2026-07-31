"use client";

import type { ComponentPlayground } from "@/components/playground/library/manifest";
import {
  bool,
  boolControl,
  DEMO_MULTI,
  DEMO_OPTIONS,
  enumControl,
  num,
  numberControl,
  showcase,
  str,
  strip,
  textControl,
} from "@/components/playground/library/helpers";
import {
  Checkbox,
  Combobox,
  DatePicker,
  FileField,
  Input,
  MultiSelect,
  NumberInput,
  PasswordInput,
  Radio,
  RadioGroup,
  SearchInput,
  SegmentedControl,
  Select,
  Slider,
  Switch,
  Textarea,
  type DatePickerMode,
  type DatePickerSize,
  type FieldLook,
  type FieldMotion,
  type FileFieldLook,
  type FileFieldSize,
  type InputSize,
  type NumberInputLook,
  type NumberInputSize,
  type PasswordInputLook,
  type PasswordInputSize,
  type SearchInputLook,
  type SearchInputSize,
  type SegmentedControlLook,
  type SegmentedControlSize,
  type SelectLook,
  type SelectMotion,
  type SelectSize,
  type SliderLook,
  type SliderSize,
  type SwitchLook,
  type SwitchMotion,
  type TextareaSize,
} from "@softglass/ui";
import type { CheckboxLook, CheckboxMotion, RadioLook, RadioMotion } from "@softglass/ui";

const SIZES = ["sm", "md", "lg"] as const;
const FIELD_LOOKS = ["solid", "underline", "filled", "ghost"] as const;
const FIELD_MOTIONS = ["none", "ring", "underline-grow", "glow"] as const;
const SELECT_LOOKS = ["solid", "soft", "glass", "gradient"] as const;
const SELECT_MOTIONS = ["none", "fade", "scale", "slide-down"] as const;

export const fieldPlaygrounds: ComponentPlayground[] = [
  {
    id: "input",
    title: "Input",
    controls: [
      enumControl("size", SIZES, "md"),
      enumControl("look", FIELD_LOOKS, "solid"),
      enumControl("motion", FIELD_MOTIONS, "ring"),
      textControl("label", "Email"),
      textControl("placeholder", "you@team.com"),
      textControl("hint", "Work email preferred"),
      textControl("error", ""),
      boolControl("fullWidth", true),
      boolControl("disabled", false),
      boolControl("requiredMark", false),
    ],
    render: (p) => (
      <Input
        size={str(p, "size") as InputSize}
        look={str(p, "look") as FieldLook}
        motion={str(p, "motion") as FieldMotion}
        label={str(p, "label")}
        placeholder={str(p, "placeholder")}
        hint={str(p, "hint") || undefined}
        error={str(p, "error") || undefined}
        fullWidth={bool(p, "fullWidth")}
        disabled={bool(p, "disabled")}
        requiredMark={bool(p, "requiredMark")}
      />
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          FIELD_LOOKS.map((look) => (
            <Input key={look} look={look} label={look} placeholder={look} fullWidth={false} />
          )),
        ),
      ),
      showcase("Sizes", () =>
        strip(
          SIZES.map((size) => (
            <Input key={size} size={size} label={size} fullWidth={false} />
          )),
        ),
      ),
      showcase("Edges", () =>
        strip(
          <>
            <Input label="Error" error="Required" fullWidth={false} />
            <Input label="Disabled" disabled fullWidth={false} />
          </>,
        ),
      ),
    ],
  },
  {
    id: "textarea",
    title: "Textarea",
    controls: [
      enumControl("size", SIZES, "md"),
      enumControl("look", FIELD_LOOKS, "solid"),
      enumControl("motion", FIELD_MOTIONS, "ring"),
      textControl("label", "Notes"),
      textControl("placeholder", "Write something soft…"),
      textControl("hint", ""),
      textControl("error", ""),
      boolControl("fullWidth", true),
      boolControl("disabled", false),
      numberControl("rows", 3, "rows", 2, 12, 1),
    ],
    render: (p) => (
      <Textarea
        size={str(p, "size") as TextareaSize}
        look={str(p, "look") as FieldLook}
        motion={str(p, "motion") as FieldMotion}
        label={str(p, "label")}
        placeholder={str(p, "placeholder")}
        hint={str(p, "hint") || undefined}
        error={str(p, "error") || undefined}
        fullWidth={bool(p, "fullWidth")}
        disabled={bool(p, "disabled")}
        rows={num(p, "rows", 3)}
      />
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          FIELD_LOOKS.map((look) => (
            <Textarea key={look} look={look} label={look} rows={2} fullWidth={false} />
          )),
        ),
      ),
    ],
  },
  {
    id: "switch",
    title: "Switch",
    controls: [
      enumControl("look", ["track", "ios", "minimal"], "track"),
      enumControl("motion", ["none", "snap", "spring", "elastic"], "spring"),
      textControl("label", "Notifications"),
      textControl("hint", "Email digests"),
      boolControl("checked", true),
      boolControl("disabled", false),
    ],
    render: (p) => (
      <Switch
        look={str(p, "look") as SwitchLook}
        motion={str(p, "motion") as SwitchMotion}
        label={str(p, "label")}
        hint={str(p, "hint") || undefined}
        checked={bool(p, "checked")}
        disabled={bool(p, "disabled")}
      />
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["track", "ios", "minimal"] as const).map((look) => (
            <Switch key={look} look={look} label={look} defaultChecked />
          )),
        ),
      ),
      showcase("Motion", () =>
        strip(
          (["none", "snap", "spring", "elastic"] as const).map((motion) => (
            <Switch key={motion} motion={motion} label={motion} defaultChecked />
          )),
        ),
      ),
    ],
  },
  {
    id: "checkbox",
    title: "Checkbox",
    controls: [
      enumControl("look", ["box", "card", "pill"], "box"),
      enumControl("motion", ["none", "pop", "draw", "fade-in", "bounce"], "pop"),
      textControl("label", "Accept terms"),
      textControl("hint", "Required to continue"),
      boolControl("checked", false),
      boolControl("disabled", false),
    ],
    render: (p) => (
      <Checkbox
        look={str(p, "look") as CheckboxLook}
        motion={str(p, "motion") as CheckboxMotion}
        label={str(p, "label")}
        hint={str(p, "hint") || undefined}
        checked={bool(p, "checked")}
        disabled={bool(p, "disabled")}
      />
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["box", "card", "pill"] as const).map((look) => (
            <Checkbox key={look} look={look} label={look} defaultChecked />
          )),
        ),
      ),
    ],
  },
  {
    id: "radio",
    title: "Radio",
    controls: [
      enumControl("look", ["dot", "card", "chip"], "dot"),
      enumControl("motion", ["none", "pop", "dot-scale", "ring-expand"], "pop"),
      enumControl("value", ["a", "b", "c"], "a"),
      boolControl("disabled", false),
    ],
    render: (p) => (
      <RadioGroup
        name="studio-radio"
        value={str(p, "value", "a")}
        look={str(p, "look") as RadioLook}
        motion={str(p, "motion") as RadioMotion}
        label="Plan"
        disabled={bool(p, "disabled")}
      >
        <Radio value="a" label="Starter" />
        <Radio value="b" label="Growth" />
        <Radio value="c" label="Scale" />
      </RadioGroup>
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["dot", "card", "chip"] as const).map((look) => (
            <RadioGroup
              key={look}
              name={`studio-radio-${look}`}
              look={look}
              defaultValue="a"
              label={look}
            >
              <Radio value="a" label="A" />
              <Radio value="b" label="B" />
            </RadioGroup>
          )),
        ),
      ),
    ],
  },
  {
    id: "select",
    title: "Select",
    controls: [
      enumControl("size", SIZES, "md"),
      enumControl("look", SELECT_LOOKS, "solid"),
      enumControl("motion", SELECT_MOTIONS, "scale"),
      textControl("label", "Language"),
      textControl("placeholder", "Pick one"),
      textControl("hint", ""),
      textControl("error", ""),
      boolControl("disabled", false),
    ],
    render: (p) => (
      <Select
        options={DEMO_OPTIONS}
        size={str(p, "size") as SelectSize}
        look={str(p, "look") as SelectLook}
        motion={str(p, "motion") as SelectMotion}
        label={str(p, "label")}
        placeholder={str(p, "placeholder")}
        hint={str(p, "hint") || undefined}
        error={str(p, "error") || undefined}
        disabled={bool(p, "disabled")}
        defaultValue="aurora"
      />
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          SELECT_LOOKS.map((look) => (
            <Select
              key={look}
              look={look}
              options={DEMO_OPTIONS}
              label={look}
              defaultValue="mist"
            />
          )),
        ),
      ),
    ],
  },
  {
    id: "combobox",
    title: "Combobox",
    controls: [
      enumControl("size", SIZES, "md"),
      enumControl("look", SELECT_LOOKS, "solid"),
      enumControl("motion", SELECT_MOTIONS, "scale"),
      textControl("label", "Theme"),
      textControl("placeholder", "Search themes"),
      boolControl("disabled", false),
    ],
    render: (p) => (
      <Combobox
        options={DEMO_OPTIONS}
        size={str(p, "size") as SelectSize}
        look={str(p, "look") as SelectLook}
        motion={str(p, "motion") as SelectMotion}
        label={str(p, "label")}
        placeholder={str(p, "placeholder")}
        disabled={bool(p, "disabled")}
      />
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          SELECT_LOOKS.map((look) => (
            <Combobox key={look} look={look} options={DEMO_OPTIONS} label={look} />
          )),
        ),
      ),
    ],
  },
  {
    id: "multi-select",
    title: "MultiSelect",
    controls: [
      enumControl("size", SIZES, "md"),
      enumControl("look", SELECT_LOOKS, "solid"),
      enumControl("motion", SELECT_MOTIONS, "scale"),
      textControl("label", "Teams"),
      textControl("placeholder", "Select teams"),
      boolControl("filterable", true),
      boolControl("disabled", false),
      numberControl("maxSelected", 0, "maxSelected (0=∞)", 0, 4, 1),
    ],
    render: (p) => (
      <MultiSelect
        options={DEMO_MULTI}
        size={str(p, "size") as SelectSize}
        look={str(p, "look") as SelectLook}
        motion={str(p, "motion") as SelectMotion}
        label={str(p, "label")}
        placeholder={str(p, "placeholder")}
        filterable={bool(p, "filterable")}
        disabled={bool(p, "disabled")}
        maxSelected={num(p, "maxSelected", 0) || undefined}
        defaultValue={["design"]}
      />
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          SELECT_LOOKS.map((look) => (
            <MultiSelect
              key={look}
              look={look}
              options={DEMO_MULTI}
              label={look}
              defaultValue={["eng"]}
            />
          )),
        ),
      ),
    ],
  },
  {
    id: "date-picker",
    title: "DatePicker",
    controls: [
      enumControl("mode", ["single", "range"], "single"),
      enumControl("size", SIZES, "md"),
      enumControl("motion", SELECT_MOTIONS, "scale"),
      textControl("label", "Date"),
      textControl("placeholder", "Pick a date"),
      boolControl("disabled", false),
    ],
    render: (p) => (
      <DatePicker
        mode={str(p, "mode") as DatePickerMode}
        size={str(p, "size") as DatePickerSize}
        motion={str(p, "motion") as SelectMotion}
        label={str(p, "label")}
        placeholder={str(p, "placeholder")}
        disabled={bool(p, "disabled")}
      />
    ),
    showcases: [
      showcase("Modes", () =>
        strip(
          <>
            <DatePicker mode="single" label="Single" />
            <DatePicker mode="range" label="Range" />
          </>,
        ),
      ),
      showcase("Sizes", () =>
        strip(
          SIZES.map((size) => <DatePicker key={size} size={size} label={size} />),
        ),
      ),
    ],
  },
  {
    id: "slider",
    title: "Slider",
    controls: [
      numberControl("value", 40, "value", 0, 100, 1),
      enumControl("size", SIZES, "md"),
      enumControl("look", ["soft", "solid", "glass", "accent"], "soft"),
      textControl("label", "Intensity"),
      boolControl("showValue", true),
      boolControl("disabled", false),
      boolControl("fullWidth", true),
    ],
    render: (p) => (
      <div style={{ width: "100%", maxWidth: 320 }}>
        <Slider
          value={num(p, "value", 40)}
          size={str(p, "size") as SliderSize}
          look={str(p, "look") as SliderLook}
          label={str(p, "label")}
          showValue={bool(p, "showValue")}
          disabled={bool(p, "disabled")}
          fullWidth={bool(p, "fullWidth")}
        />
      </div>
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["soft", "solid", "glass", "accent"] as const).map((look) => (
            <div key={look} style={{ width: 140 }}>
              <Slider look={look} defaultValue={55} label={look} size="sm" />
            </div>
          )),
        ),
      ),
    ],
  },
  {
    id: "number-input",
    title: "NumberInput",
    controls: [
      numberControl("value", 3, "value", -100, 100, 1),
      enumControl("size", SIZES, "md"),
      enumControl("look", ["soft", "solid", "outline", "ghost"], "soft"),
      textControl("label", "Quantity"),
      boolControl("disabled", false),
    ],
    render: (p) => (
      <NumberInput
        value={num(p, "value", 3)}
        size={str(p, "size") as NumberInputSize}
        look={str(p, "look") as NumberInputLook}
        label={str(p, "label")}
        disabled={bool(p, "disabled")}
      />
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["soft", "solid", "outline", "ghost"] as const).map((look) => (
            <NumberInput key={look} look={look} label={look} defaultValue={2} />
          )),
        ),
      ),
    ],
  },
  {
    id: "file-field",
    title: "FileField",
    controls: [
      enumControl("size", SIZES, "md"),
      enumControl("look", ["solid", "soft", "dashed", "ghost"], "solid"),
      textControl("label", "Upload"),
      textControl("buttonLabel", "Choose file"),
      boolControl("multiple", false),
      boolControl("disabled", false),
    ],
    render: (p) => (
      <FileField
        size={str(p, "size") as FileFieldSize}
        look={str(p, "look") as FileFieldLook}
        label={str(p, "label")}
        buttonLabel={str(p, "buttonLabel")}
        multiple={bool(p, "multiple")}
        disabled={bool(p, "disabled")}
      />
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["solid", "soft", "dashed", "ghost"] as const).map((look) => (
            <FileField key={look} look={look} label={look} />
          )),
        ),
      ),
    ],
  },
  {
    id: "password-input",
    title: "PasswordInput",
    controls: [
      enumControl("size", SIZES, "md"),
      enumControl("look", FIELD_LOOKS, "solid"),
      textControl("label", "Password"),
      textControl("placeholder", "••••••••"),
      boolControl("disabled", false),
    ],
    render: (p) => (
      <PasswordInput
        size={str(p, "size") as PasswordInputSize}
        look={str(p, "look") as PasswordInputLook}
        label={str(p, "label")}
        placeholder={str(p, "placeholder")}
        disabled={bool(p, "disabled")}
      />
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          FIELD_LOOKS.map((look) => (
            <PasswordInput key={look} look={look as PasswordInputLook} label={look} />
          )),
        ),
      ),
    ],
  },
  {
    id: "search-input",
    title: "SearchInput",
    controls: [
      enumControl("size", SIZES, "md"),
      enumControl("look", FIELD_LOOKS, "solid"),
      textControl("label", "Search"),
      textControl("placeholder", "Components…"),
      boolControl("disabled", false),
    ],
    render: (p) => (
      <SearchInput
        size={str(p, "size") as SearchInputSize}
        look={str(p, "look") as SearchInputLook}
        label={str(p, "label")}
        placeholder={str(p, "placeholder")}
        disabled={bool(p, "disabled")}
      />
    ),
    showcases: [
      showcase("Sizes", () =>
        strip(
          SIZES.map((size) => (
            <SearchInput key={size} size={size} label={size} placeholder={size} />
          )),
        ),
      ),
    ],
  },
  {
    id: "segmented-control",
    title: "SegmentedControl",
    controls: [
      enumControl("size", SIZES, "md"),
      enumControl("look", ["soft", "solid", "outline", "glass"], "soft"),
      enumControl("value", ["day", "week", "month"], "week"),
      boolControl("fullWidth", true),
      boolControl("disabled", false),
    ],
    render: (p) => (
      <SegmentedControl
        size={str(p, "size") as SegmentedControlSize}
        look={str(p, "look") as SegmentedControlLook}
        value={str(p, "value", "week")}
        fullWidth={bool(p, "fullWidth")}
        disabled={bool(p, "disabled")}
        label="Range"
        options={[
          { value: "day", label: "Day" },
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
        ]}
      />
    ),
    showcases: [
      showcase("Looks", () =>
        strip(
          (["soft", "solid", "outline", "glass"] as const).map((look) => (
            <SegmentedControl
              key={look}
              look={look}
              size="sm"
              defaultValue="a"
              label={look}
              options={[
                { value: "a", label: "A" },
                { value: "b", label: "B" },
              ]}
            />
          )),
        ),
      ),
    ],
  },
];
