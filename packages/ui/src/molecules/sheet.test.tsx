import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Sheet } from "./sheet";

describe("Sheet (smoke)", () => {
  it("opens content and closes on Escape", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <Sheet
        open
        onOpenChange={onOpenChange}
        title="Settings"
        side="right"
        motion="none"
      >
        Panel body
      </Sheet>,
    );

    expect(screen.getByRole("dialog", { name: "Settings" })).toBeInTheDocument();
    expect(screen.getByText("Panel body")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes from the close button", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <Sheet open onOpenChange={onOpenChange} title="Panel" motion="none">
        Body
      </Sheet>,
    );

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
