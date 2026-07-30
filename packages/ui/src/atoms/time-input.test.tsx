import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TimeInput } from "./time-input";

describe("TimeInput (smoke)", () => {
  it("nudges hour via stepper", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <TimeInput value="09:30" onValueChange={onValueChange} label="Start" />,
    );

    await user.click(screen.getByRole("button", { name: "Increase hour" }));
    expect(onValueChange).toHaveBeenCalledWith("10:30");
  });

  it("supports 12h AM/PM toggle", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <TimeInput
        value="09:15"
        hourCycle={12}
        onValueChange={onValueChange}
        label="Meet"
      />,
    );

    await user.click(screen.getByRole("button", { name: "PM" }));
    expect(onValueChange).toHaveBeenCalledWith("21:15");
  });
});
