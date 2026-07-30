import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Chip } from "./chip";

describe("Chip (smoke)", () => {
  it("toggles selected via aria-pressed", async () => {
    const user = userEvent.setup();
    const onSelectedChange = vi.fn();

    render(
      <Chip onSelectedChange={onSelectedChange}>Filter</Chip>,
    );

    const chip = screen.getByRole("button", { name: "Filter" });
    expect(chip).toHaveAttribute("aria-pressed", "false");

    await user.click(chip);
    expect(onSelectedChange).toHaveBeenCalledWith(true);
  });

  it("fires onRemove without toggling when remove clicked", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    const onSelectedChange = vi.fn();

    render(
      <Chip removable onRemove={onRemove} onSelectedChange={onSelectedChange}>
        Tag
      </Chip>,
    );

    await user.click(screen.getByRole("button", { name: "Remove" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
    // Remove must not toggle selection
    expect(onSelectedChange).not.toHaveBeenCalled();
  });

  it("removes via dedicated control on static chip", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();

    render(
      <Chip interactive={false} removable onRemove={onRemove}>
        Aurora
      </Chip>,
    );

    await user.click(screen.getByRole("button", { name: "Remove" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
