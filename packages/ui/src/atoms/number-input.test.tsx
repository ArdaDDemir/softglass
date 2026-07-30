import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NumberInput } from "./number-input";

describe("NumberInput (smoke)", () => {
  it("nudge steppers change value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <NumberInput
        label="Qty"
        value={2}
        min={0}
        max={10}
        step={1}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Increase" }));
    expect(onValueChange).toHaveBeenCalledWith(3);

    await user.click(screen.getByRole("button", { name: "Decrease" }));
    expect(onValueChange).toHaveBeenCalledWith(1);
  });

  it("respects max on increase", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <NumberInput label="Cap" value={5} max={5} onValueChange={onValueChange} />,
    );

    expect(screen.getByRole("button", { name: "Increase" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Increase" }));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
