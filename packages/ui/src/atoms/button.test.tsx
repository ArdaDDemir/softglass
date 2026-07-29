import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";

describe("Button (smoke)", () => {
  it("renders label and fires click", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Save</Button>);

    const btn = screen.getByRole("button", { name: "Save" });
    expect(btn).toBeInTheDocument();

    await user.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire click when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );

    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
