import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NativeDateInput } from "./native-date-input";

describe("NativeDateInput (smoke)", () => {
  it("nudges day via stepper", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <NativeDateInput
        label="Due"
        value="2026-07-10"
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Increase day" }));
    expect(onValueChange).toHaveBeenCalledWith("2026-07-11");
  });
});
