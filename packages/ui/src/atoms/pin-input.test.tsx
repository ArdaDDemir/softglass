import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PinInput } from "./pin-input";

describe("PinInput (smoke)", () => {
  it("fills cells and calls onComplete", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    const onValueChange = vi.fn();

    render(
      <PinInput
        length={4}
        label="Code"
        onComplete={onComplete}
        onValueChange={onValueChange}
      />,
    );

    const cells = document.querySelectorAll(".sg-pin-cell");
    expect(cells.length).toBe(4);
    await user.click(cells[0]!);
    await user.keyboard("1234");

    expect(onValueChange).toHaveBeenCalled();
    expect(onComplete).toHaveBeenCalledWith("1234");
  });
});
