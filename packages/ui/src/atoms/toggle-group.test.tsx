import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ToggleGroup } from "./toggle-group";

describe("ToggleGroup (smoke)", () => {
  it("selects single option", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <ToggleGroup
        label="View"
        type="single"
        value="list"
        onValueChange={onValueChange}
        options={[
          { value: "grid", label: "Grid" },
          { value: "list", label: "List" },
        ]}
      />,
    );

    await user.click(screen.getByRole("radio", { name: "Grid" }));
    expect(onValueChange).toHaveBeenCalledWith("grid");
  });
});
