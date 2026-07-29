import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { MultiSelect } from "./multi-select";

const OPTIONS = [
  { value: "glass", label: "Glass" },
  { value: "soft", label: "Soft" },
  { value: "a11y", label: "A11y" },
];

function ControlledMulti() {
  const [value, setValue] = useState<string[]>(["glass", "soft"]);
  return (
    <MultiSelect
      label="Tags"
      options={OPTIONS}
      value={value}
      onValueChange={setValue}
    />
  );
}

describe("MultiSelect (smoke)", () => {
  it("removes a chip when its remove control is clicked", async () => {
    const user = userEvent.setup();

    render(<ControlledMulti />);

    expect(screen.getByText("Glass")).toBeInTheDocument();
    expect(screen.getByText("Soft")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Remove Glass" }));

    expect(screen.queryByText("Glass")).not.toBeInTheDocument();
    expect(screen.getByText("Soft")).toBeInTheDocument();
  });
});
