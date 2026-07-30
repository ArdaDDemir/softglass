import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MultiSelect } from "./multi-select";

const OPTIONS = Array.from({ length: 24 }, (_, i) => ({
  value: `o${i}`,
  label: `Option ${i + 1}`,
}));

describe("MultiSelect filter-in-menu (smoke)", () => {
  it("narrows options when filtering in the menu", async () => {
    const user = userEvent.setup();

    render(
      <MultiSelect
        label="Tags"
        options={OPTIONS}
        filterable
        motion="none"
      />,
    );

    await user.click(screen.getByRole("button", { name: /Tags|Multi select/i }));

    const filter = await screen.findByRole("searchbox", { name: /Filter/i });
    expect(screen.getByRole("option", { name: "Option 1" })).toBeInTheDocument();

    await user.type(filter, "Option 12");
    expect(screen.getByRole("option", { name: "Option 12" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "Option 2" })).not.toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "Option 1" })).not.toBeInTheDocument();
  });
});
