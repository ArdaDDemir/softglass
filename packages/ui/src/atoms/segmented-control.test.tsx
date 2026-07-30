import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SegmentedControl } from "./segmented-control";

const OPTIONS = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

describe("SegmentedControl (smoke)", () => {
  it("selects an option and fires onValueChange", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <SegmentedControl
        label="Range"
        options={OPTIONS}
        value="day"
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("radio", { name: "Week" }));
    expect(onValueChange).toHaveBeenCalledWith("week");
  });

  it("moves selection with arrow keys", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <SegmentedControl
        label="Range"
        options={OPTIONS}
        value="day"
        onValueChange={onValueChange}
      />,
    );

    screen.getByRole("radio", { name: "Day" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenCalledWith("week");
  });
});
