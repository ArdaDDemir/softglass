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

  it("keyboard index matches render order with mixed groups", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onOpenChange = vi.fn();

    // Ungrouped is rendered first by groupItems; source array has it last.
    const mixed = [
      { id: "home", label: "Go home", group: "Nav" },
      { id: "help", label: "Help docs", group: "Nav" },
      { id: "ungrouped", label: "Quick action" },
    ];

    render(
      <CommandPalette
        open
        onOpenChange={onOpenChange}
        items={mixed}
        onSelect={onSelect}
        motion="none"
      />,
    );

    // First option in DOM order is ungrouped "Quick action"
    const options = screen.getAllByRole("option");
    expect(options[0]).toHaveTextContent("Quick action");
    expect(options[0]).toHaveAttribute("data-active", "true");

    // One ArrowDown → second visual row (Go home), not raw filtered[1]
    await user.keyboard("{ArrowDown}");
    expect(options[1]).toHaveAttribute("data-active", "true");

    await user.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "home" }),
    );
  });
});
