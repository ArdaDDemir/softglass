import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Calendar } from "./calendar";

/**
 * In range mode the opening view comes from `rangeValue` / `defaultRangeValue`;
 * with an empty range it falls back to today. Every literal date below is only
 * rendered while the clock sits in July 2026, so pin it — otherwise these specs
 * pass during July and fail in every other month.
 */
const JULY_2026 = new Date(2026, 6, 15, 12, 0, 0);

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
  vi.setSystemTime(JULY_2026);
});

afterEach(() => {
  vi.useRealTimers();
});

const setupUser = () =>
  userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

/**
 * user-event treats a null target as a no-op instead of throwing, which turns a
 * missing day cell into a silently passing assertion. Fail loudly instead.
 */
function dayCell(iso: string): HTMLButtonElement {
  const el = document.querySelector<HTMLButtonElement>(`[data-iso="${iso}"]`);
  expect(el, `no day cell rendered for ${iso}`).not.toBeNull();
  return el!;
}

describe("Calendar (smoke)", () => {
  it("selects a day in single mode", async () => {
    const user = setupUser();
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

    await user.click(dayCell("2026-07-20"));
    expect(onValueChange).toHaveBeenCalledWith("2026-07-20");
  });

  it("supports range start then end", async () => {
    const user = setupUser();
    const onRangeValueChange = vi.fn();

    render(
      <Calendar
        mode="range"
        defaultValue="2026-07-01"
        defaultRangeValue={{ start: "", end: "" }}
        onRangeValueChange={onRangeValueChange}
      />,
    );

    await user.click(dayCell("2026-07-10"));
    expect(onRangeValueChange).not.toHaveBeenCalled();

    await user.click(dayCell("2026-07-12"));
    expect(onRangeValueChange).toHaveBeenCalledWith({
      start: "2026-07-10",
      end: "2026-07-12",
    });
  });

  it("orders a range picked end-first", async () => {
    const user = setupUser();
    const onRangeValueChange = vi.fn();

    render(
      <Calendar
        mode="range"
        defaultRangeValue={{ start: "", end: "" }}
        onRangeValueChange={onRangeValueChange}
      />,
    );

    await user.click(dayCell("2026-07-20"));
    await user.click(dayCell("2026-07-14"));

    expect(onRangeValueChange).toHaveBeenCalledWith({
      start: "2026-07-14",
      end: "2026-07-20",
    });
  });

  it("opens on the current month when no value is given", () => {
    render(<Calendar aria-label="Pick day" />);

    expect(dayCell("2026-07-15")).toHaveAttribute("aria-current", "date");
    expect(dayCell("2026-07-31")).toBeInTheDocument();
  });
});
