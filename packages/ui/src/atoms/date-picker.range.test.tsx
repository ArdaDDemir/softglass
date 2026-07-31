import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DatePicker } from "./date-picker";

describe("DatePicker range (smoke)", () => {
  it("picks start then end and emits ordered range", async () => {
    const user = userEvent.setup();
    const onRangeValueChange = vi.fn();

    render(
      <DatePicker
        mode="range"
        label="Trip"
        motion="none"
        defaultRangeValue={{ start: "", end: "" }}
        onRangeValueChange={onRangeValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: /Trip|range|Date/i }));
    expect(await screen.findByText("Select start date")).toBeInTheDocument();

    // Use ISO data attributes from the grid — pick day 10 then day 14 in view.
    const days = await screen.findAllByRole("gridcell");
    const inMonth = days.filter(
      (el) => !el.hasAttribute("data-outside") && !el.hasAttribute("disabled"),
    );
    expect(inMonth.length).toBeGreaterThan(10);

    await user.click(inMonth[9]!);
    expect(screen.getByText("Select end date")).toBeInTheDocument();

    await user.click(inMonth[13]!);

    expect(onRangeValueChange).toHaveBeenCalled();
    const last = onRangeValueChange.mock.calls.at(-1)?.[0] as {
      start: string;
      end: string;
    };
    expect(last.start).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(last.end).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(last.start <= last.end).toBe(true);
  });

  it("swaps when end is before start", async () => {
    const user = userEvent.setup();
    const onRangeValueChange = vi.fn();

    render(
      <DatePicker
        mode="range"
        label="Window"
        motion="none"
        onRangeValueChange={onRangeValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: /Window|range|Date/i }));
    const days = await screen.findAllByRole("gridcell");
    const inMonth = days.filter(
      (el) => !el.hasAttribute("data-outside") && !el.hasAttribute("disabled"),
    );

    await user.click(inMonth[14]!);
    await user.click(inMonth[8]!);

    const last = onRangeValueChange.mock.calls.at(-1)?.[0] as {
      start: string;
      end: string;
    };
    expect(last.start <= last.end).toBe(true);
  });
});
