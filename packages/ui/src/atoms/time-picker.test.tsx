import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TimePicker } from "./time-picker";

describe("TimePicker (smoke)", () => {
  it("opens panel and applies a preset", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <TimePicker
        label="Start"
        defaultValue="09:00"
        onValueChange={onValueChange}
        motion="none"
        presets={["09:00", "12:00", "17:00"]}
      />,
    );

    await user.click(screen.getByRole("button", { name: /Start|Time/i }));
    const dialog = await screen.findByRole("dialog", { name: /Time picker/i });
    expect(dialog).toBeInTheDocument();

    await user.click(screen.getByText("12:00"));
    expect(onValueChange).toHaveBeenCalledWith("12:00");
  });
});
