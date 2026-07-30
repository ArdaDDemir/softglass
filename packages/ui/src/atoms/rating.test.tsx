import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Rating } from "./rating";

describe("Rating (smoke)", () => {
  it("sets value on star click", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Rating label="Stars" value={1} onValueChange={onValueChange} max={5} />,
    );

    await user.click(screen.getByRole("button", { name: "4 of 5" }));
    expect(onValueChange).toHaveBeenCalledWith(4);
  });
});
