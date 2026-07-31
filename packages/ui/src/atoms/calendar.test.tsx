import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Calendar } from "./calendar";

describe("Calendar (smoke)", () => {
  it("selects a day in single mode", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Calendar
        defaultValue="2026-07-15"
        onValueChange={onValueChange}
        aria-label="Pick day"
      />,
    );

    // Caption shows month; grid is present
    expect(screen.getByRole("grid")).toBeInTheDocument();

    const day = document.querySelector<HTMLButtonElement>(
      '[data-iso="2026-07-20"]',
    );
    expect(day).toBeTruthy();
    await user.click(day!);
    expect(onValueChange).toHaveBeenCalledWith("2026-07-20");
  });

  it("supports range start then end", async () => {
    const user = userEvent.setup();
    const onRangeValueChange = vi.fn();

    render(
      <Calendar
        mode="range"
        defaultValue="2026-07-01"
        defaultRangeValue={{ start: "", end: "" }}
        onRangeValueChange={onRangeValueChange}
      />,
    );

    await user.click(document.querySelector('[data-iso="2026-07-10"]')!);
    expect(onRangeValueChange).not.toHaveBeenCalled();

    await user.click(document.querySelector('[data-iso="2026-07-12"]')!);
    expect(onRangeValueChange).toHaveBeenCalledWith({
      start: "2026-07-10",
      end: "2026-07-12",
    });
  });
});
