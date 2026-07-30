import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Collapsible } from "./collapsible";

describe("Collapsible (smoke)", () => {
  it("opens and closes the panel", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <Collapsible
        trigger="Privacy note"
        defaultOpen={false}
        onOpenChange={onOpenChange}
      >
        Hidden body
      </Collapsible>,
    );

    const trigger = screen.getByRole("button", { name: /Privacy note/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Hidden body")).toBeVisible();
    expect(onOpenChange).toHaveBeenCalledWith(true);

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });
});
