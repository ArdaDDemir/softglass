import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { DatePicker } from "./date-picker";

describe("DatePicker portal (smoke)", () => {
  it("mounts the panel under document.body when open", async () => {
    const user = userEvent.setup();

    render(<DatePicker label="Due" motion="none" />);

    await user.click(screen.getByRole("button", { name: /Due|Date|Pick/i }));

    const panel = await screen.findByRole("dialog");
    expect(panel).toBeInTheDocument();
    expect(panel.hasAttribute("data-portaled")).toBe(true);
    expect(document.body.contains(panel)).toBe(true);
    // Not trapped inside the field root as a non-portaled absolute child only
    expect(panel.parentElement).toBe(document.body);
  });
});
