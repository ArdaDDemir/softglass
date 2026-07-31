import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CommandPalette } from "./command-palette";

const items = [
  { id: "home", label: "Go home", description: "Dashboard", group: "Nav" },
  { id: "settings", label: "Open settings", keywords: "prefs", group: "Nav" },
  { id: "theme", label: "Toggle theme", group: "Appearance" },
];

describe("CommandPalette (smoke)", () => {
  it("filters items and selects with Enter", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onOpenChange = vi.fn();

    render(
      <CommandPalette
        open
        onOpenChange={onOpenChange}
        items={items}
        onSelect={onSelect}
        motion="none"
      />,
    );

    expect(screen.getByRole("dialog", { name: "Command palette" })).toBeInTheDocument();
    expect(screen.getByText("Go home")).toBeInTheDocument();

    const input = screen.getByRole("combobox");
    await user.type(input, "sett");

    expect(screen.getByText("Open settings")).toBeInTheDocument();
    expect(screen.queryByText("Go home")).not.toBeInTheDocument();

    await user.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "settings" }),
    );
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <CommandPalette
        open
        onOpenChange={onOpenChange}
        items={items}
        motion="none"
      />,
    );

    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
