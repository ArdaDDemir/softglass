import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SearchInput } from "./search-input";

describe("SearchInput (smoke)", () => {
  it("clears value when clear is pressed", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <SearchInput
        label="Search"
        value="glass"
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Clear search" }));
    expect(onValueChange).toHaveBeenCalledWith("");
  });

  it("types and reports value changes", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<SearchInput label="Find" defaultValue="" onValueChange={onValueChange} />);

    await user.type(screen.getByRole("searchbox"), "ui");
    expect(onValueChange).toHaveBeenCalled();
    expect(onValueChange.mock.calls.at(-1)?.[0]).toBe("ui");
  });
});
