import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Accordion } from "./accordion";

const FAQ = [
  {
    value: "a",
    trigger: "What is Softglass?",
    content: "A soft-glass UI kit.",
  },
  {
    value: "b",
    trigger: "Is it free?",
    content: "MIT licensed.",
  },
  {
    value: "c",
    trigger: "Portal?",
    content: "Overlays use body portal.",
    disabled: true,
  },
];

describe("Accordion (smoke)", () => {
  it("toggles a single item open and closed", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Accordion
        type="single"
        items={FAQ}
        defaultValue=""
        onValueChange={onValueChange}
      />,
    );

    const first = screen.getByRole("button", { name: /What is Softglass/i });
    expect(first).toHaveAttribute("aria-expanded", "false");

    await user.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("A soft-glass UI kit.")).toBeVisible();
    expect(onValueChange).toHaveBeenCalledWith("a");

    await user.click(first);
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(onValueChange).toHaveBeenLastCalledWith("");
  });

  it("does not open disabled items", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Accordion type="single" items={FAQ} onValueChange={onValueChange} />,
    );

    await user.click(screen.getByRole("button", { name: /Portal/i }));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
